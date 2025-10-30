// API Key obfuscation utility
// This provides basic obfuscation - the key is split and encoded

const keyParts = [
  "QUl6YVN5", // AIzaSy
  "RFF0YmZ3", // DQtbfw  
  "RDNQanpK", // D3PjzJ
  "Q2EwYTFz", // Ca0a1s
  "LVJtX2pt", // -Rm_jm
  "LUsxelFL", // -K1zQK
  "Y0J3"      // cBw
];

const deobfuscate = (): string => {
  try {
    return keyParts.map(part => atob(part)).join('');
  } catch {
    throw new Error("Failed to process configuration");
  }
};

export const getApiKey = (): string => {
  try {
    // First try environment variable (for build time - most secure)
    const envApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (envApiKey) {
      return envApiKey;
    }
    
    // Fallback to obfuscated key (for client-side deployment)
    return deobfuscate();
  } catch (error) {
    throw new Error("API configuration not available");
  }
};