/// <reference types="cypress" />

describe('Carga la pagina principal', () => { 
  it('Carga la pagina principal', ()=>{

    //Visitar la pagina del elemento
    cy.visit('/index.html')
    
    //Verificar si el elemento existe
    cy.get('[data-cy="titulo-proyecto"]').should('exist')
    
    //Verificar si el elemento contiene lo siguiente:
    cy.contains('h1', 'Administrador de Pacientes de Veterinaria');

    //Otra forma de get
    cy.get('[data-cy="titulo-proyecto"]')
      .invoke('text')
      .should( 'equal', 'Administrador de Pacientes de Veterinaria') 


    //Verificar el texto de citas
    cy.get('[data-cy=citas-heading]')
      .invoke('text')
      .should('equal', 'No hay Citas, comienza creando una');


    //Verificar si no el texto de citas
    cy.get('[data-cy=citas-heading]')
      .invoke('text')
      .should('not.equal', 'No hay Citas, Johan');
      
  })
})