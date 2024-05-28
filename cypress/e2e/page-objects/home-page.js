/// <reference types="cypress" />

class HomePage {
    constructor() {
      // Search Bar Elements
      this.searchInput = '#twotabsearchtextbox';
      this.searchButton = '#nav-search-submit-button';
      this.searchResultBanner = '.a-spacing-small > span';
  
      // Location Elements
      this.locationButton = '#nav-global-location-popover-link';
      this.cepInput1 = '#GLUXZipUpdateInput_0';
      this.cepInput2 = '#GLUXZipUpdateInput_1';
      this.confirmCepButton = 'input[type="submit"][aria-labelledby="GLUXZipUpdate-announce"]';
      this.locationConfirmation = '#glow-ingress-line2';
      this.invalidCepMessage = '.a-box-inner.a-alert-container';
  
      // Best Sellers Element
      this.bestSellersLink = 'a[href="/gp/bestsellers/?ref_=nav_cs_bestsellers"]'; 
      this.bestSellersBanner = '#zg_banner_text'; 
    }
  
    // Search Bar Interactions
    searchForProduct(product) {
      cy.get(this.searchInput).type(product);
      cy.get(this.searchButton).click();
    }
  
    // Location Interactions
    openLocationModal() {
      cy.get(this.locationButton).click();
    }
  
    fillCep(cep) {
      cy.get(this.cepInput1).type(cep.substring(0, 5));
      cy.get(this.cepInput2).type(cep.substring(5));
      cy.get(this.confirmCepButton).click();
    }
  
    // Best Sellers Interaction
    goToBestSellers() {
      cy.get(this.bestSellersLink).click();
    }
  
    // Assertions
    assertSearchResult(product) {
      cy.get(this.searchResultBanner).should('contain', `"${product}"`); 
    }
  
    assertLocation(cep) {
      cy.get(this.locationConfirmation).should('contain', cep);
    }
  
    assertInvalidCep() {
      cy.get(this.invalidCepMessage, { timeout: 5000 }) // Increased timeout for robustness
        .should('be.visible')
        .and('satisfy', ($el) => {
          const text = $el.text();
          // Check for both possible error messages
          return text.includes('Insira um CEP válido') || text.includes('Este CEP não está disponível no momento');
        });
    }
  
    assertIsOnBestSellersPage() {
      cy.get(this.bestSellersBanner).should('be.visible'); 
    }
  }
  
  export default new HomePage();