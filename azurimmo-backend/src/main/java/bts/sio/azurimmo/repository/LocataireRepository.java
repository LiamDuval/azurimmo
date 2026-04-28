package bts.sio.azurimmo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bts.sio.azurimmo.model.Locataire;

public interface LocataireRepository extends JpaRepository<Locataire, Long> {

}