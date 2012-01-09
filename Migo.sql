-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 09. Januar 2012 um 16:09
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
(6, 'SC Wieselburg', 'Fussball', '#000000', '../images/Logos/Migo01.jpg', 1),
(7, 'JuliaGruppe', '', '', '', 1),
(9, 'fds', '', '', '', 1),
(10, 'Julia', '', '', '', 1),
(11, 'TestGruppe4', '', '', '', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Daten für Tabelle `Kommentare`
--

INSERT INTO `Kommentare` (`ID`, `Text`, `Datum`, `Uhrzeit`, `NewsID`, `PersonID`) VALUES
(1, 'das', '2012-01-06', '2012-01-06 18:36:44', 7, 2),
(2, 'fdhjkshfksd', '2012-01-06', '2012-01-06 18:36:59', 7, 5),
(3, 'fdsa', '2012-01-06', '2012-01-06 18:37:20', 7, 2),
(4, 'bbmn', '2012-01-06', '2012-01-06 18:38:43', 7, 2),
(5, 'fdks', '2012-01-06', '2012-01-06 18:40:12', 7, 5),
(6, 'da', '2012-01-06', '2012-01-06 18:41:32', 7, 5),
(7, 'fds', '2012-01-06', '2012-01-06 18:42:02', 7, 2),
(8, 'rewrw', '2012-01-06', '2012-01-06 18:43:52', 7, 5),
(9, 'd', '2012-01-06', '2012-01-06 18:48:14', 7, 2),
(10, 'fdsfs', '2012-01-06', '2012-01-06 18:50:44', 7, 2),
(11, 'nm,dfs', '2012-01-06', '2012-01-06 18:55:19', 7, 2),
(12, 'f', '2012-01-06', '2012-01-06 19:00:01', 7, 5),
(13, 'fdsfjskld', '2012-01-06', '2012-01-06 19:25:42', 8, 2),
(14, 'kljfsdfs', '2012-01-06', '2012-01-06 19:26:10', 8, 5),
(15, 'nmn,', '2012-01-06', '2012-01-06 19:29:49', 9, 2),
(16, '$%&%$/%', '2012-01-06', '2012-01-06 19:29:53', 9, 2),
(17, 'fds', '2012-01-07', '2012-01-07 10:19:15', 9, 2),
(18, 'fsd', '2012-01-07', '2012-01-07 10:19:33', 10, 2),
(19, 'fldsjkl', '2012-01-08', '2012-01-08 15:32:34', 4, 2);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=3 ;

--
-- Daten für Tabelle `Nachrichten`
--

INSERT INTO `Nachrichten` (`ID`, `Betreff`, `Text`, `Sender`, `Empfaenger`, `Datum`, `Uhrzeit`, `PersonID`, `GruppeID`) VALUES
(1, 'betr fdsa fdsa fdsa fdsa fdsaf dsaf dsafdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa', 'nachr fdsa fdsa fdsa fsdafdsa fdsa fsadf dsa fdsa fdsa fdsa fdsa fdsa fds fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fsda fdsa fdsa fdsnachr fdsa fdsa fdsa fsdafdsa fdsa fsadf dsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fsda fdsa fdsa fdsnachr fdsa fdsa fdsa fsdafdsa fdsa fsadf dsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fsda fdsa fdsa fds', 1, 2, '2012-01-08', '15:44:29', 2, 5),
(2, 'fdsa', 'vsvds', 3, 2, '2012-01-08', '16:56:22', 2, 5);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=44 ;

--
-- Daten für Tabelle `News`
--

INSERT INTO `News` (`ID`, `Titel`, `Text`, `Datum`, `Uhrzeit`, `Tag`, `GruppeID`, `PersonID`) VALUES
(2, 'fhkdsfsafdsfs', 'fhjksdfs', '2012-01-06', '15:54:46', 'News', 2, 2),
(4, 'flksd', 'fdslö', '2012-01-06', '16:48:01', 'News', 2, 2),
(5, 'Wilkommen', 'Neue Gruppe fds', '2012-01-06', '17:50:22', 'News', 9, 2),
(6, 'földs', 'fjldks', '2012-01-06', '17:50:51', 'News', 9, 2),
(7, 'fdsa', 'fdas', '2012-01-06', '18:13:09', 'News', 5, 2),
(8, 'fsdfs', 'dsfs', '2012-01-06', '19:25:36', 'News', 5, 2),
(9, 'njnb', 'fklds', '2012-01-06', '19:29:38', 'News', 11, 2),
(10, 'fds', 'fsd', '2012-01-07', '10:19:27', 'News', 11, 2);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=7 ;

--
-- Daten für Tabelle `Person`
--

INSERT INTO `Person` (`ID`, `Vorname`, `Nachname`, `Ort`, `Passwort`, `Avatar`, `GebDatum`, `Email`) VALUES
(1, 'Boris', 'Markovice', 'Wien', 'test', '../bilder/avatar/bm01.jpg', '1988-11-03', 'bo.bobo@gmx.at'),
(2, 'Daniel', 'Brandstetter', 'Ybbs', 'test', '../bilder/avatar/db01.jpg', '1987-04-12', 'da.brandstetter@gmail.com'),
(3, 'vorn', 'nachn', 'ortort', 'test', NULL, NULL, 'test@test.at'),
(5, 'Julian', 'Julie', 'Wieselburg', '123', NULL, NULL, 'fdsa@haha.at'),
(6, 'Dada', 'baba', 'ybbs', 'test', NULL, NULL, 'dada@baba.at');

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
  PRIMARY KEY (`ID`),
  KEY `PersonID` (`PersonID`),
  KEY `GruppeID` (`GruppeID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci AUTO_INCREMENT=9 ;

--
-- Daten für Tabelle `PersonGruppe`
--

INSERT INTO `PersonGruppe` (`ID`, `GruppeID`, `PersonID`, `IsAdmin`, `Status`) VALUES
(1, 1, 1, 1, 'aktiv'),
(2, 2, 2, 1, 'aktiv'),
(3, 5, 2, 1, 'aktiv'),
(4, 7, 2, 1, 'angefragt'),
(5, 5, 5, 0, 'fsd'),
(6, 9, 2, 1, 'angefragt'),
(7, 10, 5, 1, 'angefragt'),
(8, 11, 2, 1, 'angefragt');

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
  ADD CONSTRAINT `kommentare_ibfk_2` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `kommentare_ibfk_1` FOREIGN KEY (`NewsID`) REFERENCES `news` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Nachrichten`
--
ALTER TABLE `Nachrichten`
  ADD CONSTRAINT `nachrichten_ibfk_4` FOREIGN KEY (`Empfaenger`) REFERENCES `person` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nachrichten_ibfk_1` FOREIGN KEY (`PersonID`) REFERENCES `person` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nachrichten_ibfk_2` FOREIGN KEY (`GruppeID`) REFERENCES `gruppe` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nachrichten_ibfk_3` FOREIGN KEY (`Sender`) REFERENCES `person` (`ID`) ON DELETE CASCADE;

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
