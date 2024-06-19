import { test, expect } from '@playwright/test';

test('Verify edit function of todos list', async ({ page }) => {
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

  //edit 1st todo
  await page.getByText('addtodo1').dblclick();
  await page.getByTestId('todo-list').getByTestId('text-input').fill('addtodo1edit');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('todo-item-label').nth(0)).toHaveText('addtodo1edit');

  //edit 2nd todo
  await page.getByText('addtodo2').dblclick();
  await page.getByTestId('todo-list').getByTestId('text-input').fill('addtodo2edit ');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('todo-item-label').nth(1)).toHaveText('addtodo2edit');

  //edit 3nd todo
  await page.getByText('addtodo3').dblclick();
  await page.getByTestId('todo-list').getByTestId('text-input').fill('addtodo3edit ');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('todo-item-label').nth(2)).toHaveText('addtodo3edit');

  //Verify list count after edit 
  await expect(page.getByTestId('todo-item')).toHaveCount(3);
  await expect(page.locator(`//span[@class='todo-count']`)).toHaveText('3 items left!');


  });

