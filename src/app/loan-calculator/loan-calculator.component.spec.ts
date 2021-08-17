import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { LoanCalculatorComponent } from "./loan-calculator.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpErrorHandler } from "../config/http-error-handler.service";
import { MessageService } from "../config/message.service";

describe("LoanCalculatorComponent", () => {
  let component: LoanCalculatorComponent;
  let fixture: ComponentFixture<LoanCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanCalculatorComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [HttpErrorHandler, MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });

  it("Form invalid and submit button disabled if fields are empty", () => {
    component.loanCalculatorForm.controls.monthlyIncome.setValue('');
    component.loanCalculatorForm.controls.requestedAmount.setValue('');
    component.loanCalculatorForm.controls.loanTerm.setValue('');
    component.loanCalculatorForm.controls.selectedChildren.setValue("");
    component.loanCalculatorForm.controls.coApplicant.setValue("");

    expect(component.loanCalculatorForm.valid).toBeFalsy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("button")?.disabled).toBeTruthy();
  });

  it("Error message shown if monthly-income is less than 500000", () => {
    component.loanCalculatorForm.controls.monthlyIncome.setValue("2000");
    expect(component.monthlyIncome.hasError("min")).toBeTruthy();
  });
  it("Error message shown if monthly-income invalid", () => {
    component.loanCalculatorForm.controls.monthlyIncome.setValue("200s000");
    expect(component.monthlyIncome.hasError("pattern")).toBeTruthy();
  });
  it("Error message shown if requested amount invalid", () => {
    component.loanCalculatorForm.controls.requestedAmount.setValue("200s000");
    expect(component.requestedAmount.hasError("pattern")).toBeTruthy();
  });
  it("Error message shown if requested amount is less than 20000000", () => {
    component.loanCalculatorForm.controls.requestedAmount.setValue("2000");
    expect(component.requestedAmount.hasError("min")).toBeTruthy();
  });

  it("Error message shown if loan term is less than 36", () => {
    component.loanCalculatorForm.controls.loanTerm.setValue("12");
    expect(component.loanTerm.hasError("min")).toBeTruthy();
  });
  it("Error message shown if loan term is less", () => {
    component.loanCalculatorForm.controls.loanTerm.setValue("390");
    expect(component.loanTerm.hasError("max")).toBeTruthy();
  });

  it("Error message shown if Selected Children is less", () => {
    component.loanCalculatorForm.controls.selectedChildren.setValue("");
    expect(component.selectedChildren.hasError("required")).toBeTruthy();
  });

  it("Error message shown if Co-applicant is less", () => {
    component.loanCalculatorForm.controls.coApplicant.setValue("");
    expect(component.coApplicant.hasError("required")).toBeTruthy();
  });


  it("Form valid if fields have valid data", () => {
    component.loanCalculatorForm.controls.monthlyIncome.setValue("500000");
    component.loanCalculatorForm.controls.requestedAmount.setValue("20000000");
    component.loanCalculatorForm.controls.loanTerm.setValue("38");
    component.loanCalculatorForm.controls.selectedChildren.setValue("NONE");
    component.loanCalculatorForm.controls.coApplicant.setValue("NONE");

    expect(component.loanCalculatorForm.valid).toBeTruthy();
  });

  it("Form submitted if fields have valid data", () => {
    component.loanCalculatorForm.controls.monthlyIncome.setValue("500000");
    component.loanCalculatorForm.controls.requestedAmount.setValue("20000000");
    component.loanCalculatorForm.controls.loanTerm.setValue("38");
    component.loanCalculatorForm.controls.selectedChildren.setValue("NONE");
    component.loanCalculatorForm.controls.coApplicant.setValue("NONE");

    component.onSubmit();
    expect(component.isValidFormSubmitted).toBeTruthy();
    
    
  });

});
