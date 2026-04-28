package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.TypeIntervention;
import bts.sio.azurimmo.model.dto.TypInterventionDTO;

public class TypeInterventionMapper {

    public static TypInterventionDTO toDTO(TypeIntervention typeIntervention) {
        if (typeIntervention == null) return null;

        TypInterventionDTO dto = new TypInterventionDTO();
        dto.setId(typeIntervention.getId());
        dto.setLibelle(typeIntervention.getLibelle());
        dto.setDescription(typeIntervention.getDescription());

        return dto;
    }

    public static TypeIntervention toEntity(TypInterventionDTO dto) {
        if (dto == null) return null;

        TypeIntervention typeIntervention = new TypeIntervention();
        typeIntervention.setId(dto.getId());
        typeIntervention.setLibelle(dto.getLibelle());
        typeIntervention.setDescription(dto.getDescription());

        return typeIntervention;
    }
}
