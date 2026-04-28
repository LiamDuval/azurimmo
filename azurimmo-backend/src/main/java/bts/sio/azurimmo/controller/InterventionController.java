package bts.sio.azurimmo.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bts.sio.azurimmo.model.dto.InterventionDTO;
import bts.sio.azurimmo.service.InterventionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/interventions")
@Tag(name = "Interventions", description = "Intervention des batiments")

public class InterventionController {
	private final InterventionService interventionService;
	
	public InterventionController(InterventionService interventionService) {
	    this.interventionService = interventionService;
	}

	@GetMapping("/{interventionId}")
	@Operation(summary = "Récupérer un intervention par son ID")
	public Optional<InterventionDTO> getInterventionDTO(@PathVariable long interventionId) {
	    return interventionService.getInterventionDTO(interventionId);
	}

	@GetMapping("/re/{interventionId}")
	@Operation(summary = "Récupérer un intervention par son ID avec réponse HTTP 200 ou 404")
	public ResponseEntity<InterventionDTO> getInterventionReDTO(@PathVariable long interventionId) {
	    return interventionService.getInterventionDTO(interventionId)
	            .map(ResponseEntity::ok)                 // 200 OK si trouvé
	            .orElse(ResponseEntity.notFound().build()); // 404 si pas trouvé
	}

	@PostMapping("/")
	@Operation(summary = "Créer une nouvelle Intervention")
	public ResponseEntity<InterventionDTO> createIntervention(@RequestBody InterventionDTO dto) {
	    InterventionDTO savedDTO = interventionService.saveInterventionDTO(dto);
	    return ResponseEntity.status(201).body(savedDTO); // 201 Created
	}

}
