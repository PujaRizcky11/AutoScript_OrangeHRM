import LoginPage1 from '../POM/LoginPage1';
import ResetPassword from '../POM/ResetPassword';  


// Scenario Login OrangeHRM
describe ('OrangeHRM Website', () => {

//berhasil membuka halaman login OrangeHRM dengan intercept
    it('berhasil membuka halaman login OrangeHRM dengan ', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      const login = new LoginPage1();
    login.setUsername('Admin');
    login.setPassword('admin123');
    // start intercept before performing the action that triggers the request
    cy.intercept('GET', '**/web/index.php/dashboard/index').as('getDashboard');
    login.clickSubmit();
    // wait for the dashboard request then assert status, then verify UI
    cy.wait('@getDashboard').its('response.statusCode').should('eq', 200);
    login.verifyLogin();
    })

    //TC1 berhasil membuka halaman login OrangeHRM
    it('berhasil membuka halaman login OrangeHRM', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      const login = new LoginPage1();
      login.setUsername('Admin');
      login.setPassword('admin123');
      login.clickSubmit();
      login.verifyLogin();
    })

//TC2 gagal login dengan username salah
    it('gagal login dengan username salah', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      const login = new LoginPage1();
      login.setUsername('Admin11');
      login.setPassword('admin123');
      login.clickSubmit();
      login.verifyMessage('Invalid credentials');
    })

//TC3 gagal login dengan password salah
    it('gagal login dengan password salah', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      const login = new LoginPage1();
      login.setUsername('Admin');
      login.setPassword('admin1234');
      login.clickSubmit();
      login.verifyMessage('Invalid credentials');
    });
    
//TC4 gagal login dengan username dan password kosong
    it('gagal login dengan username dan password kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      const login = new LoginPage1();
      cy.get(login.txtusername).should('have.value', '');
      cy.get(login.txtpassword).should('have.value', '');
      login.clickSubmit()
                // find the validation text for the username input
                cy.get(login.txtusername).closest('.oxd-input-group').find('.oxd-text').should('have.text','Required')
                // find the validation text for the password input 
                cy.get(login.txtpassword).closest('.oxd-input-group').find('.oxd-text').should('have.text','Required')
    })  

//TC5 gagal login dengan username kosong
    it('gagal login dengan username kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      const login = new LoginPage1();
      cy.get(login.txtusername).should('have.value', '');
      login.setPassword('admin123');
        login.clickSubmit()
  // find the validation text for the username input
  cy.get(login.txtusername).closest('.oxd-input-group').find('.oxd-text').should('have.text','Required')
    })

//TC6 gagal login dengan password kosong
    it('gagal login dengan password kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      const login = new LoginPage1();
      login.setUsername('Admin');
      cy.get(login.txtpassword).should('have.value', '');
        login.clickSubmit()
  // find the validation text for the password input
  cy.get(login.txtpassword).closest('.oxd-input-group').find('.oxd-text').should('have.text','Required')
    })

})

describe('Scenario Forgot password', () => {

// TC1 berhasil membuka halaman reset password
    it('berhasil membuka halaman reset password', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            // wait for the link to appear and be visible before clicking to avoid timing flakes
            cy.contains('Forgot your password?', { timeout: 10000 }).should('be.visible').click();
            cy.url({ timeout: 10000 }).should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    })

//TC2 berhasil reset password dengan username terdaftar
    it('berhasil reset password dengan username terdaftar', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.contains('Forgot your password?').click();
      cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
      const resetPassword = new ResetPassword();
      resetPassword.setUsername('Admin');
      resetPassword.clickSubmit();
  resetPassword.verifyMessageSuccess('Reset Password link sent successfully');

    })

//TC3 membatalkan reset password
    it('membatalkan reset password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.contains('Forgot your password?').click();
      cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
      cy.contains('Cancel').click();
      cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    })

//TC4 gagal reset password dengan username kosong
    it('gagal reset password dengan username kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Forgot your password?').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
        const resetPassword = new ResetPassword();
        resetPassword.clickSubmit();
        resetPassword.verifyMessageError('Required');
    })

});

describe('Scenario Dashboard', () => {

// TC1 berhasil login dan melihat dashboard
    it('berhasil login dan melihat dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
    })

// TC2 berhasil melihat menu PIM di dashboard
    it('berhasil melihat menu PIM di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('PIM').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    })  

// TC3 berhasil melihat menu Admin di dashboard
    it('berhasil melihat menu Admin di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('Admin').click();
        cy.url().should('include', '/web/index.php/admin/viewSystemUsers');
    })

// TC4 berhasil melihat menu Leave di dashboard
    it('berhasil melihat menu Leave di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('Leave').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
        // stay on page and scroll slowly to bottom
        cy.window().then((win) => {
            return new Cypress.Promise((resolve) => {
                const totalHeight = win.document.body.scrollHeight;
                const step = 200; // pixels per step
                const delay = 200; // ms between steps
                let pos = 0;
                const id = setInterval(() => {
                    pos = Math.min(pos + step, totalHeight);
                    win.scrollTo(0, pos);
                    if (pos >= totalHeight) {
                        clearInterval(id);
                        // small delay to ensure any lazy-load completes
                        setTimeout(resolve, 500);
                    }
                }, delay);
            });
        });
    })

// TC5 berhasil melihat menu Time di dashboard
    it('berhasil melihat menu Time di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('Time').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet');
    })

// TC6 berhasil melihat menu Recruitment di dashboard
    it('berhasil melihat menu Recruitment di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('Recruitment').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    })  

// TC7 berhasil melihat menu My Info di dashboard
    it('berhasil melihat menu My Info di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('My Info').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/7');
    })      

// TC8 berhasil melihat menu Performance di dashboard
    it('berhasil melihat menu Performance di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('Performance').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/performance/searchEvaluatePerformanceReview');
    })

// TC9 berhasil melihat menu Dashboard di dashboard
    it('berhasil melihat menu Dashboard di dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/'); 
        const login = new LoginPage1();
        login.setUsername('Admin');
        login.setPassword('admin123');
        login.clickSubmit();
        login.verifyLogin();
        cy.contains('Dashboard').click();
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    })
})
