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

