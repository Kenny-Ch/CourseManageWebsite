/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.17 : Database - scholat
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`scholat` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `scholat`;

/*Table structure for table `course` */

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `courseID` int(5) NOT NULL AUTO_INCREMENT,
  `cname` varchar(10) NOT NULL,
  `cImgUrl` varchar(50) DEFAULT NULL,
  `creator` varchar(20) NOT NULL,
  `introduction` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`courseID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `course` */

insert  into `course`(`courseID`,`cname`,`cImgUrl`,`creator`,`introduction`) values (1,'数据结构与算法','http://www.scholat.com/resources/c_icon/sjjg_15032','2','这是数据结构与算法课程'),(2,'数字图像处理','http://www.scholat.com/resources/c_icon/imageproce','3','这是数字图像处理'),(3,'Linux操作系统','http://www.scholat.com/resources/c_icon/linuxopsys','2','这是Linux操作系统课程'),(6,'c++语言程序设计','http://www.scholat.com/resources/c_icon/cppl_15513','3','这是C++语言程序设计课程'),(7,'计算机科学技术导论','http://www.scholat.com/resources/c_icon/jsjkx_1534','3','这是计算机科学技术导论'),(8,'计算机科学技术导论','http://www.scholat.com/resources/c_icon/jsjkx_1534','3','这是计算机科学技术导论');

/*Table structure for table `course_announcement` */

DROP TABLE IF EXISTS `course_announcement`;

CREATE TABLE `course_announcement` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `courseID` int(5) NOT NULL,
  `context` varchar(500) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `announceTime` datetime(6) DEFAULT NULL,
  `viewTimes` int(5) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `course_announcement` */

insert  into `course_announcement`(`ID`,`courseID`,`context`,`title`,`announceTime`,`viewTimes`) values (1,1,'这是作业1的公告， 大家注意查收','作业公告','2020-12-05 14:37:58.000000',5),(2,1,'这是作业2的公告，大家注意查收',NULL,NULL,0);

/*Table structure for table `course_homework` */

DROP TABLE IF EXISTS `course_homework`;

CREATE TABLE `course_homework` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `courseID` int(5) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `teaID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ddl` datetime DEFAULT NULL,
  `context` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `course_homework` */

insert  into `course_homework`(`ID`,`courseID`,`title`,`teaID`,`ddl`,`context`) values (1,1,'实验一','2','2020-12-03 15:50:41','这是作业详情界面'),(2,1,'实验二','2','2020-12-05 16:03:11','这也是作业详情界面'),(3,1,'实验三','2','2020-12-02 15:50:41','这是作业详情界面'),(4,1,'实验四','2','2020-12-05 16:03:11','这也是作业详情界面');

/*Table structure for table `course_resource` */

DROP TABLE IF EXISTS `course_resource`;

CREATE TABLE `course_resource` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `courseID` int(5) NOT NULL,
  `fileUrl` varchar(50) DEFAULT NULL,
  `fileName` varchar(20) DEFAULT NULL,
  `uploadTime` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `course_resource` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `email` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `imgUrl` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user` */

insert  into `user`(`email`,`password`,`name`,`imgUrl`) values ('1','123','jack',NULL),('2','123','mary',NULL),('3','123','李桂明',NULL);

/*Table structure for table `user_course` */

DROP TABLE IF EXISTS `user_course`;

CREATE TABLE `user_course` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(20) NOT NULL,
  `courseID` int(5) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_course` */

insert  into `user_course`(`ID`,`userEmail`,`courseID`) values (1,'1',1),(2,'1',2),(3,'1',3),(4,'2',1);

/*Table structure for table `user_coursehomework` */

DROP TABLE IF EXISTS `user_coursehomework`;

CREATE TABLE `user_coursehomework` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(20) NOT NULL,
  `homeworkID` int(5) NOT NULL,
  `status` varchar(5) DEFAULT '未完成',
  `finishTime` datetime(6) DEFAULT NULL,
  `homeworkUrl` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_coursehomework` */

insert  into `user_coursehomework`(`ID`,`userEmail`,`homeworkID`,`status`,`finishTime`,`homeworkUrl`) values (1,'1',1,'已完成','2020-12-07 21:54:35.337000',NULL);

/*Table structure for table `course_homework_tea` */

DROP TABLE IF EXISTS `course_homework_tea`;

