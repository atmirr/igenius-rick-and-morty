import charactersJSON from '../../fixtures/api/characters.json';
import charactersSecondPageJSON from '../../fixtures/api/characters-second-page.json';

const characterEndpointPattern =
  /^https:\/\/rickandmortyapi.com\/api\/character$/;

context('Home page', () => {
  beforeEach(() => {
    cy.intercept('GET', characterEndpointPattern, {
      body: charactersJSON,
    });
    cy.visit('http://localhost:3000');
  });

  it('should display 20 profile placeholders when the application has been initialized', () => {
    cy.findAllByTestId(/^(profile-placeholder-)+([0-9]{1,2})$/).should(
      'have.length',
      20,
    );
  });

  it('should display 20 profile items when the response has been received', () => {
    cy.get('[data-testid="profiles-grid"]')
      .find('[data-testid="profile-item"]')
      .should('have.length', 20);
  });

  it('should load more characters when user scrolls the page down', () => {
    cy.intercept('GET', characterEndpointPattern, {
      body: charactersSecondPageJSON,
      query: { page: 2 },
    });
    cy.get('[data-testid="profiles-grid"]').then(() => {
      cy.scrollTo('bottom', { easing: 'linear', duration: 500 });
      cy.findAllByTestId(/^(profile-placeholder-)+([0-9]{1,2})$/).should(
        'have.length',
        20,
      );
      cy.get('[data-testid="profiles-grid"]')
        .find('[data-testid="profile-card"]')
        .should('have.length', 40);
    });
  });
});
