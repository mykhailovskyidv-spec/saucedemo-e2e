import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly username = this.byTestId('username');
  readonly password = this.byTestId('password');
  readonly loginButton = this.byTestId('login-button');
  readonly error = this.byTestId('error');

  async open() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
