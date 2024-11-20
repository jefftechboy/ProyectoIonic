describe('Test Alumno asistencia', () => {
    beforeEach(() => {
      cy.visit('/login'); 
    });
  
    it('Login y verificar acceso al menú lateral con datos de Firestore', () => {
    
      cy.contains('usuario');
      cy.get('input[name="inputusuario"]').should('be.visible');
      cy.get('input[name="inputusuario"]').type('ro.huaitro@duocuc.cl');
      cy.get('input[name="inputcontraseña"]').type('tito12');
      cy.contains('OK').click();
  
      cy.url().should('include', '/home');
      cy.get('ion-menu-button').click(); 
      cy.wait(1000); // esperar 1 seg para cargar el menu
    
      cy.get('ion-item[name="botonlistado"]').click();
      cy.get('ion-card[name="botonseccion"]').click({ multiple: true });
       
  
     
       
      
    });
  });
  
