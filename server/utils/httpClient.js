const axios = require("axios").default;

const postData = async (uri, body, authToken) => {
  const response = await axios.post(uri, body, {
    headers: { accept: "application/json" },
  });
  return response;
};

const getData = async (uri, authToken) => {
  const response = await axios.get(uri, {
    headers: { accept: "application/json", Authorization: authToken },
  });
  return response;
};

module.exports = { postData, getData };
