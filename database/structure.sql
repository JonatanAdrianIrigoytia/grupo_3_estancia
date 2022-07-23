DROP DATABASE IF EXISTS `lasvioletas`;
CREATE DATABASE `lasvioletas`;
USE `lasvioletas`;
CREATE TABLE `users` (
   `id` INT AUTO_INCREMENT,
   `firstName` VARCHAR(100) NOT NULL,
   `lastName` VARCHAR(100) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(150) NOT NULL,
   `roleId` INT NOT NULL,
   `image` VARCHAR(255),
   `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` DATETIME NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `longDescription` TEXT,
   `price` DECIMAL(10,2) NOT NULL,
   `categoryId` INT NOT NULL,
   `capacity` INT,
   `duration` INT,
   `discount` INT,
   `image` VARCHAR(255),
   `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` DATETIME NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `amenities` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `icon` VARCHAR(100),
   PRIMARY KEY (`id`)
);

CREATE TABLE `services` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productsAmenities` (
   `id` INT AUTO_INCREMENT,
   `productId` INT NOT NULL,
   `amenityId` INT NOT NULL,
   `createdAt` DATETIME DEFAULT NULL,
   `updatedAt` DATETIME DEFAULT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productsServices` (
   `id` INT AUTO_INCREMENT,
   `productId` INT NOT NULL,
   `serviceId` INT NOT NULL,
   `createdAt` DATETIME DEFAULT NULL,
   `updatedAt` DATETIME DEFAULT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `users` ADD CONSTRAINT `FK_5445f6a6-1cfe-4af5-ba94-0788adfb7717` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_a2735acc-d62a-4367-9396-d0041d944951` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ;

ALTER TABLE `productsAmenities` ADD CONSTRAINT `FK_b35c2fde-dca2-481b-993b-129664352483` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE  ;

ALTER TABLE `productsAmenities` ADD CONSTRAINT `FK_a3c6ab3c-8495-4cb6-802a-2e32198136f4` FOREIGN KEY (`amenityId`) REFERENCES `amenities`(`id`)  ;

ALTER TABLE `productsServices` ADD CONSTRAINT `FK_ef9a95d5-eb3b-4e8d-8f31-8f97d48d92fd` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE;

ALTER TABLE `productsServices` ADD CONSTRAINT `FK_d962b243-7908-4569-82fd-b4e043fb8494` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`)  ;


