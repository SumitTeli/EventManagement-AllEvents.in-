-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2024 at 06:31 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventmanage`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `description`) VALUES
(1, 'Music', 'Category related to music'),
(2, 'Game', 'Category related to gaming'),
(3, 'Dance', 'Category related to dance'),
(4, 'FoodFest', 'Category related to Food Fest'),
(5, 'Folk Dance', 'Category related to folk dance'),
(6, 'Theatre', 'Category Description forTheatre'),
(7, 'Esports', 'Category Description Esports'),
(8, 'Exhibition ', 'Category Description forExhibition '),
(13, 'Esport 2', 'Category Description Esport 2');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_name` varchar(100) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` text DEFAULT NULL,
  `banner_image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `user_id`, `event_name`, `start_time`, `end_time`, `description`, `banner_image_url`, `created_at`, `category_id`, `state`, `city`, `zip_code`) VALUES
(1, 1, 'Music Concert ', '2024-01-01 21:07:00', '2024-01-02 21:07:00', 'Music Concert  By XYZ', 'http://localhost/reactcurdphp/api/images/banner 1.png', '2024-01-01 15:38:29', 1, 'Gujarat', 'Ahmedabad', '380059'),
(2, 1, 'Gaming Event', '2024-01-01 21:10:00', '2024-01-10 21:10:00', 'Gaming Event For Valorant', 'http://localhost/reactcurdphp/api/images/banner 2.png', '2024-01-01 15:40:51', 2, 'Gujarat', 'Ahmedabad', '380059'),
(3, 1, 'Live Music', '2024-01-04 21:11:00', '2024-01-15 21:11:00', 'Live Music By Honey Sing', 'http://localhost/reactcurdphp/api/images/banner 3.png', '2024-01-01 15:41:46', 1, 'Gujarat', 'Bhuj', '380059'),
(4, 1, 'Live Music Concert 2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Live Music Concert 2 By Sidhu ', 'http://localhost/reactcurdphp/api/images/banner 4.png', '2024-01-01 15:42:21', 1, 'Gujarat', 'Ahmedabad', '380059'),
(5, 2, 'Gaming Event', '2024-01-02 10:52:00', '2024-01-05 10:52:00', 'An exciting gathering celebrating the world of gaming, where enthusiasts come together to compete, explore new games, and enjoy the thrill of gaming culture. Experience a day filled with fun, challenges, and camaraderie among fellow gamers.', 'http://localhost/reactcurdphp/api/images/banner 5.png', '2024-01-02 05:22:57', 7, 'Gujarat', 'Ahmedabad', '380059');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `google_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `google_id`, `created_at`, `user_name`) VALUES
(1, 'sumit.study.in@gmail.com', NULL, '105641079899319554354', '2024-01-01 15:37:02', ''),
(2, 'androzerobgmi@gmail.com', NULL, '103979342295146690716', '2024-01-02 05:12:36', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_category` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
