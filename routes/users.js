require("dotenv").config()
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user.js');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');
const UserModel = require('../models/user')


const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  Bucket: process.env.BUCKET_NAME
});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: {
    fileSize: 2000000
  }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profileImage');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


router.post('/register', UsersController.register);
// router.post('/create', UsersController.create);


router.post('/upload-avatar', (req, res) => {
  profileImgUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({
        error: error
      });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {





        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        console.log('image location: ', imageLocation)
        // Save the file name into database into profile model

        UserModel.findOne({ email: 'ryan@gmail.com' }).then(user => {
          user.avatar = imageLocation
          user.save()
          res.json(user)
        });


        // res.json({
        //   image: imageName,
        //   location: imageLocation
        // });
      }
    }
  });
});

module.exports = router;