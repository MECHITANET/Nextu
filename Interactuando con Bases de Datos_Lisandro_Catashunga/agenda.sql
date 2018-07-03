-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2018 a las 04:34:52
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE ucs2_spanish_ci NOT NULL,
  `fechai` date NOT NULL,
  `horai` time NOT NULL,
  `fechaf` date NOT NULL,
  `horaf` time NOT NULL,
  `completo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish_ci;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `title`, `fechai`, `horai`, `fechaf`, `horaf`, `completo`) VALUES
(2, 'cumpleanos', '2018-07-18', '07:00:00', '2018-07-18', '07:00:00', 0),
(3, 'cumpleanos', '2018-07-18', '07:00:00', '2018-07-18', '07:00:00', 0),
(4, 'cumpleaÃ±os Judy', '2018-07-20', '07:00:00', '2018-07-20', '23:30:00', 0),
(5, 'cumpleaÃ±os Abril', '2018-07-11', '07:00:00', '2018-07-11', '23:30:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE ucs2_spanish_ci NOT NULL,
  `clave` varchar(100) COLLATE ucs2_spanish_ci NOT NULL,
  `nombre` varchar(100) COLLATE ucs2_spanish_ci NOT NULL,
  `fecha_nacimiento` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `clave`, `nombre`, `fecha_nacimiento`) VALUES
(1, 'user1@gmail.com', '122b738600a0f74f7c331c0ef59bc34c', 'lisandro catashunga', '2018-06-26 00:00:00'),
(2, 'user2@gmail.com', '2fb6c8d2f3842a5ceaa9bf320e649ff0', 'walter macedo', '2018-06-26 00:00:00'),
(3, 'user3@gmail.com', '5a54c609c08a0ab3f7f8eef1365bfda6', 'walter macedo', '2018-06-26 00:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
