import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage extends BasePage {
  readonly items = this.byTestId('inventory-item');
  readonly itemNames = this.byTestId('inventory-item-name');
  readonly itemPrices = this.byTestId('inventory-item-price');
  readonly sortSelect = this.byTestId('product-sort-container');
  readonly cartLink = this.byTestId('shopping-cart-link');
  readonly cartBadge = this.byTestId('shopping-cart-badge');

  item(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  async addToCart(name: string) {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(option: SortOption) {
    await this.sortSelect.selectOption(option);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => Number(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }
}
