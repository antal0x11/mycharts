package com.example.requestmodel;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class UpdateChartsRequest {

    @NotNull
    @Email
    public String email;
}
