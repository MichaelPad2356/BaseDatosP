-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2024 a las 04:39:05
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
-- Base de datos: `tiendaenlinea`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `ID_Carrito` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Fecha_Creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`ID_Carrito`, `ID_Usuario`, `Fecha_Creacion`) VALUES
(1, 1, '2024-12-10'),
(2, 2, '2024-12-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_Categoria` int(11) NOT NULL,
  `Nombre_Categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID_Categoria`, `Nombre_Categoria`) VALUES
(1, 'Tintos'),
(2, 'Blancos'),
(3, 'Rosados'),
(4, 'Espumosos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_carrito`
--

CREATE TABLE `detalle_carrito` (
  `ID_Carrito` int(11) NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_carrito`
--

INSERT INTO `detalle_carrito` (`ID_Carrito`, `ID_Producto`, `Cantidad`) VALUES
(1, 1, 2),
(1, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `ID_Pedido` int(11) NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio_Unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`ID_Pedido`, `ID_Producto`, `Cantidad`, `Precio_Unitario`) VALUES
(1, 1, 2, 450.00),
(2, 2, 3, 350.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `ID_Envio` int(11) NOT NULL,
  `ID_Pedido` int(11) DEFAULT NULL,
  `Dirección_Envio` varchar(255) NOT NULL,
  `Estado_Envio` enum('en preparación','enviado','entregado') NOT NULL,
  `Fecha_Envio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `envio`
--

INSERT INTO `envio` (`ID_Envio`, `ID_Pedido`, `Dirección_Envio`, `Estado_Envio`, `Fecha_Envio`) VALUES
(1, 1, 'Av. Insurgentes 123, Coyoacán, CDMX', 'en preparación', '0000-00-00'),
(2, 2, 'Calle Juárez 456, Guadalajara, Jalisco', 'enviado', '2024-12-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `ID_EstadoDirc` int(11) NOT NULL,
  `Nombre_EstadoDirc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`ID_EstadoDirc`, `Nombre_EstadoDirc`) VALUES
(1, 'Ciudad de México'),
(2, 'Jalisco'),
(3, 'Baja California');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `ID_Municipio` int(11) NOT NULL,
  `Nombre_Municipio` varchar(50) NOT NULL,
  `ID_EstadoDirc` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`ID_Municipio`, `Nombre_Municipio`, `ID_EstadoDirc`) VALUES
(1, 'Coyoacán', 1),
(2, 'Guadalajara', 2),
(3, 'Ensenada', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `ID_Pago` int(11) NOT NULL,
  `ID_Pedido` int(11) DEFAULT NULL,
  `Monto` decimal(10,2) NOT NULL,
  `Metodo_Pago` enum('tarjeta','PayPal','transferencia') NOT NULL,
  `Fecha_Pago` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`ID_Pago`, `ID_Pedido`, `Monto`, `Metodo_Pago`, `Fecha_Pago`) VALUES
(1, 1, 1200.00, 'tarjeta', '2024-12-10'),
(2, 2, 1550.00, 'PayPal', '2024-12-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `ID_Pedido` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Fecha_Pedido` date NOT NULL,
  `Estado_Pedido` enum('pendiente','procesado','enviado','entregado','cancelado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`ID_Pedido`, `ID_Usuario`, `Fecha_Pedido`, `Estado_Pedido`) VALUES
(1, 1, '2024-12-10', 'procesado'),
(2, 2, '2024-12-08', 'enviado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `URL_Imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_Producto`, `Nombre`, `Descripcion`, `Precio`, `Stock`, `ID_Categoria`, `URL_Imagen`) VALUES
(1, 'Vino Tinto Syrah Reserva', 'Sabores a frutas negras y especias.', 490.00, 45, 1, 'v1.jpg'),
(2, 'Vino Blanco Pinot Grigio', 'Fresco y ligero, con notas cítricas y un final seco.', 600.00, 21, 2, 'v2.jpg'),
(3, 'Vino Rosado Garnacha', 'Vibrante, con aromas de frutos rojos y un sutil toque floral.', 390.00, 30, 3, 'v3.jpg'),
(4, 'Vino Espumoso Cava Brut Nature', 'Elegante, con burbujas finas y un delicado toque tostado.', 800.00, 25, 4, 'v4.jpg'),
(5, 'Vino Tinto Cabernet Sauvignon', 'Vino tinto con notas a frutos rojos y madera.', 450.00, 50, 1, 'vino_tinto_inv.webp'),
(6, 'Vino Blanco Chardonnay', 'Vino blanco fresco con aromas cítricos.', 350.00, 40, 2, 'vino_blanco_inv.jpg'),
(7, 'Vino Rosado Zinfandel', 'Vino rosado con sabores frutales y florales.', 300.00, 30, 3, 'vino_rosado_inv.webp'),
(8, 'Vino Espumoso Brut', 'Vino espumoso italiano, ideal para celebraciones.', 500.00, 20, 4, 'vino_espumoso_inv.webp'),
(9, 'Vino Tinto Merlot', 'Vino tinto suave con notas de ciruela y especias.', 520.00, 30, 1, 'vino_tinto_merlot.webp'),
(10, 'Vino Blanco Sauvignon Blanc', 'Vino blanco fresco con sabores cítricos y herbales.', 470.00, 18, 2, 'vino_blanco_sauvignon.jpg'),
(11, 'Vino Rosado Provence', 'Vino rosado de la región de Provenza, ligero y afrutado.', 430.00, 12, 3, 'vino_rosado_provence.jpg'),
(12, 'Vino Espumoso Prosecco', 'Vino espumoso italiano con burbujas vivas y un toque dulce.', 550.00, 40, 4, 'vino_espumoso_prosecco.jpg'),
(13, 'Vino Tinto Malbec', 'Vino tinto argentino con sabores intensos de frutos oscuros.', 530.00, 35, 1, 'vino_tinto_malbec.jpg'),
(14, 'Vino Blanco Riesling', 'Vino blanco aromático con notas de manzana y miel.', 480.00, 28, 2, 'vino_blanco_riesling.jpg'),
(15, 'Vino Rosado Tempranillo', 'Vino rosado español con notas florales y frutales.', 460.00, 22, 3, 'vino_rosado_tempranillo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contraseña` varchar(100) NOT NULL,
  `Tipo` enum('Cliente','Administrador') NOT NULL,
  `ID_Municipio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_Usuario`, `Nombre`, `Apellido`, `Correo`, `Contraseña`, `Tipo`, `ID_Municipio`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', 'password123', 'Cliente', 1),
(2, 'Michael ', 'Padilla', 'michael.padilla@example.com', 'mypassword789', 'Administrador', 3),
(3, 'Ana', 'Gómez', 'ana.gomez@example.com', 'securePass456', 'Cliente', 2),
(4, 'Paulina', 'López ', 'pau@gmail.com', '1234pau', 'Administrador', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`ID_Carrito`),
  ADD KEY `FK_Usuario_Carrito` (`ID_Usuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD PRIMARY KEY (`ID_Carrito`,`ID_Producto`),
  ADD KEY `FK_Producto_DetalleCarrito` (`ID_Producto`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`ID_Pedido`,`ID_Producto`),
  ADD KEY `FK_Producto_DetallePedido` (`ID_Producto`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`ID_Envio`),
  ADD KEY `FK_Pedido_Envio` (`ID_Pedido`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`ID_EstadoDirc`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`ID_Municipio`),
  ADD KEY `FK_Estado_Municipio` (`ID_EstadoDirc`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`ID_Pago`),
  ADD KEY `FK_Pedido_Pago` (`ID_Pedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`ID_Pedido`),
  ADD KEY `FK_Usuario_Pedido` (`ID_Usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `FK_Categoria_Producto` (`ID_Categoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD KEY `FK_Municipio_Usuario` (`ID_Municipio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `ID_Carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `envio`
--
ALTER TABLE `envio`
  MODIFY `ID_Envio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `ID_EstadoDirc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `ID_Municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `ID_Pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `ID_Pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `ID_Producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `FK_Usuario_Carrito` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`);

--
-- Filtros para la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD CONSTRAINT `FK_Carrito_DetalleCarrito` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`),
  ADD CONSTRAINT `FK_Producto_DetalleCarrito` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `FK_Pedido_DetallePedido` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedido` (`ID_Pedido`),
  ADD CONSTRAINT `FK_Producto_DetallePedido` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `envio`
--
ALTER TABLE `envio`
  ADD CONSTRAINT `FK_Pedido_Envio` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedido` (`ID_Pedido`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `FK_Estado_Municipio` FOREIGN KEY (`ID_EstadoDirc`) REFERENCES `estado` (`ID_EstadoDirc`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `FK_Pedido_Pago` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedido` (`ID_Pedido`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `FK_Usuario_Pedido` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FK_Categoria_Producto` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_Municipio_Usuario` FOREIGN KEY (`ID_Municipio`) REFERENCES `municipio` (`ID_Municipio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
