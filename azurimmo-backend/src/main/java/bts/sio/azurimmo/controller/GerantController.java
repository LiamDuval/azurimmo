package bts.sio.azurimmo.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // ← import

import bts.sio.azurimmo.model.dto.GerantDTO;
import bts.sio.azurimmo.model.dto.LoginRequest;
import bts.sio.azurimmo.service.GerantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/gerant")
@Tag(name = "Gerant", description = "Gestion des Gerant")
public class GerantController {

    @Autowired
    private GerantService gerantService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/")
    @Operation(summary = "Créer un gérant")
    public ResponseEntity<GerantDTO> createGerant(@RequestBody GerantDTO dto) {
        GerantDTO savedDTO = gerantService.saveGerantDTO(dto);
        return ResponseEntity.status(201).body(savedDTO);
    }

    @GetMapping("/{gerantId}")
    @Operation(summary = "Récupérer un gérant par son ID")
    public Optional<GerantDTO> getGerantDTO(@PathVariable long gerantId) {
        return gerantService.getGerantDTO(gerantId);
    }

    @PostMapping("/login")
    @Operation(summary = "Connexion gérant")
    public ResponseEntity<GerantDTO> login(@RequestBody LoginRequest loginRequest) {
        Optional<GerantDTO> gerant = gerantService.login(
            loginRequest.getMail(),
            loginRequest.getPassword()
        );
        return gerant
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/hash/{password}")
    public String generateHash(@PathVariable String password) {
        return passwordEncoder.encode(password);
    }
}