package bts.sio.azurimmo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestBcrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        String hashEnBDD = "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpwTTyRXFHhIK";
        
        boolean resultat = encoder.matches("admin123", hashEnBDD);
        
        System.out.println("Match admin123 : " + resultat);
        
        String nouveauHash = encoder.encode("admin123");
        System.out.println("Nouveau hash : " + nouveauHash);
    }
}