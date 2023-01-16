describe('template spec', () => {
  before(() => {
    cy.viewport(1200, 800);
    cy.visit('http://localhost:8000/demo');
  });
  it('should login', () => {
    cy.get('bcg-login')
      .find('input[name="email"]')
      .type('franz.moderator@example.org');
    cy.get('bcg-login').find('input[name="password"]').type('password');

    cy.get('bcg-button-submit').click();
  });
  it('should fail login and show notification', () => {
    cy.visit('http://localhost:8000/demo');

    cy.get('bcg-login')
      .find('input[name="email"]')
      .type('franz.moderator@example.org');
    cy.get('bcg-login').find('input[name="password"]').type('pas123123sword');
    cy.get('bcg-button-submit').click();
    cy.wait(2000);
    cy.get('bcg-notification').find('span').should('be.visible');

    cy.wait(3000);
  });

  it('able to display password', () => {
    cy.visit('http://localhost:8000/demo');

    cy.get('bcg-login')
      .find('input[name="email"]')
      .type('franz.moderator@example.org');
    cy.get('bcg-login').find('input[name="password"]').type('pas123123sword');
    cy.get('lion-icon').click();
    cy.wait(3000);
  });

  it('navigate to password reset', () => {
    cy.visit('http://localhost:8000/demo');

    cy.get('bcg-login')
      .find('input[name="email"]')
      .type('franz.moderator@example.org');
    cy.get('bcg-login').find('a').click();
    cy.wait(3000);
  });
});
