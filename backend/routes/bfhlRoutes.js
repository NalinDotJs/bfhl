const express = require('express');
const router = express.Router();
const { getOperationCode, handlePostRequest } = require('../controllers/bfhlController');
const fileValidation = require('../middlewares/fileValidation');

router.get('/', getOperationCode);
router.post('/', fileValidation, handlePostRequest);

module.exports = router;
