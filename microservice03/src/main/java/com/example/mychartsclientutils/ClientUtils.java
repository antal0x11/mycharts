package com.example.mychartsclientutils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ClientUtils {

    public static String createUserId() {

        Random randomNumber = new Random();
        String[] alphabet = {"A", "B", "C", "D",
                             "E", "F", "G", "H",
                             "I", "J", "K", "L",
                             "M", "N", "O", "P",
                             "Q", "R", "S", "T",
                             "U", "V", "W", "X",
                             "Y", "Z"};

        List<String> randomUserId = new ArrayList<String>();

        int min = 0;
        int max = 25;

        for (int i=0; i<12; i++) {
            if (i < 6) {
                randomUserId.add(alphabet[randomNumber.nextInt(max - min + 1) + min]);
            } else if (i == 6){
                randomUserId.add("-");
            } else {
                randomUserId.add( Integer.toString(randomNumber.nextInt(10)));
            }
        }

        return String.join("", randomUserId);
    }

    public static String getCurrentTime() {
        String tm = LocalDateTime.now().toString();
        String[] tmParts = tm.split("T");

        return tmParts[0] + " " + tmParts[1].split("\\.")[0];
    }
}
