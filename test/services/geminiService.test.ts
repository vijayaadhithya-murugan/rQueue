// Mock environment variable before importing
process.env.API_KEY = 'test-api-key';

// Mock the Google GenAI
jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn()
    })
  })),
  Type: {
    ARRAY: 'array',
    OBJECT: 'object',
    STRING: 'string'
  }
}));

import { triageTickets } from '../../src/services/geminiService';
import type { RawTicket } from '../../src/types';

describe('geminiService', () => {
  const mockTickets: RawTicket[] = [
    {
      id: '1',
      subject: 'Login not working',
      body: 'Users cannot log into the application',
      createdAt: '2025-10-30T12:00:00Z'
    },
    {
      id: '2', 
      subject: 'Feature request: Dark mode',
      body: 'Please add dark mode to the UI',
      createdAt: '2025-10-30T13:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch for the API call
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle successful API response', async () => {
    const mockResponse = [
      {
        id: '1',
        category: 'Bug Report',
        urgency: 'P1 - Critical',
        suggestedAssignee: 'Backend Team',
        confidence: 'High',
        reasoning: 'Login issues affect all users'
      },
      {
        id: '2',
        category: 'Feature Request', 
        urgency: 'P4 - Low',
        suggestedAssignee: 'Frontend Team',
        confidence: 'Medium',
        reasoning: 'UI enhancement request'
      }
    ];

    // Mock the GoogleGenAI response
    const mockGenerate = jest.fn().mockResolvedValue({
      response: {
        text: () => JSON.stringify(mockResponse)
      }
    });

    const { GoogleGenAI } = require('@google/genai');
    GoogleGenAI.mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: mockGenerate
      })
    }));

    const result = await triageTickets(mockTickets);

    expect(result).toEqual(mockResponse);
    expect(mockGenerate).toHaveBeenCalledTimes(1);
  });

  it('should handle empty ticket array', async () => {
    const result = await triageTickets([]);
    expect(result).toEqual([]);
  });

  it('should handle API errors gracefully', async () => {
    const mockGenerate = jest.fn().mockRejectedValue(new Error('API Error'));

    const { GoogleGenAI } = require('@google/genai');
    GoogleGenAI.mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: mockGenerate
      })
    }));

    await expect(triageTickets(mockTickets)).rejects.toThrow('API Error');
  });

  it('should handle malformed API response', async () => {
    const mockGenerate = jest.fn().mockResolvedValue({
      response: {
        text: () => 'invalid json'
      }
    });

    const { GoogleGenAI } = require('@google/genai');
    GoogleGenAI.mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: mockGenerate
      })
    }));

    await expect(triageTickets(mockTickets)).rejects.toThrow();
  });
});