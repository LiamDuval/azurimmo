-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : lun. 23 mars 2026 à 09:53
-- Version du serveur : 11.3.2-MariaDB
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `azurimmo`
--

-- --------------------------------------------------------

--
-- Structure de la table `appartement`
--

DROP TABLE IF EXISTS `appartement`;
CREATE TABLE IF NOT EXISTS `appartement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `nb_piece` int(11) DEFAULT NULL,
  `surface` float DEFAULT NULL,
  `batiment_id` bigint(20) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5kn64l7l2m25kkryy4n50ikyb` (`batiment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `appartement`
--

INSERT INTO `appartement` (`id`, `description`, `nb_piece`, `surface`, `batiment_id`, `numero`) VALUES
(1, 'Gros et moche', 2, 2, 2, '2C'),
(2, 'Bien grand', 5, 2000, 1, '5B'),
(3, 'Wow ça change', 1, 1, 10, '3C');

-- --------------------------------------------------------

--
-- Structure de la table `batiment`
--

DROP TABLE IF EXISTS `batiment`;
CREATE TABLE IF NOT EXISTS `batiment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `adresse` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `batiment`
--

INSERT INTO `batiment` (`id`, `adresse`, `ville`) VALUES
(1, 'rue de pucchi', 'caen'),
(2, 'rue du mordor', 'conté'),
(10, 'rue de la mer', 'Toulon');

-- --------------------------------------------------------

--
-- Structure de la table `contrat`
--

DROP TABLE IF EXISTS `contrat`;
CREATE TABLE IF NOT EXISTS `contrat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `montant_brut` float DEFAULT NULL,
  `montant_charge` float DEFAULT NULL,
  `appartement_id` bigint(20) DEFAULT NULL,
  `date_debut` datetime(6) DEFAULT NULL,
  `date_fin` datetime(6) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `locataire_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1ahw6ibj07960n52ulfdoc96g` (`appartement_id`),
  KEY `FKp7hols6tlsatgb3ve32kbn5sv` (`locataire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gerant`
--

DROP TABLE IF EXISTS `gerant`;
CREATE TABLE IF NOT EXISTS `gerant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `tel` int(15) DEFAULT NULL,
  `batiment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpab3iukdqixg85aamntmexlaq` (`batiment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `gerant`
--

INSERT INTO `gerant` (`id`, `mail`, `nom`, `prenom`, `tel`, `batiment_id`) VALUES
(1, 'jojo@gmail.com', 'jotaro', 'kujo', 769118054, 1),
(2, 'frodon@gmail.com', 'frodon', 'sake', 767461054, 2),
(3, 'titouan@gmail.com', 'tom', 'titouan', 667761457, 10);

-- --------------------------------------------------------

--
-- Structure de la table `intervention`
--

DROP TABLE IF EXISTS `intervention`;
CREATE TABLE IF NOT EXISTS `intervention` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `adresse` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `heure` time(6) DEFAULT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `appartement_id` bigint(20) DEFAULT NULL,
  `type_intervention_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf6nntanyntpovh90a0u2hbj9v` (`appartement_id`),
  KEY `FKg80odl92m1wv1d2hml6t82wo8` (`type_intervention_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `intervention`
--

INSERT INTO `intervention` (`id`, `adresse`, `ville`, `description`, `heure`, `libelle`, `appartement_id`, `type_intervention_id`) VALUES
(1, '39 rue des epis d\'or', 'maltot', 'liam veut reparer son appart', '10:00:00.797000', 'fuite d\'eau', 2, NULL),
(2, '2 rue jules Guesde', 'Fleury-Sur-Orne', 'Maison en feu', '12:04:00.000000', 'Maison Bruler', 3, NULL),
(3, '39 rue des epis d\'or', 'maltot', 'liam changer les meubles de place', '11:00:00.000000', 'Deplacement', 2, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `locataire`
--

DROP TABLE IF EXISTS `locataire`;
CREATE TABLE IF NOT EXISTS `locataire` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `tel` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paiement_loyer`
--

DROP TABLE IF EXISTS `paiement_loyer`;
CREATE TABLE IF NOT EXISTS `paiement_loyer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_paiement` date DEFAULT NULL,
  `montant` float DEFAULT NULL,
  `contrat_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsoah3cvotrpe2o588n68bpb3w` (`contrat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `type_intervention`
--

DROP TABLE IF EXISTS `type_intervention`;
CREATE TABLE IF NOT EXISTS `type_intervention` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `type_intervention_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmgcrgy4stq0ksiawgl3hkaup` (`type_intervention_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appartement`
--
ALTER TABLE `appartement`
  ADD CONSTRAINT `FK5kn64l7l2m25kkryy4n50ikyb` FOREIGN KEY (`batiment_id`) REFERENCES `batiment` (`id`);

--
-- Contraintes pour la table `contrat`
--
ALTER TABLE `contrat`
  ADD CONSTRAINT `FK1ahw6ibj07960n52ulfdoc96g` FOREIGN KEY (`appartement_id`) REFERENCES `appartement` (`id`),
  ADD CONSTRAINT `FKp7hols6tlsatgb3ve32kbn5sv` FOREIGN KEY (`locataire_id`) REFERENCES `locataire` (`id`);

--
-- Contraintes pour la table `gerant`
--
ALTER TABLE `gerant`
  ADD CONSTRAINT `FKpab3iukdqixg85aamntmexlaq` FOREIGN KEY (`batiment_id`) REFERENCES `batiment` (`id`);

--
-- Contraintes pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD CONSTRAINT `FKf6nntanyntpovh90a0u2hbj9v` FOREIGN KEY (`appartement_id`) REFERENCES `appartement` (`id`),
  ADD CONSTRAINT `FKg80odl92m1wv1d2hml6t82wo8` FOREIGN KEY (`type_intervention_id`) REFERENCES `type_intervention` (`id`);

--
-- Contraintes pour la table `paiement_loyer`
--
ALTER TABLE `paiement_loyer`
  ADD CONSTRAINT `FKsoah3cvotrpe2o588n68bpb3w` FOREIGN KEY (`contrat_id`) REFERENCES `contrat` (`id`);

--
-- Contraintes pour la table `type_intervention`
--
ALTER TABLE `type_intervention`
  ADD CONSTRAINT `FKmgcrgy4stq0ksiawgl3hkaup` FOREIGN KEY (`type_intervention_id`) REFERENCES `type_intervention` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
