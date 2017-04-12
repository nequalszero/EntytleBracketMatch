// Simple object representing complimentary brackets.
const BRACKETMATCHES = {
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '(': ')',
  ')': '('
};

// Checks if the input is of the String class.
const validateString = function(input) {
  if (typeof input !== "string") {
    throw "ERROR - the argument that was provided is not a string";
  }
  console.log(`\nGiven string: ${input}`);
}

// Check for 0-length string or odd-length string.
//   0-length string is automatically considered to be balanced.
//   Odd-length string is automatically considered to be unbalanced.
const checkForZeroLength = function(string) {
  if (string.length === 0) {
    console.log("Given 0-length string => balanced by default.");
    return true;
  }
  return false;
}
const checkForOddLength = function(string) {
  if (string.length%2 !== 0) {
    console.log("Given string of odd-length => unbalanced by default.");
    return true;
  }
  return false;
}

// Checks if character is an opening bracket.
const isAnOpeningBracket = function(char) {
  const OPENINGBRACKETS = {
    '[': true,
    '{': true,
    '(': true
  };

  if (OPENINGBRACKETS.hasOwnProperty(char)) return true;
  return false;
}

// Checks if character is a closing bracket.
const isAClosingBracket = function(char) {
  const CLOSINGBRACKETS = {
    ']': true,
    '}': true,
    ')': true
  };

  if (CLOSINGBRACKETS.hasOwnProperty(char)) return true;
  return false;
}


// Accepts a string of brackets ({[]}) and prints whether the string is balanced.
// Assumes no non-bracket characters are given.
const analyzeString = function(string) {
  // Ensure the given input is of the string type.
  validateString(string);

  // Check for 0 length string or odd-length string.
  if (checkForZeroLength(string)) return true;
  if (checkForOddLength(string)) return false;

  const openingBrackets = [];
  // Boolean in case a closing bracket is encountered while openingBrackets is empty.
  var earlyTermination = false;
  var openBracketCount = 0;

  // Using for as opposed to forEach due to inability to break early from a forEach loop.
  for (var i=0; i < string.length; i++) {
    char = string[i];

    if (openBracketCount > string.length/2) {
      console.log("Open bracket count has exceeded half the length of the string.");
      earlyTermination = true;
    }
    // Append character to openingBrackets array if it's an opening bracket.
    else if (isAnOpeningBracket(char)) {
      openingBrackets.push(char);
      openBracketCount += 1;
    }
    // If it's a closing bracket, check if it matches the last opening bracket added to openingBrackets.
    //   If it matches, continue, else set earlyTermination to true and break;
    //   NB: array.pop() returns undefined if the array is empty, so don't need to check for emptiness.
    else if (isAClosingBracket(char)) {
      if (BRACKETMATCHES[char] !== openingBrackets.pop()) earlyTermination = true;
    }
    // Throw error if non-bracket character encountered.
    else {
      console.log(`ERROR - encountered non-bracket character: '${char}'`);
      earlyTermination = true;
    }

    if (earlyTermination) break;
  }

  // String is balanced if openingBrackets is empty and the loop was not terminated early.
  if (openingBrackets.length === 0 && !earlyTermination) {
    console.log("This string's brackets are balanced.");
    return true;
  }
  console.log("This string's brackets are not balanced.");
  return false;
}

// Allows string to be provided as command line argument.
//   `node balanced_brackets.js <string>`
const runAnalyzerIfCommandLineArgumentProvided = function() {
  if (process.argv.length > 2) {
    analyzeString(process.argv[2]);
  }
}

runAnalyzerIfCommandLineArgumentProvided();

// Export function to be used by tests.
module.exports = analyzeString;
