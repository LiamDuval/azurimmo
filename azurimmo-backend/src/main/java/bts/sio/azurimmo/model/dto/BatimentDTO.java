package bts.sio.azurimmo.model.dto;

import java.util.List;
import lombok.*;

@Getter
@Setter
public class BatimentDTO {

    private Long id;
    private String adresse;
    private String ville;
    private List<Long> gerantIds;
    private int nombreAppartements;
    private List<AppartementDTO> appartements;
}
