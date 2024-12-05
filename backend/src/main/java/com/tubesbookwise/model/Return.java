package com.tubesbookwise.model;
import java.util.Date;

public class Return implements LibraryFee{
    private Date returnDate;
    private double lateFee;

    public Return(Date return_date) {
        this.returnDate = return_date;
    }
    // Getters and setters
    public Date getReturn_date() {
        return returnDate;
    }

    public void setReturn_date(Date returnDate) {
        this.returnDate = returnDate;
    }

    public double getLateFee() {
        return lateFee;
    }

    public void setLateFee(double lateFee) {
        this.lateFee = lateFee;
    }

    // Calculate late fee based on return date
    public double calculateLateFee(Date dueDate) {
        long delayInMillis = returnDate.getTime() - dueDate.getTime();
        int delayDays = (int) (delayInMillis / (1000 * 60 * 60 * 24));
        this.lateFee = delayDays > 0 ? delayDays * LATE_FEE_PER_DAY : 0.0;
        return this.lateFee;
    }

    public void updateBookAvailability(){}
}
