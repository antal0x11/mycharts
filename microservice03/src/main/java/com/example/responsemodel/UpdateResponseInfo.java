package com.example.responsemodel;

import com.example.mychartsclientutils.ClientUtils;

/*
    Response when an update to the Client Account occurs.

    Updates:

    - Add Credit
    - Create Chart and reduce credit
 */

public class UpdateResponseInfo {

    private final String status;
    private final String time;
    private final Integer charts;
    private final Integer credits;

    public UpdateResponseInfo(String status, Integer charts, Integer credits) {
        this.status = status;
        this.charts = charts;
        this.credits = credits;
        this.time = ClientUtils.getCurrentTime();
    }

    public String getStatus() {
        return this.status;
    }

    public String getTime() {
        return this.time;
    }

    public Integer getCharts() {
        return this.charts;
    }

    public Integer getCredits() {
        return this.credits;
    }
}
