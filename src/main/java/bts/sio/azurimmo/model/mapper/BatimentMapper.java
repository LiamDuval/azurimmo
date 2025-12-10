package bts.sio.azurimmo.model.mapper;

import java.util.stream.Collectors;

import bts.sio.azurimmo.model.Batiment;
import bts.sio.azurimmo.model.dto.BatimentDTO;

public class BatimentMapper {
	public static BatimentDTO toDTO(Batiment b) {
		if (b == null) return null;
		BatimentDTO dto = new BatimentDTO();
		dto.setAdresse(b.getAdresse());
		dto.setVille(b.getVille());
		if (b.getAppartements() != null) {
			dto.setAppartements(
					b.getAppartements()
					.stream()
					.map(AppartementMapper::toDTO)
					.collect(Collectors.toList())
					);
		}
		return dto;
	}
	public static Batiment toEntity(BatimentDTO dto) {
		if (dto == null) return null;
		Batiment b = new Batiment();
		b.setAdresse(dto.getAdresse());
		b.setVille(dto.getVille());
		return b;
	}
}
