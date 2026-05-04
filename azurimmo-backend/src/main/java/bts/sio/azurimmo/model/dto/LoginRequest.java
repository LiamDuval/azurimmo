package bts.sio.azurimmo.model.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String mail;
    private String password;
}