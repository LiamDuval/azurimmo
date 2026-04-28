package bts.sio.azurimmo.model.dto;

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
}
