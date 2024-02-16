-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 16 fév. 2024 à 15:29
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `omnitask`
--

-- --------------------------------------------------------

--
-- Structure de la table `catégorie`
--

CREATE TABLE `catégorie` (
  `id_cat` int(11) NOT NULL,
  `intitule` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `catégorie`
--

INSERT INTO `catégorie` (`id_cat`, `intitule`) VALUES
(1, 'IT'),
(2, 'DEV'),
(3, 'MANAGEMENT'),
(4, 'BUSINESS');

-- --------------------------------------------------------

--
-- Structure de la table `tache`
--

CREATE TABLE `tache` (
  `id` int(11) NOT NULL,
  `id_cat` int(11) DEFAULT NULL,
  `intitule` varchar(255) DEFAULT NULL,
  `contenu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tache`
--

INSERT INTO `tache` (`id`, `id_cat`, `intitule`, `contenu`) VALUES
(2, 1, 'Deuxième test', 'Contenu du premier test'),
(3, NULL, 'lmklkmlk', 'mkmlkmlk'),
(4, 2, 'test', 'tftjffjgjf'),
(7, 4, 'test business 2', 'klnlk,mkl,'),
(8, 4, 'Test business', 'lol'),
(9, 3, 'Tache de management', 'Dans cette tâche il faut faire cela et cela');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `catégorie`
--
ALTER TABLE `catégorie`
  ADD PRIMARY KEY (`id_cat`);

--
-- Index pour la table `tache`
--
ALTER TABLE `tache`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cat` (`id_cat`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `catégorie`
--
ALTER TABLE `catégorie`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `tache`
--
ALTER TABLE `tache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `tache`
--
ALTER TABLE `tache`
  ADD CONSTRAINT `tache_ibfk_1` FOREIGN KEY (`id_cat`) REFERENCES `catégorie` (`id_cat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
