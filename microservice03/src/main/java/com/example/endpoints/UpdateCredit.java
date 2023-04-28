package com.example.endpoints;

import com.example.mychartsmodel.ClientDB;
import com.example.mychartsmodel.ClientRepository;
import com.example.requestmodel.UpdateCreditRequest;
import com.example.responsemodel.ClientResponseInfo;
import com.example.responsemodel.UpdateResponseInfo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController //TODO validate request body
public class UpdateCredit {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping(path="/api/client/update/credit", consumes = "application/json", produces = "application/json")
    @Transactional
    public ResponseEntity<Object> updateCredit(@RequestBody UpdateCreditRequest request) {

        Optional<ClientDB> client = clientRepository.findById(request.email);

        if (!client.isPresent()) {
            ClientResponseInfo msg = new ClientResponseInfo("failure ,User Not Found");
            return new ResponseEntity<>(msg, HttpStatus.NOT_FOUND);
        }

        int creditResponse = clientRepository.updateCredit(request.email,client.get().getCredit() + request.credit);

        if (creditResponse == 0) {

            UpdateResponseInfo msg = new UpdateResponseInfo("failure", client.get().getCharts(), client.get().getCredit());
            return new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);

        } else {

            UpdateResponseInfo msg = new UpdateResponseInfo("success", client.get().getCharts() , client.get().getCredit() + request.credit);
            return new ResponseEntity<>(msg, HttpStatus.OK);

        }
    }
}
