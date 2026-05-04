package bts.sio.azurimmo.controller;

import bts.sio.azurimmo.model.Contrat;
import bts.sio.azurimmo.model.dto.ContratDTO;
import bts.sio.azurimmo.service.ContratService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contrats")
@Tag(name = "Contrats", description = "Gestion des contrats de location")
public class ContratController {

    @Autowired
    private ContratService contratService;

    @GetMapping("/liste")
    @Operation(summary = "Lister tous les contrats")
    public List<ContratDTO> getAllContrats() {
        return contratService.findAllDTO();
    }

    @PostMapping("/")
    @Operation(summary = "Créer un contrat")
    public ResponseEntity<ContratDTO> createContrat(@RequestBody ContratDTO dto) {
        ContratDTO savedDTO = contratService.saveContratDTO(dto);
        return ResponseEntity.status(201).body(savedDTO);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un contrat par son ID")
    public Optional<ContratDTO> getContrat(@PathVariable Long id) {
        return contratService.getContratDTO(id);
    }

    @GetMapping("/appartement/{appartementId}")
    @Operation(summary = "Lister les contrats d'un appartement")
    public List<Contrat> getContratsByAppartement(@PathVariable Long appartementId) {
        return contratService.findByAppartementId(appartementId);
    }

    @GetMapping("/locataire/{locataireId}")
    @Operation(summary = "Lister les contrats d'un locataire")
    public List<Contrat> getContratsByLocataire(@PathVariable Long locataireId) {
        return contratService.findByLocataireId(locataireId);
    }

    @GetMapping("/statut/{statut}")
    @Operation(summary = "Lister les contrats par statut")
    public List<Contrat> getContratsByStatut(@PathVariable String statut) {
        return contratService.findByStatut(statut);
    }
}
