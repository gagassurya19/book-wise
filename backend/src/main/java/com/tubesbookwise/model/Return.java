package com.tubesbookwise.model;
import java.time.LocalDate;

public class Return {
    private LocalDate return_date;
    private double lateFee;

    public Return(LocalDate return_date, double lateFee) {
        this.return_date = return_date;
        this.lateFee = lateFee;
    }

    public double getLateFee() {
        return lateFee;
    }

    public void setLateFee(double lateFee) {
        this.lateFee = lateFee;
    }
}
