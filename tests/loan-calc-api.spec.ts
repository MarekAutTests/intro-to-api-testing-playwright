import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanCalcDto } from './dto/loan-calc-dto'

const url = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'
const possibleLoanPeriods: number[] = [3, 6, 9, 12, 18, 24, 30, 36]
const lowRiskPeriods: number[] = [12, 18, 24, 30, 36]
const mediumRiskPeriods: number[] = [6, 9, 12]
const highRiskPeriods: number[] = [3, 6]

test.describe('Positive tests', () => {
  test('Check response when set correct data, should receive code 200', async ({ request }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createCorrectLoanCalcData()

    // Log the request body
    console.log('request income:', requestBody.income)
    console.log('request debt:', requestBody.debt)
    console.log('request age:', requestBody.age)
    console.log('request employed:', requestBody.employed)
    console.log('request loadAmount:', requestBody.loanAmount)
    console.log('request loanPeriod:', requestBody.loanPeriod)

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    // Log the response status and body
    console.log('response status:', response.status())
    console.log('response body:', await response.json())

    expect(response.status()).toBe(StatusCodes.OK) // response code - 200

    //Check that all fields are present in response body
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBeDefined()
    expect.soft(responseBody.riskPeriods).toBeDefined()
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()

    //Check types of fields
    expect(typeof responseBody.riskScore).toBe('number')
    expect(typeof responseBody.riskLevel).toBe('string')
    expect(Array.isArray(responseBody.riskPeriods)).toBe(true)
    expect(typeof responseBody.applicationId).toBe('string')
    expect(typeof responseBody.riskDecision).toBe('string')
  })

  test('Check response when set data for "Low Risk" level, should receive code 200', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createLowRiskLoanCalcData()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.OK) // response code - 200

    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeLessThan(10)
    expect.soft(responseBody.riskLevel).toMatch('Low Risk')
    expect.soft(responseBody.riskPeriods).toEqual(lowRiskPeriods)
    expect.soft(responseBody.riskDecision).toEqual('positive')
  })

  test('Check response when set data for "Medium Risk" level, should receive code 200', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createMediumRiskLoanCalcData()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.OK) // response code - 200

    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeLessThan(10)
    expect.soft(responseBody.riskLevel).toMatch('Medium Risk')
    expect.soft(responseBody.riskPeriods).toEqual(mediumRiskPeriods)
    expect.soft(responseBody.riskDecision).toEqual('positive')
  })

  test('Check response when set data for "High Risk" level, should receive code 200', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createHighRiskLoanCalcData()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.OK) // response code - 200

    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeLessThan(10)
    expect.soft(responseBody.riskLevel).toMatch('High Risk')
    expect.soft(responseBody.riskPeriods).toEqual(highRiskPeriods)
    expect.soft(responseBody.riskDecision).toEqual('positive')
  })

  test('Check response when set data with unacceptable age, should receive code 200', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createCalcDataWithUnacceptableAge()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.OK) // response code - 200

    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeGreaterThan(5)
    expect.soft(responseBody.riskLevel).toMatch('Very High Risk')
    expect.soft(responseBody.riskPeriods).toEqual([])
    expect.soft(responseBody.riskDecision).toEqual('negative')
  })

  test('Check response when set unavailable loanPeriod, should receive code 200', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createCalcDataWithUnavailableLoanPeriod()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.OK) // response code - 200

    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeGreaterThan(5)
    expect.soft(responseBody.riskLevel).toMatch('Very High Risk')
    expect.soft(responseBody.riskPeriods).toEqual([])
    expect.soft(responseBody.riskDecision).toEqual('negative')
  })
})

test.describe('Negative tests', () => {
  test('Check response when set data with negative income, should receive code 400', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createCalcDataWithNegativeIncome()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // response code - 400
  })

  test('Check response when set data with negative debt, should receive code 400', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createCalcDataWithNegativeDebt()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // response code - 400
  })

  test('Check response when set data with incorrect age, should receive code 400', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createCalcDataWithIncorrectAge()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // response code - 400
  })

  test('Check response when set data with negative loanAmount, should receive code 400', async ({
    request,
  }) => {
    // prepare request body
    const requestBody = LoanCalcDto.createCalcDataWithNegativeLoanAmount()

    // Send a POST request to the server
    const response = await request.post(url, {
      data: requestBody,
    })

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // response code - 400
  })

  test('Check response when request sent without body, should receive code 400', async ({
    request,
  }) => {
    // Send a POST request without body to the server
    const response = await request.post(url)

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // response code - 400
  })
})
