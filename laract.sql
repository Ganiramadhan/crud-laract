-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2023 at 11:25 AM
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
-- Database: `laract`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `no_telepon` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `nama`, `alamat`, `no_telepon`, `email`, `created_at`, `updated_at`) VALUES
(1, 'Gani Ramadhan', 'Jl.Pahlawan No.45, Kota Bandung', '083878624771', 'ganiramadhan@gmail.com', '2023-10-24 18:51:16', '2023-10-24 20:27:21'),
(2, 'Gani Ramadhan 2', '4044 Rohan Road Suite 632\nLake Jaycee, MD 87864-4023', '+1-386-967-7433', 'beulah83@tremblay.com', '2023-10-24 18:51:16', '2023-10-24 21:55:12'),
(3, 'Gani Ramadhan 3', '346 Karolann Brook Apt. 106\nLake Sageberg, NJ 21205', '757.860.7325', 'wjohns@ebert.com', '2023-10-24 18:51:16', '2023-10-24 21:55:18'),
(4, 'Gani Ramadhan 4', '951 Klocko Turnpike\nNew Cletus, FL 82579', '478.806.9030', 'crist.gavin@gmail.com', '2023-10-24 18:51:16', '2023-10-24 21:55:03'),
(5, 'Dr. Jan Wintheiser', '451 Maybelle Brooks\nWalshtown, IN 79958-5921', '937.578.5501', 'louvenia65@yahoo.com', '2023-10-24 18:51:16', '2023-10-24 18:51:16'),
(6, 'Theresa Hintz', '8890 Barton Estate Suite 711\nSouth Rileyview,', '571-710-7227', 'jayne.lebsack@beahan.org', '2023-10-24 18:51:16', '2023-10-24 21:19:28'),
(7, 'Testing', '28129 Volkman Mountains Apt.', '430-900-2568', 'pete32@gmail.com', '2023-10-24 18:51:16', '2023-10-24 21:55:42'),
(8, 'Creola Kris', '95385 Zakary River Apt. 910\nGottliebstad, WA 60440-7451', '1-201-274-5759', 'gleannon@gmail.com', '2023-10-24 18:51:16', '2023-10-24 18:51:16'),
(9, 'Mr. Devin DuBuque', '1932 Zechariah Corners\nErnestinaside, WI 14763-7660', '(920) 725-2901', 'skye90@rogahn.biz', '2023-10-24 18:51:16', '2023-10-24 18:51:16');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_menus`
--

CREATE TABLE `kategori_menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori_menus`
--

INSERT INTO `kategori_menus` (`id`, `nama`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'Lainya', 'Kategori Yang Belum Tersedia di Menu List', '2023-10-24 19:17:58', '2023-10-24 19:17:58'),
(2, 'Makanan', 'Seperti Nasi dan Mie', '2023-10-24 19:18:38', '2023-10-24 19:18:38'),
(3, 'Minuman', 'All Drinks', '2023-10-24 19:18:49', '2023-10-24 19:18:49'),
(4, 'Cemilan', 'Jajanan Ringan', '2023-10-24 19:19:03', '2023-10-24 19:19:03');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kd_menu` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `kategori_id` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `satuan` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `kd_menu`, `nama`, `deskripsi`, `kategori_id`, `harga`, `satuan`, `status`, `created_at`, `updated_at`) VALUES
(1, 'M01', 'Nasi Goreng', 'Nasi Goreng dengan Telur Nasi Goreng dengan TelurNasi Goreng dengan Telur', '2', 15000, 'unit', 'Tersedia', '2023-10-24 19:19:33', '2023-10-24 21:53:28'),
(2, 'M02', 'Nasi Uduk', 'Nasi Uduk Komplit', '2', 15000, 'box', 'Tersedia', '2023-10-24 19:20:07', '2023-10-24 19:20:07'),
(3, 'M03', 'Es Teh Manis', 'Es Teh Manis Only', '3', 3000, 'gelas', 'Tersedia', '2023-10-24 19:20:51', '2023-10-24 19:20:51'),
(5, 'M04', 'Es Cokelat', 'Testing', '3', 10000, 'gelas', 'Tersedia', '2023-10-24 23:50:03', '2023-10-24 23:50:03');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(14, '2023_10_24_090232_create_kategori_menus_table', 3),
(16, '2014_10_12_000000_create_users_table', 4),
(17, '2014_10_12_100000_create_password_reset_tokens_table', 4),
(18, '2019_08_19_000000_create_failed_jobs_table', 4),
(19, '2019_12_14_000001_create_personal_access_tokens_table', 4),
(20, '2023_08_14_172216_create_products_table', 4),
(21, '2023_10_23_151214_create_customers_table', 4),
(22, '2023_10_24_011031_create_menus_table', 4),
(23, '2023_10_24_132634_create_kategori_menus_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Momo', 'momo@gmail.com', NULL, '$2y$10$SABJctdQwlzVvZhMOcrlXeeQDk.4C0MLhhlH.rhTpIHM31y1s0Tdq', NULL, '2023-10-24 18:52:17', '2023-10-24 18:52:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `kategori_menus`
--
ALTER TABLE `kategori_menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori_menus`
--
ALTER TABLE `kategori_menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
