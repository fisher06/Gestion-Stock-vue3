/* eslint-disable cypress/unsafe-to-chain-command */
// https://on.cypress.io/api

const uuid = () => Cypress._.random(0, 1e6)

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'efficacement')
    cy.contains('Gestion Stock')
    cy.contains('Mentions Légales')
    cy.contains('a.button', 'Voir le stock').click()
    cy.get('a[title="Ajouter"]').click()

    const id = uuid()
    const testname = `o-${id}`
    cy.get('input').eq(0).type(testname)
    cy.get('input').eq(1).clear().type('23')
    cy.get('input').eq(2).clear().type('12')
    cy.contains('button', 'Ajouter').click()
    cy.contains(testname).click()
    cy.get('button[title="Supprimer"]').click()
  })
})
