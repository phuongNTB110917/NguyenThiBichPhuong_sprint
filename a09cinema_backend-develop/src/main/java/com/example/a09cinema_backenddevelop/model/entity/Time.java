package com.example.a09cinema_backenddevelop.model.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @OneToMany(mappedBy = "time", cascade = CascadeType.ALL)
    private List<SeatDetail> seatDetail;

    private String timeShow;


}
