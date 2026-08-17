const express = require('express');
const {
  getPincodeByCode,
  getPincodes
} = require('../controllers/pincodeController');

const router = express.Router();

router.get('/', getPincodes);
router.get('/:pincode', getPincodeByCode);

module.exports = router;
