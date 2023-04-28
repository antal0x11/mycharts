package com.example.endpoints;

import com.example.mychartsmodel.ClientRepository;
import com.example.requestmodel.DeleteClientRequest;
import com.example.responsemodel.ClientResponseInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController //TODO validate request body
public class DeleteClient {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping(path = "/api/client/delete", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> handleClientDelete(@RequestBody DeleteClientRequest request) {

        if (!clientRepository.existsById(request.email)) {

            ClientResponseInfo msg = new ClientResponseInfo("Client to remove not found");
            return new ResponseEntity<>(msg, HttpStatus.NOT_FOUND);

        }

        clientRepository.deleteById(request.email);

        ClientResponseInfo msg = new ClientResponseInfo("Client removed");
        return new ResponseEntity<>(msg,HttpStatus.OK);

    }
}
