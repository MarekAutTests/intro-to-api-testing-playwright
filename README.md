<b>Mocked Order Operations REST APIs for managing test orders</b></br>
<i>/test-orders/{id}</i></br>
<table border="0" cellpadding="0" cellspacing="0" id="sheet0" class="sheet0 gridlines">
        <colgroup><col class="col0">
        <col class="col1">
        <col class="col2">
        <col class="col3">
        </colgroup><tbody>
          <tr class="row0">
            <td class="column0 style0 s">PUT tests</td>
            <td class="column1">&nbsp;</td>
            <td class="column2">&nbsp;</td>
            <td class="column3">&nbsp;</td>
          </tr>
          <tr class="row1">
            <td class="column0 style0 s">#</td>
            <td class="column1 style0 s">Сценарий</td>
            <td class="column2 style0 s">Тест данные</td>
            <td class="column3 style0 s">Ожидаемый результат</td>
          </tr>
          <tr class="row2">
            <td class="column0 style0 n">1</td>
            <td class="column1 style0 s">Проверка обновления заказа при корректном orderId и api_key</td>
            <td class="column2 style1 s">orderId = { 1..10}<br>
api_key = '1234567890123456'</td>
            <td class="column3 style0 s">200 (Status: OK)</td>
          </tr>
          <tr class="row3">
            <td class="column0 style0 n">2</td>
            <td class="column1 style1 s">Проверка получения кода ответа 400 при<br>
некорректном orderId и api_key</td>
            <td class="column2 style1 s">orderId = менее 1, более 10, отсутствует, символ<br>
api_key = неправильный</td>
            <td class="column3 style0 s">400 (Status: Bad request)</td>
          </tr>
          <tr class="row4">
            <td class="column0 style0 s">DELETE tests</td>
            <td class="column1">&nbsp;</td>
            <td class="column2">&nbsp;</td>
            <td class="column3">&nbsp;</td>
          </tr>
          <tr class="row5">
            <td class="column0 style0 n">1</td>
            <td class="column1 style0 s">Проверка обновления заказа при корректном orderId и api_key</td>
            <td class="column2 style1 s">orderId = { 1..10}<br>
api_key = '1234567890123456'</td>
            <td class="column3 style0 s">200 (Status: OK)</td>
          </tr>
          <tr class="row6">
            <td class="column0 style0 n">2</td>
            <td class="column1 style1 s">Проверка получения кода ответа 400 при<br>
некорректном orderId и api_key</td>
            <td class="column2 style1 s">orderId = менее 1, более 10, отсутствует, символ<br>
api_key = неправильный</td>
            <td class="column3 style0 s">400 (Status: Bad request)</td>
          </tr>
          <tr class="row7">
            <td class="column0 style0 s">GET tests</td>
            <td class="column1">&nbsp;</td>
            <td class="column2">&nbsp;</td>
            <td class="column3">&nbsp;</td>
          </tr>
          <tr class="row8">
            <td class="column0 style0 n">1</td>
            <td class="column1 style0 s">Проверка получения данных заказа при корректном orderId</td>
            <td class="column2 style1 s">orderId = { 1..10}</td>
            <td class="column3 style0 s">200 (Status: OK)</td>
          </tr>
          <tr class="row9">
            <td class="column0 style0 n">2</td>
            <td class="column1 style1 s">Проверка получения кода ответа 400 при<br>
некорректном orderId</td>
            <td class="column2 style1 s">orderId = менее 1, более 10, отсутствует, символ</td>
            <td class="column3 style0 s">400 (Status: Bad request)</td>
          </tr>
        </tbody>
    </table>