/*!50001 DROP VIEW IF EXISTS `course_homework_tea` */;
/*!50001 DROP TABLE IF EXISTS `course_homework_tea` */;

/*!50001 CREATE TABLE  `course_homework_tea`(
 `ID` int(5) ,
 `courseID` int(5) ,
 `title` varchar(20) ,
 `teaID` varchar(20) ,
 `ddl` datetime ,
 `context` varchar(500) ,
 `teaName` varchar(10) ,
 `teaImg` varchar(50) 
)*/;

/*Table structure for table `user_allcourses` */

DROP TABLE IF EXISTS `user_allcourses`;

/*!50001 DROP VIEW IF EXISTS `user_allcourses` */;
/*!50001 DROP TABLE IF EXISTS `user_allcourses` */;

/*!50001 CREATE TABLE  `user_allcourses`(
 `ID` int(5) ,
 `courseID` int(5) ,
 `userEmail` varchar(20) ,
 `cname` varchar(10) ,
 `cImgUrl` varchar(50) ,
 `teaID` varchar(20) ,
 `teaName` varchar(10) ,
 `introduction` varchar(100) 
)*/;

/*Table structure for table `user_homeworklist` */

DROP TABLE IF EXISTS `user_homeworklist`;

/*!50001 DROP VIEW IF EXISTS `user_homeworklist` */;
/*!50001 DROP TABLE IF EXISTS `user_homeworklist` */;

/*!50001 CREATE TABLE  `user_homeworklist`(
 `ID` int(5) ,
 `courseID` int(5) ,
 `userEmail` varchar(20) ,
 `status` varchar(5) ,
 `finishTime` datetime(6) ,
 `homeworkUrl` varchar(50) ,
 `homeworkTitle` varchar(20) ,
 `ddl` datetime ,
 `homeworkID` int(5) ,
 `teaID` varchar(20) ,
 `teaName` varchar(10) 
)*/;

/*View structure for view course_homework_tea */

/*!50001 DROP TABLE IF EXISTS `course_homework_tea` */;
/*!50001 DROP VIEW IF EXISTS `course_homework_tea` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `course_homework_tea` AS select `course_homework`.`ID` AS `ID`,`course_homework`.`courseID` AS `courseID`,`course_homework`.`title` AS `title`,`course_homework`.`teaID` AS `teaID`,`course_homework`.`ddl` AS `ddl`,`course_homework`.`context` AS `context`,`user`.`name` AS `teaName`,`user`.`imgUrl` AS `teaImg` from (`course_homework` join `user`) where (`user`.`email` = `course_homework`.`teaID`) */;

/*View structure for view user_allcourses */

/*!50001 DROP TABLE IF EXISTS `user_allcourses` */;
/*!50001 DROP VIEW IF EXISTS `user_allcourses` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_allcourses` AS select `user_course`.`ID` AS `ID`,`user_course`.`courseID` AS `courseID`,`user_course`.`userEmail` AS `userEmail`,`course`.`cname` AS `cname`,`course`.`cImgUrl` AS `cImgUrl`,`course`.`creator` AS `teaID`,`user`.`name` AS `teaName`,`course`.`introduction` AS `introduction` from ((`user_course` join `course`) join `user`) where ((`user_course`.`courseID` = `course`.`courseID`) and (`user`.`email` = `course`.`creator`)) */;

/*View structure for view user_homeworklist */

/*!50001 DROP TABLE IF EXISTS `user_homeworklist` */;
/*!50001 DROP VIEW IF EXISTS `user_homeworklist` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_homeworklist` AS select `user_coursehomework`.`ID` AS `ID`,`course_homework`.`courseID` AS `courseID`,`user_coursehomework`.`userEmail` AS `userEmail`,`user_coursehomework`.`status` AS `status`,`user_coursehomework`.`finishTime` AS `finishTime`,`user_coursehomework`.`homeworkUrl` AS `homeworkUrl`,`course_homework`.`title` AS `homeworkTitle`,`course_homework`.`ddl` AS `ddl`,`course_homework`.`ID` AS `homeworkID`,`course_homework`.`teaID` AS `teaID`,`user`.`name` AS `teaName` from ((`user_coursehomework` join `course_homework`) join `user`) where ((`user_coursehomework`.`homeworkID` = `course_homework`.`ID`) and (`course_homework`.`teaID` = `user`.`email`)) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
