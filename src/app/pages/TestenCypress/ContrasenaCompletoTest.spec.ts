describe('Cambio de Contraseña en RegistrAPP', () => {
    beforeEach(() => {
      cy.visit('/RecuperarContraseña'); 
      
    });
  
    it('Debería mostrar un error si los campos están vacíos', () => {
      
      cy.contains('Actualizar Contraseña').click();
      cy.contains('ion-toast', 'Usuario Invalido', { timeout: 10000 }) 
        .should('be.visible');
    });
  
    it('Debería mostrar un error si la nueva contraseña está vacía', () => {
    
      cy.get('ion-input[placeholder="Ingresa tu usuario"]').type('ro.huaitro@duocuc.cl');
      cy.contains('Actualizar Contraseña').click();
      cy.contains('ion-toast', 'La nueva contraseña no puede ser vacio', { timeout: 10000 }) 
        .should('be.visible');
    });
  
    it('Debería solicitar el código de seguridad y manejar errores en el código', () => {
    });
  
    it('Debería actualizar la contraseña con el código correcto', () => {
      
      cy.get('ion-input[placeholder="Ingresa tu usuario"]').type('ro.huaitro@duocuc.cl');
      cy.get('ion-input[placeholder="Ingresa nueva contraseña"]').type('tito12');
      cy.contains('Actualizar Contraseña').click();
      cy.contains('Confirmar acción').should('be.visible');
      cy.get('ion-alert input[placeholder="Escribe algo aquí..."]').type('123');
      cy.contains('Aceptar').click();
      cy.contains('ion-toast', 'Contraseña actualizada correctamente')
        .should('be.visible');
    });
  });
  