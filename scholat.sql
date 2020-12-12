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
  `cImgUrl` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `creator` varchar(20) NOT NULL,
  `introduction` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`courseID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `course` */

insert  into `course`(`courseID`,`cname`,`cImgUrl`,`creator`,`introduction`) values (1,'数据结构与算法','http://www.scholat.com/resources/c_icon/algorithms2020_1598001765238.jpg','1','这是数据结构与算法课程'),(2,'数字图像处理','http://www.scholat.com/resources/c_icon/imageprocessing_1509061447401046.jpg','1','这是数字图像处理'),(3,'Linux操作系统','http://www.scholat.com/resources/c_icon/linuxopsystem_1497495229734.jpg','1','这是Linux操作系统课程'),(6,'c++语言程序设计','http://www.scholat.com/resources/c_icon/sjjg_1503252320591107.jpg','3','这是C++语言程序设计课程'),(7,'计算机科学技术导论','http://www.scholat.com/resources/c_icon/jsjkx_1534320000586.jpg','3','这是计算机科学技术导论');

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

insert  into `course_announcement`(`ID`,`courseID`,`context`,`title`,`announceTime`,`viewTimes`) values (1,1,'这是作业1的公告， 大家注意查收','作业公告','2020-12-05 14:37:58.000000',5),(2,1,'为培养新生对算法兴趣，提高编程素养，华南师范大学软件学院与软件协会香农先修班将举行AK杯程序设计竞赛。','华南师范大学软件学院将举办19级AK杯学院新生程序设计竞赛（时间更改）','2020-12-12 02:33:04.000000',0);

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

insert  into `course_homework`(`ID`,`courseID`,`title`,`teaID`,`ddl`,`context`) values (1,1,'实验一','2','2020-12-03 15:50:41','（1）CPU，中央处理器，计算机最核心的配件，负责所有的计算。\n\n（2）内存，你编写的程序、运行的游戏、打开的浏览器都要加载到内存中才能运行，程序读取的数据、计算的结果也都在内存中，内存的大小决定了你能加载的东西的多少。\n\n（3）主板，存放在内存中数据需要被CPU读取，CPU计算完成后，还要把数据写入到内存中，然而CPU不能直接插在内存上，这就需要主板出马了，主板上很多个插槽，CPU和内存都是插在主板上，主板的芯片组和总线解决了CPU和内存之间的通讯问题，芯片组控制数据传输的流转，决定数据从哪里流向哪里，总线是实际数据传输的告诉公里，总线速度决定了数据的传输速度。\n\n（4）输入/输出设备，其实有了以上三大件之后，计算机就可以跑起来了。我们日常使用的话还需要键盘、鼠标、显示器等输入/输出设备，而很多云服务器通过SSH远程登录就可以访问，就不需要配显示器、鼠标、键盘这些东西，节省成本且方便维护。\n\n（5）硬盘，有了硬盘数据才能长久的保存下来，大部分还会给自己的机器配上机箱和风扇，解决灰尘和散热问题，不过这些也不是必须的，用纸板和电风扇替代也一样可以用。'),(2,1,'实验二','2','2020-12-05 16:03:11','这也是作业详情界面'),(3,1,'实验三','2','2020-12-02 15:50:41','这是作业详情界面'),(4,1,'实验四','2','2020-12-05 16:03:11','这也是作业详情界面');

/*Table structure for table `course_resource` */

DROP TABLE IF EXISTS `course_resource`;

CREATE TABLE `course_resource` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `courseID` int(5) NOT NULL,
  `fileUrl` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fileName` varchar(20) DEFAULT NULL,
  `uploadTime` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `course_resource` */

insert  into `course_resource`(`ID`,`courseID`,`fileUrl`,`fileName`,`uploadTime`) values (1,1,'uploadFiles/7/{E166D541-87EA-4262-B6F7-30BC6F9C457B}.png.jpg','李桂明傻逼','2020-12-11 10:25:24.000000'),(5,1,'uploadFiles/7/api文档.xlsx','测试文件','2020-12-11 10:44:35.000000');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_course` */

insert  into `user_course`(`ID`,`userEmail`,`courseID`) values (1,'1',1),(2,'1',2),(3,'1',3),(4,'2',1),(6,'1',6),(7,'1',13);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_coursehomework` */

insert  into `user_coursehomework`(`ID`,`userEmail`,`homeworkID`,`status`,`finishTime`,`homeworkUrl`) values (1,'1',1,'已完成','2020-12-07 21:54:35.337000',NULL),(2,'1',2,'未完成','2020-12-11 10:11:47.000000',NULL);

/*Table structure for table `course_announcement_tea` */

DROP TABLE IF EXISTS `course_announcement_tea`;

/*!50001 DROP VIEW IF EXISTS `course_announcement_tea` */;
/*!50001 DROP TABLE IF EXISTS `course_announcement_tea` */;

/*!50001 CREATE TABLE  `course_announcement_tea`(
 `ID` int(5) ,
 `courseID` int(5) ,
 `context` varchar(500) ,
 `title` varchar(50) ,
 `announceTime` datetime(6) ,
 `viewTimes` int(5) ,
 `teaName` varchar(10) 
)*/;

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
 `cImgUrl` varchar(200) ,
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

/*View structure for view course_announcement_tea */

/*!50001 DROP TABLE IF EXISTS `course_announcement_tea` */;
/*!50001 DROP VIEW IF EXISTS `course_announcement_tea` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `course_announcement_tea` AS select `course_announcement`.`ID` AS `ID`,`course_announcement`.`courseID` AS `courseID`,`course_announcement`.`context` AS `context`,`course_announcement`.`title` AS `title`,`course_announcement`.`announceTime` AS `announceTime`,`course_announcement`.`viewTimes` AS `viewTimes`,`user`.`name` AS `teaName` from ((`course_announcement` join `user`) join `course`) where ((`course_announcement`.`courseID` = `course`.`courseID`) and (`course`.`creator` = `user`.`email`)) */;

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
