import { Component } from '@angular/core';
import { LoanCalculator } from '../loanCalculator';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoanCalculatorService } from '../config/loanCalculator.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  providers: [LoanCalculatorService],
  styleUrls: ['./loan-calculator.component.scss'],
})
export class LoanCalculatorComponent {
  loanData: LoanCalculator[] = [];

  isValidFormSubmitted = false;

  loanCalculatorForm = this.fb.group({
    monthlyIncome: [
      null,
      [
        Validators.required,
        Validators.min(500000),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    requestedAmount: [
      null,
      [
        Validators.required,
        Validators.min(20000000),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    loanTerm: [
      null,
      [
        Validators.required,
        Validators.min(36),
        Validators.max(360),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    selectedChildren: ['', Validators.required],
    coApplicant: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private loanCalculatorService: LoanCalculatorService
  ) { }
  
  _keyPress(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.loanCalculatorForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.loanCalculatorService
      .submitLoan(this.loanCalculatorForm.value)
      .subscribe();
  }

  get monthlyIncome() {
    return this.loanCalculatorForm.get('monthlyIncome') as FormControl;
  }
  get requestedAmount() {
    return this.loanCalculatorForm.get('requestedAmount') as FormControl;
  }
  get loanTerm() {
    return this.loanCalculatorForm.get('loanTerm') as FormControl;
  }
  get selectedChildren() {
    return this.loanCalculatorForm.get('selectedChildren') as FormControl;
  }
  get coApplicant() {
    return this.loanCalculatorForm.get('coApplicant') as FormControl;
  }
}
