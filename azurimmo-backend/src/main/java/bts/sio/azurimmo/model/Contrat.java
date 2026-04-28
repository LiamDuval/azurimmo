package bts.sio.azurimmo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Contrat")
public class Contrat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "montantBrut")
    private Float montantBrut;

    @Column(name = "montantCharge")
    private Float montantCharge;

    @Column(name = "statut")
    private String statut;

    @ManyToOne
    @JoinColumn(name = "appartement_id", nullable = false)
    private Appartement appartement;

    @ManyToOne
    @JoinColumn(name = "locataire_id", nullable = false)
    private Locataire locataire;
}