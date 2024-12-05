package com.tubesbookwise.model;
import java.util.Date;

public class Loan {
    private int idLoan;
    private Date loanDate;
    private EStatus status;
    private Return returnInfo; // Composition relationship

    public enum EStatus {
        BORROWED,
        RETURNED,
        ACCEPTED
    }

    public Loan(int idLoan, Date loanDate, EStatus status) {
        this.idLoan = idLoan;
        this.loanDate = loanDate;
        this.status = EStatus.BORROWED;
    }

    // Getters and setters
    public int getIdLoan() {
        return idLoan;
    }

    public void setIdLoan(int idLoan) {
        this.idLoan = idLoan;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(Date loanDate) {
        this.loanDate = loanDate;
    }

    public EStatus getStatus() {
        return status;
    }

    public void setStatus(EStatus status) {
        this.status = status;
    }

    public Return getReturnInfo() {
        return returnInfo;
    }

    // Create a return associated with this loan
    public void createReturn(Date returnDate) {
        double lateFee = new Return(returnDate).calculateLateFee(this.loanDate);
        this.returnInfo = new Return(returnDate);
    }

    public void updateStatus(EStatus status){
        this.status = status;
    }
}
