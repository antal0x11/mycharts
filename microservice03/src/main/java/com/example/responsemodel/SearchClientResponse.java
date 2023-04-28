package com.example.responsemodel;

/*
    Response when we search for a client.
    Contains all client's information.

    - firstname
    - lastname
    - email
    - user id
    - path to profile image (path)
    - number of charts
    - available credit
 */

public record SearchClientResponse(String firstName,
                                   String lastName,
                                   String email,
                                   String userId,
                                   String path,
                                   Integer charts,
                                   Integer credit) {

}
