package bts.sio.azurimmo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Appartement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private float surface;
    private int nombreDePiece;
    private String description;

    @ManyToOne
    @JoinColumn(name = "batiment_id")
    @JsonIgnoreProperties("interventions")
    private Batiment batiment;
}