package bts.sio.azurimmo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import bts.sio.azurimmo.model.dto.GerantDTO;
import bts.sio.azurimmo.service.GerantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/gerant")
@Tag(name = "Gerant", description = "Gestion des Gerant")
public class GerantController {

	@Autowired
 	private GerantService gerantService;
	
	@PostMapping("/")
	 @Operation(summary = "Crée un Gerant")
	 public ResponseEntity<GerantDTO> createGerant(@RequestBody GerantDTO dto) {
		GerantDTO savedDTO = gerantService.saveGerantDTO(dto);
	 return ResponseEntity.status(201).body(savedDTO); // 201 Created
	 }
	
	@GetMapping("/{gerantId}")
	@Operation(summary = "Récupérer un gerant par son ID")
	public Optional<GerantDTO> getGerantDTO(@PathVariable long gerantId) {
	    return gerantService.getGerantDTO(gerantId);
	}		
}
