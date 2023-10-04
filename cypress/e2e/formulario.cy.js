describe('Formulario de login', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    it('Não deve permitir um email invalido',()=>{
        cy.getByData('botao-login').click()
        cy.getByData('email-input').type('andres@strapa.com.br')
        cy.getByData('senha-input').type('123456')
        cy.getByData('botao-enviar').click()
//        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
        cy.get('span').should('exist').and('have.text', 'E-mail ou senha incorretos')

    })

    it.only('Não deve permitir um campo em branco', ()=>{
        cy.getByData('botao-login').click()
       // cy.getByData('email-input').type('')
        cy.getByData('senha-input').type('123456')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
      })


})