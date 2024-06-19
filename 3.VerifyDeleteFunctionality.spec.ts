import { test, expect } from '@playwright/test';


test('Verify delete function of todos list', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');

  //Verify initial Page
  await expect(page.getByRole('heading')).toContainText('todos');
  await expect(page.getByTestId('text-input')).toBeVisible();
  await page.getByTestId('text-input').click();
  await expect(page.getByRole('contentinfo')).toContainText('Double-click to edit a todo');
  await expect(page.getByRole('contentinfo')).toContainText('Double-click to edit a todoCreated by the TodoMVC TeamPart of TodoMVC');
  await expect(page.getByRole('contentinfo')).toContainText('Part of TodoMVC');

  //Add 1st todo
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('addtodo1');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByTestId('todo-item-label')).toHaveText('addtodo1');

  //Add 2nd todo 
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('addtodo2');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByTestId('todo-list')).toHaveText('addtodo1addtodo2');

  //Add 3rd todo 
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('addtodo3');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByTestId('todo-list')).toHaveText('addtodo1addtodo2addtodo3');

  //Verify list count 
  await expect(page.getByTestId('todo-item')).toHaveCount(3);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('3 items left!');

  const labels = await page.locator('label[data-testid="todo-item-label"]');
  const firstLabel = await labels.first();
  await firstLabel.hover();
  await page.waitForSelector('button.destroy[data-testid="todo-item-button"]', { state: 'visible' });
  const xButton = await page.locator('button.destroy[data-testid="todo-item-button"]');
  await xButton.first().click();

  //Verify list count after edit 
  await expect(page.getByTestId('todo-item')).toHaveCount(2);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('2 items left!');
 
  
  const secondLabel = await labels.first();
  await secondLabel.hover();
  await page.waitForSelector('button.destroy[data-testid="todo-item-button"]', { state: 'visible' });
  await xButton.first().click();

  //Verify list count after edit 
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('1 item left!');

});

