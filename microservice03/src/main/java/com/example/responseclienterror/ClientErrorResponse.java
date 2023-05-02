package com.example.responseclienterror;

public record ClientErrorResponse(
        String reason,
        String time) {
}
