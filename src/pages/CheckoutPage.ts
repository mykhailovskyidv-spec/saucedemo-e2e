import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstName = this.byTestId('firstName');
  readonly lastName = this.byTestId('lastName');
  readonly postalCode = this.byTestId('postalCode');
  readonly continueButton = this.byTestId('continue');
  readonly finishButton = this.byTestId('finish');
  readonly error = this.byTestId('error');
  readonly completeHeader = this.byTestId('complete-header');
  readonly subtotal = this.byTestId('subtotal-label');

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
