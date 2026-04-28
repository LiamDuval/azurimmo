package bts.sio.azurimmo.model.mapper;
import bts.sio.azurimmo.model.Appartement;
import bts.sio.azurimmo.model.Batiment;
import bts.sio.azurimmo.model.dto.AppartementDTO;

public class AppartementMapper {
    public static AppartementDTO toDTO(Appartement a) {
        if (a == null) return null;
        AppartementDTO dto = new AppartementDTO();
        dto.setId(a.getId());
        dto.setNumero(a.getNumero());
        dto.setDescription(a.getDescription());
        dto.setSurface(a.getSurface());
        dto.setNb_piece(a.getNombreDePiece());
        if (a.getBatiment() != null) {
            dto.setBatiment_id(a.getBatiment().getId());
        }
        return dto;
    }

    public static Appartement toEntity(AppartementDTO dto) {
        if (dto == null) return null;
        Appartement a = new Appartement();
        a.setId(dto.getId());
        a.setNumero(dto.getNumero());
        a.setDescription(dto.getDescription());
        a.setSurface(dto.getSurface());
        a.setNombreDePiece(dto.getNb_piece());
        if (dto.getBatiment_id() != null) {
            Batiment batiment = new Batiment();
            batiment.setId(dto.getBatiment_id());
            a.setBatiment(batiment);
        }
        return a;
    }
}
