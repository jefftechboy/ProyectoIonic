describe('Cambio de Contraseña en RegistrAPP', () => {
    beforeEach(() => {
      cy.visit('/RecuperarContraseña'); 
    });
  
    it('Debería actualizar la contraseña, redirigir al login y acceder al menú del alumno', () => {
      
      cy.get('ion-input[placeholder="Ingresa tu usuario"]').type('ro.huaitro@duocuc.cl');
      cy.get('ion-input[placeholder="Ingresa nueva contraseña"]').type('tito123');
      cy.contains('Actualizar Contraseña').click();
  
      
      cy.contains('Confirmar acción').should('be.visible');
      cy.get('ion-alert input[placeholder="Escribe algo aquí..."]').type('123'); 
      cy.contains('Aceptar').click();
  
      
      cy.contains('ion-toast', 'Contraseña actualizada correctamente', { timeout: 10000 })
        .should('be.visible');
  
      
      cy.url().should('include', '/login'); 
  
      
      cy.get('input[name="inputusuario"]').should('be.visible');
      cy.get('input[name="inputusuario"]').type('ro.huaitro@duocuc.cl');
      cy.get('input[name="inputcontraseña"]').type('tito12');
      cy.contains('OK').click();
      cy.url().should('include', '/home'); 
      cy.contains('Bienvenido').should('be.visible'); 
    });
  });
  