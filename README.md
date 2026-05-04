# AzurImmo

Application web de gestion immobilière permettant à des gérants de piloter des bâtiments, appartements, contrats de location et interventions de maintenance. Le portail public offre aux visiteurs la consultation et la recherche d'appartements disponibles.

---

## Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Backend | Spring Boot | 3.4.1 |
| Langage backend | Java | 21 |
| Build backend | Maven | 3.8+ |
| Base de données | MariaDB | 11+ |
| Frontend | React + TypeScript | 19 / 5.9 |
| Bundler | Vite | 7 |
| Routage | React Router | 7 |

---

## Table des matières

1. [Architecture](#1-architecture)
2. [Prérequis](#2-prérequis)
3. [Installation et lancement](#3-installation-et-lancement)
4. [Variables d'environnement](#4-variables-denvironnement)
5. [API REST — Endpoints](#5-api-rest--endpoints)
6. [Base de données](#6-base-de-données)
7. [Frontend — Pages et routes](#7-frontend--pages-et-routes)
8. [Structure du projet](#8-structure-du-projet)

---

## 1. Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Navigateur                           │
│          React + TypeScript  (port 5173)                │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTP / REST JSON
┌──────────────────────▼──────────────────────────────────┐
│              Spring Boot  (port 9008)                   │
│   Controllers → Services → Repositories → Mappers      │
└──────────────────────┬──────────────────────────────────┘
                       │  JDBC
┌──────────────────────▼──────────────────────────────────┐
│              MariaDB  (port 3307)                       │
│                  base : azurimmo                        │
└─────────────────────────────────────────────────────────┘
```

Le backend expose une API REST consommée par le frontend. L'authentification repose sur BCrypt côté serveur et un stockage côté client dans `localStorage`.

---

## 2. Prérequis

Assurez-vous que les outils suivants sont installés et disponibles dans le `PATH` :

- **Java 21** — `java -version`
- **Maven 3.8+** — `mvn -version`
- **MariaDB 11+** en écoute sur le port **3307**
- **Node.js 18+** avec npm — `node -v`

---

## 3. Installation et lancement

### Base de données

```bash
# Créer la base et charger le schéma + données d'exemple
mysql -u root -h 127.0.0.1 -P 3307 < azurimmo-backend/src/main/resources/azurimmo.sql
```

> Le fichier SQL crée la base `azurimmo`, toutes les tables et insère des données de démonstration.

### Backend

```bash
cd azurimmo-backend
mvn spring-boot:run
```

Le serveur démarre sur **http://localhost:9008**.

Pour générer le JAR autonome :

```bash
mvn clean package
java -jar target/azurimmo-0.0.1-SNAPSHOT.jar
```

La documentation interactive Swagger est disponible à l'adresse :  
**http://localhost:9008/swagger-ui.html**

### Frontend

```bash
cd azurimmo-frontend
npm install
npm run dev
```

L'application est disponible sur **http://localhost:5173**.

#### Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement avec hot-reload |
| `npm run build` | Vérification TypeScript + build de production |
| `npm run preview` | Prévisualisation du build de production |
| `npm run lint` | Analyse statique ESLint |

---

## 4. Variables d'environnement

### Frontend — `azurimmo-frontend/.env`

```env
VITE_API_BASE=http://localhost:9008/api
```

Toutes les requêtes HTTP du frontend utilisent ce préfixe. Modifier cette valeur pour pointer vers un environnement distant.

### Backend — `application.properties`

```properties
server.port=9008

spring.datasource.url=jdbc:mariadb://localhost:3307/azurimmo
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
```

---

## 5. API REST — Endpoints

Préfixe commun : `/api`  
Documentation complète : `http://localhost:9008/swagger-ui.html`

---

### Authentification — `/api/gerant`

| Méthode | Endpoint | Description | Corps |
|---|---|---|---|
| `POST` | `/api/gerant/` | Créer un gérant | `GerantDTO` |
| `GET` | `/api/gerant/{id}` | Récupérer un gérant par ID | — |
| `POST` | `/api/gerant/login` | Connexion | `{ mail, password }` |
| `GET` | `/api/gerant/hash/{password}` | Générer un hash BCrypt | — |

Le login retourne l'objet `GerantDTO` complet si les identifiants sont valides. Le frontend le stocke dans `localStorage` pour les accès protégés.

---

### Appartements — `/api/appartements`

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/appartements/` | Lister tous les appartements |
| `GET` | `/api/appartements/{id}` | Détail d'un appartement |
| `POST` | `/api/appartements/` | Créer un appartement |
| `GET` | `/api/appartements/ville/{ville}` | Filtrer par ville |
| `GET` | `/api/appartements/batiment/{batimentId}` | Appartements d'un bâtiment |
| `GET` | `/api/appartements/surface/{surface}` | Surface supérieure ou égale à la valeur |

---

### Bâtiments — `/api/batiments`

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/batiments/liste` | Lister tous les bâtiments (avec compteur d'appartements) |
| `GET` | `/api/batiments/{id}` | Détail d'un bâtiment |
| `POST` | `/api/batiments/` | Créer un bâtiment |

---

### Contrats — `/api/contrats`

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/contrats/liste` | Lister tous les contrats |
| `GET` | `/api/contrats/{id}` | Détail d'un contrat |
| `POST` | `/api/contrats/` | Créer un contrat |
| `GET` | `/api/contrats/appartement/{appartementId}` | Contrats d'un appartement |
| `GET` | `/api/contrats/locataire/{locataireId}` | Contrats d'un locataire |
| `GET` | `/api/contrats/statut/{statut}` | Filtrer par statut (ex : `ACTIF`, `TERMINÉ`) |

---

### Interventions — `/api/interventions`

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/interventions/liste` | Lister toutes les interventions |
| `GET` | `/api/interventions/{id}` | Détail d'une intervention |
| `POST` | `/api/interventions/` | Créer une intervention |
| `GET` | `/api/interventions/appartement/{appartementId}` | Interventions d'un appartement |

---

## 6. Base de données

### Schéma des relations

```
Batiment ──< Gerant
Batiment ──< Appartement ──< Contrat >── Locataire
                   └───────< Intervention >── TypeIntervention
```

### Tables

#### `batiment`
| Colonne | Type | Description |
|---|---|---|
| `id` | PK | Identifiant auto |
| `nom` | VARCHAR | Nom de l'immeuble |
| `adresse` | VARCHAR | Adresse postale |
| `ville` | VARCHAR | Ville |

#### `gerant`
| Colonne | Type | Description |
|---|---|---|
| `id` | PK | Identifiant auto |
| `nom` | VARCHAR | Nom |
| `prenom` | VARCHAR | Prénom |
| `tel` | VARCHAR | Téléphone |
| `mail` | VARCHAR | Email (identifiant de connexion) |
| `password` | VARCHAR | Hash BCrypt |
| `batiment_id` | FK | Bâtiment géré |

#### `appartement`
| Colonne | Type | Description |
|---|---|---|
| `id` | PK | Identifiant auto |
| `numero` | VARCHAR | Numéro de l'appartement (ex : `A12`) |
| `surface` | FLOAT | Surface en m² |
| `nb_piece` | INT | Nombre de pièces |
| `description` | TEXT | Description libre |
| `batiment_id` | FK | Bâtiment d'appartenance |

#### `locataire`
| Colonne | Type | Description |
|---|---|---|
| `id` | PK | Identifiant auto |
| `nom` | VARCHAR | Nom |
| `prenom` | VARCHAR | Prénom |
| `mail` | VARCHAR | Email |
| `tel` | VARCHAR | Téléphone |

#### `contrat`
| Colonne | Type | Description |
|---|---|---|
| `id` | PK | Identifiant auto |
| `date_debut` | DATE | Date de début |
| `date_fin` | DATE | Date de fin (nullable si contrat en cours) |
| `montant_brut` | FLOAT | Loyer hors charges |
| `montant_charge` | FLOAT | Charges mensuelles |
| `statut` | VARCHAR | État du contrat (ex : `ACTIF`, `TERMINÉ`) |
| `appartement_id` | FK | Appartement concerné |
| `locataire_id` | FK | Locataire titulaire |

#### `intervention`
| Colonne | Type | Description |
|---|---|---|
| `id` | PK | Identifiant auto |
| `libelle` | VARCHAR | Titre court (ex : `Plomberie`) |
| `description` | TEXT | Détail de l'intervention |
| `adresse` | VARCHAR | Adresse |
| `ville` | VARCHAR | Ville |
| `heure` | TIME | Heure planifiée |
| `appartement_id` | FK | Appartement concerné |
| `type_intervention_id` | FK | Catégorie d'intervention |

#### `type_intervention`
| Colonne | Type | Description |
|---|---|---|
| `id` | PK | Identifiant auto |
| `libelle` | VARCHAR | Nom du type (ex : `Électricité`) |
| `description` | TEXT | Description |

---

### Comptes de démonstration

Les données d'exemple créent les gérants suivants. Les mots de passe sont stockés en hash BCrypt.  
Pour générer un hash : `GET /api/gerant/hash/{votre-mot-de-passe}`

| Email | Nom |
|---|---|
| `jojo@gmail.com` | Jojo Kujo |
| `frodon@gmail.com` | Frodon Sake |
| `titouan@gmail.com` | Tom Titouan |

---

## 7. Frontend — Pages et routes

### Routes publiques

| Route | Composant | Description |
|---|---|---|
| `/` | `ListAppartement` | Portail public — liste et recherche d'appartements |
| `/appartements/:id` | `AppartementDetail` | Fiche détaillée d'un appartement |
| `/appartements/:id/contrats` | `ContratPage` | Contrats de location liés à l'appartement |
| `/appartements/:id/interventions` | `InterventionPage` | Interventions liées à l'appartement |
| `/login` | `LoginPage` | Formulaire de connexion gérant |

### Routes protégées (`/gerant/*`)

L'accès est conditionné par la présence de la clé `gerant` dans `localStorage`. En l'absence de celle-ci, l'utilisateur est redirigé vers `/login`.

| Route | Composant | Description |
|---|---|---|
| `/gerant/dashboard` | `GerantDashboard` | Tableau de bord principal |
| `/gerant/appartements` | `GerantAppartements` | Gestion des appartements *(en développement)* |
| `/gerant/batiments` | `GerantBatiments` | Gestion des bâtiments *(en développement)* |

### Description des pages

**`ListAppartement`**  
Page d'accueil publique. Charge et affiche tous les appartements avec une barre de filtres (recherche textuelle, surface minimale, tri). Chaque carte renvoie vers la fiche détaillée.

**`AppartementDetail`**  
Affiche toutes les informations d'un appartement : numéro, surface, nombre de pièces, description, bâtiment. Si un gérant est connecté, des boutons permettent d'accéder aux contrats et aux interventions associés.

**`ContratPage`**  
Liste les contrats de location d'un appartement. Chaque carte présente le statut (avec badge coloré), les dates, le loyer brut, les charges et le montant total.

**`InterventionPage`**  
Liste les interventions de maintenance d'un appartement sous forme de tableau : type, description, adresse et heure planifiée.

**`LoginPage`**  
Formulaire d'authentification pour les gérants. Appelle `POST /api/gerant/login` et stocke la réponse dans `localStorage`.

**`GerantDashboard`**  
Interface principale du gérant. Comprend une sidebar de navigation (bâtiments, appartements, contrats, interventions) et un contenu central qui change selon l'onglet actif. Les données sont chargées à la demande depuis l'API.

---

## 8. Structure du projet

```
azurimmo/
│
├── README.md
│
├── azurimmo-backend/                        # Spring Boot
│   ├── pom.xml
│   └── src/main/
│       ├── java/bts/sio/azurimmo/
│       │   ├── AzurimmoApplication.java     # Point d'entrée
│       │   ├── SecurityConfig.java          # Configuration Spring Security + BCrypt
│       │   ├── CorsConfig.java              # Autorisation CORS (localhost:5173)
│       │   ├── controller/                  # Couche REST
│       │   │   ├── AppartementController.java
│       │   │   ├── BatimentController.java
│       │   │   ├── ContratController.java
│       │   │   ├── GerantController.java
│       │   │   └── InterventionController.java
│       │   ├── service/                     # Logique métier
│       │   │   ├── AppartementService.java
│       │   │   ├── BatimentService.java
│       │   │   ├── ContratService.java
│       │   │   ├── GerantService.java
│       │   │   └── InterventionService.java
│       │   ├── model/
│       │   │   ├── Appartement.java         # Entités JPA
│       │   │   ├── Batiment.java
│       │   │   ├── Contrat.java
│       │   │   ├── Gerant.java
│       │   │   ├── Intervention.java
│       │   │   ├── Locataire.java
│       │   │   ├── TypeIntervention.java
│       │   │   ├── dto/                     # Objets exposés par l'API
│       │   │   │   ├── AppartementDTO.java
│       │   │   │   ├── BatimentDTO.java
│       │   │   │   ├── ContratDTO.java
│       │   │   │   ├── GerantDTO.java
│       │   │   │   ├── InterventionDTO.java
│       │   │   │   ├── LocataireDTO.java
│       │   │   │   ├── LoginRequest.java
│       │   │   │   └── TypInterventionDTO.java
│       │   │   └── mapper/                  # Conversion Entité ↔ DTO
│       │   │       ├── AppartementMapper.java
│       │   │       ├── BatimentMapper.java
│       │   │       ├── ContratMapper.java
│       │   │       ├── GerantMapper.java
│       │   │       ├── InterventionMapper.java
│       │   │       ├── LocataireMapper.java
│       │   │       └── TypeInterventionMapper.java
│       │   └── repository/                  # Accès base de données (Spring Data JPA)
│       │       ├── AppartementRepository.java
│       │       ├── BatimentRepository.java
│       │       ├── ContratRepository.java
│       │       ├── GerantRepository.java
│       │       ├── InterventionRepository.java
│       │       ├── LocataireRepository.java
│       │       └── TypeInterventionRepository.java
│       └── resources/
│           ├── application.properties       # Configuration serveur et BDD
│           └── azurimmo.sql                 # Schéma SQL + données d'exemple
│
└── azurimmo-frontend/                       # React + TypeScript + Vite
    ├── .env                                 # VITE_API_BASE
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
        ├── main.tsx                         # Point d'entrée React
        ├── App.tsx                          # Définition des routes
        ├── types/
        │   └── index.ts                     # Interfaces TypeScript partagées
        ├── pages/
        │   ├── LoginPage.tsx
        │   ├── GerantDashboard.tsx
        │   ├── GerantAppartements.tsx
        │   └── GerantBatiments.tsx
        ├── components/
        │   ├── ListAppartement.tsx
        │   ├── AppartementDetail.tsx
        │   ├── ContratPage.tsx
        │   ├── InterventionPage.tsx
        │   ├── AppartementCard.tsx
        │   ├── AppartementModal.tsx
        │   ├── FilterBar.tsx
        │   └── ProtectedRoute.tsx
        └── *.css                            # Styles par composant + variables globales
```
