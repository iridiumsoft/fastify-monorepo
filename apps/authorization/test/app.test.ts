import app from '../src';
import { expect, test } from 'vitest';

test('with HTTP injection', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    
    expect(response.statusCode).toBe(200)
});
