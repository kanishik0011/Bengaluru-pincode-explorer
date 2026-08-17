const pincodes = require('../data/pincodes');

const PINCODE_PATTERN = /^\d{6}$/;

module.exports = function handler(request, response) {
  const { pincode } = request.query;

  if (!PINCODE_PATTERN.test(pincode)) {
    return response.status(400).json({
      success: false,
      message: 'Please enter a valid 6-digit numeric pincode.'
    });
  }

  const results = pincodes
    .filter((record) => record.pincode === pincode)
    .map(({ area, district, state, post_office }) => ({
      area,
      district,
      state,
      post_office
    }))
    .sort((a, b) => a.area.localeCompare(b.area));

  if (results.length === 0) {
    return response.status(404).json({
      success: false,
      message: 'No Bangalore locality was found for this pincode.'
    });
  }

  return response.status(200).json({
    success: true,
    pincode,
    results
  });
};
