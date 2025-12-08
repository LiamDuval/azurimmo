package bts.sio.azurimmo.repository;
import bts.sio.azurimmo.model.Appartement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AppartementRepository extends JpaRepository<Appartement, Long> {
 List<Appartement> findByBatimentId(long BatimentId);
 List<Appartement> findByBatiment_Ville(String ville);
 List<Appartement> findByBatiment_Id(long id);
 List<Appartement> findBySurfaceGreaterThan(float surface);

}
