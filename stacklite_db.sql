-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02 مايو 2025 الساعة 15:01
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stacklite_db`
--

-- --------------------------------------------------------

--
-- بنية الجدول `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(50) NOT NULL,
  `votes` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `edited` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `content`, `author`, `votes`, `created_at`, `user_id`, `edited`) VALUES
(4, 1, 'يبيب', '', 0, '2025-05-02 14:58:00', 5, 0),
(5, 1, 'HELLO', '', 0, '2025-05-02 15:01:22', 1, 0),
(6, 1, 'بلبل', '', 0, '2025-05-02 15:10:10', 5, 0),
(8, 3, 'wewe', '', 0, '2025-05-02 15:37:57', 1, 0);

-- --------------------------------------------------------

--
-- بنية الجدول `answer_votes`
--

CREATE TABLE `answer_votes` (
  `user_id` int(11) NOT NULL,
  `answer_id` int(11) NOT NULL,
  `vote_type` enum('up','down') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `answer_votes`
--

INSERT INTO `answer_votes` (`user_id`, `answer_id`, `vote_type`) VALUES
(1, 4, 'up'),
(1, 6, 'up'),
(5, 5, 'up'),
(6, 4, 'down'),
(6, 5, 'down'),
(6, 6, 'down');

-- --------------------------------------------------------

--
-- بنية الجدول `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `questions`
--

INSERT INTO `questions` (`id`, `title`, `content`, `created_at`, `user_id`) VALUES
(1, 'كيف انام', 'يبيبي', '2025-05-02 14:05:31', 1),
(3, 'hello', 'hi', '2025-05-02 15:37:15', 6);

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'BASSAM', 'bssambnsih19@gmail.com', '$2y$10$FC0dQOTt6lzr5hnUjII4q.yTO8fNiPvvHDHSXDdvufxSp8CX5p4ai'),
(2, 'omar', 'bssambnsih19@gmail.com', '$2y$10$PfdHZUOllNymb/J4mT5NFenjns1jGNbWfVeLdMHjWoO0Z6akrgVoK'),
(3, 'omar', 'bssambnsih19@gmail.com', '$2y$10$SYCBlFx8E/EhTUjEI9h0peSxNIyytbyivPZ9gHJIh62U9mbs9DcPm'),
(4, 'BASSAM', 'bssambnsih1@gmail.com', '$2y$10$wdHayYiJDyqtsZzZFkBTyeNOp9xjqZcTAXwpcysP4f1CL1ADm3FqO'),
(5, 'kahiled', 'khalid123@gmail.com', '$2y$10$ZGf71yhwdV1BXeFfli1REuQ6b/blkZEvpIvoz22ecZiNbSuOHku02'),
(6, 'a', 'a@gmail.com', '$2y$10$FlhH.RvbxLh1FnEMwmscPeuJCjSGk8.GqZRk8C4Ln4yPJMpwpVklC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `answer_votes`
--
ALTER TABLE `answer_votes`
  ADD PRIMARY KEY (`user_id`,`answer_id`),
  ADD UNIQUE KEY `unique_vote` (`user_id`,`answer_id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- قيود الجداول `answer_votes`
--
ALTER TABLE `answer_votes`
  ADD CONSTRAINT `answer_votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `answer_votes_ibfk_2` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
