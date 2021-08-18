CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preco_compra` double DEFAULT NULL,
  `preco_venda` double DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `produtos` VALUES (1,'Teclado',27.82,54.9,61,'2021-07-31 15:06:54','2021-07-31 15:06:54'),(2,'Mouse',16.82,34.9,121,'2021-07-31 22:07:59','2021-07-31 22:07:59'),(3,'Monitor',325.16,748.9,15,'2021-07-31 22:10:37','2021-07-31 22:26:39');


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Cesar ', 'cesar@celke.com.br', '$2a$08$nSfmzAdW2.hl.gAJNx/TW.Je5qEfki4hTI9PSmW9ySPnbXhLKhHQ.', '2021-08-04 14:36:37', '2021-08-04 15:18:02'),
(3, 'Cesar 3', 'cesar3@celke.com.br', '$2a$08$InogRbL6gia6C29ogsiBCuzO3ynFq1SuWNTS89CeJAScMoSD8pkKK', '2021-08-04 14:56:33', '2021-08-04 16:12:14'),
(6, 'Cesar ', 'cesar5@celke.com.br', '$2a$08$enW7nL6HbocZuJMqgUKPYuZMH63IG61dZIsREDCtwt8iaj2/l5O66', '2021-08-04 16:11:28', '2021-08-04 16:11:28');

