package bts.sio.azurimmo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bts.sio.azurimmo.model.Intervention;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
}
 