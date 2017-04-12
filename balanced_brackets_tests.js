var analyzeString = require("./balanced_brackets");

// Runs a small set of tests against the analyzeString function.
const runTests = function() {
  const results = [];
  const expectedPasses = ["", "[]", "{}", "()", "({[]})", "[]{}()", "[([]{}){}{[[]]}]"]

  expectedPasses.forEach(function(example) {
    var result = analyzeString(example);
    results.push(`Expected '${example}' to be true, got ${result}`)
  })

  const expectedFails = [" ", "]", "{", "()]", "[ ]", ")()(", "[]][]", "[[[[", "[([]||){}{[[]]}]", "[([])]({}{[[]]}]", "[([]{}){}{[)(]}]"]

  expectedFails.forEach(function(example) {
    var result = analyzeString(example);
    results.push(`Expected '${example}' to be false, got ${result}`)
  })

  console.log("\n\nResults Summary:")
  results.forEach(function(res) {
    console.log(res);
  })
}

runTests();
