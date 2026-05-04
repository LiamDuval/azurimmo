package bts.sio.azurimmo.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GerantDTO {

    private Long id;
    private String nom;
    private String prenom;
    private int tel;
    private String mail;
    private Long batimentId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
}