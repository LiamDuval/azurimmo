package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.Gerant;
import bts.sio.azurimmo.model.dto.GerantDTO;

public class GerantMapper {

    public static GerantDTO toDTO(Gerant gerant) {
        if (gerant == null) return null;

        GerantDTO dto = new GerantDTO();
        dto.setId(gerant.getId());
        dto.setNom(gerant.getNom());
        dto.setPrenom(gerant.getPrenom());
        dto.setTel(gerant.getTelephone());
        dto.setMail(gerant.getMail());

        if (gerant.getBatiment() != null) {
            dto.setBatimentId(gerant.getBatiment().getId());
        }

        return dto;
    }

    public static Gerant toEntity(GerantDTO dto) {
        if (dto == null) return null;

        Gerant gerant = new Gerant();
        gerant.setId(dto.getId());
        gerant.setNom(dto.getNom());
        gerant.setPrenom(dto.getPrenom());
        gerant.setTelephone(dto.getTel());
        gerant.setMail(dto.getMail());
        gerant.setPassword(dto.getPassword());

        return gerant;
    }
}