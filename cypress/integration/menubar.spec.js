describe('Menubar', () => {
  it('Menu item should be active when selected', () => {
    cy.visit('http://localhost:3000/fyp-frontend-elementui/')
    cy.get('ul[role="menubar"]').contains('Analyze Video').click()
    cy.get('ul[role="menubar"]').contains('Analyze Video').should('have.class', 'is-active')
  })
})
