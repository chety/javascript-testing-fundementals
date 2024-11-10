import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test('it should load the page', async ({ page }) => {
  await expect(page).toHaveTitle('Task List');
});

test('it should add a task', async ({ page }) => {
  const input = page.getByLabel('Create Task');
  const submit = page.getByRole('button', { name: 'Create Task' });

  await input.fill('doctor appointment');
  await submit.click();

  const heading = page.getByRole('heading', { name: /doctor appointment/i });

  await expect(heading).toBeVisible();
});
