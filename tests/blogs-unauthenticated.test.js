const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When not logged in', async () => {
  test('user cannot create blog posts', async () => {
    const result = await page.evaluate(() => {
      return fetch('/api/blogs', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test title',
          content: 'Test content',
        }),
      }).then((res) => res.json());
    });

    expect(result).toEqual({ error: 'You must log in!' });
  });

  test('user cannot get a list of posts', async () => {
    const result = await page.evaluate(() => {
      return fetch('/api/blogs', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    });

    expect(result).toEqual({ error: 'You must log in!' });
  });
});