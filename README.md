# Test scenarios 
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

