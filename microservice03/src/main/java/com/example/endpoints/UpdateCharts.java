package com.example.endpoints;

import com.example.mychartsmodel.ClientDB;
import com.example.mychartsmodel.ClientRepository;
import com.example.requestmodel.UpdateChartsRequest;
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

@RestController //TODO validate Request Body
public class UpdateCharts {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping(value = "/api/client/update/charts", consumes = "application/json", produces = "application/json")
    @Transactional
    public ResponseEntity<Object> updateCharts(@RequestBody UpdateChartsRequest updCharts) {

        Optional<ClientDB> client = clientRepository.findById(updCharts.email);

        if (!client.isPresent()) {
            ClientResponseInfo msg = new ClientResponseInfo("failure");
            return new ResponseEntity<>(msg, HttpStatus.NOT_FOUND);
        }

        if (client.get().getCredit() == 0) {

            UpdateResponseInfo msg = new UpdateResponseInfo("Failure, Not Enough Credit", client.get().getCharts(), client.get().getCredit());
            return new ResponseEntity<>(msg,HttpStatus.PAYMENT_REQUIRED);
        }

        int chartResponse = clientRepository.updateCharts(updCharts.email,client.get().getCharts() + 1);
        int creditResponse = clientRepository.updateCredit(updCharts.email, client.get().getCredit() - 1);

        if (chartResponse == 0 && creditResponse != 0) { //charts didn't update

            UpdateResponseInfo msg = new UpdateResponseInfo("failure", client.get().getCharts() + 1, client.get().getCredit() );
            return new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);

        } else if (chartResponse != 0 && creditResponse == 0) {

            UpdateResponseInfo msg = new UpdateResponseInfo("failure", client.get().getCharts(), client.get().getCredit() - 1);
            return new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);

        }else {

            UpdateResponseInfo msg = new UpdateResponseInfo("success", client.get().getCharts() + 1, client.get().getCredit() - 1);
            return new ResponseEntity<>(msg, HttpStatus.OK);

        }
    }
}
