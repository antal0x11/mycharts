package com.example.mychartsmodel;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<ClientDB,String> {

    @Modifying
    @Query("update ClientDB client set client.credit = :credits where client.email = :email")
    int updateCredit(@Param("email") String email, @Param("credits") Integer credits );

    @Modifying
    @Query("update ClientDB client set client.charts = :charts where client.email = :email")
    int updateCharts(@Param("email") String email, @Param("charts") Integer charts);
}
