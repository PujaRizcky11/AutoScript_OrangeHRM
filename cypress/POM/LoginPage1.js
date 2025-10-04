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
        cy.get(this.elements.lblDashboard).should('have.text','Dashboard')
    }
   //verify a login error message (e.g. 'Invalid credentials')  
    verifyMessage(invalidCredentials) {
        cy.get(this.elements.msgError).should('have.text', invalidCredentials);
    }
}
export default LoginPage;