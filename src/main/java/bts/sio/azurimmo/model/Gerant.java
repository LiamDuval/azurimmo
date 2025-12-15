package bts.sio.azurimmo.model;

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
@Table(name = "Gerant")
public class Gerant {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 @Column(name="nom")
	 private String nom;

	 @Column(name="prenom")
	 private String prenom;

	 @Column(name="telephone")
	 private int telephone;

	 @Column(name="email")
	 private String email;
	 
    @ManyToOne
    @JoinColumn(name = "gerant_id", nullable = false)
    private Gerant gerant;

}
