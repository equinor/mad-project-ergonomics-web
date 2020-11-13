describe('The Home Page', () => {
  const sessionCookieName = 'cypress-session-cookie'
  const sessionCookie  = 'test'
  beforeEach(function () {
    // before each test we just set the cookie value
    // making the login instant. Since we want to access
    // the test context "this.sessionCookie" property
    // we need to use "function () { ... }" callback form
    cy.setCookie(sessionCookieName, sessionCookie)
  })

  it('successfully loads', () => {
    cy.pause();
    cy.visit('/') // change URL to match your dev URL
  })
})
