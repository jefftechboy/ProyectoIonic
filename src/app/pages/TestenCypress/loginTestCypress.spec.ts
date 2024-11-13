describe('Mi primer test', () => {
    beforeEach(()=>{
        cy.visit('/login')
    });
    it('visitar pagina',()=>{
        cy.contains('usuario')
        cy.get('input[name = "inputusuario"]').should('be.visible')
        cy.get('input[name = "inputusuario"]').type('ro.huaitro@duocuc.cl')
        cy.get('input[name = "inputcontraseña"]').type('1')
        cy.contains('OK').click
        cy.visit('/home')
        cy.url().should('include','/home')
    })

  })