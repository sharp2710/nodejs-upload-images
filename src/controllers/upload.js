const upload = require("../middleware/upload");
const connection = require("../database/db.config");
const multipleUpload = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);
    if (req.files.length <= 0) {
      return res.send(`You must select at least one file.`);
    }
    
    connection.connect();
    const sql = `INSERT INTO upload (name, path) VALUES ?`;
    const values = req.files.map((file) => [file.originalname, req.body.path]);
    connection.query(sql, [values], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`Success`);
    });
    connection.end();


  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.send("File size is too big.");
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.send("Too many files to upload.");
    }
    if (error.code === "LIMIT_FIELD_KEY") {
      return res.send("Too many input fields.");
    }
    if (error.code === "LIMIT_FIELD_VALUE") {
      return res.send("Too many input values.");
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Unexpected input files.");
    }
  
    
  }
};

module.exports = {
  multipleUpload: multipleUpload,
};
