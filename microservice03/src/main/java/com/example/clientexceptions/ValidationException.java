package com.example.clientexceptions;

import com.example.mychartsclientutils.ClientUtils;
import com.example.responseclienterror.ClientErrorResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.ConnectException;


@RestControllerAdvice
public class ValidationException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ClientErrorResponse> handleInvalidException(MethodArgumentNotValidException ex) {

        ClientErrorResponse resp = new ClientErrorResponse("Invalid properties", ClientUtils.getCurrentTime());
        System.out.println(ex.getParameter());

        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMediaTypeException.class)
    public ResponseEntity<ClientErrorResponse> handleMediaType(HttpMediaTypeException ex) {

        ClientErrorResponse resp = new ClientErrorResponse("Media Type Is Not Supported.", ClientUtils.getCurrentTime());

        return new ResponseEntity<>(resp, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(ConnectException.class)
    public ResponseEntity<ClientErrorResponse> handleConnectionLoss(ConnectException ex) {
        return new ResponseEntity<>(new ClientErrorResponse("Connection With Database can't be established", ClientUtils.getCurrentTime()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class) //TODO issue while trying to catch the exception for a custom message, but it validates requests
    public ResponseEntity<ClientErrorResponse> handleConnectionLoss(ConstraintViolationException ex) {
        return new ResponseEntity<>(new ClientErrorResponse("Fix this", ClientUtils.getCurrentTime()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
