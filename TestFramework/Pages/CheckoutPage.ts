import { Page } from '@playwright/test';

export const CheckoutPage = {
  // Inventory Page
  'Sauce Labs Backpack': (page: Page) =>
    page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' }),

  'Add To Cart Backpack Button': (page: Page) =>
    page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),

  'Remove Backpack Button': (page: Page) =>
    page.locator('[data-test="remove-sauce-labs-backpack"]'),

  'Cart Badge': (page: Page) => page.locator('.shopping_cart_badge'),

  'Cart Icon': (page: Page) => page.locator('.shopping_cart_link'),

  // Cart Page
  'Your Cart': (page: Page) => page.getByText('Your Cart'),

  'Sauce Labs Backpack Item In Cart': (page: Page) =>
    page.locator('.cart_item').getByText('Sauce Labs Backpack'),

  'Checkout Button': (page: Page) => page.locator('[data-test="checkout"]'),

  // Checkout Info Page
  'Checkout Your Information': (page: Page) => page.getByText('Checkout: Your Information'),

  'First Name Input': (page: Page) => page.locator('#first-name'),

  'Last Name Input': (page: Page) => page.locator('#last-name'),

  'Zip Code Input': (page: Page) => page.locator('#postal-code'),

  'Continue Button': (page: Page) => page.locator('#continue'),

  // Overview Page
  'Checkout Overview': (page: Page) => page.getByText('Checkout: Overview'),

  'Payment Information': (page: Page) => page.getByText('Payment Information'),

  'Shipping Information': (page: Page) => page.getByText('Shipping Information'),

  'Price Total': (page: Page) => page.locator('.summary_total_label'),

  'Finish Button': (page: Page) => page.locator('#finish'),

  // Final Page
  'Thank You Message': (page: Page) => page.getByText('Thank you for your order!'),

  'Back Home Button': (page: Page) => page.locator('#back-to-products'),

  'Products Page': (page: Page) => page.getByText('Products'),
};
