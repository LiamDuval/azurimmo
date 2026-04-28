package bts.sio.azurimmo.model.dto;

import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterventionDTO {

    private Long id;
    private String libelle;
    private String description;
    private String adresse;
    private String ville;
    private LocalTime heure;

    private Long appartementId;
    private Long typeInterventionId;
}
