import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly itemNames = this.byTestId('inventory-item-name');
  readonly checkoutButton = this.byTestId('checkout');

  async checkout() {
    await this.checkoutButton.click();
  }
}
