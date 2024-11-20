describe('Test Login y Cerrar Sesión', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });

    it('Debería logearse como profesor y cerrar sesión', () => {
        
        cy.get('input[name="inputusuario"]').should('be.visible').type('freddy@duocuc.cl');
        cy.get('input[name="inputcontraseña"]').type('admin');
        cy.contains('OK').click(); 
        cy.url().should('include', '/home');
        cy.get('ion-menu-button').click(); 
        cy.get('h6').contains('Cerrar Sesion').click();
        cy.get('.alert-button-inner').contains('Cerrar').click();
        cy.url().should('include', '/login');
    });
});
        