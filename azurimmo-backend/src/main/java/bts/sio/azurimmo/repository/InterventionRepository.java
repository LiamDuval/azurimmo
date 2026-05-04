package bts.sio.azurimmo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bts.sio.azurimmo.model.Intervention;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {

    List<Intervention> findByAppartementId(Long appartementId);
    List<Intervention> findByVille(String ville);
    List<Intervention> findByAdresse(String adresse);
    List<Intervention> findByDescription(String description);
    List<Intervention> findByAppartement_Id(Long appartementId);
}