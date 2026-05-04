package bts.sio.azurimmo.controller;

import bts.sio.azurimmo.model.dto.BatimentDTO;
import bts.sio.azurimmo.service.BatimentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/batiments")
@Tag(name = "Batiments", description = "Gestion des Batiments")
public class BatimentController {

    private final BatimentService batimentService;

    public BatimentController(BatimentService batimentService) {
        this.batimentService = batimentService;
    }

    @GetMapping("/liste")
    @Operation(summary = "Récupérer tous les bâtiments")
    public List<BatimentDTO> getAllBatiments() {
    	return batimentService.findAllDTO();
    }

    @GetMapping("/{batimentId}")
    @Operation(summary = "Récupérer un batiment par son ID")
    public Optional<BatimentDTO> getBatimentDTO(@PathVariable Long batimentId) {
        return batimentService.getBatimentDTO(batimentId);
    }

    @PostMapping("/")
    @Operation(summary = "Créer un nouveau batiment")
    public ResponseEntity<BatimentDTO> createBatiment(@RequestBody BatimentDTO dto) {
        BatimentDTO savedDTO = batimentService.saveBatimentDTO(dto);
        return ResponseEntity.status(201).body(savedDTO);
    }
}
