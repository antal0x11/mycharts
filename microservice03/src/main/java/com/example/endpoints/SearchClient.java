package com.example.endpoints;


import com.example.mychartsmodel.ClientDB;
import com.example.mychartsmodel.ClientRepository;
import com.example.requestmodel.SearchClientRequest;
import com.example.responsemodel.ClientResponseInfo;
import com.example.responsemodel.SearchClientResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController //TODO validate request body
public class SearchClient {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping(path = "/api/client/search", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> handleSearchClient(@RequestBody SearchClientRequest request) {

        Optional<ClientDB> client = clientRepository.findById(request.email);

        if (!client.isPresent()) {

            ClientResponseInfo msg = new ClientResponseInfo("failure, User Not Found");
            return new ResponseEntity<>(msg, HttpStatus.NOT_FOUND);

        }

        SearchClientResponse msg = new SearchClientResponse(
                client.get().getFirstName(),
                client.get().getLastName(),
                client.get().getEmail(),
                client.get().getUserId(),
                client.get().getProfileImagePath(),
                client.get().getCharts(),
                client.get().getCredit()
        );

        return new ResponseEntity<>(msg,HttpStatus.OK);

    }
}
