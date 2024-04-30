-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 26. 13:08
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `aruhaz`
--
DROP DATABASE IF EXISTS `aruhaz`;
CREATE DATABASE IF NOT EXISTS `aruhaz` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `aruhaz`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ordering`
--

DROP TABLE IF EXISTS `ordering`;
CREATE TABLE `ordering` (
  `orderID` int(11) NOT NULL COMMENT 'rendelés azonosítója',
  `userID` int(11) NOT NULL COMMENT 'a felhasználó azonosítója',
  `seriesID` int(11) NOT NULL COMMENT 'a termék azonosítója',
  `orderDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'a rendelés ideje',
  `price` int(11) NOT NULL COMMENT 'a megrendelés összértéke'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ordering`
--

INSERT INTO `ordering` (`orderID`, `userID`, `seriesID`, `orderDate`, `price`) VALUES
(1, 2, 3, '2024-03-26 11:07:23', 452990);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--

DROP TABLE IF EXISTS `termek`;
CREATE TABLE `termek` (
  `seriesID` int(11) NOT NULL COMMENT 'termék azonosítója',
  `name` varchar(50) NOT NULL COMMENT 'termék neve',
  `image` varchar(255) DEFAULT NULL COMMENT 'a kép neve',
  `price` int(11) NOT NULL COMMENT 'a termék ára',
  `stock` int(11) NOT NULL COMMENT 'a termék darabszáma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`seriesID`, `name`, `image`, `price`, `stock`) VALUES
(3, 'M4 CQB-R Charlie', '2024_03_04_M4.png', 45299, 20),
(11, '88g Paintball Airsoft co2 Patron', '2024_03_04_88g-paintball-airsoft-co2-patron.jpg', 15000, 30),
(12, 'kriss vector airsoft fegyver', '2024_03_04_kriss-vector-airsoft-fegyver1.jpg', 30000, 30),
(13, 'Airsoft BLS BB 0.20g', '2024_03_04_Airsoft BLS BB 0.20g.jpg', 5000, 30),
(14, 'Dye Goggle Maszk', '2024_03_04_dye-goggle-i4-pro-black-paintball-maszk.jpg', 40000, 30),
(15, 'Airsoft asg cz p 09 gbb Airsoft Pisztoly', '2024_03_04_airsoft-asg-cz-p-09-gbb-airsoft-pisztoly.jpg', 25000, 15),
(16, 'BB gyortöltő fekete', '2024_03_04_bb-gyorstolto-fekete-61ade6bb51fc5.jpg', 10000, 30);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL,
  `userImage` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`userID`, `email`, `username`, `password`, `role`, `userImage`, `birthday`) VALUES
(1, 'admin@admin.hu', 'DC Admin', '$2b$10$xSvvxXR6SzXld27aIBostuFg/n2dyFJH79V7wUJIA74mL1zoOYmyq', 1, '2024_03_26_2024_03_04_dye-goggle-i4-pro-black-paintball-maszk.jpg', '2024-03-15'),
(2, 'user@user.hu', 'User', '$2b$10$RaBjUmG09gjcdeTe2XnJYe0DK8SEdzIs1yonuochGxvt03SQDrAUS', 0, '2024_03_04_images.png', NULL),
(3, 'kecske@kecske.hu', 'Kecske', '$2b$10$zUyQkQ2rV1xmRi/EUjajoOr.5/VAPZh.TJUnB0dn2rnI1ozfDV2mO', 0, 'no_image.png', NULL),
(4, 'kecske1@kecske.hu', 'Kecske', '$2b$10$1SXfOZYbqWB2tantICi7pOpthez0hhQSgOob2h9Fj89sMig.gwgxi', 0, 'no_image.png', NULL),
(5, 'asd@asd.asd', 'Asd', '$2b$10$fTSO3GccyIlfS4auB.Phu.ShzOi.qYNapk82hIayt4dRlJtHk7Rw2', 0, 'no_image.png', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ordering`
--
ALTER TABLE `ordering`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `seriesID` (`seriesID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `termek`
--
ALTER TABLE `termek`
  ADD PRIMARY KEY (`seriesID`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`) USING BTREE;

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ordering`
--
ALTER TABLE `ordering`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'rendelés azonosítója', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `seriesID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'termék azonosítója', AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ordering`
--
ALTER TABLE `ordering`
  ADD CONSTRAINT `fk_ordering_termek` FOREIGN KEY (`seriesID`) REFERENCES `termek` (`seriesID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ordering_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
