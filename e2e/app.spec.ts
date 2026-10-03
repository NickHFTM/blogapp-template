import { test, expect } from '@playwright/test';

test('should display the blog list and navigation', async ({ page }) => {
  await page.route('**/entries', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          {
            id: 1,
            title: 'Test Blog',
            contentPreview: 'Das ist eine Test-Zusammenfassung.',
            author: 'Test Author',
            likes: 0,
            comments: 0,
            likedByMe: false,
            createdByMe: false,
            headerImageUrl: '',
            createdAt: '2026-10-03',
            updatedAt: '2026-10-03',
          },
        ],
      }),
    });
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Blogs' })).toBeVisible();

  const firstCard = page.locator('app-blog-card').first();

  await expect(firstCard).toBeVisible();
  await expect(firstCard.locator('mat-card-title')).toHaveText('Test Blog');
  await expect(firstCard.locator('mat-card-content')).toContainText(
    'Das ist eine Test-Zusammenfassung.',
  );

  const mainToolbar = page.locator('mat-sidenav-content mat-toolbar');

  await expect(mainToolbar.getByText('Übersicht', { exact: true })).toBeVisible();

  await expect(mainToolbar.getByText('About', { exact: true })).toBeVisible();
});

test('should redirect to login and allow access after login', async ({ page }) => {
  await page.goto('/blog/create');

  await expect(page).toHaveURL(/\/login$/);

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  await page.getByRole('button', { name: 'Einloggen' }).click();

  await expect(page).toHaveURL(/\/blog\/create$/);

  await expect(page.getByRole('heading', { name: 'Blog erstellen' })).toBeVisible();
});
