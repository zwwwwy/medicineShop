-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-03-05 10:20:29
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `medicine_shop`
--

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `openid` varchar(100) NOT NULL,
  `infoJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`infoJson`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`openid`, `infoJson`) VALUES
('onXxF6Y7VAsxPZ76WJ5MzqidFKCQ', '{}');

-- --------------------------------------------------------

--
-- 表的结构 `doctorinfo`
--

CREATE TABLE `doctorinfo` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `gender` varchar(4) NOT NULL,
  `age` int(11) NOT NULL,
  `skill` text NOT NULL,
  `avatar` text NOT NULL,
  `info` text NOT NULL,
  `contact` text NOT NULL,
  `tag` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='医生信息';

--
-- 转存表中的数据 `doctorinfo`
--

INSERT INTO `doctorinfo` (`id`, `name`, `gender`, `age`, `skill`, `avatar`, `info`, `contact`, `tag`) VALUES
(1, '马化疼', '男', 52, '擅长起死回生', '\"https://头像地址\"', '这是个人信息', '这是联系方式', '外科');

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `price` double NOT NULL,
  `url` text NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `details` text NOT NULL,
  `topimage` text NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='商品列表页面的信息（无商品详情）';

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `title`, `price`, `url`, `tag`, `details`, `topimage`, `stock`) VALUES
(1, '999三九感冒灵颗粒10g*9袋感冒药解热镇痛用于感冒引起的头痛发热鼻塞流涕咽痛', 14.9, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good1.jpg', '感冒药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good1.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good1.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good1.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good1.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good1.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good1.jpg', 24),
(2, '方盛 蒲地蓝消炎片54片清热解毒抗炎消肿用于疖肿咽炎扁桃腺炎感冒咽喉痛解热镇痛中成药', 8, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good2.jpg', '消炎药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good2.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good2.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good2.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good2.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good2.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good2.jpg', 11),
(3, '东北制药 维生素C片100mg*100片 预防坏血病急慢性传染疾病紫癜', 2.5, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg', '维生素', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg', 0),
(4, '北京同仁堂 六味地黄丸（水蜜丸）360丸 本品用于肾阴亏损 头晕耳鸣 腰膝酸软 骨蒸潮热 盗汗遗精', 13.8, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good4.jpg', '中成药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good4.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good4.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good4.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good4.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good4.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good4.jpg', 8),
(5, '葵花 蒲地蓝消炎片 0.24g*40片 清热解毒 抗炎消肿 用于 疖肿 咽炎 扁桃腺炎', 9.8, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good5.jpg', '消炎药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good5.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good5.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good5.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good5.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good5.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good5.jpg', 11),
(6, '正妥 穿心莲内酯分散片 50mg*24片 清热解毒 抗菌消炎cc 1盒装', 3.7, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good6.jpg', '消炎药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good6.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good6.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good6.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good6.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good6.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good6.jpg', 186),
(7, '感康 复方氨酚烷胺片12片 成人感冒发热头痛鼻塞流涕打喷嚏咽痛含对乙酰氨基酚', 12, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good7.jpg', '感冒药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good7.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good7.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good7.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good7.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good7.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good7.jpg', 1235),
(8, '白云山 板蓝根颗粒10g*20袋 清热解毒 凉血利咽 口咽干燥 咽喉肿痛', 17.8, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good8.jpg', '感冒药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good8.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good8.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good8.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good8.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good8.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good8.jpg', 52),
(9, '以岭 连花清瘟胶囊 0.35g*24粒 连花清瘟 清瘟解毒 宣肺泄热 流行性感冒 发烧或发热头痛咳嗽', 11.9, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good9.jpg', '感冒药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good9.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good9.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good9.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good9.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good9.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good9.jpg', 123),
(10, '三清山 川贝枇杷糖浆 150m 清热宣肺化痰止咳 咳嗽痰黄 咽喉肿痛胸闷胀痛 感冒 支气管炎 咳嗽药止咳药', 9.9, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good10.jpg', '感冒药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good10.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good10.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good10.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good10.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good10.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good10.jpg', 36),
(11, '百灵鸟 贵州百灵 维C银翘片24片 感冒咳嗽 清热解毒 外感风热 流行性感冒 发热头痛 咳嗽口干 咽喉疼痛', 6, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good11.jpg', '感冒药', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good11.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good11.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good11.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good11.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good11.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good11.jpg', 67),
(12, '九芝堂 足光散 40g*5袋/盒用于湿热下注所致的角化型手足癣及臭汗症', 14.9, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good12.jpg', '其他', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good12.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good12.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good12.jpg', 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good12.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good12.jpg&&https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good12.jpg', 83);

-- --------------------------------------------------------

--
-- 表的结构 `orderinfo`
--

CREATE TABLE `orderinfo` (
  `openid` varchar(100) NOT NULL,
  `orderInfo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `orderinfo`
--

INSERT INTO `orderinfo` (`openid`, `orderInfo`) VALUES
('onXxF6Y7VAsxPZ76WJ5MzqidFKCQ', '{\"20240305123226\": {\"2\": {\"amount\": 1, \"status\": -1}, \"4\": {\"amount\": 1, \"status\": -1}, \"address\": \"北京市北京市东城区12335\"}, \"20240305123247\": {\"2\": {\"amount\": 1, \"status\": 1}, \"4\": {\"amount\": 1, \"status\": 1}, \"address\": \"河北省石家庄市长安区1234256\"}}');

-- --------------------------------------------------------

--
-- 表的结构 `swiper`
--

CREATE TABLE `swiper` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `swiper`
--

INSERT INTO `swiper` (`id`, `url`, `name`) VALUES
(1, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/1.png', '1'),
(2, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/2.png', '2'),
(3, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/3.png', '3'),
(4, 'https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/4.png', '4');

--
-- 转储表的索引
--

--
-- 表的索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`openid`);

--
-- 表的索引 `doctorinfo`
--
ALTER TABLE `doctorinfo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD PRIMARY KEY (`openid`);

--
-- 表的索引 `swiper`
--
ALTER TABLE `swiper`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
