// test_stream.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('front end stream test', () => {
	it('test with stream video', () => {
		cy.visit('http://localhost:3000/fyp-frontend-elementui/#/')
		cy.contains('GET STARTED').click()

		cy.url().should('include', '/queue-analysis')
		cy.contains('Paste a live video url').click()

		cy.url().should('include', '/queue-analysis-live')
		cy.get('.el-input__inner').type('http://ec2-34-239-105-141.compute-1.amazonaws.com:8088/hls/stream.m3u8')

		cy.contains('Set parameters').click()
		cy.wait(1000)
		cy.contains('Specify queue area').click()
		cy.pause()
		cy.contains('Close Path').click()

		cy.contains('Specify finish area').click()
		cy.pause()
		cy.contains('Close Path').click()
		cy.contains('Confirm').click()
		cy.get('.el-overlay-dialog').click('right', { multiple: true, force:true})
		cy.contains('Process').click()
	})
})
