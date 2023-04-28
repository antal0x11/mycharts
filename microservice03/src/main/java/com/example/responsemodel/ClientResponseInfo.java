package com.example.responsemodel;

import com.example.mychartsclientutils.ClientUtils;

public class ClientResponseInfo {

    private final String info;
    private final String time;

    public ClientResponseInfo(String info) {
        this.info = info;
        this.time = ClientUtils.getCurrentTime();
    }

    public String getStatus() {
        return this.info;
    }

    public String getTime() {
        return this.time;
    }

}
