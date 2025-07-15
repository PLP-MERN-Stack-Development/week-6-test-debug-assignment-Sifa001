const { isValidStatus } = require('../../helpers/validation');

describe('isValidStatus', () => {
  it('returns true for valid statuses', () => {
    expect(isValidStatus('open')).toBe(true);
    expect(isValidStatus('in-progress')).toBe(true);
    expect(isValidStatus('resolved')).toBe(true);
  });
  it('returns false for invalid statuses', () => {
    expect(isValidStatus('closed')).toBe(false);
    expect(isValidStatus('pending')).toBe(false);
    expect(isValidStatus('')).toBe(false);
  });
});
