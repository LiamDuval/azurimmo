package bts.sio.azurimmo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import bts.sio.azurimmo.model.Appartement;
import bts.sio.azurimmo.model.dto.AppartementDTO;
import bts.sio.azurimmo.model.mapper.AppartementMapper;
import bts.sio.azurimmo.repository.AppartementRepository;
import lombok.Data;

@Data
@Service
public class AppartementService {

    private final AppartementRepository appartementRepository;

    public Appartement saveAppartement(Appartement appartement) {
        return appartementRepository.save(appartement);
    }
    
    public List<Appartement> findAll() {
        return appartementRepository.findAll();
    }

    public AppartementDTO saveAppartementDTO(AppartementDTO dto) {
        Appartement entity = AppartementMapper.toEntity(dto);
        Appartement saved = appartementRepository.save(entity);
        return AppartementMapper.toDTO(saved);
    }

    public Optional<AppartementDTO> getAppartementDTO(Long id) {
        return appartementRepository.findById(id)
                .map(AppartementMapper::toDTO);
    }

    public List<Appartement> findByVille(String ville) {
        return appartementRepository.findByBatiment_Ville(ville);
    }

    public List<Appartement> getAppartementsParBatiment(long id) {
        return appartementRepository.findByBatiment_Id(id);
    }

    public List<Appartement> findBySurfaceGreaterThan(float surface) {
        return appartementRepository.findBySurfaceGreaterThan(surface);
    }
}