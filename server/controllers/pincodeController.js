const db = require('../config/db');

const PINCODE_PATTERN = /^\d{6}$/;

const validatePincode = (pincode) => PINCODE_PATTERN.test(pincode);

const getPincodeByCode = async (req, res, next) => {
  try {
    const { pincode } = req.params;

    if (!validatePincode(pincode)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 6-digit numeric pincode.'
      });
    }

    const [rows] = await db.query(
      `SELECT area, district, state, post_office
       FROM pincodes
       WHERE pincode = ?
       ORDER BY area ASC`,
      [pincode]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Bangalore locality was found for this pincode.'
      });
    }

    return res.json({
      success: true,
      pincode,
      results: rows
    });
  } catch (error) {
    return next(error);
  }
};

const getPincodes = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();

    const params = [];
    let whereClause = '';

    if (search) {
      whereClause = `WHERE pincode LIKE ? OR area LIKE ? OR district LIKE ? OR post_office LIKE ?`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM pincodes ${whereClause}`,
      params
    );

    const [rows] = await db.query(
      `SELECT id, pincode, area, district, state, post_office
       FROM pincodes
       ${whereClause}
       ORDER BY pincode ASC, area ASC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const total = countRows[0]?.total || 0;

    return res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      results: rows
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPincodeByCode,
  getPincodes,
  validatePincode
};
