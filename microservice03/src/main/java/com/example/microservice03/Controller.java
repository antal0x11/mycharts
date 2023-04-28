package com.example.microservice03;

import com.example.endpoints.CreateClient;
import com.example.endpoints.DeleteClient;
import com.example.endpoints.SearchClient;
import com.example.requestmodel.UpdateChartsRequest;
import com.example.requestmodel.UpdateCreditRequest;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.*;


@RestController
@Import({
                UpdateChartsRequest.class,
                UpdateCreditRequest.class,
                SearchClient.class,
                CreateClient.class,
                DeleteClient.class
        })
public class Controller {
}
