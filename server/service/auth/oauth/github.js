const { env, httpClient, helper } = require("../../../utils");
const db = require("../../../db");

const signupWithGithub = async ({ data }) => {
  const redirectUrl = buildRedirectUri(env.github.signupState);
  return { action: "redirect", data: redirectUrl };
};

const signinWithGithub = async ({ data }) => {
  const redirectUrl = buildRedirectUri(env.github.signinState);
  return { action: "redirect", data: redirectUrl };
};

const githubCallback = async ({ data, param, query }) => {
  const githubUser = await getUserDataFromGithubApi(query.code);
  const user = await db.find({ type: "user", "github.id": githubUser.id });

  if (query.state === env.github.signupState) {
    const token = await registerUser(user, githubUser);
    return { action: "send", data: { token } };
  } else {
    const token = await login(user);
    return { action: "send", data: { token } };
  }
};

const registerUser = async (user, githubUser) => {
  if (user.length > 0) {
    throw new Error("This user is already registered with Github");
  }
  const userInfo = {
    type: "user",
    github: {
      id: githubUser.id,
      name: githubUser.name,
      email: githubUser.email,
    },
    google: { id: "", name: "", email: "" },
    facebook: { id: "", name: "", email: "" },
    twitter: { id: "", name: "", email: "" },
  };

  const { id } = await db.save(userInfo);
  const token = await helper.generateToken({ id }, "48H");
  return token;
};

const login = async (user) => {
  if (user.length === 0) {
    throw new Error(
      "You can't login with Github, please signup with Github first"
    );
  }
  const token = await helper.generateToken({ id: user[0]._id }, "48H");
  return token;
};

const buildRedirectUri = (state) => {
  const redirectUrl = `${env.github.oauthAPI}?client_id=${env.github.clientId}&redirect_uri=${env.github.redirectUrl}&state=${state}`;
  return redirectUrl;
};

const getUserDataFromGithubApi = async (code) => {
  const body = {
    client_id: env.github.clientId,
    client_secret: env.github.clientSecret,
    code,
  };

  const response = await httpClient.postData(env.github.accessTokenAPI, body);
  const user = await httpClient.getData(
    `${env.github.mainApi}/user`,
    `token ${response.data.access_token}`
  );

  return user.data;
};

const testApi = async ({ data }) => {
  console.log("test api");

  return { action: "send", data: { test: "hello" } };
};

module.exports = {
  signupWithGithub,
  signinWithGithub,
  githubCallback,
  testApi,
};
