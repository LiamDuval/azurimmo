package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.Appartement;
import bts.sio.azurimmo.model.dto.AppartementDTO;

public class AppartementMapper {
	public static AppartementDTO toDTO(Appartement a) {
		if (a == null) return null;
		AppartementDTO dto = new AppartementDTO();
		dto.setNumero(a.getNumero());
		dto.setDescription(a.getDescription());
		dto.setSurface(a.getSurface());
		return dto;
	}
	public static Appartement toEntity(AppartementDTO dto) {
		if (dto == null) return null;
		Appartement a = new Appartement();
		a.setNumero(dto.getNumero());
		a.setDescription(dto.getDescription());
		a.setSurface(dto.getSurface());
		return a;
	}
}

