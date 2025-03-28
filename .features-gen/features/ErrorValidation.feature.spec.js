// Generated from: features\ErrorValidation.feature
import { test } from "../../fixtures/fixtures.js";

test.describe('Error validation', () => {

  test('Placing order', { tag: ['@ErrorValidation'] }, async ({ Given, page, Then }) => { 
    await Given('User login to the application2 with "rahulshetty" and "learning"', null, { page }); 
    await Then('Verify if error message was displayed.', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\ErrorValidation.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@ErrorValidation"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given User login to the application2 with \"rahulshetty\" and \"learning\"","stepMatchArguments":[{"group":{"start":36,"value":"\"rahulshetty\"","children":[{"start":37,"value":"rahulshetty","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":54,"value":"\"learning\"","children":[{"start":55,"value":"learning","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then Verify if error message was displayed.","stepMatchArguments":[]}]},
]; // bdd-data-end