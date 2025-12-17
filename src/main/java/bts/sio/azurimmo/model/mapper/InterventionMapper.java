package bts.sio.azurimmo.model.mapper;


import bts.sio.azurimmo.model.Intervention;

import bts.sio.azurimmo.model.dto.InterventionDTO;

public class InterventionMapper {
	public static InterventionDTO toDTO(Intervention i) {
		if (i == null) return null;
		InterventionDTO dto = new InterventionDTO();
		dto.setLibelle(i.getLibelle());
		dto.setDescription(i.getDescription());
		return dto;
		
	}
	public static Intervention toEntity(InterventionDTO dto) {
		if (dto == null) return null;
		Intervention i = new Intervention();
		dto.setLibelle(i.getLibelle());
		dto.setDescription(i.getDescription());
		return i;
	}
}
