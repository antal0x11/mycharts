package com.example.mychartsmodel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clients")
public class ClientDB {

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "userID")
    private String userId;

    @Column(name = "path")
    private String profileImagePath;

    @Column(name = "credits")
    private int credit;

    @Column(name = "charts")
    private int charts;


    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public String getUserId() {
        return this.userId;
    }

    public String getProfileImagePath() {
        return this.profileImagePath;
    }

    public int getCredit() {
        return this.credit;
    }

    public int getCharts() {
        return this.charts;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public void setCredit(int credits) {
        this.credit = credits;
    }

    public void setCharts(int charts) {
        this.charts = charts;
    }
}
