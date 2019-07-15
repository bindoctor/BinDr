/// <reference types="Cypress" />

describe('Homepage', () => {
  beforeEach(function () {
    // "this" points at the test context object
    cy.fixture('binList').as('binsJSON')
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: '/api/bins/*',
      response: '@binsJSON'        // and force the response to be: []
    }).as('bins')
  })

  it('can recieve a non empty reply from the API', function () {
    // this.user exists
    cy.visit('/')
    // cy.wait('@bins').then((xhr) => {
    //   assert.isNotNull(xhr.response.body.data, 'list all bins API call has data')
    // })
  })
});

