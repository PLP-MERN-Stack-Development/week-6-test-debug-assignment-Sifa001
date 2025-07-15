const request = require('supertest');
const app = require('../../index');

// Custom mock for Bug model
const bugMock = {
  _id: '1',
  title: 'Test',
  status: 'open',
  toJSON: function() { return this; }
};

jest.mock('../../models/Bug', () => {
  // The constructor returns an object with a save method
  const Bug = function() {
    return {
      save: jest.fn().mockResolvedValue(bugMock)
    };
  };
  // Static methods
  Bug.find = jest.fn().mockResolvedValue([bugMock]);
  Bug.findByIdAndUpdate = jest.fn().mockResolvedValue({ ...bugMock, title: 'Updated', status: 'resolved' });
  Bug.findByIdAndDelete = jest.fn().mockResolvedValue(bugMock);
  return Bug;
});
const Bug = require('../../models/Bug');

describe('Bug API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a bug', async () => {
    const res = await request(app).post('/api/bugs').send({ title: 'Test', status: 'open' });
    console.log('RESPONSE BODY:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test');
  });

  it('should get all bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a bug', async () => {
    const res = await request(app).patch('/api/bugs/1').send({ status: 'resolved' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('should delete a bug', async () => {
    const res = await request(app).delete('/api/bugs/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
});
