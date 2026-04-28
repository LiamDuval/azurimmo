package bts.sio.azurimmo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bts.sio.azurimmo.model.Gerant;

public interface GerantRepository extends JpaRepository<Gerant, Long> {

    List<Gerant> findByBatimentId(Long batimentId);
    List<Gerant> findByNomOrPrenom(String nom, String prenom);
}