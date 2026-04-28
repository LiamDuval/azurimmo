package bts.sio.azurimmo.model.dto;

import lombok.*;

@Getter
@Setter
public class AppartementDTO {

    private Long id;
    private String numero;
    private String description;
    private Float surface;
    private int nb_piece;
    private Long batiment_id;
}
