export class LoanCalcDto {
  income: number //Income should be greater than 0
  debt: number // debt should not be negative
  age: number //ge should be greater than 16
  employed: boolean
  loanAmount: number //any number
  loanPeriod: number // loan periods: (High Risk: 3, 6 months; Medium Risk: 6, 9, 12 months; Low Risk: 12, 18, 24, 30, 36 months).

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  // add a method to create a new instance with random data
  static createCorrectLoanCalcData(): LoanCalcDto {
    return new LoanCalcDto(
      this.randomNumberInRange(100, 1000), // income
      this.randomNumberInRange(0, 100), // debt
      this.randomNumberInRange(17, 75), //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      this.randomNumberInRange(100, 1000), //loanAmount
      this.possibleLoanPeriods[Math.floor(Math.random() * this.possibleLoanPeriods.length)], //loanPeriod
    )
  }

  // add a method to create a new instance with Low Risk data
  static createLowRiskLoanCalcData(): LoanCalcDto {
    return new LoanCalcDto(
      5000, // income
      0, // debt
      35, //age
      true, //employed
      500, //loanAmount
      12, //loanPeriod
    )
  }

  // add a method to create a new instance with Medium Risk data
  static createMediumRiskLoanCalcData(): LoanCalcDto {
    return new LoanCalcDto(
      1000, // income
      0, // debt
      25, //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      this.randomNumberInRange(500, 1000), //loanAmount
      this.mediumRiskPeriods[Math.floor(Math.random() * this.mediumRiskPeriods.length)], //loanPeriod
    )
  }

  // add a method to create a new instance with High Risk data
  static createHighRiskLoanCalcData(): LoanCalcDto {
    return new LoanCalcDto(
      500, // income
      100, // debt
      16, //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      this.randomNumberInRange(1000, 2000), //loanAmount
      this.highRiskPeriods[Math.floor(Math.random() * this.highRiskPeriods.length)], //loanPeriod
    )
  }

  // add a method to create a new instance with unacceptable age
  static createCalcDataWithUnacceptableAge(): LoanCalcDto {
    return new LoanCalcDto(
      10, // income
      0, // debt
      this.randomNumberInRange(1, 15), //age
      false, //employed
      this.randomNumberInRange(500, 1000), //loanAmount
      this.possibleLoanPeriods[Math.floor(Math.random() * this.possibleLoanPeriods.length)], //loanPeriod
    )
  }

  // add a method to create a new instance with unavailable loanPeriod
  static createCalcDataWithUnavailableLoanPeriod(): LoanCalcDto {
    return new LoanCalcDto(
      this.randomNumberInRange(100, 1000), // income
      this.randomNumberInRange(0, 100), // debt
      this.randomNumberInRange(17, 75), //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      this.randomNumberInRange(100, 1000), //loanAmount
      100, //loanPeriod
    )
  }

  // add a method to create a new instance with negative income
  static createCalcDataWithNegativeIncome(): LoanCalcDto {
    return new LoanCalcDto(
      -1000, // income
      this.randomNumberInRange(0, 100), // debt
      this.randomNumberInRange(17, 75), //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      this.randomNumberInRange(100, 1000), //loanAmount
      this.possibleLoanPeriods[Math.floor(Math.random() * this.possibleLoanPeriods.length)], //loanPeriod
    )
  }

  // add a method to create a new instance with negative debt
  static createCalcDataWithNegativeDebt(): LoanCalcDto {
    return new LoanCalcDto(
      this.randomNumberInRange(100, 1000), // income
      -1000, // debt
      this.randomNumberInRange(17, 75), //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      this.randomNumberInRange(100, 1000), //loanAmount
      this.possibleLoanPeriods[Math.floor(Math.random() * this.possibleLoanPeriods.length)], //loanPeriod
    )
  }

  // add a method to create a new instance with negative loanAmount
  static createCalcDataWithNegativeLoanAmount(): LoanCalcDto {
    return new LoanCalcDto(
      this.randomNumberInRange(100, 1000), // income
      this.randomNumberInRange(0, 100), // debt
      this.randomNumberInRange(17, 75), //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      -1000, //loanAmount
      this.possibleLoanPeriods[Math.floor(Math.random() * this.possibleLoanPeriods.length)], //loanPeriod
    )
  }

  // add a method to create a new instance with incorrect age
  static createCalcDataWithIncorrectAge(): LoanCalcDto {
    return new LoanCalcDto(
      this.randomNumberInRange(100, 1000), // income
      this.randomNumberInRange(0, 100), // debt
      0, //age
      Boolean(this.randomNumberInRange(0, 1)), //employed
      this.randomNumberInRange(100, 1000), //loanAmount
      this.possibleLoanPeriods[Math.floor(Math.random() * this.possibleLoanPeriods.length)], //loanPeriod
    )
  }

  static randomNumberInRange(min: number = 0, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static possibleLoanPeriods: number[] = [3, 6, 9, 12, 18, 24, 30, 36]
  static lowRiskPeriods: number[] = [12, 18, 24, 30, 36]
  static mediumRiskPeriods: number[] = [6, 9, 12]
  static highRiskPeriods: number[] = [3, 6]
}
