describe('Test Descarga de Informe con Modal', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });

    it('Debería logearse como profesor, navegar a Informes Docente, y generar el informe', () => {
        
        cy.get('input[name="inputusuario"]').should('be.visible').type('freddy@duocuc.cl');
        cy.get('input[name="inputcontraseña"]').type('admin');
        cy.contains('OK').click(); 

        
        cy.url().should('include', '/home');
        
       
        cy.get('ion-menu-button').click(); 

        
        cy.get('ion-item#BotonHome').contains('Informes Docente').click(); 

        
        cy.url().should('include', '/InformesCursoDocente');

        
        cy.get('ion-label')
          .contains('007D - Lunes 08:00-10:00  y  Viernes: 08:30-09:50')
          .click();

        
        cy.get('ion-modal').should('be.visible');

        
        cy.get('button').contains('Descargar Informe').click(); 

        // Interceptar y verificar que se inició la descarga del informe PENDIENTE
        cy.intercept('GET', '**/ruta-al-archivo-descarga.pdf').as('descargaInforme');
        cy.wait('@descargaInforme').its('response.statusCode').should('eq', 200);
    });
});

