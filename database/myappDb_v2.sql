-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: beyuusl8yxmhjijvgtrc-mysql.services.clever-cloud.com:3306
-- Generation Time: Jun 09, 2023 at 08:51 PM
-- Server version: 8.0.22-13
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beyuusl8yxmhjijvgtrc`
--

-- --------------------------------------------------------

--
-- Table structure for table `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int NOT NULL,
  `rutaImg` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `nombreImg` varchar(50) DEFAULT NULL,
  `base64` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `imagenes`
--

INSERT INTO `imagenes` (`id`, `rutaImg`, `nombreImg`, `base64`) VALUES
(1, 'localhost', 'pruebaimg1', 'base64Code');

-- --------------------------------------------------------

--
-- Table structure for table `portafolio`
--

CREATE TABLE `portafolio` (
  `id` int NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `tagurl` varchar(45) DEFAULT NULL,
  `contenido` varchar(100) DEFAULT NULL,
  `proyecto` varchar(100) DEFAULT NULL,
  `cliente` varchar(45) DEFAULT NULL,
  `impresion` varchar(45) DEFAULT NULL,
  `portafoliocol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `portafolio`
--

INSERT INTO `portafolio` (`id`, `titulo`, `url`, `tagurl`, `contenido`, `proyecto`, `cliente`, `impresion`, `portafoliocol`) VALUES
(1, 'prueba1', 'prueba1', 'prueba1', 'prueba1', 'prueba1', 'prueba1', 'prueba1', 'prueba1');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `nombreUser` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombreUser`, `correo`, `pass`) VALUES
(1, 'Daniel', 'danielarango990@gmail.com', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portafolio`
--
ALTER TABLE `portafolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `id_portafolio` FOREIGN KEY (`id`) REFERENCES `portafolio` (`id`);

--
-- Constraints for table `portafolio`
--
ALTER TABLE `portafolio`
  ADD CONSTRAINT `usuario_id` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
