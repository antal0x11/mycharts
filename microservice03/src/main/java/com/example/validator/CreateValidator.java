package com.example.validator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

public class CreateValidator implements ConstraintValidator<Validator, String> {

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

            if (count != 4) {
                return false;
            }

            if (node.get("firstname") == null || !node.get("firstname").isTextual()) {
                return false;
            }

            if (node.get("lastname") == null || !node.get("lastname").isTextual()) {
                return false;
            }

            if (node.get("email") == null || !node.get("email").isTextual()) {
                return false;
            }

            if (node.get("profileImagePath") == null || !node.get("profileImagePath").isTextual()) {
                return false;
            }

            return true;

        } catch (IOException ex) {
            return false;
        }
    }
}
