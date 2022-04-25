describe('queue analysis front end integration test', () => {
//	it('test with static video', () => {
//		cy.visit('https://lxb007981.github.io/fyp-frontend-elementui/#/')
//		cy.contains('GET STARTED').click()
//
//		cy.url().should('include', '/queue-analysis')
//		cy.contains('Upload a video').click()
//
//
//	})
	it('test script', () => {
		cy.visit('https://lxb007981.github.io/fyp-frontend-elementui/#/queue-analysis-static')
		cy.get('.el-upload-dragger').selectFile('./cypress/fixtures/clipped.mp4', { action: 'drag-drop' })
		
		cy.contains('Set parameters').click()
		cy.wait(1000)
		cy.contains('Specify queue area').click()
		cy.pause()
//		cy.get('[id^=drawBorderCanvas]')
//		  .click(246,334)
//		  .click(664,587)
//		  .click(1070,259)
//		  .click(516,12)
		cy.contains('Close Path').click()

		cy.contains('Specify finish area').click()
		cy.pause()
//		cy.get('[id^=drawBorderCanvas]')
//		  .click(679,598)
//		  .click(882,723)
//		  .click(1355,378, { force: true })
//		  .click(1074,281)
		cy.contains('Close Path').click()
		cy.contains('Confirm').click()
		cy.get('.el-overlay-dialog').click('topRight', { multiple: true, force:true })
//		cy.get('.el-dialog__headerbtn').click({ multiple : true })
		cy.contains('Process').click()

		

	})
})
