# Test scenarios (Home work 10 - feature/test-orders-functionality)
<h4><i>https://backend.tallinn-learning.ee/swagger-ui/index.html#/Loan%20endpoints/calcRiskScore</i></h4>

### Positive tests
- Check response when set correct data |
  test data:  income > 0, debt >= 0, age > 16, loan periods = 3, 6, 9, 12, 18, 24, 30, 36 months.
- Check response when set data for "Low Risk" level |
  test data: loan periods = 12, 18, 24, 30, 36 months.
- Check response when set data for "Medium Risk" level |
  test data: 6, 9, 12 months.
- Check response when set data for "High Risk" level |
  test data: 3, 6 months.
- Check response when set data with unacceptable age |
  test data: age < 16
- Check response when set unavailable loanPeriod |
  test data: loanPeriod <= 0
### Negative tests
- Check response when set data with negative income |
  test data: income < 0
- Check response when set data with negative debt |
  test data: debt < 0
- Check response when set data with incorrect age |
    test data: age < 16 
- Check response when set data with negative loanAmount |
    test data: loanAmount < 0
- Check response when request sent without body |
    test data: request body = null
=======
<!---
<b>Mocked Order Operations <i> REST APIs for managing test orders</i></b></br>
<i>/test-orders/{id}</i></br>
<table>
          <tr>
            <th>PUT tests</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Сценарий</th>
            <th>Тест данные</th>
            <th>Ожидаемый результат</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Проверка обновления заказа при корректном orderId и api_key</td>
            <td>orderId = { 1..10}<br> api_key = '1234567890123456'</td>
            <td>200 (Status: OK)</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Проверка получения кода ответа 400 при </br> некорректном orderId и api_key</td>
            <td>orderId = менее 1, более 10, отсутствует, символ </br> api_key = неправильный</td>
            <td>400 (Status: Bad request)</td>
          </tr>
          <tr>
            <th>DELETE tests</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
          <tr class="row5">
            <td>1</td>
            <td>Проверка обновления заказа при корректном orderId и api_key</td>
            <td>orderId = { 1..10}<br> api_key = '1234567890123456'</td>
            <td>200 (Status: OK)</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Проверка получения кода ответа 400 при<br> некорректном orderId и api_key</td>
            <td>orderId = менее 1, более 10, отсутствует, символ<br> api_key = неправильный</td>
            <td>400 (Status: Bad request)</td>
          </tr>
          <tr>
            <th>GET tests</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Проверка получения данных заказа при корректном orderId</td>
            <td>orderId = { 1..10}</td>
            <td>200 (Status: OK)</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Проверка получения кода ответа 400 при<br> некорректном orderId</td>
            <td>orderId = менее 1, более 10, отсутствует, символ</td>
            <td>400 (Status: Bad request)</td>
          </tr>
        </tbody>
    </table>
!--->

# Test scenarios (Home work 09)
<b>Mocked Order Operations <i> REST APIs for managing test orders</i></b></br>
<i>/test-orders/{id}</i></br>

|#| Сценарий | Тест данные | Ожидаемый результат |
|---|---|---|---|
|<h4><i>PUT tests</i></h4>||||
|1| Проверка обновления заказа при корректном orderId и api_key | orderId = { 1..10} </br>  api_key = '1234567890123456' | 200 (Status: OK) |
|2| Проверка получения кода ответа 400 при некорректном orderId и api_key | orderId = менее 1, более 10, отсутствует, символ </br> api_key = неправильный | 400 (Status: Bad request) |
|<h4><i>DELETE tests</i></h4>||||
|1| Проверка обновления заказа при корректном orderId и api_key | orderId = { 1..10} </br>  api_key = '1234567890123456' | 200 (Status: OK) |
|2| Проверка получения кода ответа 400 при некорректном orderId и api_key | orderId = менее 1, более 10, отсутствует, символ </br> api_key = неправильный | 400 (Status: Bad request) |
|<h4><i>GET tests</i></h4>||||
|1| Проверка обновления заказа при корректном orderId и api_key | orderId = { 1..10} | 200 (Status: OK) |
|2| Проверка получения кода ответа 400 при некорректном orderId и api_key | orderId = менее 1, более 10, отсутствует, символ | 400 (Status: Bad request) |

