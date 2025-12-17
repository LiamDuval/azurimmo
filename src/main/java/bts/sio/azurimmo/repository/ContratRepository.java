package bts.sio.azurimmo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bts.sio.azurimmo.model.Contrat;

public interface ContratRepository extends JpaRepository<Contrat, Long> {
}