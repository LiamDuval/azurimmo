package bts.sio.azurimmo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bts.sio.azurimmo.model.Contrat;

public interface ContratRepository extends JpaRepository<Contrat, Long> {

    List<Contrat> findByAppartementId(Long appartementId);
    List<Contrat> findByLocataireId(Long locataireId);
    List<Contrat> findByStatut(String statut);
    List<Contrat> findByDateDebutBetween(LocalDate debut, LocalDate fin);

}