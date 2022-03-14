const express = require("express");
const router = express.Router();

const service = require("../service");

const makeHttpRequest = (controller) => {
  return async (req, res, next) => {
    try {
      var httpData = {
        data: req.body,
        query: req.query,
        param: req.params,
        token: req.headers["authorization"],
      };

      var result = await controller(httpData);
      //send, redirect or perform another action for this request
      switch (result.action) {
        case "send":
          res.status(200).send({ status: true, result: result.data });
          break;
        case "redirect":
          res.redirect(result.data);
          break;
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ status: false, error: error.message });
    }
  };
};

router.get("/test", makeHttpRequest(service.testApi))
router.get("/auth/signup/github", makeHttpRequest(service.signupWithGithub));
router.get("/auth/signin/github", makeHttpRequest(service.signinWithGithub));
router.get("/auth/callback/github", makeHttpRequest(service.githubCallback));

module.exports = router;
