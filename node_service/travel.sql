/*
 Navicat Premium Dump SQL

 Source Server         : travel
 Source Server Type    : MySQL
 Source Server Version : 80405 (8.4.5)
 Source Host           : localhost:3306
 Source Schema         : travel

 Target Server Type    : MySQL
 Target Server Version : 80405 (8.4.5)
 File Encoding         : 65001

 Date: 29/07/2025 15:14:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `routes` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `role`, `routes`) VALUES (1, 'admin', '[{\"path\":\"/\",\"component\":\"layout/index\",\"redirect\":\"/dashboard\",\"children\":[{\"path\":\"dashboard\",\"component\":\"views/dashboard/index\",\"name\":\"Dashboard\",\"meta\":{\"title\":\"首页\",\"svgIcon\":\"dashboard\",\"affix\":true}}]},{\"path\":\"/demo\",\"component\":\"layout/index\",\"redirect\":\"/demo/unocss\",\"name\":\"Demo\",\"meta\":{\"title\":\"示例集合\",\"elIcon\":\"DataBoard\",\"alwaysShow\":true},\"children\":[{\"path\":\"unocss\",\"component\":\"views/demo/unocss/index\",\"name\":\"UnoCSS\",\"meta\":{\"title\":\"UnoCSS\",\"keepAlive\":true,\"hidden\":false}},{\"path\":\"element-plus\",\"component\":\"views/demo/element-plus/index\",\"name\":\"ElementPlus\",\"meta\":{\"title\":\"Element Plus\",\"hidden\":false,\"keepAlive\":true}},{\"path\":\"vxe-table\",\"component\":\"views/demo/vxe-table/index\",\"name\":\"VxeTable\",\"meta\":{\"title\":\"Vxe Table\",\"hidden\":false,\"keepAlive\":true}}]}]');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `refresh_token` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_only_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `username`, `password`, `refresh_token`, `email`, `role`, `user_only_id`) VALUES (1, 'admin', '$2b$10$Rkt9iptYrAwQR29YwSGFdel/KSnnjU5KcO4Q0dUlcDbWrbzK2jinC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyX29ubHlfaWQiOiIzNDAzMzg4NTEyNDU1OTI1NzYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibG9naW5UaW1lIjoiMjAyNS0wNy0yOVQwNjo0NzoyMi42NzRaIn0sImlzUmVmcmVzaFRva2VuIjp0cnVlLCJpYXQiOjE3NTM3NzE2NDIsImV4cCI6MTc1NDM3NjQ0Mn0.OvFqAVZmZpGM2UNtyiS1OmYcKS0aa5sLezXPqLDjnjw', '1173309363@qq.com', 'admin', '340338851245592576');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
