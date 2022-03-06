const express = require("express"); 
const axios = require("axios").default

const app = express();

const clientId = "d95d2adf9701dd1d3ae4";
const clientSecret = "134e43e0c8fab1a548d51dbb53dd26e8433ec01f";
const githubOauthURI = "https://github.com/login/oauth/authorize";
const githubAccessTokenAPI = "https://github.com/login/oauth/access_token"
const redirectURI = "http://localhost:7000/callback";

app.get("/", (req, res) => {
  const URI = `${githubOauthURI}?client_id=${clientId}&redirect_uri=${redirectURI}`;
  res.redirect(URI);
});

app.get("/callback", async (req, res) => {
  const { code } = req.query; 
  const body = {
      client_id: clientId, 
      client_secret: clientSecret, 
      code 
  }
  const response = await axios.post(githubAccessTokenAPI, body) 
  console.log(response.data)

});

const PORT = 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
