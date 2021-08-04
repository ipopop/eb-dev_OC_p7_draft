CREATE DATABASE newdbp7 DEFAULT CHARACTER SET utf8mb4;
USE newdbp7;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `usrId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usrPseudo` varchar(255) NOT NULL,
  `usrName` varchar(255) NOT NULL,
  `usrMail` varchar(255) NOT NULL,
  `usrPasswd` varchar(255) NOT NULL,
  `usrImgUrl` varchar(255) DEFAULT NULL,
  `usrBio` varchar(255) NULL,
  `usrRole` tinyint(1) NULL DEFAULT 1,
  `usrFollowing` varchar(255) NULL,
  `usrFollowers` varchar(255) NULL,
  `usrLikes` varchar(255) NULL,
  `usrCreatedAt` datetime NOT NULL,
  `usrUpdatedAt` datetime NOT NULL,
  UNIQUE KEY `usrPseudo` (`usrPseudo`),
  UNIQUE KEY `usrMail` (`usrMail`)
);

DROP TABLE IF EXISTS `Post`;
CREATE TABLE `Post` (
  `postId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `postTitle` varchar(255) NOT NULL,
  `postTxt` text NOT NULL,
  `postImgUrl` varchar(255) NULL,
  `usrId` int(11) NOT NULL,
  `postCreatedAt` datetime NOT NULL,
  `postUpdatedAt` datetime NOT NULL,
  KEY `usrId` (`usrId`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `User` (`usrId`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `comtId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `comtTxt` text NOT NULL,
  `usrId` int(11) NOT NULL,
  `usrPseudo` varchar(255) NOT NULL,
  `postId` int(11) NOT NULL,
  `comtCreatedAt` datetime NOT NULL,
  `comtUpdatedAt` datetime NOT NULL,
  KEY `usrId` (`usrId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `User` (`usrId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`usrPseudo`) REFERENCES `User` (`usrPseudo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`postId`) REFERENCES `Post` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Like`;
CREATE TABLE `Like` (
  `likeId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usrId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `likeCreatedAt` datetime NOT NULL,
  `likeUpdatedAt` datetime NOT NULL,
  KEY `usrId` (`usrId`),
  KEY `postId` (`postId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `User` (`usrId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `Post` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `User`(usrId,usrPseudo,usrName,usrMail,usrPasswd,usrImgUrl,usrBio,usrRole,usrCreatedAt,usrUpdatedAt)
VALUES
(1,'admin','Priscilla','admin@mail.com','pass123','http://localhost:3000/upload/admin-profile-img.jpg','Hello, \nJe suis, modérateur/modératrice.\nBienvenue à tout le monde.',0,'2021-08-03 12:37:33','2021-08-04 10:55:12'),
(2,'user1','Abe','iamuser@test.io','test','http://localhost:3000/upload/user1-profile-img.jpg','Io la foule',1,'2021-08-03 14:39:59','2021-08-03 14:40:58'),
(3,'user2','Ziggy','anotherone@test.io','test','http://localhost:3000/upload/user2-profile-img.jpg',NULL,1,'2021-08-04 12:37:31','2021-08-04 12:31:07');

INSERT INTO `Post`(postId,postTitle,postTxt,postImgUrl,postCreatedAt,postUpdatedAt,usrId)
VALUES
(1,'premier post','lorem ipsum','http://localhost:3000/upload/img_01.jpg','2021-08-03 12:48:15','2021-08-03 12:48:15',1),
(2,'second post','lorem ipsum',NULL,'2021-08-04 12:42:40','2021-08-04 12:42:40',1),
(3,'troisieme post','lorem ipsum','http://localhost:3000/upload/img_02.jpg','2021-08-04 15:10:02','2021-08-04 19:13:08',2);

INSERT INTO `Comment`(comtId,comtTxt,usrId,usrPseudo,postId,comtCreatedAt,comtUpdatedAt)
VALUES
(1,'great :-)',2,'user1',1,'2021-08-03 12:48:55','2021-08-03 12:49:15'),
(2,'wonderfull !',3,'user2',2,'2021-08-04 12:42:40','2021-08-04 12:43:40'),
(3,'what ?',2,'user1',2,'2021-08-04 12:43:12','2021-08-04 12:46:33'),
(4,'yo !',2,'user1',3,'2021-08-04 15:10:02','2021-08-04 19:14:08');

INSERT INTO `Like`(likeId,likeCreatedAt,likeUpdatedAt,usrId,postId)
VALUES
(1,'2021-08-04 12:52:55','2021-08-04 12:52:55',2,1),
(2,'2021-08-04 12:45:56','2021-08-04 12:45:56',3,1),
(3,'2021-08-04 15:12:32','2021-08-04 15:12:17',2,2),
(4,'2021-08-04 16:22:46','2021-08-04 16:29:57',3,2),
(5,'2021-08-04 10:26:59','2021-08-04 10:26:59',2,3),
(6,'2021-08-04 10:26:54','2021-08-04 10:26:54',3,3);