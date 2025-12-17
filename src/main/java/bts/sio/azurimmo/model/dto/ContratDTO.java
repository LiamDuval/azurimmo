package bts.sio.azurimmo.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContratDTO  {
 private String dateDebut;
 private String dateFin;
 private String montantBrut;
 private String montantCharge;
 private String statut;
}