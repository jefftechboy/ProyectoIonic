describe('Test Alumno asistencia', () => {
    beforeEach(() => {
      cy.visit('/login'); 
    });
  
    it('Login y verificar acceso al menú lateral con datos de Firestore', () => {
    
      cy.contains('usuario');
      cy.get('input[name="inputusuario"]').should('be.visible');
      cy.get('input[name="inputusuario"]').type('ro.huaitro@duocuc.cl');
      cy.get('input[name="inputcontraseña"]').type('1');
      cy.contains('OK').click();
  
      
      cy.visit('/home');
      cy.url().should('include', '/home');
  
      
      cy.intercept('GET', '/path/to/firestore/data').as('getMenuData');
  
      // Esperar hasta que la solicitud de Firestore esté completa
      cy.wait('@getMenuData');
      cy.get('ion-menu-button').should('be.visible').click(); 
      cy.wait(1000); // esperar 1 seg para cargar el menu
     
      cy.get('ion-menu').should('have.class', 'menu-enabled');
      cy.get('#MenuCompleto').should('be.visible'); 
  
      
      cy.contains('Lista Cursos Alumnos').should('be.visible'); 
      cy.contains('Lectura Qr Alumnos').should('be.visible'); 
  
     
      cy.contains('Lista Cursos Alumnos').click(); 
      cy.url().should('include', '/listadoCursoAlumno'); 
  
      // Verificar el contenido de la página de cursos
      cy.contains('Asistencia Asignaturas').should('be.visible');
  
      
      cy.get('ion-card.asignatura-card').first().click(); 
  
     
      cy.get('ion-modal').should('be.visible');
      cy.contains('Asistencia').should('be.visible');
  
      
      cy.contains('Cerrar').click();
      cy.get('ion-modal').should('not.exist');
    });
  });
  