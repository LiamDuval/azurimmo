package bts.sio.azurimmo.model.dto;

import java.util.List;
import lombok.*;

@Getter
@Setter
public class BatimentDTO {

    private Long id;
    // ✅ nom était absent du DTO d'origine → le frontend ne pouvait pas afficher le nom
    private String nom;
    private String adresse;
    private String ville;
    private List<Long> gerantIds;
    private int nombreAppartements;
    private List<AppartementDTO> appartements;
}
