describe('Test Login y Navegación del Profesor', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });

    it('Debería logearse como profesor y visualizar las asistencias de los alumnos', () => {
        
        cy.get('input[name="inputusuario"]').should('be.visible').type('freddy@duocuc.cl');
        cy.get('input[name="inputcontraseña"]').type('admin');
        cy.contains('OK').click();
        cy.url().should('include', '/home');
        // Acceder al menú lateral
        cy.get('ion-menu-button').click(); 
        cy.get('#BotonHome').click(); 
        cy.url().should('include', '/listadoCursoDocente');

        cy.contains('ion-card-header', 'App Movil - 007D').click();
        cy.url().should('include', '/listCurDocDetalle');

        
    });
});
