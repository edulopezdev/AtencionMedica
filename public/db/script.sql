-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 21-10-2024 a las 03:50:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `atencion_medica`
--
CREATE DATABASE IF NOT EXISTS `atencion_medica` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `atencion_medica`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergia`
--

CREATE TABLE `alergia` (
  `id_alergia` int(11) NOT NULL,
  `nombre_alergia` varchar(100) NOT NULL,
  `importancia` enum('leve','normal','alta') DEFAULT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `numero_turno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `alergia`
--

INSERT INTO `alergia` (`id_alergia`, `nombre_alergia`, `importancia`, `fecha_desde`, `fecha_hasta`, `numero_turno`) VALUES
(1, 'Polen', 'alta', '2020-01-01', '2024-01-01', 1),
(2, 'Ácaros', 'normal', '2021-05-15', '2024-05-15', 2),
(3, 'Lácteos', 'alta', '2019-03-10', '2024-03-10', 3),
(4, 'Frutos secos', 'leve', '2018-08-08', '2024-08-08', 4),
(5, 'Mariscos', 'alta', '2020-12-12', '2024-12-12', 5),
(6, 'Gluten', 'normal', '2021-07-20', '2024-07-20', 6),
(7, 'Medicamentos', 'alta', '2020-11-11', '2024-11-11', 7),
(8, 'Polvo', 'normal', '2019-09-09', '2024-09-09', 8),
(9, 'Perfumes', 'leve', '2021-10-10', '2024-10-10', 9),
(10, 'Lana', 'leve', '2018-04-04', '2024-04-04', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `antecedente`
--

CREATE TABLE `antecedente` (
  `id_antecedente` int(11) NOT NULL,
  `descripcion_antecedente` varchar(300) NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `numero_turno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `antecedente`
--

INSERT INTO `antecedente` (`id_antecedente`, `descripcion_antecedente`, `fecha_desde`, `fecha_hasta`, `numero_turno`) VALUES
(1, 'Infarto de miocardio en 2010', '2010-05-10', '2024-01-05', 1),
(2, 'Cirugía de amígdalas en 2005', '2005-03-25', '2024-01-07', 2),
(3, 'Fractura de pierna en 2015', '2015-08-15', '2024-01-09', 3),
(4, 'Cáncer de mama en 2018', '2018-11-01', '2024-01-11', 4),
(5, 'Bronquitis crónica desde 2012', '2012-04-20', '2024-01-15', 5),
(6, 'Hipertensión arterial desde 2016', '2016-02-05', '2024-01-20', 6),
(7, 'Diabetes tipo 2 desde 2019', '2019-06-18', '2024-01-25', 7),
(8, 'Cirugía de apendicitis en 2020', '2020-09-12', '2024-01-30', 8),
(9, 'Alergia a penicilina desde 2017', '2017-12-01', '2024-02-03', 9),
(10, 'Tabaquismo desde 2000', '2000-01-01', '2024-02-05', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico`
--

CREATE TABLE `diagnostico` (
  `id_diagnostico` int(11) NOT NULL,
  `resumen_diagnostico` varchar(500) NOT NULL,
  `estado` enum('Preliminar','Confirmado') NOT NULL DEFAULT 'Preliminar',
  `numero_turno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `diagnostico`
--

INSERT INTO `diagnostico` (`id_diagnostico`, `resumen_diagnostico`, `estado`, `numero_turno`) VALUES
(1, 'Sospecha de angina, exámenes en proceso', 'Preliminar', 1),
(2, 'Consulta de control sin complicaciones', 'Confirmado', 2),
(3, 'Diagnóstico de dermatitis atópica', 'Confirmado', 3),
(4, 'Cáncer en remisión, tratamiento exitoso', 'Confirmado', 4),
(5, 'Bronquitis, tratamiento con broncodilatadores', 'Confirmado', 5),
(6, 'Migraña diagnosticada, seguimiento requerido', 'Preliminar', 6),
(7, 'Cancelación de cirugía por infección', 'Preliminar', 7),
(8, 'Examen ginecológico normal', 'Confirmado', 8),
(9, 'Infección urinaria tratada con antibióticos', 'Confirmado', 9),
(10, 'Ansiedad diagnosticada, inicio de tratamiento', 'Confirmado', 10),
(11, 'Consulta cardiológica sin anormalidades.', 'Confirmado', 11),
(12, 'Presión arterial dentro de los límites normales.', 'Confirmado', 12),
(13, 'Dermatitis leve observada.', 'Confirmado', 13),
(14, 'Posible gastritis, se recomienda tratamiento.', 'Preliminar', 14),
(15, 'Consulta ginecológica normal.', 'Confirmado', 15),
(16, 'Lesión ortopédica menor, reposo recomendado.', 'Confirmado', 16),
(17, 'Chequeo general sin hallazgos preocupantes.', 'Confirmado', 17),
(18, 'Chequeo endocrinológico normal.', 'Confirmado', 18),
(19, 'Evaluación psiquiátrica sin irregularidades.', 'Confirmado', 19),
(20, 'Sin hallazgos en consulta odontológica.', 'Confirmado', 20),
(21, 'Infección urinaria leve, tratamiento necesario.', 'Preliminar', 21),
(22, 'Insomnio leve, se sugiere terapia.', 'Preliminar', 22),
(23, 'Función pulmonar adecuada.', 'Confirmado', 23),
(24, 'Ansiedad moderada, se recomienda seguimiento.', 'Preliminar', 24),
(25, 'Chequeo de diabetes dentro de lo normal.', 'Confirmado', 25),
(26, 'Migrañas recurrentes, se sugiere tratamiento.', 'Preliminar', 26),
(27, 'Dolor muscular, se recomienda reposo.', 'Preliminar', 27),
(28, 'Chequeo neurológico sin hallazgos.', 'Confirmado', 28),
(29, 'Consulta ginecológica normal, seguimiento en seis meses.', 'Confirmado', 29),
(30, 'Presión arterial ligeramente elevada, seguimiento recomendado.', 'Preliminar', 30),
(31, 'Dermatitis leve observada en la piel.', 'Confirmado', 31),
(32, 'Dolor de espalda sin anormalidades.', 'Preliminar', 32),
(33, 'Chequeo ginecológico normal, se sugiere examen anual.', 'Confirmado', 33),
(34, 'Consulta cardiológica sin anormalidades.', 'Confirmado', 34),
(35, 'Lesión ortopédica leve, se recomienda tratamiento.', 'Preliminar', 35),
(36, 'Consulta traumatológica sin hallazgos relevantes.', 'Confirmado', 36),
(37, 'Colesterol en niveles normales.', 'Confirmado', 37),
(38, 'Evaluación psiquiátrica sin irregularidades.', 'Confirmado', 38),
(39, 'Presión arterial dentro de los límites normales.', 'Confirmado', 39),
(40, 'Chequeo neurológico sin hallazgos preocupantes.', 'Confirmado', 40),
(41, 'Chequeo oftalmológico sin irregularidades.', 'Confirmado', 41),
(42, 'Alergia leve, se recomienda antihistamínico.', 'Preliminar', 42),
(43, 'Dolor abdominal, se sugiere ecografía.', 'Preliminar', 43),
(44, 'Chequeo dermatológico sin hallazgos.', 'Confirmado', 44),
(45, 'Análisis de sangre normal.', 'Confirmado', 45),
(46, 'Consulta nutricional, dieta adecuada.', 'Confirmado', 46),
(47, 'Rinitis alérgica, se recomienda tratamiento.', 'Preliminar', 47),
(48, 'Dolor de cabeza, se sugiere consulta.', 'Preliminar', 48),
(49, 'Chequeo otorrinolaringológico normal.', 'Confirmado', 49),
(50, 'Control de colesterol, se recomienda seguimiento.', 'Preliminar', 50),
(51, 'Consulta endocrinológica, análisis necesarios.', 'Preliminar', 51),
(52, 'Chequeo de salud mental sin anormalidades.', 'Confirmado', 52),
(53, 'Problemas de sueño, se sugiere terapia.', 'Preliminar', 53),
(54, 'Consulta reumatológica sin hallazgos preocupantes.', 'Confirmado', 54),
(55, 'Control de presión arterial normal.', 'Confirmado', 55),
(56, 'Evaluación cardiovascular recomendada.', 'Preliminar', 56),
(57, 'Chequeo pediátrico normal.', 'Confirmado', 57),
(58, 'Consulta geriátrica sin irregularidades.', 'Confirmado', 58),
(59, 'Dolor articular leve, se recomienda reposo.', 'Preliminar', 59),
(60, 'Chequeo de fertilidad en parámetros normales.', 'Confirmado', 60),
(61, 'Infección respiratoria leve, tratamiento necesario.', 'Preliminar', 61),
(62, 'Chequeo de salud sexual normal.', 'Confirmado', 62),
(63, 'Evaluación del riesgo cardiovascular, se recomienda seguimiento.', 'Preliminar', 63),
(64, 'Consulta de salud ocupacional sin anormalidades.', 'Confirmado', 64),
(65, 'Chequeo de la función hepática normal.', 'Confirmado', 65),
(66, 'Dolor de cuello, se sugiere fisioterapia.', 'Preliminar', 66),
(67, 'Consulta alergológica sin hallazgos preocupantes.', 'Confirmado', 67),
(68, 'Chequeo geriátrico, se recomienda examen anual.', 'Confirmado', 68),
(69, 'Control de glucosa normal.', 'Confirmado', 69),
(70, 'Consulta dermatológica para lunares, seguimiento necesario.', 'Preliminar', 70),
(71, 'Chequeo endocrinológico normal, se sugiere seguimiento.', 'Confirmado', 71),
(72, 'Consulta para dejar de fumar, se recomienda programa.', 'Preliminar', 72),
(73, 'Chequeo de salud mental sin hallazgos.', 'Confirmado', 73),
(74, 'Consulta sobre salud reproductiva, examen normal.', 'Confirmado', 74),
(75, 'Chequeo de salud dental sin anormalidades.', 'Confirmado', 75),
(76, 'Dolor en las articulaciones, se recomienda tratamiento.', 'Preliminar', 76),
(77, 'Consulta sobre salud intestinal, se sugiere dieta.', 'Preliminar', 77),
(78, 'Chequeo neurológico normal, sin síntomas.', 'Confirmado', 78),
(79, 'Consulta dermatológica para manchas, seguimiento necesario.', 'Preliminar', 79),
(80, 'Chequeo ortopédico, se recomienda fisioterapia.', 'Preliminar', 80),
(81, 'Consulta de salud respiratoria sin irregularidades.', 'Confirmado', 81),
(82, 'Chequeo de salud ósea normal.', 'Confirmado', 82),
(83, 'Consulta sobre alimentación, se recomienda dieta balanceada.', 'Preliminar', 83),
(84, 'Control de hipertensión, seguimiento necesario.', 'Preliminar', 84),
(85, 'Chequeo pediátrico normal, se sugiere revisión anual.', 'Confirmado', 85),
(189, 'Consulta dermatológica para acne, se recomienda tratamiento.', 'Preliminar', 189),
(190, 'Chequeo cardíaco, todos los parámetros en rango normal.', 'Confirmado', 190),
(191, 'Dolor de rodilla, se sugiere fisioterapia.', 'Preliminar', 191),
(192, 'Evaluación nutricional, se recomienda ajuste de dieta.', 'Preliminar', 192),
(193, 'Chequeo de salud mental, se recomienda terapia grupal.', 'Preliminar', 193),
(194, 'Control de glucosa, resultado dentro de lo normal.', 'Confirmado', 194),
(195, 'Consulta pediátrica para vacunación, se recomienda seguimiento.', 'Preliminar', 195),
(196, 'Chequeo oftalmológico, se sugiere revisión anual.', 'Confirmado', 196),
(197, 'Evaluación ortopédica sin hallazgos preocupantes.', 'Confirmado', 197),
(198, 'Consulta de salud sexual, se recomienda examen anual.', 'Preliminar', 198),
(199, 'Chequeo dental, sin caries encontradas.', 'Confirmado', 199),
(200, 'Dolor en el pecho, se recomienda consulta inmediata.', 'Preliminar', 200),
(201, 'Chequeo de colesterol, se sugiere mantener dieta saludable.', 'Preliminar', 201),
(202, 'Consulta sobre problemas de sueño, se sugiere terapia.', 'Preliminar', 202),
(203, 'Chequeo de función renal normal.', 'Confirmado', 203),
(204, 'Evaluación psiquiátrica, se recomienda seguimiento.', 'Preliminar', 204),
(205, 'Consulta sobre ansiedad, se sugiere terapia cognitiva.', 'Preliminar', 205),
(206, 'Chequeo endocrinológico normal, se recomienda seguimiento en seis meses.', 'Confirmado', 206),
(207, 'Consulta para problemas de peso, se recomienda programa de nutrición.', 'Preliminar', 207),
(208, 'Chequeo de la vista, resultado dentro de lo normal.', 'Confirmado', 208),
(209, 'Dolor de espalda, se sugiere fisioterapia.', 'Preliminar', 209),
(210, 'Chequeo de salud reproductiva, se sugiere examen anual.', 'Confirmado', 210),
(211, 'Consulta para dejar de fumar, se recomienda seguimiento.', 'Preliminar', 211),
(212, 'Evaluación cardíaca sin hallazgos preocupantes.', 'Confirmado', 212),
(213, 'Consulta sobre salud mental, se sugiere terapia individual.', 'Preliminar', 213),
(214, 'Chequeo de salud digestiva normal.', 'Confirmado', 214),
(215, 'Dolor de muelas, se sugiere tratamiento dental.', 'Preliminar', 215),
(216, 'Consulta geriátrica sin irregularidades.', 'Confirmado', 216),
(217, 'Chequeo de salud pulmonar normal.', 'Confirmado', 217),
(218, 'Consulta endocrinológica para hipotiroidismo, se recomienda análisis.', 'Preliminar', 218),
(219, 'Chequeo otorrinolaringológico, se recomienda seguimiento.', 'Preliminar', 219),
(220, 'Consulta sobre salud intestinal, se sugiere revisión.', 'Preliminar', 220),
(221, 'Chequeo de salud auditiva normal.', 'Confirmado', 221),
(222, 'Consulta sobre problemas dermatológicos, se recomienda seguimiento.', 'Preliminar', 222),
(223, 'Chequeo de salud mental sin hallazgos preocupantes.', 'Confirmado', 223),
(224, 'Consulta sobre insomnio, se recomienda tratamiento médico.', 'Preliminar', 224),
(225, 'Chequeo pediátrico, se recomienda revisión anual.', 'Confirmado', 225),
(226, 'Consulta sobre alergias, se recomienda antihistamínico.', 'Preliminar', 226),
(227, 'Chequeo de salud reproductiva normal.', 'Confirmado', 227),
(228, 'Consulta para dolor de cuello, se recomienda fisioterapia.', 'Preliminar', 228),
(229, 'Chequeo de diabetes, se recomienda seguimiento cada seis meses.', 'Preliminar', 229),
(230, 'Consulta sobre salud cardiovascular, se recomienda chequeo anual.', 'Preliminar', 230),
(231, 'Chequeo ginecológico normal, se recomienda examen anual.', 'Confirmado', 231),
(232, 'Consulta dermatológica para eczemas, se sugiere tratamiento.', 'Preliminar', 232),
(233, 'Chequeo de salud mental, se sugiere terapia de grupo.', 'Preliminar', 233),
(234, 'Consulta sobre problemas respiratorios, se recomienda revisión.', 'Preliminar', 234),
(235, 'Chequeo de salud auditiva, se recomienda examen anual.', 'Confirmado', 235),
(236, 'Consulta sobre salud ósea, se recomienda análisis de densidad.', 'Preliminar', 236),
(237, 'Chequeo de salud endocrina, resultados normales.', 'Confirmado', 237),
(238, 'Consulta sobre problemas gastrointestinales, se recomienda dieta.', 'Preliminar', 238),
(239, 'Chequeo neurológico, sin hallazgos preocupantes.', 'Confirmado', 239),
(240, 'Consulta sobre salud mental, se recomienda seguimiento.', 'Preliminar', 240),
(241, 'Chequeo geriátrico normal, se sugiere examen anual.', 'Confirmado', 241),
(242, 'Consulta sobre problemas de peso, se recomienda programa de ejercicio.', 'Preliminar', 242),
(243, 'Chequeo de salud dental, se recomienda limpieza anual.', 'Confirmado', 243),
(244, 'Consulta sobre alergias alimentarias, se recomienda seguimiento.', 'Preliminar', 244),
(245, 'Chequeo general, todos los parámetros dentro de lo normal.', 'Confirmado', 245);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id_especialidad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `nombre`) VALUES
(1, 'Cardiología'),
(2, 'Pediatría'),
(3, 'Dermatología'),
(4, 'Oncología'),
(5, 'Neumología'),
(6, 'Neurología'),
(7, 'Cirugía'),
(8, 'Ginecología'),
(9, 'Urología'),
(10, 'Psiquiatría');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evolucion`
--

CREATE TABLE `evolucion` (
  `id_evolucion` int(11) NOT NULL,
  `resumen_evolucion` varchar(500) NOT NULL,
  `numero_turno` int(11) DEFAULT NULL,
  `id_template` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `evolucion`
--

INSERT INTO `evolucion` (`id_evolucion`, `resumen_evolucion`, `numero_turno`, `id_template`) VALUES
(1, 'Paciente estable, continuar tratamiento', 1, 1),
(2, 'Control sin complicaciones, alta', 2, 2),
(3, 'Lesión cutánea en proceso de cicatrización', 3, 3),
(4, 'Seguimiento de tratamiento oncológico', 4, 4),
(5, 'Mejoría significativa, continuar seguimiento', 5, 5),
(6, 'No se detectan anomalías en los estudios', 6, 6),
(7, 'Cirugía cancelada por complicaciones', 7, 7),
(8, 'Control ginecológico, sin novedades', 8, 8),
(9, 'Problemas urinarios controlados con medicación', 9, 9),
(10, 'Inicio de terapia psiquiátrica', 10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habito`
--

CREATE TABLE `habito` (
  `id_habito` int(11) NOT NULL,
  `descripcion_habito` varchar(300) NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `numero_turno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `habito`
--

INSERT INTO `habito` (`id_habito`, `descripcion_habito`, `fecha_desde`, `fecha_hasta`, `numero_turno`) VALUES
(1, 'Fumar 10 cigarrillos al día', '2015-01-01', '2023-06-01', 1),
(2, 'Consumo diario de alcohol moderado', '2018-03-15', '2023-06-01', 2),
(3, 'Ejercicio regular 3 veces por semana', '2020-07-10', '2023-06-01', 3),
(4, 'Alimentación vegetariana', '2017-05-20', '2023-06-01', 4),
(5, 'Sedentarismo', '2016-11-05', '2023-06-01', 5),
(6, 'Consumo de cafeína excesivo', '2021-08-01', '2023-06-01', 6),
(7, 'Uso prolongado de pantallas', '2019-09-12', '2023-06-01', 7),
(8, 'Dormir menos de 6 horas por día', '2015-02-18', '2023-06-01', 8),
(9, 'Ejercicio intenso todos los días', '2020-11-05', '2023-06-01', 9),
(10, 'Consumo de comida rápida 3 veces por semana', '2018-12-30', '2023-06-01', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `id_medicamento` int(11) NOT NULL,
  `nombre_medicamento` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`id_medicamento`, `nombre_medicamento`) VALUES
(1, 'Paracetamol 500mg'),
(2, 'Ibuprofeno 400mg'),
(3, 'Amoxicilina 500mg'),
(4, 'Cefalexina 500mg'),
(5, 'Metformina 850mg'),
(6, 'Omeprazol 20mg'),
(7, 'Loratadina 10mg'),
(8, 'Aspirina 100mg'),
(9, 'Clonazepam 0.5mg'),
(10, 'Atorvastatina 20mg'),
(11, 'Simvastatina 10mg'),
(12, 'Losartán 50mg'),
(13, 'Levotiroxina 50mcg'),
(14, 'Ranitidina 150mg'),
(15, 'Azitromicina 500mg'),
(16, 'Prednisona 20mg'),
(17, 'Diclofenaco 75mg'),
(18, 'Enalapril 10mg'),
(19, 'Furosemida 40mg'),
(20, 'Metronidazol 500mg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico`
--

CREATE TABLE `medico` (
  `matricula_medico` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medico`
--

INSERT INTO `medico` (`matricula_medico`, `nombre`, `apellido`, `password`) VALUES
(1, 'Carlos', 'Gomez', '$2b$10$5t2sv9aI6C9cbDtFlWp1iekWGMk.Addu7ha6dWzK50CC2Uc.1/Rzi'),
(2, 'Maria', 'Fernandez', '$2b$10$Kg.I6h/wU5tyLdkFoi9c2uqCMklOLerC1b0g5pbBN/ClKNCGMA4xO'),
(3, 'Jose', 'Perez', '$2b$10$g8nk0mgsg.ORBhO9GHXSceqEIhs/A1mZRqUzlXEBoyBP680jlhnQ6'),
(4, 'Ana', 'Lopez', '$2b$10$ebhAaqXHbMECbbXCBnFjFOJsz3yQ93XDktcTX7Otu341Srthv/PTO'),
(5, 'Juan', 'Martinez', '$2b$10$yPpOc2AgYjACPNkF8HLABuf4lBM9A1usx8Pj6QkS5/BVxqPVvAste'),
(6, 'Lucia', 'Gonzalez', '$2b$10$Z0.Rj8x/tBLvus93Q5Wjo.iiBHAfqYoB.dvP4XXTeargBl2VbtMXW'),
(7, 'Miguel', 'Rodriguez', '$2b$10$SVA978pDjZyn1Eseoa2Ka.IX2XEeX/gvFmU3tZ5IjrqJS04voteAq'),
(8, 'Sofia', 'Diaz', '$2b$10$dhSrsF87d.gpk51UzREUYuJNZW79FoO71SUmzyFng0R3Kj3bX11da'),
(9, 'Fernando', 'Romero', '$2b$10$oQfQQD50onu2dE/JSh.t1eqahnYbZ2lvxhqBw0WngjIswEnl0yna.'),
(10, 'Clara', 'Sanchez', '$2b$10$L9BYQG83bbPwkR9jk9.4Du67c31QsR95P4NL9IuOVMCMNpD0.vkyi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico_especialidad`
--

CREATE TABLE `medico_especialidad` (
  `matricula_medico` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medico_especialidad`
--

INSERT INTO `medico_especialidad` (`matricula_medico`, `id_especialidad`) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 3),
(3, 3),
(3, 5),
(4, 4),
(4, 8),
(5, 4),
(5, 5),
(6, 6),
(6, 8),
(7, 5),
(7, 7),
(8, 8),
(8, 9),
(9, 9),
(9, 10),
(10, 1),
(10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `dni_paciente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`dni_paciente`, `nombre`, `apellido`, `fecha_nacimiento`, `direccion`, `telefono`) VALUES
(11234567, 'Alicia', 'Morales', '1983-06-18', 'Calle Belgrano 456', '555-6666'),
(12345678, 'Pedro', 'Hernandez', '1980-05-15', 'Calle Falsa 123', '555-1234'),
(23456789, 'Laura', 'Gimenez', '1990-08-22', 'Av. Libertad 456', '555-5678'),
(34567890, 'Jorge', 'Ramirez', '1975-03-30', 'Calle Luna 789', '555-9876'),
(45678901, 'Sandra', 'Alvarez', '1985-12-10', 'Av. Sol 654', '555-5432'),
(56789012, 'Hugo', 'Martinez', '2000-09-05', 'Calle Norte 321', '555-1111'),
(67890123, 'Gloria', 'Diaz', '1995-07-19', 'Calle Sur 987', '555-2222'),
(78901234, 'Oscar', 'Fernandez', '1988-04-25', 'Av. Este 456', '555-3333'),
(89012345, 'Nora', 'Perez', '1979-11-11', 'Calle Oeste 789', '555-4444'),
(90123456, 'Diego', 'Mendez', '1992-02-15', 'Av. Colón 123', '555-5555'),
(101234567, 'Juan', 'Pérez', '1990-05-15', 'Av. Siempre Viva 123', '111222333'),
(102345678, 'Ana', 'Gómez', '1985-08-20', 'Calle Falsa 456', '222333444'),
(103456789, 'Luis', 'Martínez', '1992-03-10', 'Boulevard de los Sueños 789', '333444555'),
(104567890, 'Laura', 'Hernández', '1988-12-01', 'Plaza Mayor 101', '444555666'),
(105678901, 'Carlos', 'López', '1975-11-30', 'Camino Real 202', '555666777'),
(106789012, 'María', 'Díaz', '2000-01-15', 'Av. del Libertador 303', '666777888'),
(107890123, 'José', 'Cruz', '1995-07-25', 'Calle de la Paz 404', '777888999'),
(108901234, 'Sofía', 'Morales', '1998-04-18', 'Paseo de la Reforma 505', '888999000'),
(109012345, 'Diego', 'Castro', '1982-06-22', 'Avenida de Mayo 606', '999000111'),
(110123456, 'Isabella', 'Torres', '1994-10-12', 'Calle de la Estrella 707', '000111222'),
(111234567, 'Fernando', 'Ramírez', '1980-09-09', 'Avenida Siempre Viva 808', '111222333'),
(112345678, 'Valentina', 'Jiménez', '1991-02-15', 'Calle de los Santos 909', '222333444'),
(113456789, 'Pablo', 'Sánchez', '1986-05-30', 'Paseo de la Victoria 1010', '333444555'),
(114567890, 'Camila', 'Rojas', '1993-03-25', 'Calle Nueva 1111', '444555666'),
(115678901, 'Andrés', 'Bermúdez', '1999-08-14', 'Av. del Sol 1212', '555666777'),
(116789012, 'Natalia', 'Vásquez', '1984-07-05', 'Calle del Viento 1313', '666777888'),
(117890123, 'Ricardo', 'Gutiérrez', '1978-11-21', 'Calle de la Esperanza 1414', '777888999'),
(118901234, 'Mariana', 'Ríos', '1997-12-30', 'Calle del Mar 1515', '888999000'),
(119012345, 'Eduardo', 'Salinas', '1990-05-12', 'Avenida del Tiempo 1616', '999000111'),
(120123456, 'Patricia', 'Mora', '1985-09-17', 'Calle de los Abetos 1717', '111222333'),
(121234567, 'Hugo', 'Castillo', '1983-01-01', 'Paseo del Lago 1818', '222333444'),
(122345678, 'Gabriela', 'Maldonado', '1996-03-21', 'Calle de los Pinos 1919', '333444555'),
(123456789, 'Javier', 'Olivares', '1989-06-15', 'Avenida de los Águilas 2020', '444555666'),
(124567890, 'Liliana', 'Ceballos', '1981-04-28', 'Calle del Cielo 2121', '555666777'),
(125678901, 'Samuel', 'Parra', '1998-07-10', 'Av. de la Luna 2222', '666777888'),
(126789012, 'Teresa', 'Alonso', '1987-02-14', 'Calle del Sol 2323', '777888999'),
(127890123, 'Leonardo', 'Escobar', '1994-08-22', 'Calle de la Historia 2424', '888999000'),
(128901234, 'Alicia', 'Paniagua', '1993-11-09', 'Avenida del Estudiante 2525', '999000111'),
(129012345, 'Felipe', 'Paredes', '1995-05-17', 'Calle de la Amistad 2626', '000111222'),
(130123456, 'Claudia', 'Correa', '1990-10-30', 'Calle del Silencio 2727', '111222333'),
(131234567, 'Oscar', 'Galindo', '1984-06-12', 'Av. del Encuentro 2828', '222333444'),
(132345678, 'Carmen', 'Salas', '1992-04-29', 'Calle de los Suspiros 2929', '333444555');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--

CREATE TABLE `receta` (
  `id_receta` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `numero_turno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `receta`
--

INSERT INTO `receta` (`id_receta`, `id_medicamento`, `numero_turno`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10),
(11, 11, 11),
(12, 12, 12),
(13, 13, 13),
(14, 14, 14),
(15, 15, 15),
(16, 16, 16),
(17, 17, 17),
(18, 18, 18),
(19, 19, 19),
(20, 20, 20),
(21, 1, 21),
(22, 2, 22),
(23, 3, 23),
(24, 4, 24),
(25, 5, 25),
(26, 6, 26),
(27, 7, 27),
(28, 8, 28),
(29, 9, 29),
(30, 10, 30),
(31, 11, 31),
(32, 12, 32),
(33, 13, 33),
(34, 14, 34),
(35, 15, 35),
(36, 16, 36),
(37, 17, 37),
(38, 18, 38),
(39, 19, 39),
(40, 20, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `templates`
--

CREATE TABLE `templates` (
  `id_template` int(11) NOT NULL,
  `nombre_template` varchar(100) NOT NULL,
  `contenido_template` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `templates`
--

INSERT INTO `templates` (`id_template`, `nombre_template`, `contenido_template`) VALUES
(1, 'Internación', 'Se solicita internación del paciente ___________ dni __________ atendido el día _________, su diagnóstico _____________'),
(2, 'Pedido de Análisis', 'Se solicita la realización de los siguientes análisis: ___________ para el paciente ___________ dni __________.'),
(3, 'Receta Médica', 'Se prescribe el medicamento ___________ en dosis de ___________ para el paciente ___________ dni __________.'),
(4, 'Informe de Consulta', 'Informe de consulta para el paciente ___________ dni __________, motivo de consulta: ___________, diagnóstico: ____________.'),
(5, 'Seguimiento', 'Seguimiento del paciente ___________ dni __________, con diagnóstico _____________, próximo control el ____________.'),
(6, 'Alta', 'Se da de alta al paciente ___________ dni __________, con el diagnóstico ____________ y recomendaciones: ____________.'),
(7, 'Referencia', 'Se refiere al paciente ___________ dni __________ al especialista ___________ para evaluación de ____________.'),
(8, 'Consentimiento', 'Se solicita el consentimiento informado del paciente ___________ dni __________ para proceder con ____________.'),
(9, 'Notificación', 'Se notifica al paciente ___________ dni __________ sobre su próxima cita el ____________ a las ____________.'),
(10, 'Educación al Paciente', 'Se proporciona educación al paciente ___________ dni __________ sobre su diagnóstico _____________ y tratamiento ____________.'),
(11, 'Vacunación', 'Registro de vacunación del paciente ___________ dni __________, vacuna administrada: ____________, fecha: ____________.'),
(12, 'Control de Enfermedad Crónica', 'Control de enfermedad crónica para el paciente ___________ dni __________, diagnóstico: _____________, tratamiento: ____________.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `numero_turno` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `hora` time NOT NULL,
  `motivo_consulta` varchar(255) NOT NULL,
  `estado` enum('Pendiente','Atendido','Cancelado') DEFAULT 'Pendiente',
  `dni_paciente` int(11) DEFAULT NULL,
  `matricula_medico` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`numero_turno`, `fecha`, `hora`, `motivo_consulta`, `estado`, `dni_paciente`, `matricula_medico`, `id_especialidad`) VALUES
(1, '2024-10-16 00:00:00', '08:00:00', 'Consulta cardiológica', 'Pendiente', 11234567, 6, 1),
(2, '2024-10-16 00:00:00', '09:30:00', 'Chequeo de presión arterial', 'Pendiente', 23456789, 8, 2),
(3, '2024-10-16 00:00:00', '11:00:00', 'Consulta dermatológica', 'Pendiente', 34567890, 9, 3),
(4, '2024-10-16 00:00:00', '13:00:00', 'Dolor de estómago', 'Pendiente', 45678901, 10, 4),
(5, '2024-10-16 00:00:00', '15:30:00', 'Consulta ginecológica', 'Pendiente', 56789012, 1, 5),
(6, '2024-10-17 00:00:00', '08:30:00', 'Consulta ortopédica', 'Pendiente', 67890123, 2, 6),
(7, '2024-10-17 00:00:00', '10:00:00', 'Chequeo general', 'Pendiente', 78901234, 3, 7),
(8, '2024-10-17 00:00:00', '12:00:00', 'Chequeo endocrinológico', 'Pendiente', 89012345, 4, 8),
(9, '2024-10-17 00:00:00', '14:00:00', 'Consulta psiquiátrica', 'Pendiente', 90123456, 5, 9),
(10, '2024-10-17 00:00:00', '16:00:00', 'Consulta odontológica', 'Pendiente', 11234567, 6, 10),
(11, '2024-10-18 00:00:00', '08:45:00', 'Consulta urológica', 'Pendiente', 12345678, 7, 1),
(12, '2024-10-18 00:00:00', '10:15:00', 'Consulta por insomnio', 'Pendiente', 23456789, 8, 2),
(13, '2024-10-18 00:00:00', '12:45:00', 'Chequeo pulmonar', 'Pendiente', 34567890, 9, 3),
(14, '2024-10-18 00:00:00', '14:30:00', 'Consulta por ansiedad', 'Pendiente', 45678901, 10, 4),
(15, '2024-10-18 00:00:00', '16:00:00', 'Chequeo de diabetes', 'Pendiente', 56789012, 1, 5),
(16, '2024-10-21 00:00:00', '09:00:00', 'Consulta por migraña', 'Pendiente', 67890123, 2, 6),
(17, '2024-10-21 00:00:00', '11:00:00', 'Dolor muscular', 'Pendiente', 78901234, 3, 7),
(18, '2024-10-21 00:00:00', '13:00:00', 'Chequeo neurológico', 'Pendiente', 89012345, 4, 8),
(19, '2024-10-21 00:00:00', '15:00:00', 'Consulta ginecológica', 'Pendiente', 90123456, 5, 9),
(20, '2024-10-21 00:00:00', '17:00:00', 'Chequeo de presión arterial', 'Pendiente', 11234567, 6, 10),
(21, '2024-10-22 00:00:00', '08:15:00', 'Consulta dermatológica', 'Pendiente', 12345678, 7, 1),
(22, '2024-10-22 00:00:00', '10:00:00', 'Dolor de espalda', 'Pendiente', 23456789, 8, 2),
(23, '2024-10-22 00:00:00', '12:00:00', 'Chequeo ginecológico', 'Pendiente', 34567890, 9, 3),
(24, '2024-10-22 00:00:00', '14:00:00', 'Consulta cardiológica', 'Pendiente', 45678901, 10, 4),
(25, '2024-10-22 00:00:00', '16:00:00', 'Consulta ortopédica', 'Pendiente', 56789012, 1, 5),
(26, '2024-10-23 00:00:00', '09:30:00', 'Consulta traumatológica', 'Pendiente', 67890123, 2, 6),
(27, '2024-10-23 00:00:00', '11:00:00', 'Chequeo de colesterol', 'Pendiente', 78901234, 3, 7),
(28, '2024-10-23 00:00:00', '13:00:00', 'Consulta psiquiátrica', 'Pendiente', 89012345, 4, 8),
(29, '2024-10-23 00:00:00', '15:00:00', 'Chequeo de presión arterial', 'Pendiente', 90123456, 5, 9),
(30, '2024-10-23 00:00:00', '17:00:00', 'Consulta neurológica', 'Pendiente', 11234567, 6, 10),
(31, '2024-10-16 00:00:00', '08:00:00', 'Consulta cardiológica', 'Pendiente', 11234567, 6, 1),
(32, '2024-10-16 00:00:00', '09:30:00', 'Chequeo de presión arterial', 'Pendiente', 23456789, 8, 2),
(33, '2024-10-16 00:00:00', '11:00:00', 'Consulta dermatológica', 'Pendiente', 34567890, 9, 3),
(34, '2024-10-16 00:00:00', '13:00:00', 'Dolor de estómago', 'Pendiente', 45678901, 10, 4),
(35, '2024-10-16 00:00:00', '15:30:00', 'Consulta ginecológica', 'Pendiente', 56789012, 1, 5),
(36, '2024-10-17 00:00:00', '08:30:00', 'Consulta ortopédica', 'Pendiente', 67890123, 2, 6),
(37, '2024-10-17 00:00:00', '10:00:00', 'Chequeo general', 'Pendiente', 78901234, 3, 7),
(38, '2024-10-17 00:00:00', '12:00:00', 'Chequeo endocrinológico', 'Pendiente', 89012345, 4, 8),
(39, '2024-10-17 00:00:00', '14:00:00', 'Consulta psiquiátrica', 'Pendiente', 90123456, 5, 9),
(40, '2024-10-17 00:00:00', '16:00:00', 'Consulta odontológica', 'Pendiente', 11234567, 6, 10),
(41, '2024-10-18 00:00:00', '08:45:00', 'Consulta urológica', 'Pendiente', 12345678, 7, 1),
(42, '2024-10-18 00:00:00', '10:15:00', 'Consulta por insomnio', 'Pendiente', 23456789, 8, 2),
(43, '2024-10-18 00:00:00', '12:45:00', 'Chequeo pulmonar', 'Pendiente', 34567890, 9, 3),
(44, '2024-10-18 00:00:00', '14:30:00', 'Consulta por ansiedad', 'Pendiente', 45678901, 10, 4),
(45, '2024-10-18 00:00:00', '16:00:00', 'Chequeo de diabetes', 'Pendiente', 56789012, 1, 5),
(46, '2024-10-21 00:00:00', '09:00:00', 'Consulta por migraña', 'Pendiente', 67890123, 2, 6),
(47, '2024-10-21 00:00:00', '11:00:00', 'Dolor muscular', 'Pendiente', 78901234, 3, 7),
(48, '2024-10-21 00:00:00', '13:00:00', 'Chequeo neurológico', 'Pendiente', 89012345, 4, 8),
(49, '2024-10-21 00:00:00', '15:00:00', 'Consulta ginecológica', 'Pendiente', 90123456, 5, 9),
(50, '2024-10-21 00:00:00', '17:00:00', 'Chequeo de presión arterial', 'Pendiente', 11234567, 6, 10),
(51, '2024-10-22 00:00:00', '08:15:00', 'Consulta dermatológica', 'Pendiente', 12345678, 7, 1),
(52, '2024-10-22 00:00:00', '10:00:00', 'Dolor de espalda', 'Pendiente', 23456789, 8, 2),
(53, '2024-10-22 00:00:00', '12:00:00', 'Chequeo ginecológico', 'Pendiente', 34567890, 9, 3),
(54, '2024-10-22 00:00:00', '14:00:00', 'Consulta cardiológica', 'Pendiente', 45678901, 10, 4),
(55, '2024-10-22 00:00:00', '16:00:00', 'Consulta ortopédica', 'Pendiente', 56789012, 1, 5),
(56, '2024-10-23 00:00:00', '09:30:00', 'Consulta traumatológica', 'Pendiente', 67890123, 2, 6),
(57, '2024-10-23 00:00:00', '11:00:00', 'Chequeo de colesterol', 'Pendiente', 78901234, 3, 7),
(58, '2024-10-23 00:00:00', '13:00:00', 'Consulta psiquiátrica', 'Pendiente', 89012345, 4, 8),
(59, '2024-10-23 00:00:00', '15:00:00', 'Chequeo de presión arterial', 'Pendiente', 90123456, 5, 9),
(60, '2024-10-23 00:00:00', '17:00:00', 'Consulta neurológica', 'Pendiente', 11234567, 6, 10),
(61, '2024-10-17 00:00:00', '08:30:00', 'Consulta ortopédica', 'Pendiente', 67890123, 2, 6),
(62, '2024-10-17 00:00:00', '10:00:00', 'Chequeo general', 'Pendiente', 78901234, 3, 7),
(63, '2024-10-17 00:00:00', '12:00:00', 'Chequeo endocrinológico', 'Pendiente', 89012345, 4, 8),
(64, '2024-10-17 00:00:00', '14:00:00', 'Consulta psiquiátrica', 'Pendiente', 90123456, 5, 9),
(65, '2024-10-17 00:00:00', '16:00:00', 'Consulta odontológica', 'Pendiente', 11234567, 6, 10),
(66, '2024-10-18 00:00:00', '08:45:00', 'Consulta urológica', 'Pendiente', 12345678, 7, 1),
(67, '2024-10-18 00:00:00', '10:15:00', 'Consulta por insomnio', 'Pendiente', 23456789, 8, 2),
(68, '2024-10-18 00:00:00', '12:45:00', 'Chequeo pulmonar', 'Pendiente', 34567890, 9, 3),
(69, '2024-10-18 00:00:00', '14:30:00', 'Consulta por ansiedad', 'Pendiente', 45678901, 10, 4),
(70, '2024-10-18 00:00:00', '16:00:00', 'Chequeo de diabetes', 'Pendiente', 56789012, 1, 5),
(71, '2024-10-21 00:00:00', '09:00:00', 'Consulta por migraña', 'Pendiente', 67890123, 2, 6),
(72, '2024-10-21 00:00:00', '11:00:00', 'Dolor muscular', 'Pendiente', 78901234, 3, 7),
(73, '2024-10-21 00:00:00', '13:00:00', 'Chequeo neurológico', 'Pendiente', 89012345, 4, 8),
(74, '2024-10-21 00:00:00', '15:00:00', 'Consulta ginecológica', 'Pendiente', 90123456, 5, 9),
(75, '2024-10-21 00:00:00', '17:00:00', 'Chequeo de presión arterial', 'Pendiente', 11234567, 6, 10),
(76, '2024-10-22 00:00:00', '08:15:00', 'Consulta dermatológica', 'Pendiente', 12345678, 7, 1),
(77, '2024-10-22 00:00:00', '10:00:00', 'Dolor de espalda', 'Pendiente', 23456789, 8, 2),
(78, '2024-10-22 00:00:00', '12:00:00', 'Chequeo ginecológico', 'Pendiente', 34567890, 9, 3),
(79, '2024-10-22 00:00:00', '14:00:00', 'Consulta cardiológica', 'Pendiente', 45678901, 10, 4),
(80, '2024-10-22 00:00:00', '16:00:00', 'Consulta ortopédica', 'Pendiente', 56789012, 1, 5),
(81, '2024-10-23 00:00:00', '09:30:00', 'Consulta traumatológica', 'Pendiente', 67890123, 2, 6),
(82, '2024-10-23 00:00:00', '11:00:00', 'Chequeo de colesterol', 'Pendiente', 78901234, 3, 7),
(83, '2024-10-23 00:00:00', '13:00:00', 'Consulta psiquiátrica', 'Pendiente', 89012345, 4, 8),
(84, '2024-10-23 00:00:00', '15:00:00', 'Chequeo de presión arterial', 'Pendiente', 90123456, 5, 9),
(85, '2024-10-23 00:00:00', '17:00:00', 'Consulta neurológica', 'Pendiente', 11234567, 6, 10),
(189, '2024-10-15 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 101234567, 1, 1),
(190, '2024-10-15 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 102345678, 1, 1),
(191, '2024-10-16 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 103456789, 2, 2),
(192, '2024-10-16 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 104567890, 2, 2),
(193, '2024-10-17 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 105678901, 3, 3),
(194, '2024-10-17 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 106789012, 3, 3),
(195, '2024-10-18 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 107890123, 4, 4),
(196, '2024-10-18 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 108901234, 4, 4),
(197, '2024-10-19 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 109012345, 5, 5),
(198, '2024-10-19 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 110123456, 5, 5),
(199, '2024-10-20 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 111234567, 6, 6),
(200, '2024-10-20 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 112345678, 6, 6),
(201, '2024-10-21 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 113456789, 7, 7),
(202, '2024-10-21 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 114567890, 7, 7),
(203, '2024-10-22 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 115678901, 8, 8),
(204, '2024-10-22 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 116789012, 8, 8),
(205, '2024-10-23 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 117890123, 9, 9),
(206, '2024-10-23 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 118901234, 9, 9),
(207, '2024-10-24 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 119012345, 10, 10),
(208, '2024-10-24 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 120123456, 10, 10),
(209, '2024-10-25 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 121234567, 1, 1),
(210, '2024-10-25 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 122345678, 1, 1),
(211, '2024-10-26 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 123456789, 2, 2),
(212, '2024-10-26 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 124567890, 2, 2),
(213, '2024-10-27 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 125678901, 3, 3),
(214, '2024-10-27 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 126789012, 3, 3),
(215, '2024-10-28 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 127890123, 4, 4),
(216, '2024-10-28 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 128901234, 4, 4),
(217, '2024-10-29 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 129012345, 5, 5),
(218, '2024-10-29 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 130123456, 5, 5),
(219, '2024-10-30 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 101234567, 6, 6),
(220, '2024-10-30 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 102345678, 6, 6),
(221, '2024-10-31 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 103456789, 7, 7),
(222, '2024-10-31 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 104567890, 7, 7),
(223, '2024-11-01 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 105678901, 8, 8),
(224, '2024-11-01 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 106789012, 8, 8),
(225, '2024-11-02 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 107890123, 9, 9),
(226, '2024-11-02 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 108901234, 9, 9),
(227, '2024-11-03 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 109012345, 10, 10),
(228, '2024-11-03 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 110123456, 10, 10),
(229, '2024-11-04 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 111234567, 1, 1),
(230, '2024-11-04 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 112345678, 1, 1),
(231, '2024-11-05 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 113456789, 2, 2),
(232, '2024-11-05 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 114567890, 2, 2),
(233, '2024-11-06 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 115678901, 3, 3),
(234, '2024-11-06 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 116789012, 3, 3),
(235, '2024-11-07 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 117890123, 4, 4),
(236, '2024-11-07 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 118901234, 4, 4),
(237, '2024-11-08 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 119012345, 5, 5),
(238, '2024-11-08 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 120123456, 5, 5),
(239, '2024-11-09 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 121234567, 6, 6),
(240, '2024-11-09 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 122345678, 6, 6),
(241, '2024-11-10 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 123456789, 7, 7),
(242, '2024-11-10 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 124567890, 7, 7),
(243, '2024-11-11 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 125678901, 8, 8),
(244, '2024-11-11 00:00:00', '09:15:00', 'Consulta general', 'Pendiente', 126789012, 8, 8),
(245, '2024-11-12 00:00:00', '09:00:00', 'Consulta general', 'Pendiente', 127890123, 9, 9);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alergia`
--
ALTER TABLE `alergia`
  ADD PRIMARY KEY (`id_alergia`),
  ADD KEY `numero_turno` (`numero_turno`);

--
-- Indices de la tabla `antecedente`
--
ALTER TABLE `antecedente`
  ADD PRIMARY KEY (`id_antecedente`),
  ADD KEY `numero_turno` (`numero_turno`);

--
-- Indices de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD PRIMARY KEY (`id_diagnostico`),
  ADD KEY `numero_turno` (`numero_turno`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `evolucion`
--
ALTER TABLE `evolucion`
  ADD PRIMARY KEY (`id_evolucion`),
  ADD KEY `numero_turno` (`numero_turno`),
  ADD KEY `evolucion_fk_template` (`id_template`);

--
-- Indices de la tabla `habito`
--
ALTER TABLE `habito`
  ADD PRIMARY KEY (`id_habito`),
  ADD KEY `numero_turno` (`numero_turno`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`id_medicamento`);

--
-- Indices de la tabla `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`matricula_medico`);

--
-- Indices de la tabla `medico_especialidad`
--
ALTER TABLE `medico_especialidad`
  ADD PRIMARY KEY (`matricula_medico`,`id_especialidad`),
  ADD KEY `fk_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`dni_paciente`);

--
-- Indices de la tabla `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`id_receta`),
  ADD KEY `id_medicamento` (`id_medicamento`),
  ADD KEY `numero_turno` (`numero_turno`);

--
-- Indices de la tabla `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id_template`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`numero_turno`),
  ADD KEY `dni_paciente` (`dni_paciente`),
  ADD KEY `id_especialidad` (`id_especialidad`),
  ADD KEY `matricula_medico` (`matricula_medico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alergia`
--
ALTER TABLE `alergia`
  MODIFY `id_alergia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `antecedente`
--
ALTER TABLE `antecedente`
  MODIFY `id_antecedente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  MODIFY `id_diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `evolucion`
--
ALTER TABLE `evolucion`
  MODIFY `id_evolucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `habito`
--
ALTER TABLE `habito`
  MODIFY `id_habito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `id_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `medico`
--
ALTER TABLE `medico`
  MODIFY `matricula_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `receta`
--
ALTER TABLE `receta`
  MODIFY `id_receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `templates`
--
ALTER TABLE `templates`
  MODIFY `id_template` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `numero_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alergia`
--
ALTER TABLE `alergia`
  ADD CONSTRAINT `alergia_ibfk_1` FOREIGN KEY (`numero_turno`) REFERENCES `turno` (`numero_turno`);

--
-- Filtros para la tabla `antecedente`
--
ALTER TABLE `antecedente`
  ADD CONSTRAINT `antecedente_ibfk_1` FOREIGN KEY (`numero_turno`) REFERENCES `turno` (`numero_turno`);

--
-- Filtros para la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD CONSTRAINT `diagnostico_ibfk_1` FOREIGN KEY (`numero_turno`) REFERENCES `turno` (`numero_turno`);

--
-- Filtros para la tabla `evolucion`
--
ALTER TABLE `evolucion`
  ADD CONSTRAINT `evolucion_fk_template` FOREIGN KEY (`id_template`) REFERENCES `templates` (`id_template`) ON DELETE CASCADE,
  ADD CONSTRAINT `evolucion_ibfk_1` FOREIGN KEY (`numero_turno`) REFERENCES `turno` (`numero_turno`);

--
-- Filtros para la tabla `habito`
--
ALTER TABLE `habito`
  ADD CONSTRAINT `habito_ibfk_1` FOREIGN KEY (`numero_turno`) REFERENCES `turno` (`numero_turno`);

--
-- Filtros para la tabla `medico_especialidad`
--
ALTER TABLE `medico_especialidad`
  ADD CONSTRAINT `fk_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_medico` FOREIGN KEY (`matricula_medico`) REFERENCES `medico` (`matricula_medico`) ON DELETE CASCADE;

--
-- Filtros para la tabla `receta`
--
ALTER TABLE `receta`
  ADD CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento` (`id_medicamento`),
  ADD CONSTRAINT `receta_ibfk_2` FOREIGN KEY (`numero_turno`) REFERENCES `turno` (`numero_turno`) ON DELETE CASCADE;

--
-- Filtros para la tabla `turno`
--
ALTER TABLE `turno`
  ADD CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`dni_paciente`) REFERENCES `paciente` (`dni_paciente`),
  ADD CONSTRAINT `turno_ibfk_2` FOREIGN KEY (`matricula_medico`) REFERENCES `medico` (`matricula_medico`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
