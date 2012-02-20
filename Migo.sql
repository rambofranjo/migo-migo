-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 20. Februar 2012 um 15:19
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
CREATE DATABASE `Migo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `Migo`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Dropbox`
--

CREATE TABLE IF NOT EXISTS `Dropbox` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Text` text COLLATE latin1_german1_ci NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` time NOT NULL,
  `GruppeID` int(9) NOT NULL,
  `PersonID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `GruppeID` (`GruppeID`),
  KEY `PersonID` (`PersonID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=13 ;

--
-- Daten für Tabelle `Dropbox`
--

INSERT INTO `Dropbox` (`ID`, `Text`, `Datum`, `Uhrzeit`, `GruppeID`, `PersonID`) VALUES
(1, 'Hallo Hallo Hallo', '2012-02-10', '11:31:03', 5, 2),
(2, 'bla bla', '2012-02-10', '11:31:24', 5, 2),
(3, 'fsdfs', '2012-02-10', '11:34:54', 5, 2),
(4, 'fds', '2012-02-10', '11:35:38', 5, 2),
(5, 'fsdfsd', '2012-02-10', '11:35:59', 5, 2),
(6, 'fsdfsdfsdfdsfsdf fdsafsadf fdsaf s fdsa', '2012-02-10', '11:36:27', 5, 2),
(7, 'test', '2012-02-10', '12:18:21', 5, 2),
(8, 'test test ', '2012-02-10', '12:21:41', 2, 2),
(11, '1', '2012-02-10', '16:59:25', 5, 2),
(12, '2', '2012-02-10', '16:59:27', 5, 2);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=16 ;

--
-- Daten für Tabelle `Gruppe`
--

