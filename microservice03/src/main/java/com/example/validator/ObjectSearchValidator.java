package com.example.validator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;


//TODO
public class ObjectSearchValidator implements ConstraintValidator<Validator, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            JsonNode node = mapper.readTree(value);

            if (!node.isObject()) {
                return false;
            }

            Iterator<Map.Entry<String, JsonNode>> createClientFields = node.fields();
            int count = 0;
            while (createClientFields.hasNext()) {
                Map.Entry<String, JsonNode> field = createClientFields.next();
                count++;
            }

            if (count != 1) {
                return false;
            }


            return node.get("email") != null && node.get("email").isTextual();

        } catch (IOException ex) {
            return false;
        }
    }
}

