import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const jwtFormat = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/ //jwt = JSON Web Token

test.describe('Tallinn delivery API tests', () => {
  test('login with correct data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()

    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })

    const responseBody = await response.text()
    console.log('Response body: ' + responseBody)

    expect(response.status()).toBe(StatusCodes.OK) // code 200
    expect(responseBody).toMatch(jwtFormat) //check format of received jwt
  })

  test('login with incorrect data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()

    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })

    const responseBody = await response.text()

    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED) // code 401
    expect(responseBody).toBe('') //jwt is not received
  })

  test('login with any incorrect HTTP method (HTTP method cannot be accepted)', async ({
    request,
  }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()

    const response = await request.put(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })

    const responseBody = await response.json()

    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED) // code 405
    expect.soft(responseBody).toHaveProperty('error', 'Method Not Allowed')
    expect.soft(responseBody).toHaveProperty('status', 405)
  })
})
