package com.example.a09cinema_backenddevelop.model.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//<<<<<<< HEAD
////import com.voodoodyne.jackson.jsog.JSOGGenerator;
//=======
//import com.voodoodyne.jackson.jsog.JSOGGenerator;
//>>>>>>> ticket-PhuongNTB
import lombok.Data;
//import com.voodoodyne.jackson.jsog.JSOGGenerator;
import javax.persistence.*;
@Entity
@Data
//@JsonIdentityInfo(generator= JSOGGenerator.class)
public class AccountRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    public AccountRole() {
    }


}