INSERT INTO `Gruppe` (`ID`, `Name`, `Sportart`, `Farbe`, `Logo`, `Sichtbar`) VALUES
(1, 'Migo', 'Basketball', '#00FFFF', '../images/Logos/Migo01.jpg', 1),
(2, 'Fussball', 'Fussball', '#000000', '../images/Logos/ask01.jpg', 1),
(4, 'GpG', 'Tennis', '#00FFFF', '../images/Logos/gpg01.jpg', 1),
(5, 'FZSV Ybbs', 'Badminton', '#000009', '../images/Logos/sv00.jpg', 1),
(6, 'SC Wieselburg', 'Fussball', '#000000', '../images/Logos/Migo01.jpg', 1),
(7, 'JuliaGruppe', '', '', '', 1),
(9, 'fds', '', '', '', 1),
(10, 'Julia', '', '', '', 1),
(11, 'TestGruppe4', '', '', '', 1),
(12, 'TestGruppe3', 'fsda', 'fds', 'fdsdsf', 1),
(13, 'fdsfdsf', 'fdsa', 'dfa', 'd', 1),
(14, 'blablu', 'fds', 'fdd', 'f', 1),
(15, 'blabluu', 'f', '', '', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Kommentare`
--

CREATE TABLE IF NOT EXISTS `Kommentare` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Text` text NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `NewsID` int(9) NOT NULL,
  `PersonID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `NewsID` (`NewsID`),
  KEY `PersonID` (`PersonID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `Kommentare`
--

INSERT INTO `Kommentare` (`ID`, `Text`, `Datum`, `Uhrzeit`, `NewsID`, `PersonID`) VALUES
(1, 'fdsf', '2012-01-28', '2012-01-28 10:11:03', 2, 2),
(2, 'fsdf', '2012-01-28', '2012-01-28 10:11:06', 2, 2),
(3, 'gaga', '2012-01-31', '2012-01-31 19:30:05', 2, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Nachrichten`
--

CREATE TABLE IF NOT EXISTS `Nachrichten` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Betreff` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Text` text COLLATE latin1_german1_ci NOT NULL,
  `Sender` int(9) NOT NULL,
  `Empfaenger` int(9) NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` time NOT NULL,
  `PersonID` int(9) NOT NULL,
  `GruppeID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `PersonID` (`PersonID`),
  KEY `GruppeID` (`GruppeID`),
  KEY `Sender` (`Sender`),
  KEY `Empfaenger` (`Empfaenger`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `Nachrichten`
--

INSERT INTO `Nachrichten` (`ID`, `Betreff`, `Text`, `Sender`, `Empfaenger`, `Datum`, `Uhrzeit`, `PersonID`, `GruppeID`) VALUES
(1, 'betr', 'dsfads', 2, 5, '2012-01-23', '14:44:29', 2, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `News`
--

CREATE TABLE IF NOT EXISTS `News` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `Titel` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Text` text COLLATE latin1_german1_ci NOT NULL,
  `Datum` date NOT NULL,
  `Uhrzeit` time NOT NULL,
  `Tag` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `GruppeID` int(9) NOT NULL,
  `PersonID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `GruppeID` (`GruppeID`),
  KEY `PersonID` (`PersonID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `News`
--

INSERT INTO `News` (`ID`, `Titel`, `Text`, `Datum`, `Uhrzeit`, `Tag`, `GruppeID`, `PersonID`) VALUES
(2, 'tit', 'text', '2012-01-23', '14:41:42', 'News', 5, 2),
(3, 'gdfg', 'gfd', '2012-01-31', '19:32:45', 'News', 5, 5);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=8 ;

--
-- Daten für Tabelle `Person`
--

INSERT INTO `Person` (`ID`, `Vorname`, `Nachname`, `Ort`, `Passwort`, `Avatar`, `GebDatum`, `Email`) VALUES
(1, 'Boris', 'Markovice', 'Wien', 'test', '../bilder/avatar/bm01.jpg', '1988-11-03', 'bo.bobo@gmx.at'),
(2, 'Daniel', 'Brandstetter', 'Ybbs', 'test', '../bilder/avatar/db01.jpg', '1987-04-12', 'da.brandstetter@gmail.com'),
(3, 'vorn', 'nachn', 'ortort', 'test', NULL, NULL, 'test@test.at'),
(5, 'Julian', 'Julie', 'Wieselburg', '123', NULL, NULL, 'fdsa@haha.at'),
(6, 'Dada', 'baba', 'ybbs', 'test', NULL, NULL, 'dada@baba.at'),
(7, 'test', 'ttt', 'dsa', 'test', NULL, NULL, 'tesst@test.at');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PersonGruppe`
--

CREATE TABLE IF NOT EXISTS `PersonGruppe` (
  `ID` int(9) NOT NULL AUTO_INCREMENT,
  `GruppeID` int(9) DEFAULT NULL,
  `PersonID` int(9) NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `Status` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Gruender` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `PersonID` (`PersonID`),
  KEY `GruppeID` (`GruppeID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=17 ;

--
-- Daten für Tabelle `PersonGruppe`
--

INSERT INTO `PersonGruppe` (`ID`, `GruppeID`, `PersonID`, `IsAdmin`, `Status`, `Gruender`) VALUES
(2, 2, 2, 1, 'aktiv', 0),
(3, 5, 2, 1, 'aktiv', 1),
(4, 7, 2, 1, 'aktiv', 0),
(6, 9, 2, 1, 'aktiv', 0),
(7, 10, 5, 1, 'aktiv', 0),
(8, 11, 2, 1, 'aktiv', 0),
(10, 5, 5, 1, 'aktiv', 0),
(11, 5, 6, 0, 'aktiv', 0),
(14, 5, 7, 0, 'aktiv', 0),
(16, 15, 2, 1, 'aktiv', 0);

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
  `GruppeID` int(9) NOT NULL,
  `PersonID` int(9) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `GruppeID` (`GruppeID`),
  KEY `PersonID` (`PersonID`)
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
  ADD CONSTRAINT `dropbox_ibfk_1` FOREIGN KEY (`GruppeID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `dropbox_ibfk_2` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Kommentare`
--
ALTER TABLE `Kommentare`
  ADD CONSTRAINT `kommentare_ibfk_1` FOREIGN KEY (`NewsID`) REFERENCES `news` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `kommentare_ibfk_2` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Nachrichten`
--
ALTER TABLE `Nachrichten`
  ADD CONSTRAINT `nachrichten_ibfk_1` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nachrichten_ibfk_2` FOREIGN KEY (`GruppeID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nachrichten_ibfk_3` FOREIGN KEY (`Sender`) REFERENCES `person` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nachrichten_ibfk_4` FOREIGN KEY (`Empfaenger`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `News`
--
ALTER TABLE `News`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`GruppeID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `PersonGruppe`
--
ALTER TABLE `PersonGruppe`
  ADD CONSTRAINT `persongruppe_ibfk_1` FOREIGN KEY (`GruppeID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `persongruppe_ibfk_2` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Termine`
--
ALTER TABLE `Termine`
  ADD CONSTRAINT `termine_ibfk_1` FOREIGN KEY (`GruppeID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `termine_ibfk_2` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE;
