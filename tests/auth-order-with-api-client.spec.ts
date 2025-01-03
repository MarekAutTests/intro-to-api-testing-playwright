import { test } from '@playwright/test'
import { ApiClient } from './api/api-client'

let orderId: number

test.describe('Tests with api-client', () => {
  test('login and create order with api client', async ({ request }) => {
    //const apiClient = await ApiClient.getInstance(request)
    const apiClient = new ApiClient(request)
    await apiClient.login()
    orderId = await apiClient.createOrderAndReturnOrderId()
    console.log('orderId:', orderId)
  })

  test('login and get order with api client', async ({ request }) => {
    //const apiClient = await ApiClient.getInstance(request)
    const apiClient = new ApiClient(request)
    await apiClient.login()
    orderId = await apiClient.createOrderAndReturnOrderId()
    await apiClient.getOrderById(orderId)
  })

  test('login and delete order with api client', async ({ request }) => {
    //const apiClient = await ApiClient.getInstance(request)
    const apiClient = new ApiClient(request)
    await apiClient.login()
    orderId = await apiClient.createOrderAndReturnOrderId()
    await apiClient.deleteOrderById(orderId)
  })
})
