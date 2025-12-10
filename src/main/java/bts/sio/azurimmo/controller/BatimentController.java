package bts.sio.azurimmo.controller;

import bts.sio.azurimmo.model.dto.BatimentDTO;
import bts.sio.azurimmo.service.BatimentService;

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
public class BatimentController {


	private final BatimentService batimentService;
	
	public BatimentController(BatimentService batimentService) {
		this.batimentService = batimentService;
		
	}
	
	 @GetMapping("/{batimentId}")
	 public Optional <BatimentDTO> getBatimentDTO(@PathVariable long batimentId) {
	 return batimentService.getBatimentDTO(batimentId);
	 }
	 
	 @GetMapping("/re/{batimentId}")
	 public ResponseEntity<BatimentDTO> getBatimentReDTO(@PathVariable long batimentId) {
	  return batimentService.getBatimentDTO(batimentId)
	  .map(ResponseEntity::ok) // batiment trouvé → 200
	  .orElse(ResponseEntity.notFound().build()); // pas trouvé → 404
	 }
	 
	 @PostMapping("/")
	 public ResponseEntity<BatimentDTO> createBatiment(@RequestBody BatimentDTO dto) {
	 BatimentDTO savedDTO = batimentService.saveBatimentDTO(dto);
	 return ResponseEntity.status(201).body(savedDTO); // 201 Created
	 }

}
