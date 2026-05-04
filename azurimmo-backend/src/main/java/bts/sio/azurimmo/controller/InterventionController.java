package bts.sio.azurimmo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // ✅ Retourne List<InterventionDTO> — JSON propre, pas de boucle
    @GetMapping("/liste")
    @Operation(summary = "Lister toutes les interventions")
    public List<InterventionDTO> getAllInterventions() {
        return interventionService.findAllDTO();
    }

    // ✅ Retourne List<InterventionDTO> — même logique
    @GetMapping("/appartement/{appartementId}")
    @Operation(summary = "Lister les interventions d'un appartement")
    public List<InterventionDTO> getByAppartement(@PathVariable Long appartementId) {
        return interventionService.findByAppartementIdDTO(appartementId);
    }

    @GetMapping("/{interventionId}")
    @Operation(summary = "Récupérer une intervention par son ID")
    public Optional<InterventionDTO> getInterventionDTO(@PathVariable Long interventionId) {
        return interventionService.getInterventionDTO(interventionId);
    }

    @PostMapping("/")
    @Operation(summary = "Créer une nouvelle Intervention")
    public ResponseEntity<InterventionDTO> createIntervention(@RequestBody InterventionDTO dto) {
        InterventionDTO savedDTO = interventionService.saveInterventionDTO(dto);
        return ResponseEntity.status(201).body(savedDTO);
    }
}
