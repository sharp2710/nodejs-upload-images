const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");

let routes = app => {
  router.get("/", homeController.getHome);

  router.post("/multiple-upload", uploadController.multipleUpload);

  router.get("/image/:filename",(req,res)=>{
    const file = req.params.filename;
    res.sendFile(file, { root: "upload" });
  });
   
  router.get("/style.css",(_req,res)=>{
    res.sendFile("style.css", { root: "public" });
  })
  router.get("/script.js",(_req,res)=>{
    res.sendFile("script.js", { root: "public" });
  })
  
  return app.use("/", router);
};

module.exports = routes;