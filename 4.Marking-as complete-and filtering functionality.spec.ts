import { test, expect } from '@playwright/test';

test('Verify completion and filtering function of todo list ', async ({ page }) => {
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

  //Verify list count of items added 
  await expect(page.getByTestId('todo-item')).toHaveCount(3);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('3 items left!');

  //Check first two items of todo list 
  await page.locator('div').filter({ hasText: 'addtodo1' }).getByTestId('todo-item-toggle').check();
  await page.locator('div').filter({ hasText: 'addtodo2' }).getByTestId('todo-item-toggle').check();

  //Filter by Active todos and check items 
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-item-label')).toHaveText('addtodo3');

  //Verify todos remaining count is correct 
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('1 item left!');

  //Filter by Completed todos and check items, verify that is it checked 
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-item-label').nth(0)).toHaveText('addtodo1');
  await expect(page.getByTestId('todo-item-toggle').nth(0)).toHaveAttribute('checked', '');
  await expect(page.getByTestId('todo-item-label').nth(1)).toHaveText('addtodo2');
  await expect(page.getByTestId('todo-item-toggle').nth(1)).toHaveAttribute('checked', '');

  //Verify todos remaining is correct and current view count is 2 
  await expect(page.getByTestId('todo-item')).toHaveCount(2);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('1 item left!');

  //Filter by All todos and check items, verify that is it checked 
  await page.getByRole('link', { name: 'All' }).click();
  await expect(page.getByTestId('todo-item-label').nth(0)).toHaveText('addtodo1');
  await expect(page.getByTestId('todo-item').nth(0)).toHaveClass('completed');
  await expect(page.getByTestId('todo-item-label').nth(1)).toHaveText('addtodo2');
  await expect(page.getByTestId('todo-item').nth(1)).toHaveClass('completed');
  await expect(page.getByTestId('todo-item-label').nth(2)).toHaveText('addtodo3');
  await expect(page.getByTestId('todo-item').nth(2)).toHaveClass('');
  
  //Verify todos remaining is correct and current view count is 2 
  await expect(page.getByTestId('todo-item')).toHaveCount(3);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('1 item left!');

  //Toggle-all check all button and verify that all items checked 
  await page.getByTestId('toggle-all').click();
  await expect(page.getByTestId('todo-item-label').nth(0)).toHaveText('addtodo1');
  await expect(page.getByTestId('todo-item').nth(0)).toHaveClass('completed');
  await expect(page.getByTestId('todo-item-label').nth(1)).toHaveText('addtodo2');
  await expect(page.getByTestId('todo-item').nth(1)).toHaveClass('completed');
  await expect(page.getByTestId('todo-item-label').nth(2)).toHaveText('addtodo3');
  await expect(page.getByTestId('todo-item').nth(2)).toHaveClass('completed');

  //Toggle-all uncheck all button and verify that all items unchecked 
  await page.getByTestId('toggle-all').click();
  await expect(page.getByTestId('todo-item-label').nth(0)).toHaveText('addtodo1');
  await expect(page.getByTestId('todo-item').nth(0)).toHaveClass('');
  await expect(page.getByTestId('todo-item-label').nth(1)).toHaveText('addtodo2');
  await expect(page.getByTestId('todo-item').nth(1)).toHaveClass('');
  await expect(page.getByTestId('todo-item-label').nth(2)).toHaveText('addtodo3');
  await expect(page.getByTestId('todo-item').nth(2)).toHaveClass('');
  await expect(page.getByTestId('todo-item')).toHaveClass(['','','']);

  //Verify after clicking clear completed button 
  //Check first item of todo list 
  await page.locator('div').filter({ hasText: 'addtodo1' }).getByTestId('todo-item-toggle').check();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear completed' }).click();

  //verify count and items on list unchecked for Active filter 
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-item')).toHaveCount(2);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('2 items left!');
  await expect(page.getByTestId('todo-item-label').nth(0)).toHaveText('addtodo2');
  await expect(page.getByTestId('todo-item').nth(0)).toHaveClass('');
  await expect(page.getByTestId('todo-item-label').nth(1)).toHaveText('addtodo3');
  await expect(page.getByTestId('todo-item').nth(1)).toHaveClass('');
  await expect(page.getByTestId('todo-item')).toHaveClass(['','',]);

  //verify count and items on list unchecked for Completed filter 
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('2 items left!');
  await expect(page.getByTestId('todo-item-label').nth(0)).not.toBeVisible();
  await expect(page.getByTestId('todo-item-label').nth(1)).not.toBeVisible();
  await expect(page.getByTestId('todo-item-label').nth(2)).not.toBeVisible();

  //verify count and items on list unchecked for All filter 
  await page.getByRole('link', { name: 'All' }).click();
  await expect(page.getByTestId('todo-item')).toHaveCount(2);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('2 items left!');
  await expect(page.getByTestId('todo-item-label').nth(0)).toHaveText('addtodo2');
  await expect(page.getByTestId('todo-item').nth(0)).toHaveClass('');
  await expect(page.getByTestId('todo-item-label').nth(1)).toHaveText('addtodo3');
  await expect(page.getByTestId('todo-item').nth(1)).toHaveClass('');
  await expect(page.getByTestId('todo-item')).toHaveClass(['','',]);

});