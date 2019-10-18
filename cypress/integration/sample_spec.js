describe('My first test', () => {
  it('Does not do much!', () => expect(true)
    .to
    .equal(true));
});

describe('My second test', () => {
  it('opens the web-page', () => {
    cy.visit('/');
  });
});
