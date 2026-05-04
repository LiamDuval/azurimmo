package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.Intervention;
import bts.sio.azurimmo.model.dto.InterventionDTO;

public class InterventionMapper {

    public static InterventionDTO toDTO(Intervention i) {
        if (i == null) return null;
        InterventionDTO dto = new InterventionDTO();
        dto.setId(i.getId());
        dto.setLibelle(i.getLibelle());
        dto.setAdresse(i.getAdresse());
        dto.setVille(i.getVille());
        dto.setDescription(i.getDescription());
        dto.setHeure(i.getHeure());
        if (i.getAppartement() != null) {
            dto.setAppartementId(i.getAppartement().getId());
        }
        if (i.getTypeIntervention() != null) {
            dto.setTypeInterventionId(i.getTypeIntervention().getId());
        }
        return dto;
    }

    public static Intervention toEntity(InterventionDTO dto) {
        if (dto == null) return null;
        Intervention i = new Intervention();
        i.setLibelle(dto.getLibelle());
        i.setDescription(dto.getDescription());
        i.setAdresse(dto.getAdresse());
        i.setDescription(dto.getDescription());
        i.setHeure(dto.getHeure());
        i.setVille(dto.getVille());
        return i;
    }
}
