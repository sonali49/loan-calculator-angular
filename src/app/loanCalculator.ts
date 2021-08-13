export interface LoanCalculator {
    monthlyIncome: number,
    requestedAmount: number,
    loanTerm: number,
    children: string,
    coApplicant: string
}