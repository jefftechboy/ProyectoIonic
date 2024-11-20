describe('Test Alumno asistencia', () => {
    beforeEach(() => {
      cy.visit('/login'); 
    });
  
    it('Login y verificar acceder a las asignaturas del alumno', () => {
    
      cy.contains('usuario');
      cy.get('input[name="inputusuario"]').should('be.visible');
      cy.get('input[name="inputusuario"]').type('ro.huaitro@duocuc.cl');
      cy.get('input[name="inputcontraseña"]').type('tito12');
      cy.contains('OK').click();
  
      
      cy.url().should('include', '/home');
      cy.get('ion-menu-button').click();
      cy.get('#BotonHome').click(); 
      cy.url().should('include', '/listadoCursoAlumno');
      cy.get('ion-card[name="botoncursos"]').first().should('be.visible').wait(1000).click();

  });
});
  