/// <reference types="cypress" />
import HomePage from '../page-objects/home-page';

describe('Amazon.com.br Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com.br/');

    // Increase the default timeout for all commands inside the beforeEach block
    cy.then(() => {
      Cypress.config('defaultCommandTimeout', 8000);
    });
  });

  it('1. Search for "computador"', () => {
    const searchTerm = 'computador';

    cy.log('Input "computador" in the search bar');
    HomePage.searchForProduct(searchTerm);

    cy.log('Assertion: Verify search result banner');
    HomePage.assertSearchResult(searchTerm);
  });

  it('2. Change Location - Valid CEP', () => {
    const validCep = '88111110';

    cy.log('Click on the location button');
    HomePage.openLocationModal();

    // Wait for the location modal to load 
    cy.get('#GLUXZipUpdateInput_0', { timeout: 20000 }).should('be.visible'); 

    cy.log('Enter valid CEP');
    HomePage.fillCep(validCep);

    cy.log('Assertion: Verify location change');
    HomePage.assertLocation(validCep);
  });

  it('3. Change Location - Invalid CEP', () => {
    const invalidCep = '00000000';

    cy.log('Click on the location button');
    HomePage.openLocationModal();

    // Wait for the location modal to load
    cy.get('#GLUXZipUpdateInput_0', { timeout: 20000 }).should('be.visible');

    cy.log('Enter invalid CEP');
    HomePage.fillCep(invalidCep);

    cy.log('Assertion: Verify error message'); 
    HomePage.assertInvalidCep();
  });

  it('4. Navigate to the Best Sellers Page', () => {
    // Handle application errors 
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent Cypress from failing the test
      return false; 
    });

    cy.log('Click on the "Best Sellers" button');
    HomePage.goToBestSellers();

    cy.log('Assertion: Verify the "Best Sellers" page banner');
    HomePage.assertIsOnBestSellersPage();
  });
});