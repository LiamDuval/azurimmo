package bts.sio.azurimmo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Contrat")
public class Contrat {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 @Column(name="dateDebut")
	 private String dateDebut;
	 
	 @Column(name="dateFin")
	 private String dateFin;
	 
	 @Column(name="montantBrut")
	 private String montantBrut;
	 
	 @Column(name="montantCharge")
	 private String montantCharge;
	 
	 @Column(name="statut")
	 private String statut;
	 
}
