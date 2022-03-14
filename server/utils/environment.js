require("dotenv").config();

module.exports = {
  server: { port: process.env.SERVER_PORT, secret: process.env.SERVER_SECRET },
  github: {
    mainApi: "https://api.github.com",
    oauthAPI: "https://github.com/login/oauth/authorize",
    accessTokenAPI: "https://github.com/login/oauth/access_token",
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    redirectUrl: process.env.GITHUB_REDIRECT_URL,
    signinState: process.env.GITHUB_SIGNIN_STATE,
    signupState: process.env.GITHUB_SIGNUP_STATE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER_NAME,
    password: process.env.REDIS_PASSWORD,
  },
};
