class LoginPage{
    elements = {
        txtusername: 'input[name="username"]',
        txtpassword: 'input[name="password"]',
        btnsubmit: 'button[type="submit"]',
        lblDashboard: ".oxd-topbar-header-breadcrumb > .oxd-text",
        msgError: '.oxd-alert-content > .oxd-text'
    }

    // expose selector strings for convenient access in tests: cy.get(login.txtusername)
    get txtusername() {
        return this.elements.txtusername;
    }

    get txtpassword() {
        return this.elements.txtpassword;
    }
    setUsername(username)
    {
        cy.get(this.elements.txtusername).type(username);
    }
    setPassword(password)
    {
        cy.get(this.elements.txtpassword).type(password);
    }   
    clickSubmit()
    {
        cy.get(this.elements.btnsubmit).click();
    }
    verifyLogin()
    {
        // wait until breadcrumb is visible then compare normalized text to avoid case/whitespace flakes
        cy.get(this.elements.lblDashboard)
          .should('be.visible')
          .invoke('text')
          .then((t) => {
              expect(t && t.trim().toLowerCase()).to.equal('dashboard');
          });
    }
   //verify a login error message (e.g. 'Invalid credentials')  
    verifyMessage(invalidCredentials) {
        // normalize the text node before comparing to handle whitespace/casing
        cy.get(this.elements.msgError)
          .should('be.visible')
          .invoke('text')
          .then((t) => {
              expect(t && t.trim()).to.equal(invalidCredentials);
          });
    }
}
export default LoginPage;