const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const middleware = require('../middleware');

router.get('/:userName', UserController.getUser);
router.post('/profile', middleware.checkValidators, UserController.updateUser);
router.post('/uploadImg', middleware.upload.single('file'), UserController.uploadImg);

module.exports = router;