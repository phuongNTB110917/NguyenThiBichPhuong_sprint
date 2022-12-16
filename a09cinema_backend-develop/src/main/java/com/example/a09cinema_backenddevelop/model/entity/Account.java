package com.example.a09cinema_backenddevelop.model.entity;

import lombok.Data;
import org.hibernate.annotations.Type;
import org.springframework.boot.jackson.JsonObjectSerializer;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Data
//@JsonIdentityInfo(generator= JSOGGenerator.class)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Boolean isEnabled;
    private String username;
    private String accountCode;
    private String password;
    private String fullname;
    private LocalDate birthday;
    private String idCard;
    private String address;
    private String phone;
    private String verificationCode;
    private String email;
    private String gender;
    private int totalPoint;
    private String imageUrl;


    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean deleted;

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean enable;

    private String provider;



    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<AccountRole> accountRoles;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Booking> bookings;


    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    @ManyToMany
    @JoinTable(name = "account_role_test", joinColumns = @JoinColumn(name = "account_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public Account() {
    }

    public Account(long id, Boolean isEnabled, String username, String accountCode, String password, String fullname, LocalDate birthday, String idCard, String address, String phone, String verificationCode, String email, String gender, int totalPoint, String imageUrl, boolean deleted, boolean enable, String provider, List<AccountRole> accountRoles, List<Booking> bookings, Set<Role> roles) {
        this.id = id;
        this.isEnabled = isEnabled;
        this.username = username;
        this.accountCode = accountCode;
        this.password = password;
        this.fullname = fullname;
        this.birthday = birthday;
        this.idCard = idCard;
        this.address = address;
        this.phone = phone;
        this.verificationCode = verificationCode;
        this.email = email;
        this.gender = gender;
        this.totalPoint = totalPoint;
        this.imageUrl = imageUrl;
        this.deleted = deleted;
        this.enable = enable;
        this.provider = provider;
        this.accountRoles = accountRoles;
        this.bookings = bookings;
        this.roles = roles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getTotalPoint() {
        return totalPoint;
    }

    public void setTotalPoint(int totalPoint) {
        this.totalPoint = totalPoint;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public List<AccountRole> getAccountRoles() {
        return accountRoles;
    }

    public void setAccountRoles(List<AccountRole> accountRoles) {
        this.accountRoles = accountRoles;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}


