describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Username should be focused by default', () => {
    cy.focused().should('have.attr', 'name', 'username')
  })

  it('Fields should be empty by default', () => {
    cy.get('input[name="username"]').should('have.value', '')
    cy.get('input[name="password"]').should('have.value', '')
    cy.get('input[name="confirmPassword"]').should('have.value', '')
  })

  it('Shows error message on invalid user info', () => {
    cy.get('input[name="username"]').type('testusername')
    cy.get('input[name="password"]').type(`123456`)
    cy.get('input[name="confirmPassword"]').type(`123456`)

    cy.get('input[name="username"]').should('have.value', 'testusername')
    cy.get('input[name="password"]').should('have.value', '123456')
    cy.get('input[name="confirmPassword"]').should('have.value', '123456')

    cy.findByRole('button', { name: /sign up/i }).click()
    cy.url().should('include', '/register')
    cy.get('[data-testid="error-message"]').should('be.visible')
  })

  it('Should error message for mismatched passwords', () => {
    cy.get('input[name="username"]').type('new_username');
    cy.get('input[name="password"]').type('new_password');
    cy.get('input[name="confirmPassword"]').type('different_password');

    cy.get('form').submit();
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain', 'Passwords do not match');
  });

  it('Register successfully', () => {
    cy.get('input[name="username"]').type('testusername')
    cy.get('input[name="password"]').type(`123456`)
    cy.get('input[name="confirmPassword"]').type(`123456`)

    cy.get('input[name="username"]').should('have.value', 'testusername')
    cy.get('input[name="password"]').should('have.value', '123456')
    cy.get('input[name="confirmPassword"]').should('have.value', '123456')

    cy.findByRole('button', { name: /sign up/i }).click()
    cy.url().should('not.include', '/register')
    cy.get('[data-testid="error-message"]').should('not.be.visible')
  })
})
