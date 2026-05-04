package bts.sio.azurimmo.model.mapper;

import bts.sio.azurimmo.model.Batiment;
import bts.sio.azurimmo.model.Gerant;
import bts.sio.azurimmo.model.dto.BatimentDTO;
import java.util.stream.Collectors;

public class BatimentMapper {

    public static BatimentDTO toDTO(Batiment b) {
        if (b == null) return null;
        BatimentDTO dto = new BatimentDTO();
        dto.setId(b.getId());
        // ✅ nom était oublié ici → les cartes affichaient "Bâtiment #id" au lieu du vrai nom
        dto.setNom(b.getNom());
        dto.setAdresse(b.getAdresse());
        dto.setVille(b.getVille());

        if (b.getAppartements() != null) {
            dto.setAppartements(
                b.getAppartements()
                    .stream()
                    .map(AppartementMapper::toDTO)
                    .collect(Collectors.toList())
            );
            dto.setNombreAppartements(b.getAppartements().size());
        } else {
            dto.setNombreAppartements(0);
        }

        if (b.getGerants() != null) {
            dto.setGerantIds(
                b.getGerants()
                    .stream()
                    .map(Gerant::getId)
                    .collect(Collectors.toList())
            );
        }

        return dto;
    }

    public static Batiment toEntity(BatimentDTO dto) {
        if (dto == null) return null;
        Batiment b = new Batiment();
        b.setId(dto.getId());
        b.setNom(dto.getNom());
        b.setAdresse(dto.getAdresse());
        b.setVille(dto.getVille());
        return b;
    }
}
