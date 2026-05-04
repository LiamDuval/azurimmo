package bts.sio.azurimmo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable())        // ← désactive la gestion CORS de Security
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()         // ← TOUTES les routes sont accessibles
            )
            .httpBasic(basic -> basic.disable())  // ← désactive le login HTTP basique
            .formLogin(form -> form.disable());   // ← désactive le formulaire Spring Security
        return http.build();
    }
}