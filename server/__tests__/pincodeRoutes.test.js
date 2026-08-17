const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

jest.mock('../config/db', () => ({
  query: jest.fn()
}));

describe('pincode routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns matching locality records for a valid pincode', async () => {
    db.query.mockResolvedValueOnce([
      [
        {
          area: 'Bengaluru G.P.O.',
          district: 'Bengaluru Urban',
          state: 'Karnataka',
          post_office: 'Bengaluru G.P.O.'
        }
      ]
    ]);

    const response = await request(app).get('/api/pincodes/560001');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.pincode).toBe('560001');
    expect(response.body.results).toHaveLength(1);
  });

  test('rejects invalid pincode format', async () => {
    const response = await request(app).get('/api/pincodes/56001A');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(db.query).not.toHaveBeenCalled();
  });

  test('returns 404 when pincode is not found', async () => {
    db.query.mockResolvedValueOnce([[]]);

    const response = await request(app).get('/api/pincodes/560999');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
