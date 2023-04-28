package com.example.endpoints;

import com.example.mychartsclientutils.ClientUtils;
import com.example.mychartsmodel.ClientDB;
import com.example.mychartsmodel.ClientRepository;
import com.example.requestmodel.CreateClientRequest;
import com.example.responsemodel.ClientResponseInfo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController //TODO validate request body
public class CreateClient {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping(path = "/api/client/create", consumes = "application/json", produces = "application/json")
    @Transactional
    public ResponseEntity<Object> handleCreateClient(@RequestBody CreateClientRequest request) {


        if (clientRepository.existsById(request.email)) {

            ClientResponseInfo msg = new ClientResponseInfo("Insertion Failure, User Exists");
            return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);

        }

        ClientDB client = new ClientDB();

        client.setFirstName(request.firstname);
        client.setLastName(request.lastname);
        client.setEmail(request.email);
        client.setProfileImagePath(request.profileImagePath);
        client.setUserId(ClientUtils.createUserId());
        client.setCredit(0);
        client.setCharts(0);

        ClientDB response = clientRepository.save(client);
        if ( response != null && response.getEmail() != null) { // TODO not sure if this is correct

            ClientResponseInfo msg = new ClientResponseInfo("Insertion Complete");
            return new ResponseEntity<>(msg, HttpStatus.OK);

        } else {

            ClientResponseInfo msg = new ClientResponseInfo("Insertion Failure");
            return new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

}
