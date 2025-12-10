package bts.sio.azurimmo.controller;

import bts.sio.azurimmo.model.dto.BatimentDTO;
import bts.sio.azurimmo.service.BatimentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.Optional;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/batiments")
@Tag(name = "Batiments", description = "Gestion des Batiments")
public class BatimentController {


	private final BatimentService batimentService;
	
	public BatimentController(BatimentService batimentService) {
	    this.batimentService = batimentService;
	}

	@GetMapping("/{batimentId}")
	@Operation(summary = "Récupérer un batiment par son ID")
	public Optional<BatimentDTO> getBatimentDTO(@PathVariable long batimentId) {
	    return batimentService.getBatimentDTO(batimentId);
	}

	@GetMapping("/re/{batimentId}")
	@Operation(summary = "Récupérer un batiment par son ID avec réponse HTTP 200 ou 404")
	public ResponseEntity<BatimentDTO> getBatimentReDTO(@PathVariable long batimentId) {
	    return batimentService.getBatimentDTO(batimentId)
	            .map(ResponseEntity::ok)                 // 200 OK si trouvé
	            .orElse(ResponseEntity.notFound().build()); // 404 si pas trouvé
	}

	@PostMapping("/")
	@Operation(summary = "Créer un nouveau batiment")
	public ResponseEntity<BatimentDTO> createBatiment(@RequestBody BatimentDTO dto) {
	    BatimentDTO savedDTO = batimentService.saveBatimentDTO(dto);
	    return ResponseEntity.status(201).body(savedDTO); // 201 Created
	}


}
