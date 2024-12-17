import { APIRequestContext } from 'playwright'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { expect } from '@playwright/test'
import { OrderDto } from '../dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

export class ApiClient {
  static instance: ApiClient | null = null
  private request: APIRequestContext
  private jwt: string = ''

  private constructor(request: APIRequestContext) {
    this.request = request
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(request)
      await ApiClient.instance.requestJwt()
    }
    return ApiClient.instance
  }

  private async requestJwt(): Promise<void> {
    console.log('>>jwt: "' + this.jwt + '"')
    console.log('Requesting JWT...')
    const authResponse = await this.request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectData(),
    })

    if (authResponse.status() !== StatusCodes.OK) {
      console.log('Authorization failed')
      throw new Error(`Request failed with status ${authResponse.status()}`)
    }

    this.jwt = await authResponse.text()
    console.log('JWT received:', this.jwt)
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    console.log('Creating new order...')
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    console.log('POST: Order response: ', response)

    expect(response.status()).toBe(StatusCodes.OK) // code 200
    const responseBody = await response.json()
    console.log('Order created: ')
    console.log(responseBody)

    return responseBody.id
  }

  async getOrderById(orderId: number): Promise<void> {
    console.log('>>jwt: "' + this.jwt + '"')
    console.log(`Getting order by ID: ${orderId}...`)
    const response = await this.request.get(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })

    console.log('GET: Order response: ', response)

    expect(response.status()).toBe(StatusCodes.OK) //code 200
    const responseBody = await response.json()
    console.log(responseBody)
    expect(responseBody.id).toBe(orderId)
  }

  async deleteOrderById(orderId: number): Promise<void> {
    console.log('>>jwt: "' + this.jwt + '"')
    console.log(`Deleting order with ID ${orderId}...`)
    const response = await this.request.delete(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })

    console.log('DELETE: Order response: ', response)
    expect(response.status()).toBe(StatusCodes.OK) // code 200
    expect(response.json()).toBeTruthy()
  }
}
