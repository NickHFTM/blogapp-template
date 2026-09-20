import { test, expect } from '@playwright/test';

test('should display the blog page', async ({ page }) => {
  await page.goto('/');

  const mainToolbar = page.locator('mat-sidenav-content mat-toolbar');

  await expect(mainToolbar).toContainText('Blog');
  await expect(mainToolbar).toContainText('Übersicht');
  await expect(mainToolbar).toContainText('About');
});
