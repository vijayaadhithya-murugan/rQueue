// Utility functions for ticket processing

export const formatTicketId = (id: string): string => {
  return id.padStart(6, '0');
};

export const getUrgencyColor = (urgency: string): string => {
  switch (urgency) {
    case 'P1 - Critical':
      return 'red';
    case 'P2 - High':
      return 'orange';
    case 'P3 - Medium':
      return 'yellow';
    case 'P4 - Low':
      return 'green';
    default:
      return 'gray';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};