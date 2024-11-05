import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const Url = 'https://backend.tallinn-learning.ee/test-orders'
const apiKey = '1234567890123456'
const orderId = 5 //order id can be 1..10

test.describe('Tests for PUT request', () => {
  test('positive PUT test - Order updated successfully', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: apiKey,
    }

    // prepare request body
    const requestBody = {
      status: 'OPEN', // can be: OPEN, ACCEPTED, INPROGRESS, DELIVERED
      courierId: 0, //int64
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0, //int64
    }

    // Send a PUT request to the server
    const response = await request.put(`${Url}/${orderId}`, {
      headers: requestHeaders,
      data: requestBody,
    })

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.OK) // Status code: 200
  })

  test('test for PUT: Bad Request when Id is a negative number ', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: apiKey,
    }

    // prepare request body
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }

    // Send a PUT request to the server
    const response = await request.put(`${Url}/-1`, {
      headers: requestHeaders,
      data: requestBody,
    })

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for PUT: Bad Request when Id has an over number ', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: apiKey,
    }

    // prepare request body
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }

    // Send a PUT request to the server
    const response = await request.put(`${Url}/123`, {
      headers: requestHeaders,
      data: requestBody,
    })

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for PUT: Bad Request when Id has an alphanumeric value ', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: apiKey,
    }

    // prepare request body
    const requestBody = {
      status: 'OPEN', // can be: OPEN, ACCEPTED, INPROGRESS, DELIVERED
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }

    // Send a PUT request to the server
    const response = await request.put(`${Url}/abc123`, {
      headers: requestHeaders,
      data: requestBody,
    })

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for PUT: Unauthorized when api_key has incorrect value ', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: String(orderId), //value from orderId
    }

    // prepare request body
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }

    // Send a PUT request to the server
    const response = await request.put(`${Url}/${orderId}`, {
      headers: requestHeaders,
      data: requestBody,
    })

    // Log the response status
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED) // Status code: 401
  })
})

test.describe('Tests for DELETE request', () => {
  test('positive DELETE test - Order deleted successfully', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: apiKey,
    }

    // Send a DELETE request to the server
    const response = await request.delete(`${Url}/${orderId}`, {
      headers: requestHeaders,
    })

    // Log the response status
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.NO_CONTENT) // Status code: 204
  })

  test('test for DELETE: Bad Request when Id is a negative number', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: String(orderId), //value from orderId
    }

    // Send a DELETE request to the server
    const response = await request.delete(`${Url}/-1`, {
      headers: requestHeaders,
    })

    // Log the response status
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for DELETE: Bad Request when Id has an over number', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: String(orderId),
    }

    // Send a DELETE request to the server
    const response = await request.delete(`${Url}/123`, {
      headers: requestHeaders,
    })

    // Log the response status
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for DELETE: Bad Request when Id has an alphanumeric value', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: String(orderId),
    }

    // Send a DELETE request to the server
    const response = await request.delete(`${Url}/abc123`, {
      headers: requestHeaders,
    })

    // Log the response status
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for DELETE: Unauthorized when api_key has incorrect value', async ({ request }) => {
    // prepare request headers
    const requestHeaders: { api_key: string } = {
      api_key: String(orderId),
    }

    // Send a DELETE request to the server
    const response = await request.delete(`${Url}/${orderId}`, {
      headers: requestHeaders,
    })

    // Log the response status
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED) // Status code: 401
  })
})

test.describe('Tests for GET request', () => {
  test('positive GET test - Order updated successfully', async ({ request }) => {
    // Send a PUT request to the server
    const response = await request.get(`${Url}/${orderId}`)

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.OK) // Status code: 200
  })

  test('test for GET: Bad Request when Id is a negative number', async ({ request }) => {
    // Send a PUT request to the server
    const response = await request.get(`${Url}/-1`)

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for GET: Bad Request when Id has an over number', async ({ request }) => {
    // Send a PUT request to the server
    const response = await request.get(`${Url}/123`)

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })

  test('test for GET: Bad Request when Id has an alphanumeric value', async ({ request }) => {
    // Send a PUT request to the server
    const response = await request.get(`${Url}/abc123`)

    // Log the response status and body with headers
    console.log('response status:', response.status())
    console.log('response headers:', await response.json())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // Status code: 400
  })
})

/* TODO (Advanced level)
- разработать хотя бы один похожий тест с Jest + Axios (без Playwright)
- настроить pre-commit hook для форматирования кода (используя prettier)
*/
