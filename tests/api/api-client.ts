import { APIRequestContext } from 'playwright'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { expect } from '@playwright/test'
import { OrderDto } from '../dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

export class ApiClient {
  //static instance: ApiClient
  //private request: APIRequestContext
  private jwt: string | null = null

  /*private constructor(request: APIRequestContext) {
    this.request = request
  }*/

  constructor(private request: APIRequestContext) {}

  /*public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
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
  }*/

  async login(): Promise<string> {
    const loginData = LoginDto.createLoginWithCorrectData()
    const response = await this.request.post(`${serviceURL}${loginPath}`, {
      data: loginData,
    })
    const jwt = await response.text()
    this.jwt = jwt
    return jwt
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    if (!this.jwt) throw new Error('Test cannot continue, user is not logged in...')
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
    console.log(responseBody.id)

    if (responseBody.id === '' || responseBody.id != null) {
      return responseBody.id
    } else {
      throw new Error(`New order wasn't create, orderId absent ${responseBody.id}`)
    }
  }

  async getOrderById(orderId: number): Promise<void> {
    if (!this.jwt) throw new Error('Test cannot continue, user is not logged in...')
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
    if (!this.jwt) throw new Error('Test cannot continue, user is not logged in...')
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
