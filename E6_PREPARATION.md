# Préparation E6 BTS SIO SLAM — AzurImmo

## Fonctionnalités à implémenter (ce que le jury peut demander)

### 1. CRUD manquants
- [ ] **Locataire** — créer la page de gestion côté gérant (liste, ajout, modification, suppression)
- [ ] **Contrat** — formulaire de création/modification depuis le dashboard gérant
- [ ] **Paiement de loyer** — table existante mais aucune fonctionnalité côté app
- [ ] **TypeIntervention** — aucun CRUD, à créer

### 2. Sécurité
- [ ] Remplacer le `localStorage` par un **token JWT**
  - Actuellement : `localStorage.setItem('gerant', JSON.stringify(gerant))` → n'importe qui peut forger la session
  - À faire : backend génère un JWT à la connexion, frontend le stocke et l'envoie dans le header `Authorization: Bearer <token>`
- [ ] Sécuriser les routes API backend
  - Actuellement : tout est `anyRequest().permitAll()` dans `SecurityConfig.java`
  - À faire : les routes `/api/gerant/**` ne doivent être accessibles qu'avec un token valide
- [ ] Ajouter une expiration de session (ex: token valable 1h)

### 3. Validation des formulaires
- [ ] Côté backend : ajouter `@Valid`, `@NotBlank`, `@NotNull` sur les DTOs
- [ ] Côté frontend : afficher les messages d'erreur précis retournés par le serveur

### 4. Pagination
- [ ] Backend : utiliser `Pageable` dans les repositories JPA (`findAll(Pageable pageable)`)
- [ ] Frontend : ajouter des boutons page suivante / précédente
- [ ] Actuellement tous les appartements sont chargés d'un coup (problème de perf si beaucoup de données)

### 5. Filtres côté backend (pas frontend)
- [ ] Actuellement les filtres (recherche, surface min, tri) sont faits en JS côté frontend
- [ ] Le jury peut demander de les déplacer en requêtes SQL/JPA (`@Query` ou `Specification`)

### 6. Relations à afficher
- [ ] Afficher le **locataire** lié à un contrat dans la fiche appartement
- [ ] Afficher les **contrats actifs** d'un appartement
- [ ] Afficher l'historique des paiements d'un contrat

### 7. Tests
- [ ] Écrire au moins un test `@WebMvcTest` sur un controller
- [ ] Ou un test `@SpringBootTest` sur un service

---

## Ce que tu dois savoir expliquer à l'oral

### Spring Boot / Backend
| Sujet | À savoir dire |
|---|---|
| **BCrypt** | Algorithme de hachage à sens unique. Le mot de passe n'est jamais stocké en clair. `passwordEncoder.matches(saisi, hashBDD)` compare sans décoder. |
| **JPA / Hibernate** | ORM qui fait le lien entre les classes Java et les tables SQL. `@Entity` = table, `@Id` = clé primaire, `@ManyToOne` = clé étrangère. |
| **`ddl-auto=update`** | Hibernate met à jour le schéma BDD au démarrage sans supprimer les données existantes. |
| **`@RestController`** | Combine `@Controller` + `@ResponseBody` : retourne du JSON automatiquement. |
| **DTO** | Objet de transfert — sépare ce qui circule sur le réseau de l'entité BDD (sécurité + flexibilité). |
| **Spring Security** | Actuellement désactivé (`permitAll`). En prod, protège les routes avec des filtres. |

### REST / HTTP
| Code | Signification |
|---|---|
| 200 | OK |
| 201 | Créé avec succès |
| 400 | Requête invalide (mauvais paramètres) |
| 401 | Non authentifié |
| 403 | Authentifié mais pas autorisé |
| 404 | Ressource introuvable |
| 500 | Erreur serveur |

### React / Frontend
| Sujet | À savoir dire |
|---|---|
| **`useState`** | Stocke une valeur réactive — quand elle change, le composant se re-rend. |
| **`useEffect`** | Exécute du code après le rendu (ex: appel API au chargement). |
| **`localStorage`** | Stockage côté navigateur, persiste après fermeture. Utilisé ici pour la session gérant. |
| **`fetch`** | API native pour faire des requêtes HTTP depuis le navigateur. |
| **Vite** | Bundler / serveur de dev ultra-rapide pour les projets React/TS. |
| **React Router** | Gère la navigation entre pages sans rechargement (`<Route>`, `useNavigate`). |

### Base de données
| Sujet | À savoir dire |
|---|---|
| **Clé étrangère** | Lie une table à une autre. Ex: `appartement.batiment_id` → `batiment.id`. |
| **Intégrité référentielle** | Impossible de supprimer un bâtiment s'il a des appartements liés. |
| **MariaDB** | Système de gestion de BDD relationnelle, fork de MySQL. |
| **`JOIN`** | Requête SQL qui combine des données de plusieurs tables. |

### CORS
- **Pourquoi ?** Le navigateur bloque par défaut les requêtes vers un domaine/port différent de la page en cours.
- **Ici :** le frontend est sur `localhost:5173`, le backend sur `localhost:9008` → ports différents → CORS nécessaire.
- **Comment ?** `CorsConfig.java` avec `WebMvcConfigurer` autorise les origines et méthodes HTTP.

---

## Architecture du projet

```
azurimmo/
├── azurimmo-backend/        # Spring Boot (Java 21, port 9008)
│   └── src/main/java/
│       ├── controller/      # Reçoit les requêtes HTTP → appelle le service
│       ├── service/         # Logique métier → appelle le repository
│       ├── repository/      # Accès BDD (JPA)
│       ├── model/           # Entités JPA (tables)
│       │   ├── dto/         # Objets de transfert (ce qui circule sur le réseau)
│       │   └── mapper/      # Conversion entité ↔ DTO
│       ├── SecurityConfig   # Configuration Spring Security
│       └── CorsConfig       # Configuration CORS
│
└── azurimmo-frontend/       # React + TypeScript + Vite (port 5173)
    └── src/
        ├── pages/           # Pages principales (Dashboard, Login...)
        ├── components/      # Composants réutilisables
        └── types/           # Interfaces TypeScript

```

## Lancer le projet

```bash
# 1. S'assurer que WAMP est démarré (MariaDB sur port 3307)

# 2. Backend (dans azurimmo-backend/)
.\mvnw.cmd spring-boot:run

# 3. Frontend (dans azurimmo-frontend/)
npm run dev
```

- Frontend : http://localhost:5173
- Backend : http://localhost:9008
- Swagger : http://localhost:9008/swagger-ui.html

## Identifiants de test

| Champ | Valeur |
|---|---|
| Email | `martin.dupont@azurimmo.fr` |
| Mot de passe | `admin123` |
| Hash bcrypt | `$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpwTTyRXFHhIK` |