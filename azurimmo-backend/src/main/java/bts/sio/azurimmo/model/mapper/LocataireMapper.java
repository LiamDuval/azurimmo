package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.Locataire;
import bts.sio.azurimmo.model.dto.LocataireDTO;

public class LocataireMapper {

    public static LocataireDTO toDTO(Locataire locataire) {
        if (locataire == null) return null;

        LocataireDTO dto = new LocataireDTO();
        dto.setId(locataire.getId());
        dto.setNom(locataire.getNom());
        dto.setPrenom(locataire.getPrenom());
        dto.setMail(locataire.getMail());
        dto.setTel(locataire.getTel());

        return dto;
    }

    public static Locataire toEntity(LocataireDTO dto) {
        if (dto == null) return null;

        Locataire locataire = new Locataire();
        locataire.setId(dto.getId());
        locataire.setNom(dto.getNom());
        locataire.setPrenom(dto.getPrenom());
        locataire.setMail(dto.getMail());
        locataire.setTel(dto.getTel());

        return locataire;
    }
}