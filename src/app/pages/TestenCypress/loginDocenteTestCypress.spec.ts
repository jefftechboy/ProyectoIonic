describe('Test Login Docente', () => {
    beforeEach(()=>{
        cy.visit('/login')
    });
    it('Deberia acceder al menu ingresando datos del Docente',()=>{
        cy.contains('usuario')
        cy.get('input[name = "inputusuario"]').should('be.visible')
        cy.get('input[name = "inputusuario"]').type('freddy@duocuc.cl')
        cy.get('input[name = "inputcontraseña"]').type('admin')
        cy.contains('OK').click
        cy.visit('/home')
        cy.url().should('include','/home')
    })

  })