## Bracket Matching
### Directions for Running
Run `node balanced_brackets_tests.js` to see the results of various test cases.
Run `node balanced_brackets.js <string-goes-here>` to test an individual string.

### Description
The `analyzeString` function in `balanced_brackets.js` takes one argument as input.

It validates that the input is of type `string`, and then does a quick check on the length of the string, checking whether the string is `empty` or of `odd-length`.

```javascript
// Ensure the given input is of the string type.
validateString(string);

// Check for 0 length string or odd-length string.
if (checkForZeroLength(string)) return true;
if (checkForOddLength(string)) return false;
```

* If the string is `empty`, it returns `true` and prints that the string is balanced.  
* If the string is of `odd-length`, it returns `false` and prints that the string is not balanced.


Provided that the string is `not empty` or of `odd-length`, it creates an `openingBrackets` array to hold all `{[(` characters that are encountered, an `earlyTermination` boolean variable initialized to `false`, and an `openBracketCount` counter initialized to `0`.  It then loops over the string input.

```javascript
const openingBrackets = [];
var earlyTermination = false;
var openBracketCount = 0;

for (var i=0; i < string.length; i++) {
  char = string[i];

  if (openBracketCount > string.length/2) {
    console.log("Open bracket count has exceeded half the length of the string.");
    earlyTermination = true;
  }
  else if (isAnOpeningBracket(char)) {
    openingBrackets.push(char);
    openBracketCount += 1;
  }
  else if (isAClosingBracket(char)) {
    if (BRACKETMATCHES[char] !== openingBrackets.pop()) earlyTermination = true;
  }
  else {
    console.log(`ERROR - encountered non-bracket character: '${char}'`);
    earlyTermination = true;
  }

  if (earlyTermination) break;
}
```

For each character it loops over:

* If the `openBracketCount` has exceeded half the length of the string, `earlyTermination` is set to `true` and it breaks out of the loop.
* If the character is an `opening-bracket`, the bracket is pushed onto the `openingBrackets` array, and `openBracketCount` is incremented by one.
* If the character is a `closing-bracket`, the last bracket in the `openingBrackets` array is popped off and compared to see if it compliments the current `closing-bracket` character.
  * If the characters do match, it continues to the next character.
  * If it doesn't match, `earlyTermination` is set to `true` and it breaks out of the loop.
* If the character is a `non-bracket` character, the `earlyTermination` boolean is set to `true` and it breaks out of the loop.

Upon exiting the loop, it determines whether the string input was balanced or unbalanced based on the `openingBrackets` and `earlyTermination` variables.

```javascript
if (openingBrackets.length === 0 && !earlyTermination) {
  console.log("This string's brackets are balanced.");
  return true;
}
console.log("This string's brackets are not balanced.");
return false;
```

* If `openingBrackets` is empty and `earlyTermination` is false, the string is determined to be balanced.  
  * The `earlyTermination` boolean is needed for cases like `[])(`, in which the loop will break out on the `3rd` character, but the `openingBrackets` array will be empty since the first two characters are matching brackets.
* Else, the string is deemed unbalanced.

### Space and Time Complexity
The `analyzeString` function is of `O(n)` time complexity and `O(n)` space complexity, where `n` is the length of the input string.
