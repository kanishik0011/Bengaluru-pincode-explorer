const pincodes = require('../data/pincodes');

module.exports = function handler(request, response) {
  const page = Math.max(Number.parseInt(request.query.page || '1', 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(request.query.limit || '20', 10) || 20, 1), 100);
  const search = String(request.query.search || '').trim().toLowerCase();

  const filtered = search
    ? pincodes.filter((record) => (
      record.pincode.includes(search)
      || record.area.toLowerCase().includes(search)
      || record.district.toLowerCase().includes(search)
      || record.post_office.toLowerCase().includes(search)
    ))
    : pincodes;

  const offset = (page - 1) * limit;
  const results = filtered
    .slice(offset, offset + limit)
    .map((record, index) => ({
      id: offset + index + 1,
      ...record
    }));

  return response.status(200).json({
    success: true,
    page,
    limit,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
    results
  });
};
