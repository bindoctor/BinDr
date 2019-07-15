/// <reference types="Cypress" />

describe('Homepage', () => {
  beforeEach(function () {
    // "this" points at the test context object
    cy.fixture('binList').as('binsJSON')
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: /bins/*',
      response: '@binsJSON'        // and force the response to be: []
    }).as('bins')
  })
});