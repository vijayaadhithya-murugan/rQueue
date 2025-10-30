import { formatTicketId, getUrgencyColor, truncateText, isValidEmail } from '../../src/utils/ticketHelpers';

describe('ticketHelpers', () => {
  describe('formatTicketId', () => {
    it('pads short IDs with zeros', () => {
      expect(formatTicketId('1')).toBe('000001');
      expect(formatTicketId('42')).toBe('000042');
      expect(formatTicketId('123')).toBe('000123');
    });

    it('does not pad IDs that are already 6 digits', () => {
      expect(formatTicketId('123456')).toBe('123456');
    });

    it('handles longer IDs without truncating', () => {
      expect(formatTicketId('1234567')).toBe('1234567');
    });
  });

  describe('getUrgencyColor', () => {
    it('returns correct colors for each urgency level', () => {
      expect(getUrgencyColor('P1 - Critical')).toBe('red');
      expect(getUrgencyColor('P2 - High')).toBe('orange');
      expect(getUrgencyColor('P3 - Medium')).toBe('yellow');
      expect(getUrgencyColor('P4 - Low')).toBe('green');
    });

    it('returns gray for unknown urgency levels', () => {
      expect(getUrgencyColor('Unknown')).toBe('gray');
      expect(getUrgencyColor('')).toBe('gray');
    });
  });

  describe('truncateText', () => {
    it('truncates text longer than maxLength', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    it('returns original text if shorter than maxLength', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    it('returns original text if exactly maxLength', () => {
      const exactText = 'Exact';
      expect(truncateText(exactText, 5)).toBe('Exact');
    });

    it('handles empty strings', () => {
      expect(truncateText('', 10)).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('admin+tag@company.org')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
    });
  });
});