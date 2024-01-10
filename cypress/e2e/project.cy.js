const TRYBE_TRAVEL_TITLE = 'h1#title';
const TRYBE_TRAVEL_FORM = 'form#main-form';
const TRYBE_TRAVEL_NAME = 'input#fullName';
const TRYBE_TRAVEL_EMAIL = 'input#email';
const TRYBE_TRAVEL_QUESTION = 'textarea#question';
const TRYBE_TRAVEL_SUBMIT_BUTTON = 'button#submit-btn';
const TRYBE_TRAVEL_CLEAR_BUTTON = 'button#clear-btn';
const TRYBE_TRAVEL_CHECKBOX = 'input#agreement';
const TRYBE_INPUT_DATE = 'input#date';
const TRYBE_INPUT_CHECKBOX = 'input#promo';
const TRYBE_TEXTAREA_TEXT = 'Digite sua resposta vencedora aqui';
const TRYBE_TRAVEL_NUMBER = Math.floor(Math.random() * 500);
const TRYBE_TRAVEL_NEWINPUT = 'p#test' + TRYBE_TRAVEL_NUMBER;

before(() => {
  cy.configureLayoutInspector({
    excludePadding: true,
    threshold: 5,
  });
});

describe('travel-form', () => {
  beforeEach(() => {
    cy.visit('./form.html');
  });

  describe('1 - Adicione o título ao formulário', () => {
    it('O título deve possuir a tag `h1` e o id `title`', () => {
      cy.get(TRYBE_TRAVEL_TITLE).should('exist');
    });
    it('Verifica se o texto do título é "Formulário Trybe Travel"', () => {
      cy.get(TRYBE_TRAVEL_TITLE).should('have.text', 'Formulário Trybe Travel');
    });
    it('O formulário deve possuir o id `main-form`', () => {
      cy.get(TRYBE_TRAVEL_FORM).should('exist');
    });
  });

  describe('2 - Adicione os campos do formulário', () => {
    it('Existe um elemento com o id `fullName`', () => {
      cy.get(TRYBE_TRAVEL_NAME).should('exist');
    });
    it('Existe um elemento com o id `email`', () => {
      cy.get(TRYBE_TRAVEL_EMAIL).should('exist');
    });
    it('Existem quatro elementos com o name `destinations`', () => {
      cy.get(TRYBE_TRAVEL_FORM).find('[name="destinations"]').its('length').should('be.gte', 4);
    });
    it('Existe um elemento com o id `question`', () => {
      cy.get(TRYBE_TRAVEL_QUESTION).should('exist');
    });
    it('Existe um elemento com o id `date`', () => {
      cy.get(TRYBE_INPUT_DATE).should('exist');
    });
    it('Existe um elemento com o id `promo`', () => {
      cy.get(TRYBE_INPUT_CHECKBOX).should('exist');
    });
    it('Existe um elemento com o id `agreement`', () => {
      cy.get(TRYBE_TRAVEL_CHECKBOX).should('exist');
    });
  });

  describe('3 - Adicione botões ao formulário', () => {
    it('Existem dois elementos com a tag `button`', () => {
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).should('exist');
      cy.get(TRYBE_TRAVEL_CLEAR_BUTTON).should('exist');
    });
    it('Verifica se o texto do botão é "Enviar"', () => {
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).should('have.text', 'Enviar');
    });
    it('Existe um elemento com o id `submit-btn`', () => {
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).should('exist');
    });
      it('Verifica se o texto do botão é "Limpar"', () => {
      cy.get(TRYBE_TRAVEL_CLEAR_BUTTON).should('have.text', 'Limpar');
    });
    it('Existe um elemento com o id `clear-btn`', () => {
      cy.get(TRYBE_TRAVEL_CLEAR_BUTTON).should('exist');
    });
  });

  describe('4 - Manipule as informações via javascript', () => {
    it('Ao clicar no botão enviar, as informações contidas nos inputs devem permanecer', () => {
      cy.window().then((win) => {
        win.document.erro = 'Erro: A página não pode se atualizar ao clicar no botão Enviar.';
      })
      cy.get(TRYBE_TRAVEL_NAME).type('Teste');
      cy.get(TRYBE_TRAVEL_EMAIL).type('teste@gmail.com');
      cy.get(TRYBE_TRAVEL_QUESTION).type('teste');
      cy.get(TRYBE_INPUT_DATE).type('2023-01-30');
      cy.get(TRYBE_INPUT_CHECKBOX).check();
      cy.get(TRYBE_TRAVEL_CHECKBOX).check();
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).click();
      cy.window().then((win) => {
        expect('Erro: A página não pode se atualizar ao clicar no botão Enviar.').to.equal(win.document.erro);
      })
    })

    it('Ao clicar no botão limpar, os campos devem ficar vazios', () => {
      cy.get(TRYBE_TRAVEL_NAME).type('clear Teste');
      cy.get(TRYBE_TRAVEL_EMAIL).type('teste@gmail.com');
      cy.get(TRYBE_TRAVEL_QUESTION).type('teste');
      cy.get(TRYBE_INPUT_DATE).type('2023-01-30');
      cy.get(TRYBE_INPUT_CHECKBOX).check();
      cy.get(TRYBE_TRAVEL_CHECKBOX).check()
      cy.get(TRYBE_TRAVEL_CLEAR_BUTTON).click();
      cy.get(TRYBE_TRAVEL_NAME).should('have.value', '')
    })
  });

  describe('5 - Faça validação de imagem', () => {
    it('Existe um elemento do tipo checkbox com o id `agreement`', () => {
      cy.get('input#agreement[type="checkbox"]')
        .should('exist');
    });
    it('O botão `Enviar` deve estar inicialmente desabilitado', () => {
      cy.get('button#submit-btn')
        .should('be.disabled');
    });
    it('O botão `Enviar` deve se tornar habilitado ao marcar o checkbox com id igual a agreement.', () => {
      cy.get('input#agreement')
        .check();
      cy.get('button#submit-btn')
        .should('not.be.disabled');
    });
  });

  describe('6 - Faça a validação dos campos do formulário.', () => {
    it('O input `Nome completo` recebe no mínimo 10 e o máximo de 40 caracteres', () => {
      cy.get(TRYBE_TRAVEL_NAME).type('text'.repeat(11));
      cy.get(TRYBE_TRAVEL_NAME).invoke('val').should((value) => {
        expect(value.length).to.be.at.least(10);
        expect(value.length).to.be.lessThan(41);
      });
    });
    it('O input `E-mail` recebe no mínimo 10 e o máximo de 50 caracteres', () => {
      cy.get(TRYBE_TRAVEL_EMAIL).type('text'.repeat(13));
      cy.get(TRYBE_TRAVEL_EMAIL).invoke('val').should((value) => {
        expect(value.length).to.be.at.least(10);
        expect(value.length).to.be.lessThan(51);
      });
    });
    it('O `textarea` recebe no mínimo 1 o máximo de 500 caracteres.', () => {
      cy.get(TRYBE_TRAVEL_QUESTION).type('text'.repeat(200));
      cy.get(TRYBE_TRAVEL_QUESTION).invoke('val').should((value) => {
        expect(value.length).to.be.greaterThan(0);
        expect(value.length).to.be.lessThan(501);
      });
    });
  })
});
