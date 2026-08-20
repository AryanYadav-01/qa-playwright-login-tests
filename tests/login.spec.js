const { test, expect } = require('@playwright/test');

const URL = 'https://the-internet.herokuapp.com/login';

test('TC01 - empty username and password', async ({ page }) => {
  await page.goto(URL);
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});

test('TC02 - correct username, wrong password', async ({ page }) => {
  await page.goto(URL);
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'wrongpassword');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});

test('TC03 - wrong username, correct password', async ({ page }) => {
  await page.goto(URL);
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});

test('TC04 - empty username, correct password', async ({ page }) => {
  await page.goto(URL);
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});

test('TC05 - correct username, empty password', async ({ page }) => {
  await page.goto(URL);
  await page.fill('#username', 'tomsmith');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});

test('TC06 - valid login succeeds', async ({ page }) => {
  await page.goto(URL);
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});