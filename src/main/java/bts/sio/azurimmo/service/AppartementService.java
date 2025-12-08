package bts.sio.azurimmo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bts.sio.azurimmo.model.Appartement;
import bts.sio.azurimmo.repository.AppartementRepository;
import lombok.Data;

@Data
@Service


public class AppartementService {
	@Autowired
	private AppartementRepository appartementRepository;
	public Appartement saveAppartement(Appartement appartement) {
		Appartement savedAppartement = appartementRepository.save(appartement);
		return savedAppartement; 
	}
	
	public List<Appartement> findByVille(String ville) {
		return appartementRepository.findByBatiment_Ville(ville);
		}
	
	public List<Appartement> getAppartementsParBatiment(long id) {
		 return appartementRepository.findByBatiment_Id(id);
		}
	public List<Appartement> findBySurfaceGreaterThan(float surface){
	return appartementRepository.findBySurfaceGreaterThan(surface);
	}
}

