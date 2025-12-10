package bts.sio.azurimmo.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import lombok.Data;
@Data

@Entity
@Table(name = "appartement")
public class Appartement {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 @ManyToOne
	 @JoinColumn(name = "batiment_id")
	 
	 private Batiment batiment;
	
	 @Column(name="surface")
	 private Float surface;
	 
	 @Column(name="nombre_de_piece")
	 private int nombreDePiece;
	
	 @Column(name="description")
	 private String description;
	 
	 @Column(name="numero")
	 private String Numero;


}


