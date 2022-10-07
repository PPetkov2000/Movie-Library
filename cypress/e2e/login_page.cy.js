describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Username is focused by default', () => {
    cy.focused().should('have.attr', 'name', 'username')
  })

  it('Fields are empty by default', () => {
    cy.get('input[name="username"]').should('have.value', '')
    cy.get('input[name="password"]').should('have.value', '')
  })

  it('Shows error message on invalid user info', () => {
    cy.get('input[name="username"]').type('invaliduser')
    cy.get('input[name="password"]').type(`123456`)

    cy.get('input[name="username"]').should('have.value', 'invaliduser')
    cy.get('input[name="password"]').should('have.value', '123456')

    cy.findByRole('button', { name: /sign in/i }).click()

    cy.url().should('include', '/login')
    cy.findByText(/invalid username or password/i).should('exist')
  })

  it('Login successfully', () => {
    cy.get('input[name="username"]').type('testusername')
    cy.get('input[name="password"]').type(`123456`)

    cy.get('input[name="username"]').should('have.value', 'testusername')
    cy.get('input[name="password"]').should('have.value', '123456')

    cy.findByRole('button', { name: /sign in/i }).click()

    cy.url().should('not.include', '/login')
  })
})
