class ResetPassword {
    elements = {
        inputUsername: () => cy.get('input[name="username"]'),
        btnSubmit: () => cy.get('button[type="submit"]'),
        lblMessageSuccess: () => cy.get('.orangehrm-card-container').find('.oxd-text--h6'),
        lblMessageError: () => cy.get('.oxd-form').find('.oxd-input-group > .oxd-text')
    }
    setUsername(username) {
        this.elements.inputUsername().type(username);
    }
    clickSubmit() {
        this.elements.btnSubmit().click();
    }
    verifyMessageSuccess(message) {
        // normalize both actual and expected text to avoid failures due to capitalization or whitespace
        this.elements.lblMessageSuccess().invoke('text').then((actualText) => {
            const actual = actualText.trim().toLowerCase();
            const expected = String(message).trim().toLowerCase();
            expect(actual).to.eq(expected);
        });
    }
    verifyMessage(messageerror) {
        // normalize both actual and expected text to avoid failures due to capitalization or whitespace
        this.elements.lblMessageError().invoke('text').then((actualText) => {
            const actual = actualText.trim().toLowerCase();
            const expected = String(messageerror).trim().toLowerCase();
            expect(actual).to.eq(expected);
        });
    }
    // verify a field-level error message (e.g. 'Required') for the username input
    verifyMessageError(expected) {
        this.elements.inputUsername().closest('.oxd-input-group').find('.oxd-text').invoke('text').then((actualText) => {
            const actual = actualText.trim().toLowerCase();
            const exp = String(expected).trim().toLowerCase();
            expect(actual).to.eq(exp);
        });
    }
}
export default ResetPassword;
