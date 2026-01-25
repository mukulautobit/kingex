/**
 * Parses complex error messages from the backend.
 * Handles stringified JSON/Python-like dictionaries and extracts the actual error text.
 * 
 * Example input: "{'properties[0].length': ['Maximum value for \"length\" is 100.0, but got 600.0.']}"
 * Example output: "Maximum value for \"length\" is 100.0, but got 600.0."
 */
export const parseErrorMessage = (error: any): string => {
  if (!error) return "An unknown error occurred.";

  let message = "";

  if (typeof error === "string") {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error.message) {
    message = error.message;
  } else {
    try {
      message = JSON.stringify(error);
    } catch {
      message = "An unknown error occurred.";
    }
  }

  // Handle common patterns like Python-style stringified dicts: {'field': ['msg']}
  // Or valid JSON stringified: {"field": ["msg"]}
  
  // Basic attempt to detect if it's a stringified object/array
  if (typeof message === "string" && (message.trim().startsWith("{") || message.trim().startsWith("["))) {
    try {
      // Try parsing as standard JSON
      let parsed = JSON.parse(message);
      return extractFirstError(parsed);
    } catch {
      // If JSON parse fails, try regex-based extraction for Python-style lists/dicts
      // Look for the content between [' and '] or [" and "]
      const match = message.match(/\[\s*['"](.*?)['"]\s*\]/);
      if (match && match[1]) {
        return match[1];
      }

      // If that fails, try a naive normalization but handle it carefully
      try {
        const normalized = message
          .replace(/'/g, '"')
          .replace(/\\"/g, '"'); 
        let parsed = JSON.parse(normalized);
        return extractFirstError(parsed);
      } catch {
        // Final fallback: remove the outer curly braces and quotes if it looks like a dict
        return message.replace(/^\{?['"]?|['"]?\}?$/g, "").trim();
      }
    }
  }

  return message;
};

const extractFirstError = (obj: any): string => {
  if (typeof obj === "string") return obj;
  if (Array.isArray(obj)) {
    if (obj.length > 0) return extractFirstError(obj[0]);
    return "An error occurred.";
  }
  if (typeof obj === "object" && obj !== null) {
    const values = Object.values(obj);
    if (values.length > 0) return extractFirstError(values[0]);
  }
  return "An error occurred.";
};
