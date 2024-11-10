import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test('it should show the current value of the counter', async ({ page }) => {
  // const counter = page.getByTestId('counter-count');
  // expect(counter).toHaveText('0');
  await expect(page).toHaveTitle('0 day — Accident Counter');
});

test('it should increase the counter', async ({ page }) => {
  const incrementButton = page.getByRole('button', { name: 'Increment' });
  const counter = page.getByTestId('counter-count');
  await incrementButton.click(incrementButton);
  await expect(page).toHaveTitle('1 day — Accident Counter');
  expect(counter).toHaveText('1');
});
