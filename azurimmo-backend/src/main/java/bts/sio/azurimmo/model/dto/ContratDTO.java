package bts.sio.azurimmo.model.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContratDTO {

    private Long id;
    private Long locataireId;
    private Long appartementId;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Float montantBrut;
    private Float montantCharge;
    private String statut;
}
