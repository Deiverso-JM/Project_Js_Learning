/// <reference types="cypress"/>

describe('Carga la pagina principal', () => { 
    it('Carga la pagina principal', ()=>{
        cy.visit('/index.html');

        cy.get('[data-cy="mascota-input"]')
            .type('Hook'); 

        cy.get('[data-cy="propietario-input"]')
            .type('Johan'); 

            
        cy.get('[data-cy="telefono-input"]')
        .type('87878787'); 
        
        cy.get('[data-cy="fecha-input"]')
            .type('2023-02-15'); 
            
        cy.get('[data-cy="hora-input"]')
            .type('19:10'); 
        
        cy.get('[data-cy="sintomas-input"]')
            .type('El gato solo come y engorda')

        
        cy.get('[data-cy="submit-cita"]').click()
        
        cy.get('[data-cy="citas-heading"]')
            .invoke('text')
            .should('equal', 'Administra tus Citas')

        //Seleccionar la alerta
        cy.get('[data-cy="alerta"]')
            .invoke('text')
            .should('equal', 'Se agregó correctamente')
  
        cy.get('[data-cy="alerta"]')
            .should('have.class', 'alert-success')
    })

})