package com.example.requestmodel;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class CreateClientRequest {

    @NotNull
    public String firstname;

    @NotNull
    public String lastname;

    @NotNull
    @Email
    public String email;

    @NotNull
    public String profileImagePath;

}

