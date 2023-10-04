# Strapa Bank

Este projeto foi criado com o BootStrap: [Create React App](https://github.com/facebook/create-react-app).

## Instalação

No diretório do projeto execute os comandos:

### `npm install`

Aguarde o procedimento de instalação e execute:

### `npm start`

O Navegador deve inicializar a seguinte URL:
[http://localhost:3000](http://localhost:3000)

## Instalando o Cypress

Instale o cypress na pasta do diretório do projeto:

### `npm install cypress --save-dev`

Aguarde o processo de instalação e execute o comando:

### `npx cypress open`


    describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000/')
        
    })
    })


## Removendo validação do EsLint

Execute o comando:

### `npm i eslint-plugin-cypress`

​Encontre o arquivo .eslintrc na pasta raíz do projeto e dentro de extends, logo acima do plugin do prettier, adicione mais um plugin nessa lista.​

 "plugin:cypress/recommended"

Capturando um texto:

- Melhorar o describe do teste
- Melhorar a validação do it;
- alterar a tag do campo h1 para o data-test, com o objetivo de manter a integridade de testes futuros;

# 

    describe('Pagina Inicial', () => {
    it('Deve renderizar o h1 com o texto correto', () => {
        cy.visit('http://localhost:3000/')
        //cy.get('h1').contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
        cy.get('[data-test="titulo-principal"]').contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
    })
    })

## Comando personalizados

https://docs.cypress.io/api/cypress-api/custom-commands#Syntax

Na pasta support, no arquivo de comandos  adicionar a linha:

    Cypress.Commands.add('getByData', (seletor) => {
    return cy.get(`[data-test=${seletor}]`)
    })

Parar a instancia do cypress e rodar novamente!

Alterando o cenário de testes para usar o comando customizado:

    describe('Página inicial', () => {
    it('Deve renderizar o h1 com o texto correto', () => {
        cy.visit('http://localhost:3000/');
    })
        cy.getByData('titulo-principal').contains(
        'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!'
        );
    });


Como boa pratica a url está dentro do cenário de testes e é executada todas as vezes, então é possível adicionar o comando beforeEach dentro do describe


    describe('Pagina Inicial', () => {
    beforeEach(()=>
        cy.visit('http://localhost:3000/')
    )
    it('Deve renderizar o h1 com o texto correto', () => {
        
        //cy.get('h1').contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
        cy.getByData('titulo-principal').contains(
        'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!'
        );
    })
    })

Documentação para o 'contains' https://docs.cypress.io/api/commands/contains

Se o conteúdo do elemento fosse alterado, eu gostaria que o teste falhasse?

Se a resposta for sim, então use o comando contains(). Agora se a resposta for não, então use um data-atribute.

## Comando encadeados

https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Chains-of-Commands


Desafio:

O desafio é o seguinte: Você terá que criar um comando personalizado que recebe dois parâmetros, 
um seletor e um texto e verifica se esse seletor possui o texto informado.

    Cypress.Commands.add('verificaTexto', (seletor, texto) => {
    cy.get(`${seletor}`).contains(`${texto}`)
    })


## Testando Formulários

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

    })

## Formulário de cadastro

    describe('Formulário Cadastro', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    it('Usuário deve conseguir se cadastrar com sucesso', ()=>{

    })
    })

#
    describe('Formulário Cadastro', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    it('Usuário deve conseguir se cadastrar com sucesso', ()=>{
        cy.getByData('botao-cadastro').click()
        cy.getByData('nome-input').type('Bob Esponja')
        cy.getByData('email-input').type('bob@email.com')
        cy.getByData('senha-input').type('456789')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
    })
    })

#
    describe('Formulário Cadastro', ()=>{
        beforeEach(()=>{
        cy.visit('http://localhost:3000')
        })
    
        it('Usuário deve conseguir se cadastrar com sucesso', ()=>{
        cy.getByData('botao-cadastro').click()
        cy.getByData('nome-input').type('Steve Jobs')
        cy.getByData('email-input').type('steve@email.com')
        cy.getByData('senha-input').type('456789')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
        })
    })

## Configurando uma baseUrl

Acesse o arquivo cypress.config.js

    const { defineConfig } = require("cypress");

    module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000'
    },
    });

Em um novo arquivo de testes: paginas.cy.js

    describe('Testando múltiplas páginas', () => {
    it('Deve conseguir acessar a página de cartões', ()=>{
        cy.visit('/')
    })
    })

#

    describe('Testando múltiplas páginas', () => {
        it('Deve conseguir acessar a página de cartões', ()=>{
        cy.visit('/')
        cy.getByData('botao-login').click()
        cy.getByData('email-input').type('andre@strapa.com.br')
        cy.getByData('senha-input').type('123456')
        cy.getByData('botao-enviar').click()

        cy.location('pathname').should('eq','/home')

        cy.getByData('app-home').find('a').eq(1).click()
        cy.getByData('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')

        cy.location('pathname').should('eq','/cartoes')

        })
    })

## Jornada do Usuário

    describe('Jornadas de usuário', () => {
        it('Deve permitir que a pessoa usuária acesse a aplicação, realize uma transação e faça um logout', () => {
        cy.visit('/');
    
        cy.getByData('botao-login').click();
        cy.getByData('email-input').type('andre@strapa.com.br');
        cy.getByData('senha-input').type('123456');
        cy.getByData('botao-enviar').click();
    
        cy.location('pathname').should('eq', '/home');
    
        cy.getByData('select-opcoes').select('Transferência');
        cy.getByData('form-input').type('80');
        cy.getByData('realiza-transacao').click();
    
        cy.getByData('lista-transacoes').find('li').last().contains('- R$ 80');
    
        cy.getByData('botao-sair').click();
        cy.location('pathname').should('eq', '/');
        })
    })

## Desafio

Escreva uma jornada de usuário para o cadastro de um novo usuário


## Rodar os testes no terminal 

    npx cypress run

    npx cypress run "./cypress/e2e/paginas.cy.js"

    npx cypress run -- browser edge