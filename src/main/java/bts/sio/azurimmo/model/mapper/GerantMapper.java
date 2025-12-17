package bts.sio.azurimmo.model.mapper;


import bts.sio.azurimmo.model.Gerant;
import bts.sio.azurimmo.model.dto.GerantDTO;

public class GerantMapper {
	public static GerantDTO toDTO(Gerant g) {
		if (g == null) return null;
		GerantDTO dto = new GerantDTO();
		dto.setNom(g.getNom());
		dto.setPrenom(g.getPrenom());
		dto.setTelephone(g.getTelephone());
		dto.setEmail(g.getEmail());
		return dto;
		
	}
	public static Gerant toEntity(GerantDTO dto) {
		if (dto == null) return null;
		Gerant g = new Gerant();
		g.setNom(dto.getNom());
		g.setPrenom(dto.getPrenom());
		g.setTelephone(dto.getTelephone());
		g.setEmail(dto.getEmail());
		return g;
	}
}

