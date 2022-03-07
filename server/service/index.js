const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const githubOauthURI = "https://github.com/login/oauth/authorize";
const githubAccessTokenAPI = "https://github.com/login/oauth/access_token";
const redirectURI = "http://localhost:7000/callback";


router.get("/", (req, res) => {
  const URI = `${githubOauthURI}?client_id=${clientId}&redirect_uri=${redirectURI}`;
  res.redirect(URI);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
  };
  const response = await axios.post(githubAccessTokenAPI, body, {
    headers: { accept: "application/json" },
  });
  const accessToken = response.data.access_token;
  const user = await axios.get(`https://api.github.com/user`, {
    headers: { Authorization: `token ${accessToken}` },
  });
  console.log(user.data);
});