package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.Contrat;
import bts.sio.azurimmo.model.dto.ContratDTO;

public class ContratMapper {
	public static ContratDTO toDTO(Contrat c) {
		if (c == null) return null;
		ContratDTO dto = new ContratDTO();
		dto.setDateDebut(c.getDateDebut());
		dto.setDateFin(c.getDateFin());
		dto.setMontantBrut(c.getMontantBrut());
		dto.setMontantCharge(c.getMontantCharge());
		return dto;
		
	}
	public static Contrat toEntity(ContratDTO dto) {
		if (dto == null) return null;
		Contrat c = new Contrat();
		c.setDateDebut(dto.getDateDebut());
		c.setDateFin(dto.getDateFin());
		c.setMontantBrut(dto.getMontantBrut());
		c.setMontantCharge(dto.getMontantCharge());
		return c;
	}
}
