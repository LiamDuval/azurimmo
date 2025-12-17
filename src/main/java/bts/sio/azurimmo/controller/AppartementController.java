package bts.sio.azurimmo.controller;
import bts.sio.azurimmo.model.Appartement;
import bts.sio.azurimmo.model.dto.AppartementDTO;
import bts.sio.azurimmo.service.AppartementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController

@RequestMapping("/api/appartements")
@Tag(name = "Appartements", description = "Gestion des appartements")
public class AppartementController {
	@Autowired
 	private AppartementService appartementService;


	 @PostMapping("/")
	 @Operation(summary = "Crée un appartement")
	 public ResponseEntity<AppartementDTO> createAppartement(@RequestBody AppartementDTO dto) {
		 AppartementDTO savedDTO = appartementService.saveAppartementDTO(dto);
	 return ResponseEntity.status(201).body(savedDTO); // 201 Created
	 }
 		
 	
	 @GetMapping("/ville/{ville}")
	 @Operation(summary = "Trouver les appartements par ville")
	 public List<Appartement> findByVille(@PathVariable String ville) {
	     return appartementService.findByVille(ville);
	 }

	 @GetMapping("/batiment/{batimentId}")
	 @Operation(summary = "Lister les appartements d’un bâtiment")
	 public List<Appartement> getAppartementsParBatiment(@PathVariable long batimentId) {
	     return appartementService.getAppartementsParBatiment(batimentId);
	 }

	 @GetMapping("/surface/{surface}")
	 @Operation(summary = "Trouver les appartements avec une surface supérieure à X")
	 public List<Appartement> findBySurfaceGreaterThan(@PathVariable float surface) {
	     return appartementService.findBySurfaceGreaterThan(surface);
	 }

	 
	 
	
}
