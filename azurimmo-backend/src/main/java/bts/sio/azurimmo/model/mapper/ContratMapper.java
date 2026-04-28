package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.Appartement;
import bts.sio.azurimmo.model.Contrat;
import bts.sio.azurimmo.model.Locataire;
import bts.sio.azurimmo.model.dto.ContratDTO;

public class ContratMapper {


    public static ContratDTO toDTO(Contrat contrat) {
        if (contrat == null) return null;
        ContratDTO dto = new ContratDTO();
        dto.setId(contrat.getId());

        dto.setDateDebut(contrat.getDateDebut());
        dto.setDateFin(contrat.getDateFin());
        dto.setMontantBrut(contrat.getMontantBrut());

        dto.setMontantCharge(contrat.getMontantCharge());
        dto.setStatut(contrat.getStatut());

        if (contrat.getAppartement() != null) {
            dto.setAppartementId(contrat.getAppartement().getId());
        }

        if (contrat.getLocataire() != null) {
            dto.setLocataireId(contrat.getLocataire().getId());
        }
        return dto;
    }

    public static Contrat toEntity(ContratDTO dto) {
        if (dto == null) return null;

        Contrat contrat = new Contrat();
        contrat.setId(dto.getId());
        contrat.setDateDebut(dto.getDateDebut());
        contrat.setDateFin(dto.getDateFin());
        contrat.setMontantBrut(dto.getMontantBrut());
        contrat.setMontantCharge(dto.getMontantCharge());
        contrat.setStatut(dto.getStatut());

        if (dto.getAppartementId() != null) {
            Appartement appartement = new Appartement();
            appartement.setId(dto.getAppartementId());
            contrat.setAppartement(appartement);
        }

        if (dto.getLocataireId() != null) {
            Locataire locataire = new Locataire();
            locataire.setId(dto.getLocataireId());
            contrat.setLocataire(locataire);
        }

        return contrat;
    }
}