package com.example.requestmodel;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateCreditRequest {

    @NotNull
    @Email
    public String email;

    @NotNull
    @Min(0)
    @Max(25)
    public int credit;
}
