-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 29. Dezember 2011 um 11:14
-- Server Version: 5.1.44
-- PHP-Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `Migo`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Dropbox`
--

CREATE TABLE IF NOT EXISTS `Dropbox` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Text` text COLLATE latin1_german1_ci NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` time NOT NULL,
  `Gruppe.ID` int(9) NOT NULL,
  `Person.ID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Gruppe.ID` (`Gruppe.ID`),
  KEY `Person.ID` (`Person.ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=1 ;

--
-- Daten für Tabelle `Dropbox`
--


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Gruppe`
--

CREATE TABLE IF NOT EXISTS `Gruppe` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Sportart` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `Farbe` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `Logo` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `Sichtbar` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=12 ;

--
-- Daten für Tabelle `Gruppe`
--

INSERT INTO `Gruppe` (`ID`, `Name`, `Sportart`, `Farbe`, `Logo`, `Sichtbar`) VALUES
(1, 'Migo', 'Basketball', '#00FFFF', '../images/Logos/Migo01.jpg', 1),
(2, 'Fussball', 'Fussball', '#000000', '../images/Logos/ask01.jpg', 1),
(4, 'GpG', 'Tennis', '#00FFFF', '../images/Logos/gpg01.jpg', 1),
(5, 'FZSV Ybbs', 'Badminton', '#000000', '../images/Logos/sv01.jpg', 1),
(6, 'SC Wieselburg', 'Fussball', '#000000', '../images/Logos/Migo01.jpg', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Kommentare`
--

CREATE TABLE IF NOT EXISTS `Kommentare` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Text` text CHARACTER SET latin1 NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` time NOT NULL,
  `Gruppe.ID` int(9) NOT NULL,
  `Person.ID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Gruppe.ID` (`Gruppe.ID`),
  KEY `Person.ID` (`Person.ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=1 ;

--
-- Daten für Tabelle `Kommentare`
--


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Nachrichten`
--

CREATE TABLE IF NOT EXISTS `Nachrichten` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Betreff` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Text` text COLLATE latin1_german1_ci NOT NULL,
  `Sender` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Empfaenger` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` time NOT NULL,
  `Person.ID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Person.ID` (`Person.ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=1 ;

--
-- Daten für Tabelle `Nachrichten`
--


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `News`
--

CREATE TABLE IF NOT EXISTS `News` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Titel` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Text` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` time NOT NULL,
  `Tag` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `Gruppe.ID` int(9) NOT NULL,
  `Person.ID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Gruppe.ID` (`Gruppe.ID`),
  KEY `Person.ID` (`Person.ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=1 ;

--
-- Daten für Tabelle `News`
--


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Person`
--

CREATE TABLE IF NOT EXISTS `Person` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Vorname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Nachname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Ort` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Passwort` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Avatar` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `GebDatum` date DEFAULT NULL,
  `Email` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=9 ;

--
-- Daten für Tabelle `Person`
--

INSERT INTO `Person` (`ID`, `Vorname`, `Nachname`, `Ort`, `Passwort`, `Avatar`, `GebDatum`, `Email`) VALUES
(1, 'Boris', 'Markovice', 'Wien', 'test', '../bilder/avatar/bm01.jpg', '1988-11-03', 'bo.bobo@gmx.at'),
(2, 'Daniel', 'Brandstetter', 'Ybbs', 'test', '../bilder/avatar/db01.jpg', '1987-04-12', 'da.brandstetter@gmail.com'),
(3, 'vorn', 'nachn', 'ortort', 'test', NULL, NULL, 'test@test.at'),
(5, 'Julian', 'Julie', 'Wieselburg', '123', NULL, NULL, 'fdsa@haha.at'),
(6, 'Dada', 'baba', 'ybbs', 'test', NULL, NULL, 'dada@baba.at'),
(7, 'fhjkdsa', 'fdsjka', 'tetarw', 'test', NULL, NULL, 'dfssv'),
(8, 'fjlkdsafl', 'jfkdlsajflksa', 'fgjklsd', 'test', NULL, NULL, 'fdsa');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PersonGruppe`
--

CREATE TABLE IF NOT EXISTS `PersonGruppe` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Gruppe.ID` int(9) DEFAULT NULL,
  `Person.ID` int(9) NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `Status` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Person.ID` (`Person.ID`),
  KEY `Gruppe.ID` (`Gruppe.ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `PersonGruppe`
--

INSERT INTO `PersonGruppe` (`ID`, `Gruppe.ID`, `Person.ID`, `IsAdmin`, `Status`) VALUES
(1, 1, 1, 1, 'aktiv'),
(2, 2, 2, 1, 'aktiv'),
(3, 5, 2, 1, 'aktiv');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Termine`
--

CREATE TABLE IF NOT EXISTS `Termine` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Titel` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Beschreibung` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `Datum Anfang` date NOT NULL,
  `Datum Ende` date NOT NULL,
  `Uhrzeit Anfang` time NOT NULL,
  `Uhrzeit Ende` time NOT NULL,
  `Ort` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `Woechentlich` tinyint(1) NOT NULL DEFAULT '0',
  `Ganztaegig` tinyint(1) NOT NULL DEFAULT '0',
  `Taeglich` tinyint(1) NOT NULL DEFAULT '0',
  `Gruppe.ID` int(9) NOT NULL,
  `Person.ID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Gruppe.ID` (`Gruppe.ID`),
  KEY `Person.ID` (`Person.ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=1 ;

--
-- Daten für Tabelle `Termine`
--


--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Dropbox`
--
ALTER TABLE `Dropbox`
  ADD CONSTRAINT `dropbox_ibfk_1` FOREIGN KEY (`Gruppe.ID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `dropbox_ibfk_2` FOREIGN KEY (`Person.ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Kommentare`
--
ALTER TABLE `Kommentare`
  ADD CONSTRAINT `kommentare_ibfk_1` FOREIGN KEY (`Gruppe.ID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `kommentare_ibfk_2` FOREIGN KEY (`Person.ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Nachrichten`
--
ALTER TABLE `Nachrichten`
  ADD CONSTRAINT `nachrichten_ibfk_1` FOREIGN KEY (`Person.ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `News`
--
ALTER TABLE `News`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`Gruppe.ID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`Person.ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `PersonGruppe`
--
ALTER TABLE `PersonGruppe`
  ADD CONSTRAINT `persongruppe_ibfk_1` FOREIGN KEY (`Gruppe.ID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `persongruppe_ibfk_2` FOREIGN KEY (`Person.ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Termine`
--
ALTER TABLE `Termine`
  ADD CONSTRAINT `termine_ibfk_1` FOREIGN KEY (`Gruppe.ID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `termine_ibfk_2` FOREIGN KEY (`Person.ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;
