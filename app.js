/**
 * ==========================================================================
 * 社區帳務與收支管理系統 - 核心邏輯 (app.js)
 * ==========================================================================
 */

// 確保 app 變數全局可用
window.app = null;

// 社區真實的 80 戶區權人名冊預設資料 (從「社區管理繳交紀錄.xlsx」提取)
const DEFAULT_PROPRIETORS = [
  { "id": "prop_1", "building": "A1棟", "floor": "02F", "room": "02F", "name": "陳穎", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_2", "building": "A1棟", "floor": "03F", "room": "03F", "name": "洪芬蘭", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_3", "building": "A1棟", "floor": "04F", "room": "04F", "name": "邱鈺婷", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_4", "building": "A1棟", "floor": "05F", "room": "05F", "name": "陳絢華", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_5", "building": "A1棟", "floor": "06F", "room": "06F", "name": "莊嘉騏", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_6", "building": "A1棟", "floor": "07F", "room": "07F", "name": "郭芸碩", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_7", "building": "A1棟", "floor": "08F", "room": "08F", "name": "鄧筱蘭", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_8", "building": "A1棟", "floor": "09F", "room": "09F", "name": "蔡逸琳", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_9", "building": "A1棟", "floor": "10F", "room": "10F", "name": "施俐安", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_10", "building": "A1棟", "floor": "11F", "room": "11F", "name": "徐振家", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_11", "building": "A2棟", "floor": "02F", "room": "02F", "name": "陳梅香", "phone": "0900-000000", "area": 12.13, "parking": "無", "feeType": "fixed", "feeRate": 2091, "parkingFee": 0, "monthlyFee": 2091 },
  { "id": "prop_12", "building": "A2棟", "floor": "03F", "room": "03F", "name": "葉碧琴", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_13", "building": "A2棟", "floor": "04F", "room": "04F", "name": "陳映竹", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_14", "building": "A2棟", "floor": "05F", "room": "05F", "name": "徐振家", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_15", "building": "A2棟", "floor": "06F", "room": "06F", "name": "張富雄", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_16", "building": "A2棟", "floor": "07F", "room": "07F", "name": "游貴珠", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_17", "building": "A2棟", "floor": "08F", "room": "08F", "name": "徐振家", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_18", "building": "A2棟", "floor": "09F", "room": "09F", "name": "呂筵絲", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_19", "building": "A2棟", "floor": "10F", "room": "10F", "name": "許馨云", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_20", "building": "A2棟", "floor": "11F", "room": "11F", "name": "李亭慧", "phone": "0900-000000", "area": 12.12, "parking": "無", "feeType": "fixed", "feeRate": 2089, "parkingFee": 0, "monthlyFee": 2089 },
  { "id": "prop_21", "building": "A3棟", "floor": "02F", "room": "02F", "name": "章正文", "phone": "0900-000000", "area": 8.15, "parking": "無", "feeType": "fixed", "feeRate": 1454, "parkingFee": 0, "monthlyFee": 1454 },
  { "id": "prop_22", "building": "A3棟", "floor": "03F", "room": "03F", "name": "鄭仲賢", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_23", "building": "A3棟", "floor": "04F", "room": "04F", "name": "謝文芳", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_24", "building": "A3棟", "floor": "05F", "room": "05F", "name": "徐國來", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_25", "building": "A3棟", "floor": "06F", "room": "06F", "name": "葉伊敏", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_26", "building": "A3棟", "floor": "07F", "room": "07F", "name": "何淑婷", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_27", "building": "A3棟", "floor": "08F", "room": "08F", "name": "楊凱程", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_28", "building": "A3棟", "floor": "09F", "room": "09F", "name": "黃淑珍", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_29", "building": "A3棟", "floor": "10F", "room": "10F", "name": "周艾頻", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_30", "building": "A3棟", "floor": "11F", "room": "11F", "name": "林美麗", "phone": "0900-000000", "area": 8.02, "parking": "無", "feeType": "fixed", "feeRate": 1433, "parkingFee": 0, "monthlyFee": 1433 },
  { "id": "prop_31", "building": "A4棟", "floor": "02F", "room": "02F", "name": "林怡玲", "phone": "0900-000000", "area": 10.26, "parking": "無", "feeType": "fixed", "feeRate": 1792, "parkingFee": 0, "monthlyFee": 1792 },
  { "id": "prop_32", "building": "A4棟", "floor": "03F", "room": "03F", "name": "徐敏文", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_33", "building": "A4棟", "floor": "04F", "room": "04F", "name": "謝惟雍", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_34", "building": "A4棟", "floor": "05F", "room": "05F", "name": "劉又瑋", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_35", "building": "A4棟", "floor": "06F", "room": "06F", "name": "顏安秀", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_36", "building": "A4棟", "floor": "07F", "room": "07F", "name": "謝惠卿", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_37", "building": "A4棟", "floor": "08F", "room": "08F", "name": "陳思辰", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_38", "building": "A4棟", "floor": "09F", "room": "09F", "name": "吳佳穎", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_39", "building": "A4棟", "floor": "10F", "room": "10F", "name": "楊心萍", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_40", "building": "A4棟", "floor": "11F", "room": "11F", "name": "周育安", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_41", "building": "A5棟", "floor": "02F", "room": "02F", "name": "謝志成", "phone": "0900-000000", "area": 10.27, "parking": "無", "feeType": "fixed", "feeRate": 1793, "parkingFee": 0, "monthlyFee": 1793 },
  { "id": "prop_42", "building": "A5棟", "floor": "03F", "room": "03F", "name": "陳倩平", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_43", "building": "A5棟", "floor": "04F", "room": "04F", "name": "謝文宜、謝亞衿", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_44", "building": "A5棟", "floor": "05F", "room": "05F", "name": "廖彥婷", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_45", "building": "A5棟", "floor": "06F", "room": "06F", "name": "施細梅", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_46", "building": "A5棟", "floor": "07F", "room": "07F", "name": "吳小惠", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_47", "building": "A5棟", "floor": "08F", "room": "08F", "name": "黃孟蘋", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_48", "building": "A5棟", "floor": "09F", "room": "09F", "name": "陳艷紅、吳佳龍", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_49", "building": "A5棟", "floor": "10F", "room": "10F", "name": "方雪麗", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_50", "building": "A5棟", "floor": "11F", "room": "11F", "name": "蔡佳穎", "phone": "0900-000000", "area": 10.92, "parking": "無", "feeType": "fixed", "feeRate": 1897, "parkingFee": 0, "monthlyFee": 1897 },
  { "id": "prop_51", "building": "A6棟", "floor": "02F", "room": "02F", "name": "謝奉志", "phone": "0900-000000", "area": 8.24, "parking": "無", "feeType": "fixed", "feeRate": 1468, "parkingFee": 0, "monthlyFee": 1468 },
  { "id": "prop_52", "building": "A6棟", "floor": "03F", "room": "03F", "name": "張亞迪", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_53", "building": "A6棟", "floor": "04F", "room": "04F", "name": "林淑真", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_54", "building": "A6棟", "floor": "05F", "room": "05F", "name": "徐佩君", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_55", "building": "A6棟", "floor": "06F", "room": "06F", "name": "黃家姚", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_56", "building": "A6棟", "floor": "07F", "room": "07F", "name": "徐川崙", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_57", "building": "A6棟", "floor": "08F", "room": "08F", "name": "王瑞鈺", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_58", "building": "A6棟", "floor": "09F", "room": "09F", "name": "賴香蓉", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_59", "building": "A6棟", "floor": "10F", "room": "10F", "name": "曾子南", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_60", "building": "A6棟", "floor": "11F", "room": "11F", "name": "吳碧玲", "phone": "0900-000000", "area": 8.03, "parking": "無", "feeType": "fixed", "feeRate": 1435, "parkingFee": 0, "monthlyFee": 1435 },
  { "id": "prop_61", "building": "A7棟", "floor": "02F", "room": "02F", "name": "林琦峰", "phone": "0900-000000", "area": 12.33, "parking": "無", "feeType": "fixed", "feeRate": 2123, "parkingFee": 0, "monthlyFee": 2123 },
  { "id": "prop_62", "building": "A7棟", "floor": "03F", "room": "03F", "name": "左少雄", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_63", "building": "A7棟", "floor": "04F", "room": "04F", "name": "李浩遵", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_64", "building": "A7棟", "floor": "05F", "room": "05F", "name": "張玉潔", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_65", "building": "A7棟", "floor": "06F", "room": "06F", "name": "洪于珺", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_66", "building": "A7棟", "floor": "07F", "room": "07F", "name": "吳博鈺", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_67", "building": "A7棟", "floor": "08F", "room": "08F", "name": "姜沁妍", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_68", "building": "A7棟", "floor": "09F", "room": "09F", "name": "李美慧", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_69", "building": "A7棟", "floor": "10F", "room": "10F", "name": "李玟琪", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_70", "building": "A7棟", "floor": "11F", "room": "11F", "name": "藍昭容", "phone": "0900-000000", "area": 12.19, "parking": "無", "feeType": "fixed", "feeRate": 2100, "parkingFee": 0, "monthlyFee": 2100 },
  { "id": "prop_71", "building": "A8棟", "floor": "02F", "room": "02F", "name": "曾雅瑜", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_72", "building": "A8棟", "floor": "03F", "room": "03F", "name": "楊慶安", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_73", "building": "A8棟", "floor": "04F", "room": "04F", "name": "盧彥成", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_74", "building": "A8棟", "floor": "05F", "room": "05F", "name": "曾宥青", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_75", "building": "A8棟", "floor": "06F", "room": "06F", "name": "錢兆強", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_76", "building": "A8棟", "floor": "07F", "room": "07F", "name": "李盈傑", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_77", "building": "A8棟", "floor": "08F", "room": "08F", "name": "李笎儀", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_78", "building": "A8棟", "floor": "09F", "room": "09F", "name": "張景盛", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_79", "building": "A8棟", "floor": "10F", "room": "10F", "name": "張玉芬", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 },
  { "id": "prop_80", "building": "A8棟", "floor": "11F", "room": "11F", "name": "賴世禹", "phone": "0900-000000", "area": 12.08, "parking": "無", "feeType": "fixed", "feeRate": 2083, "parkingFee": 0, "monthlyFee": 2083 }
];

document.addEventListener('DOMContentLoaded', () => {
  // 初始化系統
  window.app = new CommunityApp();
});

class CommunityApp {
  constructor() {
    this.supabase = null;
    this.syncMode = 'loading'; // online | offline | loading

    this.initDatabase();
    
    // 若本機資料庫完全無資料，則初次載入預設真實住戶與 115 年 6 月範例對帳資料
    if (this.db.vouchers.length === 0 && this.db.proprietors.length === 0) {
      // 由於載入範例資料中包含了 saveToStorage
      this.loadDemoData();
    }

    this.initElements();
    this.initEvents();
    
    // 初始化 Supabase 與檢查登入狀態
    this.initSupabase();
    this.checkLoginStatus();

    this.switchTab('dashboard');
    this.updateClock();
    setInterval(() => this.updateClock(), 60000);
    
    // 初始化 Chart.js 實例變數
    this.dashPieChart = null;
    this.monthlyPieChart = null;
    this.annualBarChart = null;
    
    // 渲染初始畫面
    this.renderAll();
    
    console.log('社區帳務系統初始化完成！');
  }

  // ==========================================================================
  // 1. 資料庫管理與本地儲存 (LocalStorage)
  // ==========================================================================
  initDatabase() {
    // 檢查是否有儲存過資料，若無則初始化為空陣列
    this.db = {
      vendors: JSON.parse(localStorage.getItem('comm_vendors')) || [],
      vouchers: JSON.parse(localStorage.getItem('comm_vouchers')) || [],
      pettyCash: JSON.parse(localStorage.getItem('comm_petty_cash')) || [],
      importHistory: JSON.parse(localStorage.getItem('comm_import_history')) || [],
      proprietors: JSON.parse(localStorage.getItem('comm_proprietors')) || [],
      bankBalances: JSON.parse(localStorage.getItem('comm_bank_balances')) || {}
    };

    // 防呆：若 proprietors 為空 (例如初次載入或有舊 LocalStorage 但無此新欄位)，自動補齊預設真實住戶名冊
    if (this.db.proprietors.length === 0) {
      this.db.proprietors = JSON.parse(JSON.stringify(DEFAULT_PROPRIETORS));
      this.saveToStorage('proprietors');
    }

    if (!window.CommunityFeeCalculator) {
      throw new Error('管理費計算器尚未載入');
    }
    if (!window.CommunityFeeStatusCalculator) {
      throw new Error('管理費收繳狀態計算器尚未載入');
    }
    if (!window.CommunitySmartLifeUploadGenerator) {
      throw new Error('智生活上傳檔產生器尚未載入');
    }
    if (!window.CommunityAdvanceClaimManager) {
      throw new Error('代墊請款計算器尚未載入');
    }
    if (!window.CommunityHistoricalDataImporter) {
      throw new Error('歷史收支匯入器尚未載入');
    }

    this.db.proprietors = this.db.proprietors.map(p => CommunityFeeCalculator.normalizeProprietorFees(p));
    this.importBundledHistoricalData();
    this.saveToStorage('proprietors');
  }

  importBundledHistoricalData() {
    if (!window.CommunityHistoricalData) return;

    const result = CommunityHistoricalDataImporter.mergeHistoricalData(this.db, window.CommunityHistoricalData);
    if (result.addedVoucherCount === 0 && result.addedBankBalanceCount === 0) return;

    const existingHistory = this.db.importHistory || [];
    const alreadyRecorded = existingHistory.some(item => item.importId === window.CommunityHistoricalData.importId);
    if (!alreadyRecorded) {
      existingHistory.unshift({
        importId: window.CommunityHistoricalData.importId,
        filename: window.CommunityHistoricalData.sourceFile || '世界花園收支整理.xlsx',
        date: new Date().toLocaleString('zh-TW'),
        count: result.addedVoucherCount,
        total: ((window.CommunityHistoricalData.summary && window.CommunityHistoricalData.summary.income) || 0) +
          ((window.CommunityHistoricalData.summary && window.CommunityHistoricalData.summary.expense) || 0),
        note: `歷史收支彙總匯入；銀行餘額 ${result.addedBankBalanceCount} 個月份`
      });
      this.db.importHistory = existingHistory;
    }

    this.saveToStorage();
  }

  saveToStorage(key) {
    if (key === 'vendors' || !key) {
      localStorage.setItem('comm_vendors', JSON.stringify(this.db.vendors));
    }
    if (key === 'vouchers' || !key) {
      localStorage.setItem('comm_vouchers', JSON.stringify(this.db.vouchers));
    }
    if (key === 'pettyCash' || !key) {
      localStorage.setItem('comm_petty_cash', JSON.stringify(this.db.pettyCash));
    }
    if (key === 'importHistory' || !key) {
      localStorage.setItem('comm_import_history', JSON.stringify(this.db.importHistory));
    }
    if (key === 'proprietors' || !key) {
      localStorage.setItem('comm_proprietors', JSON.stringify(this.db.proprietors));
    }
    if (key === 'bankBalances' || !key) {
      localStorage.setItem('comm_bank_balances', JSON.stringify(this.db.bankBalances));
    }

    // 當處於雲端同步模式時，自動將更新推送至 Supabase
    if (this.syncMode === 'online') {
      this.saveToCloud();
    }
  }

  // 載入預設範例資料（完全對應 115年6月份 應付帳款與代墊請款明細）
  loadDemoData() {
    // 1. 初始化廠商資料
    const demoVendors = [
      {
        id: 'v_lianan',
        name: '聯安保全股份有限公司',
        taxId: '22099388',
        contact: '林經理',
        phone: '02-25068899',
        mobile: '0933-111222',
        email: 'service@lianan.com.mty',
        address: '台北市南京東路二段',
        bankName: '國泰世華銀行',
        bankBranch: '南京東路分行',
        bankCode: '013',
        accountName: '聯安保全股份有限公司',
        accountNo: '0130987654321'
      },
      {
        id: 'v_hanshen',
        name: '漢神機電有限公司',
        taxId: '54321098',
        contact: '張技師',
        phone: '02-29993333',
        mobile: '0928-333444',
        email: 'hanshen@mech.com.tw',
        address: '新北市三重區重新路',
        bankName: '第一銀行',
        bankBranch: '三重分行',
        bankCode: '007',
        accountName: '漢神機電有限公司',
        accountNo: '007123456789'
      },
      {
        id: 'v_mitsubishi',
        name: '台灣三菱電梯股份有限公司',
        taxId: '11029384',
        contact: '李專員',
        phone: '02-27132211',
        mobile: '0910-555666',
        email: 'mitsubishi@elevator.com.tw',
        address: '台北市敦化北路',
        bankName: '兆豐國際商業銀行',
        bankBranch: '金控總部營業部',
        bankCode: '017',
        accountName: '台灣三菱電梯股份有限公司',
        accountNo: '01700987654'
      },
      {
        id: 'v_chichuan',
        name: '圻銓工業股份有限公司',
        taxId: '88776655',
        contact: '許主任',
        phone: '02-26889900',
        mobile: '0936-777888',
        email: 'chichuan@elevator.com',
        address: '新北市樹林區',
        bankName: '華南銀行',
        bankBranch: '樹林分行',
        bankCode: '008',
        accountName: '圻銓工業股份有限公司',
        accountNo: '008987654321'
      }
    ];

    // 2. 初始化傳票資料 (115年6月)
    const demoVouchers = [
      {
        id: 'vouch_1',
        voucherNo: 'M11506001',
        type: 'expense',
        date: '2026-06-30',
        vendorId: 'v_lianan',
        vendorName: '聯安保全股份有限公司',
        category: '物業管理費',
        amount: 85000,
        summary: '115年6月份 聯安保全服務費及保全人員薪資',
        paymentMethod: 'transfer',
        bankInfo: '國泰世華銀行 (013) 帳號: 0130987654321 戶名: 聯安保全股份有限公司',
        fixedType: 'fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: 'AN06577810'
      },
      {
        id: 'vouch_2',
        voucherNo: 'M11506002',
        type: 'expense',
        date: '2026-06-30',
        vendorId: 'v_hanshen',
        vendorName: '漢神機電有限公司',
        category: '機電消防維養費',
        amount: 5000,
        summary: '115年6月份 漢神機電有限公司消防維養保養費',
        paymentMethod: 'transfer',
        bankInfo: '第一銀行 (007) 帳號: 007123456789 戶名: 漢神機電有限公司',
        fixedType: 'fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: '收據'
      },
      {
        id: 'vouch_3',
        voucherNo: 'M11506003',
        type: 'expense',
        date: '2026-06-30',
        vendorId: 'v_mitsubishi',
        vendorName: '台灣三菱電梯股份有限公司',
        category: '電梯維護保養',
        amount: 14000,
        summary: '115年06月份 台灣三菱電梯維護保養費',
        paymentMethod: 'transfer',
        bankInfo: '兆豐國際商業銀行 (017) 帳號: 01700987654 戶名: 台灣三菱電梯股份有限公司',
        fixedType: 'fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: 'AN06577815'
      },
      {
        id: 'vouch_4',
        voucherNo: 'M11506004',
        type: 'expense',
        date: '2026-06-30',
        vendorId: 'v_chichuan',
        vendorName: '圻銓工業股份有限公司',
        category: '機車升降梯保養',
        amount: 3000,
        summary: '115年6月份 圻銓工業股份有限公司機車升降梯保養費',
        paymentMethod: 'transfer',
        bankInfo: '華南銀行 (008) 帳號: 008987654321 戶名: 圻銓工業股份有限公司',
        fixedType: 'fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: '收據'
      },
      {
        id: 'vouch_5',
        voucherNo: 'M11506005',
        type: 'expense',
        date: '2026-06-30',
        vendorId: '',
        vendorName: '自聘清潔人員 (陳阿姨)',
        category: '清潔服務費',
        amount: 14760,
        summary: '自聘清潔人員115年06月份薪資 (固定每週一二四六) 工作日$820元 * 18日 = 14,760元',
        paymentMethod: 'cash',
        bankInfo: '現金發放',
        fixedType: 'fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: '簽收單'
      },
      {
        id: 'vouch_6',
        voucherNo: 'M11506006',
        type: 'expense',
        date: '2026-06-30',
        vendorId: '',
        vendorName: '大豐環保回收',
        category: '清潔服務費',
        amount: 4000,
        summary: '115年06月份社區垃圾與回收物處理費',
        paymentMethod: 'transfer',
        bankInfo: '郵局 (700) 帳號: 00012345678901',
        fixedType: 'fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: '發票'
      },
      {
        id: 'vouch_7',
        voucherNo: 'M11506007',
        type: 'expense',
        date: '2026-06-24',
        vendorId: '',
        vendorName: '前瞻國際機械',
        category: '維修保養費',
        amount: 1050,
        summary: '6/24 廚餘機櫃機械故障故障查修與零件更換費',
        paymentMethod: 'transfer',
        bankInfo: '代墊人請款匯款',
        fixedType: 'non-fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: 'ZX52645354'
      },
      {
        id: 'vouch_8',
        voucherNo: 'M11506008',
        type: 'expense',
        date: '2026-06-30',
        vendorId: '',
        vendorName: '代墊請款',
        category: '公共事務費',
        amount: 4307,
        summary: '115年6月份-代墊請款 (項次 01 ~ 04)',
        paymentMethod: 'transfer',
        bankInfo: '代墊人請款匯款',
        fixedType: 'non-fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '陳主任委員',
        receiptNo: '檢附明細如附件'
      }
    ];

    // 3. 初始化代墊請款 (115年6月)
    const demoPettyCash = [
      {
        id: 'pc_1',
        index: '01',
        date: '2026-06-02',
        category: '行政事務費',
        summary: '影印機碳粉匣*3 $2999元',
        income: 0,
        expense: 2999,
        receipt: '購買證明+照片',
        status: 'reimbursed',
        reimburseVoucherNo: 'M11506008'
      },
      {
        id: 'pc_2',
        index: '02',
        date: '2026-06-05',
        category: '行政事務費',
        summary: '專用垃圾袋25公升*2 $360元 + 33公升*4 $948元',
        income: 0,
        expense: 1308,
        receipt: '購買證明+發票 AZ79531624',
        status: 'reimbursed',
        reimburseVoucherNo: 'M11506008'
      },
      {
        id: 'pc_3',
        index: '03',
        date: '2026-06-08',
        category: '行政事務費',
        summary: '洗衣槽專用清潔劑*2 $170元',
        income: 0,
        expense: 170,
        receipt: '發票',
        status: 'reimbursed',
        reimburseVoucherNo: 'M11506008'
      },
      {
        id: 'pc_4',
        index: '04',
        date: '2026-06-15',
        category: '行政事務費',
        summary: '大門感應扣增購 $430元',
        income: 0,
        expense: 430,
        receipt: '簽收單',
        status: 'reimbursed',
        reimburseVoucherNo: 'M11506008'
      },
      {
        id: 'pc_5',
        index: '05',
        date: '2026-06-15',
        category: '行政事務費',
        summary: '警衛端午節加班禮金與慰問飲料',
        income: 0,
        expense: 2000,
        receipt: '簽收單',
        status: 'unreimbursed',
        reimburseVoucherNo: ''
      },
      {
        id: 'pc_init',
        index: '00',
        date: '2026-06-01',
        category: '代墊請款',
        summary: '上月代墊請款入帳',
        income: 10000,
        expense: 0,
        receipt: '提帳單',
        status: 'reimbursed',
        reimburseVoucherNo: ''
      }
    ];

    // 4. 載入社區真實的 80 戶區權人名冊 (從「社區管理繳交紀錄.xlsx」提取)
    const demoProprietors = JSON.parse(JSON.stringify(DEFAULT_PROPRIETORS))
      .map(p => CommunityFeeCalculator.normalizeProprietorFees(p));

    const demoIncome = [];
    // 為 80 戶中的前 79 戶自動產生 115 年 6 月的管理費收入傳票 (排除最後一戶 prop_80 賴世禹，保留為欠繳以展示查核對帳效果)
    demoProprietors.forEach((p, idx) => {
      if (p.id === 'prop_80') return; // 賴世禹欠繳，不生成傳票
      
      const day = String((idx * 7) % 25 + 1).padStart(2, '0');
      const roomName = `${p.building}-${p.floor}-${p.room}`;
      
      demoIncome.push({
        id: `demo_inc_${p.id}`,
        voucherNo: `I11506${String(demoIncome.length + 1).padStart(3, '0')}`,
        type: 'income',
        date: `2026-06-${day}`,
        vendorId: '',
        vendorName: `${p.name} (管理費)`,
        category: '管理費收入',
        amount: p.monthlyFee,
        managementFee: p.managementFee,
        maintenanceFee: p.maintenanceFee,
        summary: `115年6月份管理費 - 繳款人:${p.name} (${roomName})`,
        paymentMethod: 'transfer',
        bankInfo: '今網智生活超商/ATM代收',
        fixedType: 'fixed',
        handler: '系統自動銷帳',
        approver: '系統核銷',
        owner: '',
        receiptNo: `SL11506${String(demoIncome.length + 1).padStart(3, '0')}`,
        proprietorId: p.id,
        feeMonth: '2026-06'
      });
    });

    // 將所有資料存入資料庫
    this.db.vendors = demoVendors;
    this.db.vouchers = [...demoVouchers, ...demoIncome];
    this.db.pettyCash = demoPettyCash;
    this.db.proprietors = demoProprietors;
    
    // 增加一個模擬的匯入歷史記錄
    this.db.importHistory = [
      {
        filename: '今網智生活_11506管理費繳費明細.xlsx',
        date: '2026-06-28 10:15:30',
        count: demoIncome.length,
        total: demoIncome.reduce((acc, curr) => acc + curr.amount, 0)
      }
    ];

    this.saveToStorage();
    this.renderAll();
    alert('已成功載入 115年6月份 範例帳務資料！');
  }

  // ==========================================================================
  // 2. 初始化 UI 元件與選取 DOM
  // ==========================================================================
  initElements() {
    // 導覽頁籤
    this.tabItems = document.querySelectorAll('.sidebar-item');
    this.tabContents = document.querySelectorAll('.tab-content');
    
    // 全域與資料庫控制
    this.themeToggleBtn = document.getElementById('btn-theme-toggle');
    this.exportDataBtn = document.getElementById('btn-export-data');
    this.importTriggerBtn = document.getElementById('btn-import-trigger');
    this.restoreFileInput = document.getElementById('restore-file-input');
    this.currentTimeBadge = document.getElementById('current-time-badge');
    
    // 面板內建資料庫控制按鈕
    this.dbExportBtn = document.getElementById('btn-db-export');
    this.dbImportTriggerBtn = document.getElementById('btn-db-import-trigger');
    this.dbRestoreFileInput = document.getElementById('db-restore-file-input');
    this.excelHistoryFileInput = document.getElementById('excel-history-file-input');
    this.btnImportExcelHistory = document.getElementById('btn-import-excel-history');
    this.loadDemoDbBtn = document.getElementById('btn-load-demo-db');
    this.dbClearBtn = document.getElementById('btn-db-clear');
    
    // 支出傳票相關
    this.voucherSearchInput = document.getElementById('voucher-search');
    this.voucherCategorySelect = document.getElementById('voucher-filter-category');
    this.voucherMonthSelect = document.getElementById('voucher-filter-month');
    this.voucherTypeSelect = document.getElementById('voucher-filter-type');
    this.btnAddVoucher = document.getElementById('btn-add-voucher');
    this.vouchersListTbody = document.getElementById('vouchers-list');
    
    // 支出傳票 Modal
    this.voucherDialog = document.getElementById('voucher-dialog');
    this.voucherForm = document.getElementById('voucher-form');
    this.vIdInput = document.getElementById('voucher-id');
    this.vDateInput = document.getElementById('v-date');
    this.vNoInput = document.getElementById('v-no');
    this.vVendorSelect = document.getElementById('v-vendor');
    this.vCategorySelect = document.getElementById('v-category');
    this.vAmountInput = document.getElementById('v-amount');
    this.vPaymentMethodSelect = document.getElementById('v-payment-method');
    this.vBankInfoInput = document.getElementById('v-bank-info');
    this.vReceiptNoInput = document.getElementById('v-receipt-no');
    this.vFixedTypeSelect = document.getElementById('v-fixed-type');
    this.vSummaryTextarea = document.getElementById('v-summary');
    this.vHandlerInput = document.getElementById('v-handler');
    this.vApproverInput = document.getElementById('v-approver');
    this.btnSaveVoucher = document.getElementById('btn-save-voucher');
    
    // 檢視傳票與列印
    this.voucherViewDialog = document.getElementById('voucher-view-dialog');
    this.btnPrintVoucher = document.getElementById('btn-print-voucher');
    
    // 代墊請款相關
    this.pettyMonthSelect = document.getElementById('petty-filter-month');
    this.pettyStatusSelect = document.getElementById('petty-filter-status');
    this.btnReimbursePetty = document.getElementById('btn-reimburse-petty');
    this.reimburseCountSpan = document.getElementById('reimburse-count');
    this.btnAddPetty = document.getElementById('btn-add-petty');
    this.btnDownloadPettyExcel = document.getElementById('btn-download-petty-excel');
    this.pettySelectAllCheckbox = document.getElementById('petty-select-all');
    this.pettyListTbody = document.getElementById('petty-list');
    
    // 代墊請款 Modal
    this.pettyCashDialog = document.getElementById('petty-cash-dialog');
    this.pettyCashForm = document.getElementById('petty-cash-form');
    this.pIdInput = document.getElementById('petty-id');
    this.pDateInput = document.getElementById('p-cash-date');
    this.pTypeSelect = document.getElementById('p-cash-type');
    this.pCategorySelect = document.getElementById('p-cash-category');
    this.pAmountInput = document.getElementById('p-cash-amount');
    this.pReceiptInput = document.getElementById('p-cash-receipt');
    this.pSummaryTextarea = document.getElementById('p-cash-summary');

    // 零用金匯出 Modal
    this.pettyExportDialog = document.getElementById('petty-export-dialog');
    this.pExportMonthSelect = document.getElementById('p-export-month');
    this.btnConfirmExportExcel = document.getElementById('btn-confirm-export-excel');
    
    // 廠商相關
    this.vendorSearchInput = document.getElementById('vendor-search');
    this.btnAddVendor = document.getElementById('btn-add-vendor');
    this.vendorsListTbody = document.getElementById('vendors-list');
    
    // 廠商 Modal
    this.vendorDialog = document.getElementById('vendor-dialog');
    this.vendorForm = document.getElementById('vendor-form');
    this.vendorIdInput = document.getElementById('vendor-id');
    this.vendorNameInput = document.getElementById('vendor-name');
    this.vendorTaxIdInput = document.getElementById('vendor-tax-id');
    this.vendorContactInput = document.getElementById('vendor-contact');
    this.vendorPhoneInput = document.getElementById('vendor-phone');
    this.vendorMobileInput = document.getElementById('vendor-mobile');
    this.vendorEmailInput = document.getElementById('vendor-email');
    this.vendorAddressInput = document.getElementById('vendor-address');
    this.vendorBankNameInput = document.getElementById('vendor-bank-name');
    this.vendorBankBranchInput = document.getElementById('vendor-bank-branch');
    this.vendorBankCodeInput = document.getElementById('vendor-bank-code');
    this.vendorAccountNameInput = document.getElementById('vendor-account-name');
    this.vendorAccountNoInput = document.getElementById('vendor-account-no');
    
    // 今網收繳匯入相關
    this.excelDropZone = document.getElementById('excel-drop-zone');
    this.excelFileInput = document.getElementById('excel-file-input');
    this.importPreviewSection = document.getElementById('import-preview-section');
    this.importTableCard = document.getElementById('import-table-card');
    this.importStatsText = document.getElementById('import-stats-text');
    this.btnSubmitImport = document.getElementById('btn-submit-import');
    this.importHistoryList = document.getElementById('import-history-list');
    
    // 匯入欄位對應 Selects
    this.mapDateSelect = document.getElementById('map-date');
    this.mapAddrSelect = document.getElementById('map-addr');
    this.mapAmountSelect = document.getElementById('map-amount');
    this.mapPayerSelect = document.getElementById('map-payer');
    
    // 財務報表相關
    this.monthlyYearSelect = document.getElementById('monthly-report-year');
    this.monthlyMonthSelect = document.getElementById('monthly-report-month');
    this.annualYearSelect = document.getElementById('annual-report-year');
    this.repairReserveFundInput = document.getElementById('bank-repair-reserve-fund');
    this.repairReserveSuggestedText = document.getElementById('bank-repair-reserve-suggested');
    this.publicFundPreviewText = document.getElementById('bank-public-fund-preview');
    this.repairReserveNoteText = document.getElementById('bank-repair-reserve-note');

    // 月份傳票總表列印相關
    this.btnPrintMonthlySummary = document.getElementById('btn-print-monthly-summary');
    this.summaryPrintDialog = document.getElementById('summary-print-dialog');
    this.monthlySummaryPrintContainer = document.getElementById('monthly-summary-print-container');

    // 區權人名冊及管理費相關
    this.proprietorSearchInput = document.getElementById('proprietor-search');
    this.btnAddProprietor = document.getElementById('btn-add-proprietor');
    this.proprietorsListTbody = document.getElementById('proprietors-list');
    
    // 子頁籤按鈕
    this.subBtnPropList = document.getElementById('sub-btn-prop-list');
    this.subBtnFeeMgr = document.getElementById('sub-btn-fee-mgr');
    this.subPanelPropList = document.getElementById('sub-panel-prop-list');
    this.subPanelFeeMgr = document.getElementById('sub-panel-fee-mgr');
    
    // 繳費查核篩選與統計
    this.feeFilterYearSelect = document.getElementById('fee-filter-year');
    this.feeFilterMonthSelect = document.getElementById('fee-filter-month');
    this.feeFilterStatusSelect = document.getElementById('fee-filter-status');
    this.btnGenerateSmartLifeUpload = document.getElementById('btn-generate-smartlife-upload');
    this.feeManagerListTbody = document.getElementById('fee-manager-list');
    
    // 區權人對話框
    this.proprietorDialog = document.getElementById('proprietor-dialog');
    this.proprietorForm = document.getElementById('proprietor-form');
    this.propIdInput = document.getElementById('proprietor-id');
    this.propBuildingInput = document.getElementById('prop-building');
    this.propFloorInput = document.getElementById('prop-floor');
    this.propRoomInput = document.getElementById('prop-room');
    this.propNameInput = document.getElementById('prop-name');
    this.propPhoneInput = document.getElementById('prop-phone');
    this.propAreaInput = document.getElementById('prop-area');
    this.propParkingInput = document.getElementById('prop-parking');
    this.propFeeTypeSelect = document.getElementById('prop-fee-type');
    this.propFeeRateInput = document.getElementById('prop-fee-rate');
    this.propParkingFeeInput = document.getElementById('prop-parking-fee');
    this.propMonthlyFeePreview = document.getElementById('prop-monthly-fee-preview');
    
    // 收款登記對話框
    this.feePaymentDialog = document.getElementById('fee-payment-dialog');
    this.feePaymentForm = document.getElementById('fee-payment-form');
    this.payPropIdInput = document.getElementById('pay-prop-id');
    this.payMonthValInput = document.getElementById('pay-month-val');
    this.payRoomText = document.getElementById('pay-room-text');
    this.payNameText = document.getElementById('pay-name-text');
    this.payMonthText = document.getElementById('pay-month-text');
    this.payDateInput = document.getElementById('pay-date');
    this.payAmountInput = document.getElementById('pay-amount');
    this.payMethodSelect = document.getElementById('pay-method');
    this.payRemarkInput = document.getElementById('pay-remark');

    // Supabase 登入與狀態元素
    this.loginOverlay = document.getElementById('login-overlay');
    this.loginForm = document.getElementById('login-form');
    this.loginUsernameInput = document.getElementById('login-username');
    this.loginPasswordInput = document.getElementById('login-password');
    this.loginErrorMsg = document.getElementById('login-error-msg');
    this.btnOfflineMode = document.getElementById('btn-offline-mode');
    this.syncStatusBadge = document.getElementById('sync-status-badge');
    this.btnLogout = document.getElementById('btn-logout');
  }

  // ==========================================================================
  // 3. 事件綁定 (Event Listeners)
  // ==========================================================================
  initEvents() {
    // 雲端登入與同步事件
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = this.loginUsernameInput.value.trim();
      const password = this.loginPasswordInput.value.trim();
      this.handleCloudLogin(username, password);
    });

    this.btnOfflineMode.addEventListener('click', () => {
      localStorage.setItem('comm_offline_mode', 'true');
      localStorage.removeItem('comm_supabase_logged_in');
      this.loginOverlay.classList.add('hidden');
      this.setSyncStatus('offline', '單機離線模式');
      this.renderAll();
      alert('已切換至單機離線模式！');
    });

    this.btnLogout.addEventListener('click', () => {
      this.handleLogout();
    });

    // 頁籤切換
    this.tabItems.forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.getAttribute('data-tab');
        this.switchTab(tabId);
      });
    });

    // 主題切換 (Dark / Light Mode)
    this.themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      this.themeToggleBtn.querySelector('span').textContent = isDark ? '淺色主題' : '切換主題';
      this.themeToggleBtn.querySelector('i').setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      lucide.createIcons();
      // 重新渲染圖表以適應主題顏色
      this.renderCharts();
    });

    // 匯出資料備份 (側邊欄與資料庫面板)
    const exportAction = () => this.exportDataBackup();
    if (this.exportDataBtn) this.exportDataBtn.addEventListener('click', exportAction);
    if (this.dbExportBtn) this.dbExportBtn.addEventListener('click', exportAction);

    // 匯入資料還原 (側邊欄)
    if (this.importTriggerBtn) {
      this.importTriggerBtn.addEventListener('click', () => this.restoreFileInput.click());
    }
    if (this.restoreFileInput) {
      this.restoreFileInput.addEventListener('change', (e) => this.importDataRestore(e));
    }

    // 匯入資料還原 (資料庫面板)
    if (this.dbImportTriggerBtn) {
      this.dbImportTriggerBtn.addEventListener('click', () => this.dbRestoreFileInput.click());
    }
    if (this.dbRestoreFileInput) {
      this.dbRestoreFileInput.addEventListener('change', (e) => this.importDataRestore(e));
    }
    if (this.btnImportExcelHistory) {
      this.btnImportExcelHistory.addEventListener('click', () => this.excelHistoryFileInput.click());
    }
    if (this.excelHistoryFileInput) {
      this.excelHistoryFileInput.addEventListener('change', (e) => this.importExcelHistoryFile(e));
    }

    // 載入範例資料 (資料庫面板)
    if (this.loadDemoDbBtn) {
      this.loadDemoDbBtn.addEventListener('click', () => {
        if (confirm('這將會覆蓋您目前的帳務資料並載入 115年6月份 示範數據。確定要執行嗎？')) {
          this.loadDemoData();
        }
      });
    }

    // 一鍵清除資料庫 (資料庫面板)
    if (this.dbClearBtn) {
      this.dbClearBtn.addEventListener('click', () => {
        if (confirm('警告：這將會清空本機資料庫所有數據（傳票、廠商、代墊請款）。\n此操作無法復原，您確定要清空嗎？')) {
          if (confirm('請再次確認：您真的要清空所有資料嗎？')) {
            this.clearDatabase();
          }
        }
      });
    }

    // --- 支出傳票事件 ---
    this.btnAddVoucher.addEventListener('click', () => {
      this.openVoucherModal();
    });

    if (this.btnPrintMonthlySummary) {
      this.btnPrintMonthlySummary.addEventListener('click', () => {
        this.openMonthlySummaryPreview();
      });
    }

    this.vDateInput.addEventListener('change', () => {
      // 選擇日期時自動帶入傳票編號
      if (!this.vIdInput.value) { // 僅在「新增」時自動生成
        this.vNoInput.value = this.generateVoucherNo(this.vDateInput.value);
      }
    });

    this.vVendorSelect.addEventListener('change', () => {
      const vendorId = this.vVendorSelect.value;
      if (vendorId) {
        const vendor = this.db.vendors.find(v => v.id === vendorId);
        if (vendor) {
          // 自動帶入匯款帳號
          const bankName = vendor.bankName || '';
          const branch = vendor.bankBranch || '';
          const code = vendor.bankCode || '';
          const accNo = vendor.accountNo || '';
          const accName = vendor.accountName || vendor.name || '';
          
          if (bankName || accNo) {
            this.vBankInfoInput.value = `${bankName}${branch ? '(' + branch + ')' : ''} 代碼:${code} 帳號:${accNo} 戶名:${accName}`;
          } else {
            this.vBankInfoInput.value = '';
          }
          // 自動將廠商名稱填入用途說明當作參考
          this.vSummaryTextarea.value = `115年6月份 ${vendor.name} 費用`;
        }
      } else {
        this.vBankInfoInput.value = '';
      }
    });

    this.voucherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveVoucher();
    });

    // 傳票搜尋與篩選
    this.voucherSearchInput.addEventListener('input', () => this.renderVouchersList());
    this.voucherCategorySelect.addEventListener('change', () => this.renderVouchersList());
    this.voucherMonthSelect.addEventListener('change', () => this.renderVouchersList());
    this.voucherTypeSelect.addEventListener('change', () => this.renderVouchersList());

    // 傳票列印按鈕
    this.btnPrintVoucher.addEventListener('click', () => {
      this.printVoucher();
    });

    // --- 代墊請款事件 ---
    this.btnAddPetty.addEventListener('click', () => {
      this.openPettyModal();
    });

    this.pettyCashForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.savePettyCash();
    });

    this.pettyMonthSelect.addEventListener('change', () => this.renderPettyList());
    this.pettyStatusSelect.addEventListener('change', () => this.renderPettyList());
    
    // 代墊請款選取控制
    this.pettySelectAllCheckbox.addEventListener('change', (e) => {
      const checkboxes = this.pettyListTbody.querySelectorAll('input[type="checkbox"]:not(:disabled)');
      checkboxes.forEach(cb => {
        cb.checked = e.target.checked;
      });
      this.updateReimburseButtonState();
    });

    this.btnReimbursePetty.addEventListener('click', () => {
      this.generateReimbursementVoucher();
    });

    this.btnDownloadPettyExcel.addEventListener('click', () => {
      this.openPettyExportModal();
    });

    this.btnConfirmExportExcel.addEventListener('click', () => {
      const selectedMonth = this.pExportMonthSelect.value;
      if (selectedMonth) {
        this.downloadPettyCashExcel(selectedMonth);
        this.pettyExportDialog.close();
      }
    });

    // --- 廠商管理事件 ---
    this.btnAddVendor.addEventListener('click', () => {
      this.openVendorModal();
    });

    this.vendorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveVendor();
    });

    this.vendorSearchInput.addEventListener('input', () => this.renderVendorsList());

    // --- 今網匯入拖曳上傳事件 ---
    this.excelDropZone.addEventListener('click', () => {
      this.excelFileInput.click();
    });

    this.excelFileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.processExcelFile(e.target.files[0]);
      }
    });

    // 拖曳處理
    this.excelDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.excelDropZone.classList.add('dragover');
    });

    this.excelDropZone.addEventListener('dragleave', () => {
      this.excelDropZone.classList.remove('dragover');
    });

    this.excelDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.excelDropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        this.processExcelFile(e.dataTransfer.files[0]);
      }
    });

    // 匯入對照下拉選單變更
    this.mapDateSelect.addEventListener('change', () => this.updateImportPreview());
    this.mapAddrSelect.addEventListener('change', () => this.updateImportPreview());
    this.mapAmountSelect.addEventListener('change', () => this.updateImportPreview());
    this.mapPayerSelect.addEventListener('change', () => this.updateImportPreview());

    // 確認匯入
    this.btnSubmitImport.addEventListener('click', () => {
      this.submitImportedData();
    });

    // --- 財報月份變更事件 ---
    this.monthlyYearSelect.addEventListener('change', () => this.renderMonthlyReport());
    this.monthlyMonthSelect.addEventListener('change', () => this.renderMonthlyReport());
    this.annualYearSelect.addEventListener('change', () => this.renderAnnualReport());

    const saveBankBtn = document.getElementById('btn-save-bank-balances');
    if (saveBankBtn) {
      saveBankBtn.addEventListener('click', () => this.saveBankBalances());
    }
    if (this.repairReserveFundInput) {
      this.repairReserveFundInput.addEventListener('input', () => {
        const year = this.monthlyYearSelect.value;
        const month = this.monthlyMonthSelect.value;
        const report = window.MonthlyFinancialPrintReport.createMonthlyFinancialPrintReport({
          year,
          month,
          vouchers: this.db.vouchers,
          bankBalances: this.db.bankBalances
        });
        const repairReserveFund = parseFloat(this.repairReserveFundInput.value) || 0;
        if (this.publicFundPreviewText) {
          this.publicFundPreviewText.textContent = this.formatPrintCurrency(report.bankGrandTotal - repairReserveFund, true);
        }
        this.renderMonthlyFinancialPrintView();
      });
    }

    // --- 區權人與管理費事件 ---
    // 子分頁切換
    this.subBtnPropList.addEventListener('click', () => {
      this.subBtnPropList.classList.add('active');
      this.subBtnFeeMgr.classList.remove('active');
      this.subPanelPropList.classList.remove('hidden');
      this.subPanelFeeMgr.classList.add('hidden');
      this.renderProprietorsList();
    });

    this.subBtnFeeMgr.addEventListener('click', () => {
      this.subBtnPropList.classList.remove('active');
      this.subBtnFeeMgr.classList.add('active');
      this.subPanelPropList.classList.add('hidden');
      this.subPanelFeeMgr.classList.remove('hidden');
      this.renderFeeManagerList();
    });

    // 區權人名冊搜尋
    this.proprietorSearchInput.addEventListener('input', () => this.renderProprietorsList());

    // 新增區權人開窗
    this.btnAddProprietor.addEventListener('click', () => this.openProprietorModal());

    // 區權人對話框欄位變更即時計算預估金額
    const calcPreviewFee = () => {
      const area = parseFloat(this.propAreaInput.value) || 0;
      const rate = parseFloat(this.propFeeRateInput.value) || 0;
      const parkingFee = parseFloat(this.propParkingFeeInput.value) || 0;
      const feeType = this.propFeeTypeSelect.value;
      const fees = CommunityFeeCalculator.calculateProprietorFees({ area, feeRate: rate, parkingFee, feeType });
      this.propMonthlyFeePreview.textContent = `管理費 $${fees.managementFee.toLocaleString()} + 維護費 $${fees.maintenanceFee.toLocaleString()} = $${fees.monthlyFee.toLocaleString()} 元`;
    };

    this.propAreaInput.addEventListener('input', calcPreviewFee);
    this.propFeeRateInput.addEventListener('input', calcPreviewFee);
    this.propParkingFeeInput.addEventListener('input', calcPreviewFee);
    this.propFeeTypeSelect.addEventListener('change', calcPreviewFee);

    // 儲存區權人表單提交
    this.proprietorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProprietor();
    });

    // 登記管理費收款表單提交
    this.feePaymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveFeePayment();
    });

    // 管理費篩選變更
    this.feeFilterYearSelect.addEventListener('change', () => this.renderFeeManagerList());
    this.feeFilterMonthSelect.addEventListener('change', () => this.renderFeeManagerList());
    this.feeFilterStatusSelect.addEventListener('change', () => this.renderFeeManagerList());
    this.btnGenerateSmartLifeUpload.addEventListener('click', () => this.generateNextSmartLifeUploadFile());
  }

  // ==========================================================================
  // 4. UI 渲染主控台與 Tab 切換
  // ==========================================================================
  switchTab(tabId) {
    // 切換 sidebar active class
    this.tabItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 切換 content visibility
    this.tabContents.forEach(content => {
      if (content.id === `tab-${tabId}`) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });

    // 依據 TabId 動態更新標題與觸發渲染
    const titleEl = document.getElementById('current-tab-title');
    const descEl = document.getElementById('current-tab-desc');
    
    switch (tabId) {
      case 'dashboard':
        titleEl.textContent = '控制面板';
        descEl.textContent = '鴻邦世界花園二期社區管理委員會 帳務狀況總覽';
        this.renderDashboard();
        break;
      case 'vouchers':
        titleEl.textContent = '支出傳票管理';
        descEl.textContent = '登記、搜尋、檢視與列印社區各項支出單據';
        this.renderVouchersList();
        break;
      case 'import':
        titleEl.textContent = '今網收繳匯入';
        descEl.textContent = '匯入從今網智生活系統下載的 Excel 收繳清單，自動計入社區收入';
        this.renderImportHistory();
        break;
      case 'petty-cash':
        titleEl.textContent = '代墊請款明細';
        descEl.textContent = '管理代墊支出與請款匯款傳票';
        this.updatePettyDropdowns();
        this.renderPettyList();
        break;
      case 'monthly-report':
        titleEl.textContent = '每月財務報表';
        descEl.textContent = '社區當月收支統計明細與科目比例圖表分析';
        this.renderMonthlyReport();
        break;
      case 'annual-report':
        titleEl.textContent = '每年財務報表';
        descEl.textContent = '年度跨月收支趨勢與各科目收支對照矩陣表';
        this.renderAnnualReport();
        break;
      case 'vendors':
        titleEl.textContent = '廠商資料管理';
        descEl.textContent = '維護合約廠商、水電消防機電廠商名冊與匯款帳戶資訊';
        this.renderVendorsList();
        break;
      case 'proprietors':
        titleEl.textContent = '區權人及管理費';
        descEl.textContent = '維護住戶名冊、坪數車位資料與每月管理費應收、實收及欠繳查核';
        this.updateFeeFilterYearDropdown();
        this.renderProprietorsList();
        this.renderFeeManagerList();
        break;
    }
    
    lucide.createIcons();
  }

  updateClock() {
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const formatted = now.toLocaleString('zh-TW', options).replace(/\//g, '-');
    this.currentTimeBadge.textContent = `當前時間：${formatted}`;
  }

  // 渲染所有資料（載入新資料或初始化時調用）
  renderAll() {
    this.updateVoucherDropdowns();
    this.updateReportYearDropdowns();
    this.updatePettyDropdowns();
    this.updateFeeFilterYearDropdown(); // 確保同步更新年份選單
    this.renderDashboard();
    this.renderVouchersList();
    this.renderPettyList();
    this.renderVendorsList();
    this.renderImportHistory();
    if (this.proprietorsListTbody) {
      this.renderProprietorsList();
    }
    if (this.feeManagerListTbody) {
      this.renderFeeManagerList();
    }
  }

  // ==========================================================================
  // 5. 控制面板邏輯 (Dashboard)
  // ==========================================================================
  renderDashboard() {
    // 取得當前年月 (西元)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const currentYearMonth = `${currentYear}-${currentMonth}`; // "2026-06"

    // 1. 計算本月總收入 (type === 'income' 且符合當前年月)
    const monthlyIncome = this.db.vouchers
      .filter(v => v.type === 'income' && v.date && v.date.substring(0, 7) === currentYearMonth)
      .reduce((sum, v) => sum + v.amount, 0);

    // 2. 計算本月總支出 (type === 'expense' 且符合當前年月)
    const monthlyExpense = this.db.vouchers
      .filter(v => v.type === 'expense' && v.date && v.date.substring(0, 7) === currentYearMonth)
      .reduce((sum, v) => sum + v.amount, 0);

    const balance = monthlyIncome - monthlyExpense;

    // 3. 計算代墊請款
    const pettyCashSummary = this.calculatePettyCashSummary();
    
    // 更新控制面板卡片數值
    document.getElementById('dash-total-income').textContent = `$${monthlyIncome.toLocaleString()}`;
    document.getElementById('dash-total-expense').textContent = `$${monthlyExpense.toLocaleString()}`;
    
    const balanceEl = document.getElementById('dash-balance');
    balanceEl.textContent = `$${balance.toLocaleString()}`;
    if (balance >= 0) {
      balanceEl.style.color = 'var(--success)';
      document.getElementById('dash-balance-trend').textContent = '本月收支結餘盈餘';
    } else {
      balanceEl.style.color = 'var(--danger)';
      document.getElementById('dash-balance-trend').textContent = '本月收支赤字';
    }

    document.getElementById('dash-petty-cash').textContent = `$${pettyCashSummary.unreimbursed.toLocaleString()}`;
    document.getElementById('dash-petty-status').textContent = `已請款累計：$${pettyCashSummary.reimbursed.toLocaleString()} 元`;
    document.getElementById('dash-vendor-count').textContent = this.db.vendors.length;
    
    // 更新資料庫面板上的即時統計
    const statVouchers = document.getElementById('db-stat-vouchers');
    if (statVouchers) statVouchers.textContent = this.db.vouchers.length;
    const statPetty = document.getElementById('db-stat-petty');
    if (statPetty) statPetty.textContent = this.db.pettyCash.length;
    const statProp = document.getElementById('db-stat-prop');
    if (statProp) statProp.textContent = this.db.proprietors ? this.db.proprietors.length : 0;

    // 4. 近期支出傳票 (顯示本月最新 5 筆)
    const recentVouchers = this.db.vouchers
      .filter(v => v.type === 'expense' && v.date && v.date.substring(0, 7) === currentYearMonth)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    const tbody = document.getElementById('dash-recent-vouchers');
    if (recentVouchers.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-secondary);">本月尚無支出傳票紀錄</td></tr>`;
    } else {
      tbody.innerHTML = recentVouchers.map(v => `
        <tr>
          <td><a style="font-weight: 600; cursor:pointer;" onclick="app.viewVoucher('${v.id}')">${v.voucherNo}</a></td>
          <td>${v.vendorName || '零星支出'}</td>
          <td><span class="badge badge-primary">${v.category}</span></td>
          <td style="font-weight: 700; text-align: right; color: var(--danger);">$${v.amount.toLocaleString()}</td>
        </tr>
      `).join('');
    }

    // 5. 繪製支出科目圓餅圖
    this.renderDashboardPieChart(currentYearMonth);
  }

  // 繪製控制面板圓餅圖
  renderDashboardPieChart(yearMonth) {
    const expenses = this.db.vouchers.filter(v => v.type === 'expense' && v.date && v.date.substring(0, 7) === yearMonth);
    
    // 分組加總
    const categories = {};
    expenses.forEach(v => {
      categories[v.category] = (categories[v.category] || 0) + v.amount;
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    const canvas = document.getElementById('dash-pie-chart');
    if (!canvas) return;

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = canvas.getContext('2d');

    if (labels.length === 0) {
      // 畫一個灰色的空圈
      this.dashPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['無支出資料'],
          datasets: [{
            data: [1],
            backgroundColor: ['#e2e8f0']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
      return;
    }

    // 產生調和色調
    const isDark = document.body.classList.contains('dark');
    const colors = labels.map((_, i) => `hsl(${162 + (i * 45) % 360}, ${isDark ? '60%' : '75%'}, ${isDark ? '45%' : '50%'})`);

    this.dashPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderWidth: isDark ? 2 : 1,
          borderColor: isDark ? '#1e293b' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: isDark ? '#cbd5e1' : '#334155',
              font: { family: 'Noto Sans TC' }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((value / total) * 100).toFixed(1);
                return ` ${context.label}: $${value.toLocaleString()} (${percent}%)`;
              }
            }
          }
        },
        cutout: '60%'
      }
    });
  }

  // ==========================================================================
  // 6. 支出傳票模組 (Expense Voucher)
  // ==========================================================================
  updateVoucherDropdowns() {
    // 1. 科目篩選下拉選單
    const categories = new Set();
    this.db.vouchers.forEach(v => {
      if (v.category) categories.add(v.category);
    });
    
    this.voucherCategorySelect.innerHTML = `<option value="">所有會計科目</option>` + 
      Array.from(categories).map(c => `<option value="${c}">${c}</option>`).join('');

    // 2. 月份篩選下拉選單：支出週期為上月 26 號到本月 25 號
    const months = new Set();
    this.db.vouchers.forEach(v => {
      if (v.type === 'expense' && v.date) {
        months.add(AccountingPeriods.getExpenseVoucherPeriodMonth(v.date));
      }
    });
    
    // 由新到舊排序
    const sortedMonths = Array.from(months).sort().reverse();
    this.voucherMonthSelect.innerHTML = `<option value="">所有月份</option>` + 
      sortedMonths.map(m => {
        const parts = m.split('-');
        const rcYear = parseInt(parts[0]) - 1911; // 轉民國展示
        return `<option value="${m}">民國${rcYear}年${parts[1]}月（${parts[1]}月支出週期）</option>`;
      }).join('');
  }

  // 自動生成傳票編號 (MYYMMDDxxx)
  generateVoucherNo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear() - 1911; // 民國年
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const prefix = `M${year}${month}${day}`; // "M1150630"
    
    // 找出當天已有的同前綴傳票，決定流水號
    const count = this.db.vouchers
      .filter(v => v.voucherNo && v.voucherNo.startsWith(prefix))
      .length;
      
    const serial = String(count + 1).padStart(3, '0');
    return `${prefix}${serial}`;
  }

  // 渲染傳票列表
  renderVouchersList() {
    const search = this.voucherSearchInput.value.trim().toLowerCase();
    const filterCat = this.voucherCategorySelect.value;
    const filterMonth = this.voucherMonthSelect.value;
    const filterType = this.voucherTypeSelect.value;

    // 篩選出 type === 'expense' (支出) 的傳票
    let list = this.db.vouchers.filter(v => v.type === 'expense');

    if (search) {
      list = list.filter(v => 
        v.voucherNo.toLowerCase().includes(search) || 
        v.summary.toLowerCase().includes(search) || 
        (v.vendorName && v.vendorName.toLowerCase().includes(search))
      );
    }
    if (filterCat) {
      list = list.filter(v => v.category === filterCat);
    }
    if (filterMonth) {
      list = list.filter(v => v.date && AccountingPeriods.getExpenseVoucherPeriodMonth(v.date) === filterMonth);
    }
    if (filterType) {
      list = list.filter(v => v.fixedType === filterType);
    }

    // 由新到舊排序
    list.sort((a, b) => {
      const dateCompare = new Date(b.date) - new Date(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.voucherNo.localeCompare(a.voucherNo);
    });

    if (list.length === 0) {
      this.vouchersListTbody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 40px; color: var(--text-secondary);">
            未找到符合篩選條件的傳票資料。
          </td>
        </tr>
      `;
      return;
    }

    const tbody = this.vouchersListTbody;
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 40px; color: var(--text-secondary);">
            未找到符合篩選條件的傳票資料。
          </td>
        </tr>
      `;
      return;
    }

    list.forEach((v, idx) => {
      const rcYear = v.date ? (parseInt(v.date.split('-')[0]) - 1911) : '';
      const dateFormatted = v.date 
        ? `${rcYear}/${v.date.substring(5, 7)}/${v.date.substring(8, 10)}`
        : '無日期';
      
      let payBadge = '';
      if (v.paymentMethod === 'transfer') payBadge = '<span class="badge badge-primary">匯款</span>';
      else if (v.paymentMethod === 'cash') payBadge = '<span class="badge badge-success">現金</span>';
      else payBadge = '<span class="badge badge-warning">支票</span>';
      
      const typeBadge = v.fixedType === 'fixed' 
        ? '<span class="badge badge-primary">固定支出</span>' 
        : '<span class="badge badge-warning">非固定</span>';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${dateFormatted}</td>
        <td style="font-weight: 600;">${v.voucherNo}</td>
        <td>${v.vendorName || '<span class="text-muted">零星支出</span>'}</td>
        <td><span class="badge badge-primary">${v.category}</span></td>
        <td style="font-weight: 700; text-align: right; color: var(--danger);">$${v.amount.toLocaleString()}</td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${v.summary}">${v.summary}</td>
        <td>${payBadge}</td>
        <td>${typeBadge}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn btn-secondary btn-sm print-vouch-btn" title="檢視與列印傳票">
              <i data-lucide="printer"></i>
            </button>
            <button class="btn btn-secondary btn-sm edit-vouch-btn" title="編輯">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="btn btn-danger btn-sm delete-vouch-btn" title="刪除">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      `;

      tr.querySelector('.print-vouch-btn').addEventListener('click', () => {
        this.viewVoucher(v.id);
      });

      tr.querySelector('.edit-vouch-btn').addEventListener('click', () => {
        this.openVoucherModal(v.id);
      });

      tr.querySelector('.delete-vouch-btn').addEventListener('click', () => {
        this.deleteVoucher(v.id);
      });

      tbody.appendChild(tr);
    });
    
    lucide.createIcons();
    
    lucide.createIcons();
  }

  // 開啟支出傳票 Modal
  openVoucherModal(id = '') {
    // 渲染廠商下拉選單選項
    this.vVendorSelect.innerHTML = `<option value="">-- 無對應廠商 (零星支出) --</option>` +
      this.db.vendors.map(v => `<option value="${v.id}">${v.name}</option>`).join('');

    if (id) {
      // 編輯模式
      const v = this.db.vouchers.find(item => item.id === id);
      if (v) {
        document.getElementById('voucher-dialog-title').textContent = '編輯支出傳票';
        this.vIdInput.value = v.id;
        this.vDateInput.value = v.date;
        this.vNoInput.value = v.voucherNo;
        this.vVendorSelect.value = v.vendorId || '';
        this.vCategorySelect.value = v.category;
        this.vAmountInput.value = v.amount;
        this.vPaymentMethodSelect.value = v.paymentMethod;
        this.vBankInfoInput.value = v.bankInfo || '';
        this.vReceiptNoInput.value = v.receiptNo || '';
        this.vFixedTypeSelect.value = v.fixedType || 'fixed';
        this.vSummaryTextarea.value = v.summary;
        this.vHandlerInput.value = v.handler || '';
        this.vApproverInput.value = v.approver || '';
        
        // 傳票編號唯讀，避免打亂流水號
        this.vNoInput.removeAttribute('readonly'); 
      }
    } else {
      // 新增模式
      document.getElementById('voucher-dialog-title').textContent = '新增支出傳票';
      this.voucherForm.reset();
      this.vIdInput.value = '';
      
      const today = new Date();
      this.vDateInput.value = today.toISOString().substring(0, 10);
      this.vNoInput.value = this.generateVoucherNo(this.vDateInput.value);
      this.vNoInput.setAttribute('readonly', 'true');
      this.vPaymentMethodSelect.value = 'transfer';
      this.vFixedTypeSelect.value = 'fixed';
      this.vHandlerInput.value = '張總幹事';
      this.vApproverInput.value = '李財務委員';
    }

    this.voucherDialog.showModal();
  }

  // 儲存支出傳票
  saveVoucher() {
    try {
      const id = this.vIdInput.value;
      const vendor = this.db.vendors.find(v => v.id === this.vVendorSelect.value);
      const voucherData = {
        id: id || `vouch_${Date.now()}`,
        voucherNo: this.vNoInput.value || this.generateVoucherNo(this.vDateInput.value),
        type: 'expense',
        date: this.vDateInput.value,
        vendorId: this.vVendorSelect.value,
        vendorName: vendor ? vendor.name : '',
        category: this.vCategorySelect.value,
        amount: parseFloat(this.vAmountInput.value) || 0,
        summary: this.vSummaryTextarea.value.trim(),
        paymentMethod: this.vPaymentMethodSelect.value,
        bankInfo: this.vBankInfoInput.value.trim(),
        fixedType: this.vFixedTypeSelect.value,
        handler: this.vHandlerInput.value.trim(),
        approver: this.vApproverInput.value.trim(),
        owner: '陳主任委員',
        receiptNo: this.vReceiptNoInput.value.trim()
      };

      if (!voucherData.date || !voucherData.category || voucherData.amount <= 0 || !voucherData.summary) {
        alert('請完整填寫傳票日期、會計科目、金額與用途說明。');
        return;
      }

      if (id) {
        const idx = this.db.vouchers.findIndex(v => v.id === id);
        if (idx !== -1) {
          this.db.vouchers[idx] = voucherData;
        }
      } else {
        this.db.vouchers.push(voucherData);
      }

      this.saveToStorage('vouchers');
      this.renderAll();
      this.voucherDialog.close();
      alert('支出傳票已成功儲存！');
    } catch (err) {
      console.error('儲存支出傳票失敗:', err);
      alert(`儲存支出傳票失敗：${err.message}`);
    }
  }

  // 檢視支出傳票
  viewVoucher(id) {
    const v = this.db.vouchers.find(item => item.id === id);
    if (!v) {
      alert('找不到指定的支出傳票。');
      return;
    }

    const parts = (v.date || '').split('-');
    const rcDate = parts.length === 3
      ? `${parseInt(parts[0]) - 1911} 年 ${parts[1]} 月 ${parts[2]} 日`
      : '無日期';
    const amountDigits = String(Math.floor(v.amount || 0)).padStart(7, ' ');

    document.getElementById('p-no').textContent = v.voucherNo || '';
    document.getElementById('p-date').textContent = rcDate;
    document.getElementById('p-receipt-no').textContent = v.receiptNo || '無';
    document.getElementById('p-category').textContent = v.category || '';
    document.getElementById('p-summary').textContent = v.summary || '';
    document.getElementById('p-amount-chinese').textContent = this.toChineseAmount(v.amount || 0);
    document.getElementById('p-method').textContent =
      v.paymentMethod === 'transfer' ? '匯款' : v.paymentMethod === 'check' ? '支票' : '現金';
    document.getElementById('p-bank-info').textContent = v.bankInfo || '-';
    document.getElementById('p-fixed-type').textContent = v.fixedType === 'fixed' ? '固定支出' : '非固定支出';
    document.getElementById('p-sig-handler').textContent = v.handler || '';
    document.getElementById('p-sig-approver').textContent = v.approver || '';

    for (let i = 0; i <= 6; i++) {
      const digit = amountDigits[amountDigits.length - 1 - i];
      document.getElementById(`p-amt-${i}`).textContent = digit === ' ' ? '' : digit;
    }

    this.voucherViewDialog.showModal();
  }

  // 刪除支出傳票
  deleteVoucher(id) {
    const voucher = this.db.vouchers.find(v => v.id === id);
    if (!voucher) return;

    if (confirm(`確定要刪除傳票 ${voucher.voucherNo} 嗎？此操作無法復原。`)) {
      this.db.vouchers = this.db.vouchers.filter(v => v.id !== id);

      this.db.pettyCash.forEach(item => {
        if (item.reimburseVoucherNo === voucher.voucherNo) {
          item.status = 'unreimbursed';
          item.reimburseVoucherNo = '';
        }
      });

      this.saveToStorage('vouchers');
      this.saveToStorage('pettyCash');
      this.renderAll();
      alert('支出傳票已刪除。');
    }
  }

  openMonthlySummaryPreview() {
    // 取得目前篩選的月份
    const selectedMonth = this.voucherMonthSelect.value;
    if (!selectedMonth) {
      alert('請先在「月份篩選」下拉選單中選取特定月份，再執行列印月份總表！');
      return;
    }

    // 篩選出該月份的支出傳票 (依傳票號碼排序)
    const list = this.db.vouchers
      .filter(v => v.type === 'expense' && v.date && AccountingPeriods.getExpenseVoucherPeriodMonth(v.date) === selectedMonth)
      .sort((a, b) => a.voucherNo.localeCompare(b.voucherNo));

    if (list.length === 0) {
      alert(`民國 ${parseInt(selectedMonth.split('-')[0]) - 1911} 年 ${selectedMonth.split('-')[1]} 月 尚無任何支出傳票資料！`);
      return;
    }

    // 格式化民國年月標題
    const parts = selectedMonth.split('-');
    const rcYear = parseInt(parts[0]) - 1911;
    const reportMonthStr = `${rcYear} 年 ${parts[1]} 月 份`;
    const periodEnd = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 25);
    const periodStart = new Date(parseInt(parts[0]), parseInt(parts[1]) - 2, 26);
    const periodLabel = `${periodStart.getFullYear() - 1911}/${String(periodStart.getMonth() + 1).padStart(2, '0')}/${String(periodStart.getDate()).padStart(2, '0')} ~ ${periodEnd.getFullYear() - 1911}/${String(periodEnd.getMonth() + 1).padStart(2, '0')}/${String(periodEnd.getDate()).padStart(2, '0')}`;

    // 初始化合計金
    let totalWireAmount = 0;
    let totalWireFee = 0;
    let totalWireReal = 0;
    let totalSameBank = 0;
    let totalDeducted = 0;
    let totalCash = 0;

    // 生成列表 rows
    let tableRowsHtml = '';
    list.forEach((v, idx) => {
      // 序號格式化 (如 01, 02)
      const serial = String(idx + 1).padStart(2, '0');
      
      // 取得廠商電匯銀行資料
      let bankInfoText = '';
      let isTransfer = v.paymentMethod === 'transfer';
      let isCash = v.paymentMethod === 'cash';

      // 預設匯費計算：大樓為台新銀行(812)
      let fee = 0;
      let wireAmount = 0;
      let wireReal = 0;
      let sameBank = 0;
      let deducted = 0;
      let cash = 0;

      if (isTransfer) {
        wireAmount = v.amount;
        
        // 尋找關聯的廠商資訊，取得銀行代碼
        if (v.vendorId) {
          const vendor = this.db.vendors.find(item => item.id === v.vendorId);
          if (vendor) {
            const bankName = vendor.bankName || '';
            const branch = vendor.bankBranch || '';
            const code = vendor.bankCode || '';
            const accNo = vendor.accountNo || '';
            const accName = vendor.accountName || vendor.name || '';
            
            if (bankName || accNo) {
              bankInfoText = `${accName} ${accNo} ${bankName} ${branch}`;
            }
            
            // 如果有銀行代碼且不等於 812 (非台新)，扣 30 元匯費
            if (code && code !== '812') {
              fee = 30;
            }
          }
        } else {
          // 零星支出 (無廠商關聯)
          bankInfoText = v.bankInfo || '';
          // 如果 bankInfo 含有 '台新' 或是為空，則免匯費，否則預設 30 元
          if (bankInfoText && !bankInfoText.includes('台新') && !bankInfoText.includes('812')) {
            fee = 30;
          }
        }

        wireReal = wireAmount - fee;
        totalWireAmount += wireAmount;
        totalWireFee += fee;
        totalWireReal += wireReal;
      } else if (isCash) {
        cash = v.amount;
        bankInfoText = '-';
        totalCash += cash;
      } else {
        // 支票或同行轉帳 (歸於同行轉帳)
        sameBank = v.amount;
        bankInfoText = '-';
        totalSameBank += sameBank;
      }

      tableRowsHtml += `
        <tr>
          <td style="text-align: center;">${serial}</td>
          <td style="text-align: center;">${v.voucherNo}</td>
          <td style="font-weight: 600;">${v.vendorName || '零星支出'}</td>
          <td>${v.summary}</td>
          <td style="font-size: 0.8rem; line-height: 1.4; max-width: 180px; word-break: break-all;">${bankInfoText}</td>
          <td class="amount-cell">${wireAmount > 0 ? '$' + wireAmount.toLocaleString() : '-'}</td>
          <td class="amount-cell" style="color: var(--text-secondary);">${fee > 0 ? '$' + fee.toLocaleString() : '-'}</td>
          <td class="amount-cell" style="font-weight: 700;">${wireReal > 0 ? '$' + wireReal.toLocaleString() : '-'}</td>
          <td class="amount-cell">${sameBank > 0 ? '$' + sameBank.toLocaleString() : '-'}</td>
          <td class="amount-cell">${deducted > 0 ? '$' + deducted.toLocaleString() : '-'}</td>
          <td class="amount-cell">${cash > 0 ? '$' + cash.toLocaleString() : '-'}</td>
        </tr>
      `;
    });

    const grandTotal = totalWireAmount + totalSameBank + totalDeducted + totalCash;
    const grandTotalChinese = this.toChineseAmount(grandTotal);

    // 組合 A4 直式 HTML (跟附件 "=" 結構完全一致的報表)
    const reportHtml = `
      <div class="summary-report-card">
        <h2 style="font-size: 1.45rem; margin-bottom: 2px; text-align: center; color: #000000; letter-spacing: 2px;">鴻邦世界花園二期社區管理委員會</h2>
        <h3 style="font-size: 1.3rem; margin-bottom: 4px; text-align: center; color: #000000; font-weight: 800;">廠商應付帳款明細表</h3>
        <div style="text-align: center; font-size: 1rem; font-weight: 700; margin-bottom: 12px; color: #000000;">
          ${reportMonthStr}（收據期間：${periodLabel}）
        </div>
        
        <table style="margin-top: 10px;">
          <thead>
            <tr>
              <th rowspan="2" style="width: 5%; text-align: center; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">項次</th>
              <th rowspan="2" style="width: 11%; text-align: center; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">傳票號碼</th>
              <th rowspan="2" style="width: 14%; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">廠商名稱</th>
              <th rowspan="2" style="width: 16%; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">內容</th>
              <th rowspan="2" style="width: 18%; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">銀行電匯資料</th>
              <th colspan="3" style="text-align: center; padding: 4px; font-size: 0.8rem;">應付帳款 (電匯)</th>
              <th rowspan="2" style="width: 9%; text-align: right; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">同行轉帳</th>
              <th rowspan="2" style="width: 9%; text-align: right; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">轉帳支出<br>(已扣繳)</th>
              <th rowspan="2" style="width: 9%; text-align: right; vertical-align: middle; padding: 6px 4px; font-size: 0.8rem;">現金</th>
            </tr>
            <tr>
              <th style="text-align: right; padding: 4px; font-size: 0.8rem; width: 9%;">付款金</th>
              <th style="text-align: right; padding: 4px; font-size: 0.8rem; width: 5%;">匯費</th>
              <th style="text-align: right; padding: 4px; font-size: 0.8rem; width: 9%;">實匯金</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
            <!-- 合計列 -->
            <tr style="font-weight: 700; background-color: #f8fafc;">
              <td colspan="5" style="text-align: center;">合 計</td>
              <td class="amount-cell">$${totalWireAmount.toLocaleString()}</td>
              <td class="amount-cell">$${totalWireFee.toLocaleString()}</td>
              <td class="amount-cell">$${totalWireReal.toLocaleString()}</td>
              <td class="amount-cell">${totalSameBank > 0 ? '$' + totalSameBank.toLocaleString() : '-'}</td>
              <td class="amount-cell">${totalDeducted > 0 ? '$' + totalDeducted.toLocaleString() : '-'}</td>
              <td class="amount-cell">${totalCash > 0 ? '$' + totalCash.toLocaleString() : '-'}</td>
            </tr>
            <!-- 總合計列 -->
            <tr style="font-weight: 800; background-color: #f1f5f9;">
              <td colspan="5" style="text-align: center;">應付帳款總合計</td>
              <td colspan="3" style="text-align: center; letter-spacing: 1px;">$${grandTotal.toLocaleString()} 元</td>
              <td colspan="3" style="text-align: center; font-size: 0.8rem; color: #475569;">新臺幣 ${grandTotalChinese}</td>
            </tr>
          </tbody>
        </table>

        <div class="signature-section" style="margin-top: 35px;">
          <div class="signature-box">
            <span>製表 / 總幹事</span>
            <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">(簽名蓋章)</span>
          </div>
          <div class="signature-box">
            <span>監察委員</span>
            <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">(簽名蓋章)</span>
          </div>
          <div class="signature-box">
            <span>財務委員</span>
            <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">(簽名蓋章)</span>
          </div>
          <div class="signature-box">
            <span>主任委員</span>
            <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">(簽名蓋章)</span>
          </div>
        </div>
      </div>
    `;

    // 寫入對話框
    this.monthlySummaryPrintContainer.innerHTML = reportHtml;
    
    // 同步綁定 beforeprint 複製列印內容
    const handleBeforePrint = () => {
      document.body.classList.add('printing-voucher');
      const container = document.getElementById('print-area-container');
      container.innerHTML = '';
      const clone = this.monthlySummaryPrintContainer.querySelector('.summary-report-card').cloneNode(true);
      container.appendChild(clone);
    };

    const handleAfterPrint = () => {
      const container = document.getElementById('print-area-container');
      container.innerHTML = '';
      document.body.classList.remove('printing-voucher');
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // 開啟預覽對話框
    this.summaryPrintDialog.showModal();
  }

  // 列印傳票
  printVoucher() {
    document.body.classList.add('printing-voucher');
    // 複製列印區域到隱藏的 container
    const printArea = document.getElementById('print-area').cloneNode(true);
    const container = document.getElementById('print-area-container');
    container.innerHTML = '';
    container.appendChild(printArea);
    
    // 觸發列印 (window.print 為非同步，需等列印視窗關閉後再清空)
    window.print();

    // 防止 afterprint 與 fallback 同時觸發的旗標
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      container.innerHTML = '';
      document.body.classList.remove('printing-voucher');
    };

    // 使用 afterprint 事件：使用者關閉列印對話框後清空
    window.addEventListener('afterprint', cleanup, { once: true });

    // Fallback：若瀏覽器不支援 afterprint，1 秒後清空
    setTimeout(cleanup, 1000);
  }

  // ==========================================================================
  // 7. 代墊請款管理
  // ==========================================================================
  calculatePettyCashSummary() {
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return CommunityAdvanceClaimManager.calculateAdvanceClaimSummary(this.db.pettyCash, currentMonthStr);
  }

  // 更新代墊請款月份篩選下拉選單（僅在資料變更時呼叫）
  updatePettyDropdowns() {
    const months = new Set();
    this.db.pettyCash.forEach(item => {
      if (item.date) months.add(item.date.substring(0, 7));
    });
    const sortedMonths = Array.from(months).sort().reverse();
    const prevVal = this.pettyMonthSelect.value;
    this.pettyMonthSelect.innerHTML = `<option value="">所有月份</option>` +
      sortedMonths.map(m => {
        const p = m.split('-');
        const rcYear = parseInt(p[0]) - 1911;
        return `<option value="${m}">民國${rcYear}年${p[1]}月</option>`;
      }).join('');
    this.pettyMonthSelect.value = prevVal; // 保持選取狀態
  }

  // 渲染代墊請款列表
  renderPettyList() {
    const filterMonth = this.pettyMonthSelect.value;
    const filterStatus = this.pettyStatusSelect.value;

    // 依日期排序
    let list = [...this.db.pettyCash].sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filterMonth) {
      list = list.filter(item => item.date && item.date.substring(0, 7) === filterMonth);
    }
    if (filterStatus) {
      list = list.filter(item => item.status === filterStatus);
    }

    // 為了在過濾的情況下仍然顯示正確的「待請款餘額」，先用完整歷史計算每筆後的待請款餘額
    let runningClaimBalance = 0;
    const fullListSorted = [...this.db.pettyCash].sort((a, b) => new Date(a.date) - new Date(b.date));
    const balanceMap = {};
    fullListSorted.forEach(item => {
      if (item.status === 'unreimbursed' && item.expense > 0) {
        runningClaimBalance += item.expense;
      } else if (item.status === 'reimbursed' && item.expense > 0) {
        runningClaimBalance = Math.max(0, runningClaimBalance - item.expense);
      }
      balanceMap[item.id] = runningClaimBalance;
    });

    // 依反序渲染（新日期在最上面）
    list.reverse();

    const tbody = document.getElementById('petty-list');
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 30px; color: var(--text-secondary);">無代墊請款明細紀錄</td></tr>`;
      return;
    }

    list.forEach(item => {
      const parts = item.date.split('-');
      const rcYear = parseInt(parts[0]) - 1911;
      const dateFormatted = `${rcYear}/${parts[1]}/${parts[2]}`;
      const bal = balanceMap[item.id];
      
      const isReimbursed = item.status === 'reimbursed';
      const isIncome = item.income > 0;
      
      // 請款狀態 badge
      let statusBadge = '';
      if (isIncome) {
        statusBadge = '<span class="badge badge-success">入帳紀錄</span>';
      } else {
        statusBadge = isReimbursed 
          ? `<span class="badge badge-success" title="請款傳票號: ${item.reimburseVoucherNo}"><i data-lucide="check"></i>已請款</span>`
          : '<span class="badge badge-warning"><i data-lucide="alert-circle"></i>待請款</span>';
      }

      // Checkbox 屬性
      const checkboxDisabled = (isReimbursed || isIncome) ? 'disabled' : '';

      const tr = document.createElement('tr');
      if (isIncome) tr.classList.add('income-row');
      
      tr.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="petty-cb" data-id="${item.id}" ${checkboxDisabled ? 'disabled' : ''}>
        </td>
        <td>${item.index || ''}</td>
        <td>${dateFormatted}</td>
        <td><span class="badge badge-primary">${item.category}</span></td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${item.summary}">${item.summary}</td>
        <td style="text-align: right; font-weight: 600; color: var(--success);">${item.income > 0 ? '$' + item.income.toLocaleString() : '-'}</td>
        <td style="text-align: right; font-weight: 600; color: var(--danger);">${item.expense > 0 ? '$' + item.expense.toLocaleString() : '-'}</td>
        <td style="text-align: right; font-weight: 700;">$${bal.toLocaleString()}</td>
        <td style="font-size: 0.85rem; color: var(--text-secondary);">${item.receipt || ''}</td>
        <td style="text-align: center;">${statusBadge}</td>
        <td style="text-align: center;">
          <button class="btn btn-secondary btn-sm delete-petty-btn" title="刪除" ${isReimbursed ? 'disabled' : ''}>
            <i data-lucide="trash-2"></i>
          </button>
        </td>
      `;

      // 綁定 checkbox 的變更事件
      const cb = tr.querySelector('.petty-cb');
      if (cb) {
        cb.addEventListener('change', () => {
          this.updateReimburseButtonState();
        });
      }

      // 綁定刪除事件
      tr.querySelector('.delete-petty-btn').addEventListener('click', () => {
        this.deletePettyCash(item.id);
      });

      tbody.appendChild(tr);
    });

    // 更新代墊請款面板統計
    const summary = this.calculatePettyCashSummary();
    document.getElementById('petty-current-balance').textContent = `$${summary.unreimbursed.toLocaleString()}`;
    document.getElementById('petty-month-expense').textContent = `$${summary.monthExpense.toLocaleString()}`;
    document.getElementById('petty-unreimbursed-amount').textContent = `$${summary.reimbursed.toLocaleString()}`;
    
    this.pettySelectAllCheckbox.checked = false;
    this.updateReimburseButtonState();
    lucide.createIcons();
  }

  // 登記代墊請款 Modal
  openPettyModal() {
    this.pettyCashForm.reset();
    this.pIdInput.value = '';
    this.pDateInput.value = new Date().toISOString().substring(0, 10);
    this.pTypeSelect.value = 'expense';
    this.pCategorySelect.value = '行政事務費';
    this.pettyCashDialog.showModal();
  }

  // 儲存代墊請款
  savePettyCash() {
    try {
      const date = this.pDateInput.value;
      const type = this.pTypeSelect.value;
      const amt = parseFloat(this.pAmountInput.value);
      
      // 計算新項次 (例如：01, 02)
      // 取現有最大項次 + 1，避免刪除後重複編號
      const yearMonth = date.substring(0, 7);
      const sameMonth = this.db.pettyCash.filter(item => item.date && item.date.substring(0, 7) === yearMonth);
      const maxIdx = sameMonth.reduce((max, item) => {
        const idx = parseInt(item.index) || 0;
        return idx > max ? idx : max;
      }, 0);
      const newIdx = String(maxIdx + 1).padStart(2, '0');

      const pettyData = {
        id: `pc_${Date.now()}`,
        index: newIdx,
        date: date,
        category: this.pCategorySelect.value,
        summary: this.pSummaryTextarea.value,
        income: type === 'income' ? amt : 0,
        expense: type === 'expense' ? amt : 0,
        receipt: this.pReceiptInput.value || '無',
        status: type === 'income' ? 'reimbursed' : 'unreimbursed',
        reimburseVoucherNo: ''
      };

      this.db.pettyCash.push(pettyData);
      this.saveToStorage('pettyCash');
      this.renderAll();
      this.pettyCashDialog.close();
      alert('代墊請款明細已成功儲存！');
    } catch (err) {
      console.error('儲存代墊請款失敗:', err);
      alert(`儲存代墊請款失敗：${err.message}`);
    }
  }

  // 刪除代墊請款明細
  deletePettyCash(id) {
    const item = this.db.pettyCash.find(x => x.id === id);
    if (item && item.status === 'reimbursed' && item.expense > 0) {
      alert('此筆代墊已請款，無法刪除！請先至「支出傳票」刪除對應的請款傳票。');
      return;
    }
    if (confirm('確定要刪除這筆代墊請款記錄嗎？')) {
      this.db.pettyCash = this.db.pettyCash.filter(x => x.id !== id);
      this.saveToStorage('pettyCash');
      this.renderAll();
    }
  }

  // 更新代墊請款按鈕狀態與勾選計數
  updateReimburseButtonState() {
    const checked = this.pettyListTbody.querySelectorAll('.petty-cb:checked');
    this.reimburseCountSpan.textContent = checked.length;
    
    if (checked.length > 0) {
      this.btnReimbursePetty.removeAttribute('disabled');
      this.btnReimbursePetty.classList.add('btn-primary');
    } else {
      this.btnReimbursePetty.setAttribute('disabled', 'true');
      this.btnReimbursePetty.classList.remove('btn-primary');
    }
  }

  // 一鍵產生代墊請款傳票
  generateReimbursementVoucher() {
    const checked = this.pettyListTbody.querySelectorAll('.petty-cb:checked');
    if (checked.length === 0) return;

    const ids = [];
    checked.forEach(cb => {
      const id = cb.getAttribute('data-id');
      const item = this.db.pettyCash.find(x => x.id === id);
      if (item) {
        ids.push(id);
      }
    });

    // 勾選的項目之項次範圍與月份
    const checkedItems = ids.map(id => this.db.pettyCash.find(x => x.id === id)).sort((a, b) => new Date(a.date) - new Date(b.date));
    const draft = CommunityAdvanceClaimManager.createAdvanceClaimVoucherDraft(checkedItems);

    // 開啟傳票 dialog，自動填寫
    this.openVoucherModal();
    
    this.vCategorySelect.value = draft.category;
    this.vAmountInput.value = draft.amount;
    this.vSummaryTextarea.value = draft.summary;
    this.vReceiptNoInput.value = draft.receiptNo;
    this.vPaymentMethodSelect.value = draft.paymentMethod;
    this.vFixedTypeSelect.value = draft.fixedType;
    this.vBankInfoInput.value = draft.bankInfo;
    this.vVendorSelect.value = draft.vendorId;

    // 攔截傳票 Save，在儲存傳票時，把對應的代墊項目 status 改成 reimbursed
    const originalSave = this.saveVoucher.bind(this);
    let patchApplied = false; // 追蹤 patch 是否已被執行

    this.saveVoucher = () => {
      patchApplied = true;
      const vNo = this.vNoInput.value;
      
      ids.forEach(id => {
        const pc = this.db.pettyCash.find(x => x.id === id);
        if (pc) {
          pc.status = 'reimbursed';
          pc.reimburseVoucherNo = vNo;
        }
      });
      this.saveToStorage('pettyCash');
      
      this.saveVoucher = originalSave;
      originalSave();
    };

    // 監聽 dialog 關閉事件：若使用者取消而非儲存，還原原始 saveVoucher
    const onDialogClose = () => {
      this.voucherDialog.removeEventListener('close', onDialogClose);
      if (!patchApplied) {
        // 使用者取消了，還原原始函數
        this.saveVoucher = originalSave;
      }
    };
    this.voucherDialog.addEventListener('close', onDialogClose);
  }

  // 開啟零用金匯出 Modal
  openPettyExportModal() {
    const months = new Set();
    this.db.pettyCash.forEach(item => {
      if (item.date) months.add(item.date.substring(0, 7));
    });
    const sortedMonths = Array.from(months).sort().reverse();
    
    if (sortedMonths.length === 0) {
      alert('目前沒有代墊請款資料可匯出。');
      return;
    }

    // 填充月份選單
    this.pExportMonthSelect.innerHTML = sortedMonths.map(m => {
      const p = m.split('-');
      const rcYear = parseInt(p[0]) - 1911;
      return `<option value="${m}">民國${rcYear}年${p[1]}月</option>`;
    }).join('');

    // 預設選擇當前選定的篩選月份，或是最新月份
    const currentFilterMonth = this.pettyMonthSelect.value;
    if (currentFilterMonth && sortedMonths.includes(currentFilterMonth)) {
      this.pExportMonthSelect.value = currentFilterMonth;
    } else {
      this.pExportMonthSelect.value = sortedMonths[0];
    }

    this.pettyExportDialog.showModal();
  }

  // 下載零用金收支明細表 Excel
  downloadPettyCashExcel(targetMonth) {
    if (!targetMonth) {
      alert('請選擇要匯出的月份。');
      return;
    }

    const [yearStr, monthStr] = targetMonth.split('-');
    const rcYear = parseInt(yearStr) - 1911;
    const monthNum = parseInt(monthStr);

    // 篩選出該月份的支出項目 (expense > 0)，依日期排序
    const monthItems = [...this.db.pettyCash]
      .filter(item => item.date && item.date.substring(0, 7) === targetMonth && item.expense > 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // 欄位: A=項次, B=日期, C=科目, D=摘要, E=收入, F=支出, G=餘額, H=發票號碼/收據
    const MAX_DATA_ROWS = 20; // 固定 20 列資料列 (項次 01~20)
    const HEADER_ROWS = 4;    // 前 4 列為標題
    const DATA_START = HEADER_ROWS + 1; // 第 5 列開始
    const DATA_END = DATA_START + MAX_DATA_ROWS - 1; // 第 24 列結束
    const SUM_ROW = DATA_END + 1;  // 第 25 列 合計
    const NEXT_ROW = SUM_ROW + 1;  // 第 26 列 次月提撥
    const BLANK_ROW = NEXT_ROW + 1; // 第 27 列 空白
    const SIGN_ROW = BLANK_ROW + 1;  // 第 28 列 簽名

    // 建立工作簿
    const wb = XLSX.utils.book_new();
    const wsData = [];

    // Row 1: 社區名稱 (merged A1:H1)
    wsData.push(['鴻邦世界花園二期社區管理委員會', '', '', '', '', '', '', '']);
    // Row 2: 表單標題 (merged A2:H2)
    wsData.push(['零 用 金 收 支 明 細 表    ', '', '', '', '', '', '', '']);
    // Row 3: 年月 (merged A3:H3)
    wsData.push([`${rcYear} 年${String(monthNum).padStart(2, '0')}月份 `, '', '', '', '', '', '', '']);
    // Row 4: 欄位標題
    wsData.push(['項次', '日期', '科目', '摘           要', '收入', '支  出', '餘額', '發票號碼/收據']);

    // Row 5~24: 資料列
    for (let i = 0; i < MAX_DATA_ROWS; i++) {
      const idx = String(i + 1).padStart(2, '0');
      if (i < monthItems.length) {
        const item = monthItems[i];
        wsData.push([
          idx,
          item.receipt && item.receipt.match(/[A-Z]{2}\d{8,}/) ? item.receipt.match(/[A-Z]{2}\d{8,}/)[0] : null,
          item.category,
          item.summary,
          null,
          item.expense,
          null,
          item.receipt || ''
        ]);
      } else if (i === monthItems.length) {
        // 「以下空白」列
        wsData.push([idx, null, '以下空白', null, null, null, null, '']);
      } else {
        wsData.push([idx, null, null, null, null, null, null, null]);
      }
    }

    // Row 25: 合計列
    wsData.push([' ', ' ', null, '零用金 合計', null, { t: 'n', f: `SUM(F${DATA_START}:F${DATA_END})` }, null, null]);
    // Row 26: 次月提撥零用金
    wsData.push([null, null, null, '次月提撥零用金', { t: 'n', f: `F${SUM_ROW}` }, null, null, null]);
    // Row 27: 空白
    wsData.push([]);
    // Row 28: 簽名列
    wsData.push(['  主任委員：                                   監察委員：                          財務委員：                                    總幹事：']);

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // 設定合計列的公式 cell
    const sumCell = XLSX.utils.encode_cell({ r: SUM_ROW - 1, c: 5 }); // F25
    ws[sumCell] = { t: 'n', f: `SUM(F${DATA_START}:F${DATA_END})` };
    const nextCell = XLSX.utils.encode_cell({ r: NEXT_ROW - 1, c: 4 }); // E26
    ws[nextCell] = { t: 'n', f: `F${SUM_ROW}` };

    // 設定欄寬 (wch ≈ 字元寬度)
    ws['!cols'] = [
      { wch: 8 },   // A: 項次
      { wch: 14 },  // B: 日期/發票號
      { wch: 16 },  // C: 科目
      { wch: 45 },  // D: 摘要
      { wch: 12 },  // E: 收入
      { wch: 12 },  // F: 支出
      { wch: 12 },  // G: 餘額
      { wch: 22 },  // H: 發票號碼/收據
    ];

    // 設定列高
    ws['!rows'] = [];
    for (let r = 0; r < SIGN_ROW; r++) {
      if (r < 3) {
        ws['!rows'][r] = { hpt: 36 }; // 標題列
      } else if (r === 3) {
        ws['!rows'][r] = { hpt: 30 }; // 欄位標題
      } else if (r === SIGN_ROW - 1) {
        ws['!rows'][r] = { hpt: 50 }; // 簽名列
      } else {
        ws['!rows'][r] = { hpt: 28 }; // 資料列
      }
    }

    // 設定合併儲存格
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }, // A1:H1
      { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }, // A2:H2
      { s: { r: 2, c: 0 }, e: { r: 2, c: 7 } }, // A3:H3
      { s: { r: NEXT_ROW - 1, c: 4 }, e: { r: NEXT_ROW - 1, c: 7 } }, // E26:H26
    ];

    // 設定範圍
    ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: SIGN_ROW - 1, c: 7 } });

    XLSX.utils.book_append_sheet(wb, ws, '零用金明細');

    // 產生檔案名稱，例: 零用金明細11506.xlsx
    const fileName = `零用金明細${rcYear}${String(monthNum).padStart(2, '0')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }

  // ==========================================================================
  // 8. 今網智生活管理費 Excel 離線解析與匯入
  // ==========================================================================
  renderImportHistory() {
    const list = document.getElementById('import-history-list');
    if (this.db.importHistory.length === 0) {
      list.innerHTML = `<li>暫無匯入歷史記錄。</li>`;
      return;
    }

    list.innerHTML = this.db.importHistory.map(h => `
      <li style="margin-bottom: 8px;">
        <strong style="color: var(--text-primary);">${h.filename}</strong><br>
        <span style="font-size: 0.8rem; color: var(--text-muted);">
          匯入時間：${h.date} | 成功筆數：${h.count} 筆 | 合計金：$${h.total.toLocaleString()} 元${h.skippedDuplicateCount ? ` | 略過重複：${h.skippedDuplicateCount} 筆` : ''}
        </span>
      </li>
    `).join('');
  }

  processExcelFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // 讀取第一個 Sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // 轉為二維陣列
        this.rawImportRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (this.rawImportRows.length < 2) {
          alert('Excel 檔案內無足夠的資料列！');
          return;
        }

        this.currentFilename = file.name;
        
        if (!window.CommunityImportParser) {
          throw new Error('今網匯入解析器尚未載入');
        }

        const parsedImport = CommunityImportParser.parseJinwangRows(this.rawImportRows);
        this.importHeaders = parsedImport.headers;
        this.importDataRows = parsedImport.dataRows;
        this.importMetadata = parsedImport.metadata;
        this.importMappedColumns = parsedImport.mappedColumns;
        this.currentImportRecords = parsedImport.records;

        // 填充對照選單下拉框，依解析器判斷預選欄位，仍允許人工調整
        const makeOptions = (selectedIdx) => {
          return this.importHeaders.map((h, idx) => {
            const selected = idx === selectedIdx ? 'selected' : '';
            return `<option value="${idx}" ${selected}>第 ${idx + 1} 欄: ${h}</option>`;
          }).join('');
        };

        this.mapDateSelect.innerHTML = makeOptions(this.importMappedColumns.date);
        this.mapAddrSelect.innerHTML = makeOptions(this.importMappedColumns.addr);
        this.mapAmountSelect.innerHTML = makeOptions(this.importMappedColumns.amount);
        this.mapPayerSelect.innerHTML = makeOptions(this.importMappedColumns.payer);

        // 顯示預覽區與預覽表格
        this.importPreviewSection.classList.remove('hidden');
        this.importTableCard.classList.remove('hidden');
        
        this.updateImportPreview();

      } catch (err) {
        console.error('Excel 解析失敗:', err);
        alert(`Excel 解析失敗，請確認檔案格式是否正確！\n錯誤: ${err.message}`);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  updateImportPreview() {
    if (!this.importDataRows || this.importDataRows.length === 0) return;

    const mappedColumns = {
      ...(this.importMappedColumns || {}),
      date: parseInt(this.mapDateSelect.value),
      addr: parseInt(this.mapAddrSelect.value),
      amount: parseInt(this.mapAmountSelect.value),
      payer: parseInt(this.mapPayerSelect.value)
    };

    this.currentImportRecords = CommunityImportParser.parseRecords(
      this.importDataRows,
      this.importHeaders,
      mappedColumns,
      this.importMetadata || {}
    );

    const totalAmount = this.currentImportRecords.reduce((sum, record) => sum + record.amount, 0);
    const validCount = this.currentImportRecords.length;
    const previewRows = this.currentImportRecords.slice(0, 30);

    this.importStatsText.textContent = `共偵測到 ${validCount} 筆有效管理費繳款記錄，合計入帳/收入金額：$${totalAmount.toLocaleString()} 元`;

    // 渲染預覽表格表頭
    this.importPreviewThead.innerHTML = `
      <tr>
        <th>收款日期</th>
        <th>戶別/棟別</th>
        <th>繳費人</th>
        <th style="text-align: right;">金額</th>
      </tr>
    `;

    // 渲染預覽表格內容
    if (previewRows.length === 0) {
      this.importPreviewTbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">無有效收繳資料，請確認欄位對照是否正確。</td></tr>`;
    } else {
      this.importPreviewTbody.innerHTML = previewRows.map(r => `
        <tr>
          <td>${r.date}</td>
          <td>${r.addr}</td>
          <td>${r.payer}</td>
          <td style="text-align: right; font-weight: 700; color: var(--success);">$${r.amount.toLocaleString()}</td>
        </tr>
      `).join('');
    }
  }

  // 取得對應表頭 DOM 方便渲染
  get importPreviewThead() {
    return document.getElementById('import-preview-thead');
  }
  
  get importPreviewTbody() {
    return document.getElementById('import-preview-tbody');
  }

  submitImportedData() {
    if (!this.importDataRows || this.importDataRows.length === 0) return;

    let count = 0;
    let total = 0;
    const newVouchers = [];
    const importRecords = this.currentImportRecords || [];
    const dedupeResult = window.JinwangImportDedupe
      ? JinwangImportDedupe.filterNewImportRecords(importRecords, this.db.vouchers)
      : { newRecords: importRecords.map(record => ({ record, key: '' })), skippedRecords: [] };

    // 批次產生收入傳票
    dedupeResult.newRecords.forEach(({ record, key }) => {
      const dateFormatted = record.date || new Date().toISOString().substring(0, 10);
      const addr = record.addr;
      const payer = record.payer;
      const amt = record.amount;

      if (amt > 0 && addr) {
        count++;
        total += amt;

        // 配對區權人
        let proprietorId = '';
        if (payer) {
          const matchedProp = (this.db.proprietors || []).find(p => p.name && p.name.trim() === payer.trim());
        if (matchedProp) {
            proprietorId = matchedProp.id;
          }
        }
        const matchedProprietor = (this.db.proprietors || []).find(p => p.id === proprietorId);
        const normalizedFees = matchedProprietor && window.CommunityFeeCalculator
          ? CommunityFeeCalculator.normalizeProprietorFees(matchedProprietor)
          : null;
        const maintenanceFee = normalizedFees ? Math.min(normalizedFees.maintenanceFee || 0, amt) : 0;
        const managementFee = Math.max(0, amt - maintenanceFee);

        // 產生傳票號碼 (I + YYMMDD + 流水)
        const dateObj = new Date(dateFormatted);
        const year = dateObj.getFullYear() - 1911;
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const prefix = `I${year}${month}${day}`;
        const existingCount = this.db.vouchers
          .filter(v => v.voucherNo && v.voucherNo.startsWith(prefix))
          .length;
        const serial = String(existingCount + count).padStart(3, '0');
        const vNo = `${prefix}${serial}`;

        newVouchers.push({
          id: `inc_${Date.now()}_${count}`,
          voucherNo: vNo,
          type: 'income',
          date: dateFormatted,
          vendorId: '',
          vendorName: `住戶 (${addr})`,
          category: '管理費收入',
          amount: amt,
          managementFee,
          maintenanceFee,
          summary: `今網自動匯入 - ${record.periodName || record.feeMonth || '管理費'} 戶別:${addr} 繳款人:${payer || '住戶'}${record.paymentMethod ? ' 方式:' + record.paymentMethod : ''}`,
          paymentMethod: 'transfer',
          bankInfo: '今網代收專戶',
          fixedType: 'fixed',
          handler: '系統匯入',
          approver: '系統自動銷帳',
          owner: '',
          receiptNo: record.receiptNo || `SL_${vNo}`,
          sourceImportKey: key,
          proprietorId: proprietorId,
          feeMonth: record.feeMonth || dateFormatted.substring(0, 7)
        });
      }
    });

    if (newVouchers.length === 0) {
      if (dedupeResult.skippedRecords.length > 0) {
        alert(`本次偵測到 ${dedupeResult.skippedRecords.length} 筆已匯入的今網收款紀錄，沒有新增收入傳票。`);
      } else {
        alert('無任何有效的帳款可供匯入！');
      }
      return;
    }

    // 將新收入寫入資料庫
    this.db.vouchers = [...this.db.vouchers, ...newVouchers];
    
    // 寫入歷史記錄
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    this.db.importHistory.push({
      filename: this.currentFilename || '管理費匯入.xlsx',
      date: formattedDate,
      count: count,
      total: total,
      skippedDuplicateCount: dedupeResult.skippedRecords.length
    });

    this.saveToStorage('vouchers');
    this.saveToStorage('importHistory');
    this.renderAll();

    // 隱藏預覽區並重設上傳框
    this.importPreviewSection.classList.add('hidden');
    this.importTableCard.classList.add('hidden');
    this.excelFileInput.value = '';
    
    const skippedText = dedupeResult.skippedRecords.length > 0
      ? `\n已略過重複資料：${dedupeResult.skippedRecords.length} 筆`
      : '';
    alert(`成功匯入 ${count} 筆管理費記錄，共計新台幣 $${total.toLocaleString()} 元已寫入收入帳目！${skippedText}`);
    this.switchTab('dashboard');
  }

  // ==========================================================================
  // 9. 廠商資料管理 (Vendors CRUD)
  // ==========================================================================
  renderVendorsList() {
    const search = this.vendorSearchInput.value.trim().toLowerCase();
    
    let list = [...this.db.vendors];
    if (search) {
      list = list.filter(v => 
        v.name.toLowerCase().includes(search) || 
        (v.contact && v.contact.toLowerCase().includes(search)) ||
        (v.taxId && v.taxId.includes(search))
      );
    }

    // 按名稱排序
    list.sort((a, b) => a.name.localeCompare(b.name, 'zh-TW'));

    const tbody = this.vendorsListTbody;
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-secondary);">暫無廠商資料</td></tr>`;
      return;
    }

    list.forEach((v, idx) => {
      const bankInfo = v.bankName 
        ? `${v.bankName}(${v.bankBranch || ''})<br>代碼: ${v.bankCode || ''} | 帳號: ${v.accountNo || ''}<br>戶名: ${v.accountName || v.name}`
        : '<span class="text-muted">未設定匯款資訊</span>';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td style="font-weight: 600; color: var(--primary);">${v.name}</td>
        <td>${v.taxId || '-'}</td>
        <td>${v.contact || '-'}</td>
        <td>
          ${v.phone ? '市話: ' + v.phone : ''}
          ${v.phone && v.mobile ? '<br>' : ''}
          ${v.mobile ? '手機: ' + v.mobile : ''}
        </td>
        <td>${v.email || '-'}</td>
        <td style="font-size: 0.85rem; line-height: 1.5;">${bankInfo}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn btn-secondary btn-sm edit-vendor-btn" title="編輯">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="btn btn-danger btn-sm delete-vendor-btn" title="刪除">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      `;

      tr.querySelector('.edit-vendor-btn').addEventListener('click', () => {
        this.openVendorModal(v.id);
      });

      tr.querySelector('.delete-vendor-btn').addEventListener('click', () => {
        this.deleteVendor(v.id);
      });

      tbody.appendChild(tr);
    });
    
    lucide.createIcons();
  }

  // 開啟廠商 Modal
  openVendorModal(id = '') {
    this.vendorForm.reset();
    this.vendorIdInput.value = '';
    
    if (id) {
      // 編輯
      const v = this.db.vendors.find(item => item.id === id);
      if (v) {
        document.getElementById('vendor-dialog-title').textContent = '編輯廠商資料';
        this.vendorIdInput.value = v.id;
        this.vendorNameInput.value = v.name;
        this.vendorTaxIdInput.value = v.taxId || '';
        this.vendorContactInput.value = v.contact || '';
        this.vendorPhoneInput.value = v.phone || '';
        this.vendorMobileInput.value = v.mobile || '';
        this.vendorEmailInput.value = v.email || '';
        this.vendorAddressInput.value = v.address || '';
        this.vendorBankNameInput.value = v.bankName || '';
        this.vendorBankBranchInput.value = v.bankBranch || '';
        this.vendorBankCodeInput.value = v.bankCode || '';
        this.vendorAccountNameInput.value = v.accountName || '';
        this.vendorAccountNoInput.value = v.accountNo || '';
      }
    } else {
      // 新增
      document.getElementById('vendor-dialog-title').textContent = '新增廠商資料';
    }

    this.vendorDialog.showModal();
  }

  // 儲存廠商資料
  saveVendor() {
    try {
      const id = this.vendorIdInput.value;
      
      const vendorData = {
        id: id || `v_vendor_${Date.now()}`,
        name: this.vendorNameInput.value,
        taxId: this.vendorTaxIdInput.value,
        contact: this.vendorContactInput.value,
        phone: this.vendorPhoneInput.value,
        mobile: this.vendorMobileInput.value,
        email: this.vendorEmailInput.value,
        address: this.vendorAddressInput.value,
        bankName: this.vendorBankNameInput.value,
        bankBranch: this.vendorBankBranchInput.value,
        bankCode: this.vendorBankCodeInput.value,
        accountName: this.vendorAccountNameInput.value || this.vendorNameInput.value,
        accountNo: this.vendorAccountNoInput.value
      };

      if (id) {
        // 更新
        const idx = this.db.vendors.findIndex(item => item.id === id);
        if (idx !== -1) {
          this.db.vendors[idx] = vendorData;
          
          // 同步更新現有傳票中該廠商的名字，避免列表不同步
          this.db.vouchers.forEach(v => {
            if (v.vendorId === id) {
              v.vendorName = vendorData.name;
            }
          });
          this.saveToStorage('vouchers');
        }
      } else {
        // 新增
        this.db.vendors.push(vendorData);
      }

      this.saveToStorage('vendors');
      this.renderAll();
      this.vendorDialog.close();
      alert('廠商資料已成功儲存！');
    } catch (err) {
      console.error('儲存廠商失敗:', err);
      alert(`儲存廠商失敗：${err.message}`);
    }
  }

  // 刪除廠商
  deleteVendor(id) {
    try {
      // 檢查是否有傳票與該廠商連結
      const count = this.db.vouchers.filter(v => v.vendorId === id).length;
      let msg = '確定要刪除這筆廠商資料嗎？';
      if (count > 0) {
        msg = `此廠商目前與 ${count} 張支出傳票相關聯。刪除此廠商資料後，過往傳票仍會保留該廠商名稱，但未來將無法從選單中選取。確定要刪除嗎？`;
      }

      if (confirm(msg)) {
        this.db.vendors = this.db.vendors.filter(v => v.id !== id);
        this.saveToStorage('vendors');
        this.renderAll();
        alert('廠商資料已成功刪除！');
      }
    } catch (err) {
      console.error('刪除廠商失敗:', err);
      alert(`刪除廠商失敗：${err.message}`);
    }
  }

  // ==========================================================================
  // 10. 財務報表模組 (Monthly & Annual Financial Reports)
  // ==========================================================================
  updateReportYearDropdowns() {
    const years = new Set();
    const currentYear = new Date().getFullYear();
    // 預設提供目前年份的前後 5 年，讓使用者有足夠的月份可以選擇並建立資料
    for (let y = currentYear - 5; y <= currentYear + 5; y++) {
      years.add(y);
    }
    this.db.vouchers.forEach(v => {
      if (v.date) years.add(parseInt(v.date.substring(0, 4)));
    });
    if (this.db.bankBalances) {
      Object.keys(this.db.bankBalances).forEach(ym => {
        const y = parseInt(ym.substring(0, 4));
        if (y) years.add(y);
      });
    }

    const sortedYears = Array.from(years).sort().reverse();
    const makeOptions = () => sortedYears.map(y => `<option value="${y}">民國${y - 1911}年 (${y}年)</option>`).join('');

    const prevMonthlyYear = this.monthlyYearSelect.value;
    const prevAnnualYear = this.annualYearSelect.value;
    const prevMonthlyMonth = this.monthlyMonthSelect.value;

    this.monthlyYearSelect.innerHTML = makeOptions();
    this.annualYearSelect.innerHTML = makeOptions();

    // 保持或設定預設年份
    if (prevMonthlyYear && sortedYears.includes(parseInt(prevMonthlyYear))) {
      this.monthlyYearSelect.value = prevMonthlyYear;
    } else {
      this.monthlyYearSelect.value = String(currentYear);
    }

    if (prevAnnualYear && sortedYears.includes(parseInt(prevAnnualYear))) {
      this.annualYearSelect.value = prevAnnualYear;
    } else {
      this.annualYearSelect.value = String(currentYear);
    }

    // 保持或設定預設月份
    if (prevMonthlyMonth) {
      this.monthlyMonthSelect.value = prevMonthlyMonth;
    } else {
      const today = new Date();
      this.monthlyMonthSelect.value = String(today.getMonth() + 1).padStart(2, '0');
    }
  }

  // 渲染月報
  renderMonthlyReport() {
    const year = this.monthlyYearSelect.value;
    const month = this.monthlyMonthSelect.value;

    // 1. 財報週期：本月 6 號到次月 5 號
    const monthlyVouchers = this.db.vouchers.filter(v => (
      v.date && AccountingPeriods.isDateInFinancialReportPeriod(v.date, year, month)
    ));
    
    // 2. 算收入與支出
    const totalIncome = monthlyVouchers.filter(v => v.type === 'income').reduce((sum, v) => sum + v.amount, 0);
    const totalExpense = monthlyVouchers.filter(v => v.type === 'expense').reduce((sum, v) => sum + v.amount, 0);
    const balance = totalIncome - totalExpense;

    document.getElementById('report-month-income').textContent = `$${totalIncome.toLocaleString()}`;
    document.getElementById('report-month-expense').textContent = `$${totalExpense.toLocaleString()}`;
    const balEl = document.getElementById('report-month-balance');
    balEl.textContent = `$${balance.toLocaleString()}`;
    balEl.style.color = balance >= 0 ? 'var(--success)' : 'var(--danger)';

    // 3. 科目支出加總與佔比
    const categoryTotals = {};
    monthlyVouchers.filter(v => v.type === 'expense').forEach(v => {
      categoryTotals[v.category] = (categoryTotals[v.category] || 0) + v.amount;
    });

    const categoryListTbody = document.getElementById('report-month-category-list');
    const categoriesArray = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    if (categoriesArray.length === 0) {
      categoryListTbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-secondary);">本月無支出項目</td></tr>`;
    } else {
      categoryListTbody.innerHTML = categoriesArray.map(([cat, amt]) => {
        const percent = totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(1) : '0.0';
        return `
          <tr>
            <td style="font-weight: 600;">${cat}</td>
            <td style="text-align: right; font-weight: 700; color: var(--danger);">$${amt.toLocaleString()}</td>
            <td style="text-align: right; font-weight: 500;">${percent} %</td>
          </tr>
        `;
      }).join('');
    }

    // 4. 科目佔比圓餅圖 (Chart.js)
    this.renderMonthlyPieChart(categoriesArray);

    // 5. 當月收支交易明細表
    const detailListTbody = document.getElementById('report-month-detail-list');
    
    // 按日期正序排序
    const sortedDetails = [...monthlyVouchers].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (sortedDetails.length === 0) {
      detailListTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">本月無任何收支交易明細記錄</td></tr>`;
    } else {
      detailListTbody.innerHTML = sortedDetails.map(v => {
        const parts = v.date.split('-');
        const rcYear = parseInt(parts[0]) - 1911;
        const dateStr = `${rcYear}/${parts[1]}/${parts[2]}`;
        const isInc = v.type === 'income';

        return `
          <tr>
            <td>${dateStr}</td>
            <td>${isInc ? '<span class="badge badge-success">收入</span>' : '<span class="badge badge-danger">支出</span>'}</td>
            <td><span class="badge badge-primary">${v.category}</span></td>
            <td>
              <strong style="color: var(--text-primary);">${v.vendorName || ''}</strong>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">${v.summary}</div>
            </td>
            <td style="text-align: right; font-weight: 700; color: var(--success);">${isInc ? '$' + v.amount.toLocaleString() : '-'}</td>
            <td style="text-align: right; font-weight: 700; color: var(--danger);">${!isInc ? '$' + v.amount.toLocaleString() : '-'}</td>
          </tr>
        `;
      }).join('');
    }

    // 載入銀行存款餘額與利息
    this.loadBankBalances();
    this.renderMonthlyFinancialPrintView();
  }

  escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  formatPrintCurrency(value, showZero = false) {
    const amount = Number(value) || 0;
    if (!showZero && amount === 0) return '';
    return `$${amount.toLocaleString()}`;
  }

  renderMonthlyFinancialPrintView() {
    const container = document.getElementById('monthly-financial-print-view');
    if (!container || !window.MonthlyFinancialPrintReport) return;

    const year = this.monthlyYearSelect.value;
    const month = this.monthlyMonthSelect.value;
    const yearMonth = `${year}-${month}`;
    const bankBalancesForReport = JSON.parse(JSON.stringify(this.db.bankBalances || {}));
    const repairReserveInputValue = this.repairReserveFundInput ? this.repairReserveFundInput.value : '';
    if (repairReserveInputValue !== '') {
      if (!bankBalancesForReport[yearMonth]) bankBalancesForReport[yearMonth] = {};
      bankBalancesForReport[yearMonth].repairReserveFund = parseFloat(repairReserveInputValue) || 0;
    }
    const report = window.MonthlyFinancialPrintReport.createMonthlyFinancialPrintReport({
      year,
      month,
      vouchers: this.db.vouchers,
      bankBalances: bankBalancesForReport
    });

    const topRowCount = Math.max(14, report.incomeRows.length, report.expenseRows.length);
    const topRows = Array.from({ length: topRowCount }, (_, index) => {
      const income = report.incomeRows[index];
      const expense = report.expenseRows[index];
      return `
        <tr>
          <td>${income ? this.escapeHtml(income.dateLabel) : ''}</td>
          <td>${income ? this.escapeHtml(income.subject) : ''}</td>
          <td class="amount-cell">${income ? this.formatPrintCurrency(income.amount) : ''}</td>
          <td>${expense ? this.escapeHtml(expense.dateLabel) : ''}</td>
          <td>${expense ? this.escapeHtml(expense.subject) : ''}</td>
          <td class="amount-cell">${expense ? this.formatPrintCurrency(expense.amount) : ''}</td>
        </tr>
      `;
    }).join('');

    const bankRows = [
      ['活存', report.bankSections.sinopac.active],
      ['定存', report.bankSections.sinopac.timeDeposit],
      ['聯邦活存', report.bankSections.union.active],
      ['聯邦定存', report.bankSections.union.timeDeposit]
    ].map(([label, section]) => `
      <tr>
        <th>${label}</th>
        <td>上期結餘</td>
        <td class="amount-cell">${this.formatPrintCurrency(section.beginning, true)}</td>
        <td>本期收入</td>
        <td class="amount-cell">${this.formatPrintCurrency(section.income)}</td>
        <td>本期支出</td>
        <td class="amount-cell">${this.formatPrintCurrency(section.expense)}</td>
        <td>本期結餘</td>
        <td class="amount-cell">${this.formatPrintCurrency(section.ending, true)}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <section class="monthly-financial-sheet">
        <h1>${this.escapeHtml(report.title)}</h1>
        <div class="monthly-financial-period">${this.escapeHtml(report.periodLabel)}</div>

        <table class="monthly-financial-ledger">
          <thead>
            <tr>
              <th colspan="3" class="ledger-side-title">收入(永豐銀行)</th>
              <th colspan="3" class="ledger-side-title">支出(永豐銀行)</th>
            </tr>
            <tr>
              <th class="date-col">日期</th>
              <th>科目</th>
              <th class="amount-col">金額</th>
              <th class="date-col">日期</th>
              <th>科目</th>
              <th class="amount-col">金額</th>
            </tr>
          </thead>
          <tbody>
            ${topRows}
            <tr class="ledger-total-row">
              <td></td>
              <td>合計</td>
              <td class="amount-cell">${this.formatPrintCurrency(report.incomeTotal, true)}</td>
              <td></td>
              <td>合計</td>
              <td class="amount-cell">${this.formatPrintCurrency(report.expenseTotal, true)}</td>
            </tr>
          </tbody>
        </table>

        <div class="monthly-financial-formula">
          帳戶：收入 ${this.formatPrintCurrency(report.incomeTotal, true)}
          - 支出 ${this.formatPrintCurrency(report.expenseTotal, true)}
          = 本期收支 ${this.formatPrintCurrency(report.netTotal, true)}
        </div>
        <div class="monthly-financial-grand-total">
          <span>銀行帳戶總計</span>
        <strong>${this.formatPrintCurrency(report.bankGrandTotal, true)}</strong>
      </div>
        <div class="monthly-financial-fund-summary">
          <span>公共基金</span>
          <strong>${this.formatPrintCurrency(report.publicFund, true)}</strong>
          <span>修繕公基金</span>
          <strong>${this.formatPrintCurrency(report.repairReserveFund, true)}</strong>
        </div>
        <div class="monthly-financial-fund-note">
          本期修繕公基金：上期 ${this.formatPrintCurrency(report.previousRepairReserveFund, true)}
          + 本期提撥 ${this.formatPrintCurrency(report.repairReserveContribution, true)}
          + 維護費收入 ${this.formatPrintCurrency(report.maintenanceFeeIncome, true)}
          = 建議 ${this.formatPrintCurrency(report.suggestedRepairReserveFund, true)}
        </div>

        <table class="monthly-financial-union-table">
          <thead>
            <tr>
              <th colspan="3">收入(聯邦銀行)</th>
              <th colspan="3">(聯邦銀行)</th>
            </tr>
            <tr>
              <th class="date-col">日期</th>
              <th>科目</th>
              <th class="amount-col">金額</th>
              <th class="date-col">日期</th>
              <th>科目</th>
              <th class="amount-col">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>利息收入</td>
              <td class="amount-cell">${this.formatPrintCurrency(report.bankSections.union.active.income)}</td>
              <td></td>
              <td></td>
              <td class="amount-cell"></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="amount-cell"></td>
              <td></td>
              <td></td>
              <td class="amount-cell"></td>
            </tr>
            <tr class="ledger-total-row">
              <td></td>
              <td>合計</td>
              <td class="amount-cell">${this.formatPrintCurrency(report.bankSections.union.active.income)}</td>
              <td></td>
              <td>合計</td>
              <td class="amount-cell"></td>
            </tr>
          </tbody>
        </table>

        <table class="monthly-financial-bank-table">
          <tbody>${bankRows}</tbody>
        </table>

        <div class="monthly-financial-signatures">
          ${report.signatureLabels.map(label => `
            <div class="monthly-financial-signature-box">${this.escapeHtml(label)}</div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // 載入銀行存款餘額與利息
  loadBankBalances() {
    const year = this.monthlyYearSelect.value;
    const month = this.monthlyMonthSelect.value;
    const yearMonth = `${year}-${month}`;

    const data = this.db.bankBalances[yearMonth] || {
      sinopac: { balance: 0, interest: 0, timeDepositBalance: 0, timeDepositInterest: 0 },
      union: { balance: 0, interest: 0, timeDepositBalance: 0, timeDepositInterest: 0 },
      repairReserveFund: null
    };
    const report = window.MonthlyFinancialPrintReport
      ? window.MonthlyFinancialPrintReport.createMonthlyFinancialPrintReport({
        year,
        month,
        vouchers: this.db.vouchers,
        bankBalances: this.db.bankBalances
      })
      : null;

    // SinoPac
    const sp = data.sinopac || {};
    document.getElementById('bank-sinopac-balance').value = sp.balance || '';
    document.getElementById('bank-sinopac-interest').value = sp.interest || '';
    document.getElementById('bank-sinopac-td-balance').value = sp.timeDepositBalance || '';
    document.getElementById('bank-sinopac-td-interest').value = sp.timeDepositInterest || '';

    // Union
    const un = data.union || {};
    document.getElementById('bank-union-balance').value = un.balance || '';
    document.getElementById('bank-union-interest').value = un.interest || '';
    document.getElementById('bank-union-td-balance').value = un.timeDepositBalance || '';
    document.getElementById('bank-union-td-interest').value = un.timeDepositInterest || '';

    const storedRepairReserveFund = data.repairReserveFund;
    const repairReserveFund = storedRepairReserveFund === undefined || storedRepairReserveFund === null || storedRepairReserveFund === ''
      ? (report ? report.suggestedRepairReserveFund : 0)
      : Number(storedRepairReserveFund);
    if (this.repairReserveFundInput) {
      this.repairReserveFundInput.value = repairReserveFund ? repairReserveFund : '';
    }
    if (report) {
      const publicFund = report.bankGrandTotal - repairReserveFund;
      if (this.repairReserveSuggestedText) {
        this.repairReserveSuggestedText.textContent = this.formatPrintCurrency(report.suggestedRepairReserveFund, true);
      }
      if (this.publicFundPreviewText) {
        this.publicFundPreviewText.textContent = this.formatPrintCurrency(publicFund, true);
      }
      if (this.repairReserveNoteText) {
        this.repairReserveNoteText.textContent =
          `上期修繕公基金 ${this.formatPrintCurrency(report.previousRepairReserveFund, true)} + ` +
          `本期提撥 ${this.formatPrintCurrency(report.repairReserveContribution, true)} + ` +
          `本期維護費收入 ${this.formatPrintCurrency(report.maintenanceFeeIncome, true)}。`;
      }
    }
  }

  // 儲存銀行存款餘額與利息
  saveBankBalances() {
    const year = this.monthlyYearSelect.value;
    const month = this.monthlyMonthSelect.value;
    const yearMonth = `${year}-${month}`;

    const sinopacBalance = parseFloat(document.getElementById('bank-sinopac-balance').value) || 0;
    const sinopacInterest = parseFloat(document.getElementById('bank-sinopac-interest').value) || 0;
    const sinopacTdBalance = parseFloat(document.getElementById('bank-sinopac-td-balance').value) || 0;
    const sinopacTdInterest = parseFloat(document.getElementById('bank-sinopac-td-interest').value) || 0;

    const unionBalance = parseFloat(document.getElementById('bank-union-balance').value) || 0;
    const unionInterest = parseFloat(document.getElementById('bank-union-interest').value) || 0;
    const unionTdBalance = parseFloat(document.getElementById('bank-union-td-balance').value) || 0;
    const unionTdInterest = parseFloat(document.getElementById('bank-union-td-interest').value) || 0;
    const repairReserveFund = parseFloat(document.getElementById('bank-repair-reserve-fund').value) || 0;

    this.db.bankBalances[yearMonth] = {
      sinopac: {
        balance: sinopacBalance,
        interest: sinopacInterest,
        timeDepositBalance: sinopacTdBalance,
        timeDepositInterest: sinopacTdInterest
      },
      union: {
        balance: unionBalance,
        interest: unionInterest,
        timeDepositBalance: unionTdBalance,
        timeDepositInterest: unionTdInterest
      },
      repairReserveFund
    };

    this.saveToStorage('bankBalances');
    
    this.renderMonthlyFinancialPrintView();

    alert(`${yearMonth} 的銀行存款及利息資料已成功儲存！`);
  }

  renderMonthlyPieChart(categoriesArray) {
    const canvas = document.getElementById('report-month-chart');
    if (!canvas) return;

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = canvas.getContext('2d');

    const labels = categoriesArray.map(item => item[0]);
    const data = categoriesArray.map(item => item[1]);
    const isDark = document.body.classList.contains('dark');

    if (labels.length === 0) {
      this.monthlyPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['無資料'],
          datasets: [{ data: [1], backgroundColor: ['#e2e8f0'] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
      return;
    }

    const colors = labels.map((_, i) => `hsl(${162 + (i * 45) % 360}, ${isDark ? '65%' : '75%'}, ${isDark ? '45%' : '50%'})`);

    this.monthlyPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderWidth: isDark ? 2 : 1,
          borderColor: isDark ? '#1e293b' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: isDark ? '#cbd5e1' : '#334155',
              font: { family: 'Noto Sans TC' }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const val = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const pct = ((val / total) * 100).toFixed(1);
                return ` ${context.label}: $${val.toLocaleString()} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }

  // 渲染年報
  renderAnnualReport() {
    const year = this.annualYearSelect.value; // "2026"
    const yearNum = parseInt(year);

    // 1. 取得該年度所有傳票
    const annualVouchers = this.db.vouchers.filter(v => {
      if (!v.date) return false;
      return new Date(v.date).getFullYear() === yearNum;
    });

    // 2. 算 1~12 月每月收入與支出
    const monthlyIncomes = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);

    annualVouchers.forEach(v => {
      const monthIdx = parseInt(v.date.substring(5, 7)) - 1; // 0 ~ 11
      if (v.type === 'income') {
        monthlyIncomes[monthIdx] += v.amount;
      } else {
        monthlyExpenses[monthIdx] += v.amount;
      }
    });

    // 3. 渲染年度收支走勢圖 (Chart.js)
    this.renderAnnualBarChart(monthlyIncomes, monthlyExpenses);

    // 4. 統計各科目在各月份的收支矩陣
    const categoryMonthMatrix = {}; // { '管理費收入': [0,0,0...], '水電費': [...] }
    const categories = new Set();
    
    annualVouchers.forEach(v => {
      categories.add(v.category);
      if (!categoryMonthMatrix[v.category]) {
        categoryMonthMatrix[v.category] = {
          type: v.type, // 'income' 或 'expense'
          months: Array(12).fill(0),
          total: 0
        };
      }
      const monthIdx = parseInt(v.date.substring(5, 7)) - 1;
      categoryMonthMatrix[v.category].months[monthIdx] += v.amount;
      categoryMonthMatrix[v.category].total += v.amount;
    });

    // 分離收入與支出科目並排序
    const sortedCategories = Array.from(categories).sort((a, b) => {
      const typeA = categoryMonthMatrix[a].type;
      const typeB = categoryMonthMatrix[b].type;
      if (typeA !== typeB) {
        return typeA === 'income' ? -1 : 1; // 收入排上面
      }
      return b.localeCompare(a, 'zh-TW');
    });

    const tbody = document.getElementById('annual-table-body');
    if (sortedCategories.length === 0) {
      tbody.innerHTML = `<tr><td colspan="14" style="text-align: center; color: var(--text-secondary);">該年度無任何收支科目紀錄</td></tr>`;
      return;
    }

    let tbodyHtml = '';

    // A. 渲染各科目的橫列
    sortedCategories.forEach(cat => {
      const info = categoryMonthMatrix[cat];
      const isInc = info.type === 'income';
      const colorStyle = isInc ? 'color: var(--success); font-weight: 500;' : 'color: var(--text-primary);';

      let rowHtml = `<tr><td style="${colorStyle}">${cat} (${isInc ? '入' : '支'})</td>`;
      for (let m = 0; m < 12; m++) {
        const val = info.months[m];
        rowHtml += `<td>${val > 0 ? '$' + val.toLocaleString() : '-'}</td>`;
      }
      rowHtml += `<td style="font-weight: 700; ${isInc ? 'color: var(--success);' : 'color: var(--danger);'}">$${info.total.toLocaleString()}</td></tr>`;
      tbodyHtml += rowHtml;
    });

    // B. 增加「總收入」列
    let incRow = `<tr class="total-row" style="color: var(--success);"><td>總收入 (A)</td>`;
    let totalIncAccum = 0;
    for (let m = 0; m < 12; m++) {
      incRow += `<td>${monthlyIncomes[m] > 0 ? '$' + monthlyIncomes[m].toLocaleString() : '-'}</td>`;
      totalIncAccum += monthlyIncomes[m];
    }
    incRow += `<td>$${totalIncAccum.toLocaleString()}</td></tr>`;
    tbodyHtml += incRow;

    // C. 增加「總支出」列
    let expRow = `<tr class="total-row" style="color: var(--danger);"><td>總支出 (B)</td>`;
    let totalExpAccum = 0;
    for (let m = 0; m < 12; m++) {
      expRow += `<td>${monthlyExpenses[m] > 0 ? '$' + monthlyExpenses[m].toLocaleString() : '-'}</td>`;
      totalExpAccum += monthlyExpenses[m];
    }
    expRow += `<td>$${totalExpAccum.toLocaleString()}</td></tr>`;
    tbodyHtml += expRow;

    // D. 增加「當月結餘」列
    let balRow = `<tr class="total-row" style="background-color: var(--primary-light);"><td>本月結餘 (A-B)</td>`;
    let totalBalAccum = totalIncAccum - totalExpAccum;
    for (let m = 0; m < 12; m++) {
      const monthBal = monthlyIncomes[m] - monthlyExpenses[m];
      const monthBalColor = monthBal >= 0 ? 'color: var(--success);' : 'color: var(--danger);';
      balRow += `<td style="${monthBalColor}">$${monthBal.toLocaleString()}</td>`;
    }
    const balColor = totalBalAccum >= 0 ? 'color: var(--success);' : 'color: var(--danger);';
    balRow += `<td style="font-weight: 800; ${balColor}">$${totalBalAccum.toLocaleString()}</td></tr>`;
    tbodyHtml += balRow;

    tbody.innerHTML = tbodyHtml;
  }

  renderAnnualBarChart(incomes, expenses) {
    const canvas = document.getElementById('report-year-chart');
    if (!canvas) return;

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = canvas.getContext('2d');

    const isDark = document.body.classList.contains('dark');
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    this.annualBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: '總收入',
            data: incomes,
            backgroundColor: isDark ? 'hsl(142, 60%, 40%)' : 'hsl(142, 70%, 45%)',
            borderRadius: 4
          },
          {
            label: '總支出',
            data: expenses,
            backgroundColor: isDark ? 'hsl(350, 60%, 45%)' : 'hsl(350, 70%, 50%)',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: isDark ? '#334155' : '#e2e8f0' },
            ticks: { color: isDark ? '#cbd5e1' : '#334155', font: { family: 'Noto Sans TC' } }
          },
          y: {
            grid: { color: isDark ? '#334155' : '#e2e8f0' },
            ticks: {
              color: isDark ? '#cbd5e1' : '#334155',
              font: { family: 'Noto Sans TC' },
              callback: (val) => '$' + val.toLocaleString()
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: isDark ? '#cbd5e1' : '#334155',
              font: { family: 'Noto Sans TC', weight: 'bold' }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return ` ${context.dataset.label}: $${context.raw.toLocaleString()} 元`;
              }
            }
          }
        }
      }
    });
  }

  // 渲染所有圖表（主題切換時調用）
  renderCharts() {
    const tabId = document.querySelector('.sidebar-item.active').getAttribute('data-tab');
    if (tabId === 'dashboard') {
      const now = new Date();
      const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      this.renderDashboardPieChart(currentYearMonth);
    } else if (tabId === 'monthly-report') {
      this.renderMonthlyReport();
    } else if (tabId === 'annual-report') {
      this.renderAnnualReport();
    }
  }

  // ==========================================================================
  // 11. 輔助函數：中文大寫金轉換與備份還原
  // ==========================================================================
  toChineseAmount(n) {
    if (isNaN(n) || n < 0) return '零元整';
    
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
    const unit = [
      ['元', '萬', '億'],
      ['', '拾', '佰', '仟']
    ];
    
    let s = '';
    
    // 小數點處理 (雖然我們系統是整數，但為了防呆寫好)
    let numStr = String(Math.floor(n));
    let amount = n;
    
    // 整數處理
    let head = amount < 0 ? '負' : '';
    amount = Math.abs(amount);
    
    for (let i = 0; i < unit[0].length && amount > 0; i++) {
      let p = '';
      for (let j = 0; j < unit[1].length && amount > 0; j++) {
        p = digit[amount % 10] + unit[1][j] + p;
        amount = Math.floor(amount / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    
    s = s.replace(/(零.)*零元/, '元')
         .replace(/(零.)+/g, '零')
         .replace(/^整$/, '零元整');
         
    if (s.endsWith('元')) {
      s += '整';
    }
    
    // 特殊：一十萬轉成壹拾萬，拾改為壹拾
    s = s.replace(/^拾/, '壹拾');
    
    return head + s;
  }

  // 匯出 JSON 資料備份
  exportDataBackup() {
    const dataStr = JSON.stringify(this.db, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    const exportFileDefaultName = `鴻邦世界花園二期_社區帳務備份_${formattedDate}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // 匯入 JSON 還原資料
  importDataRestore(e) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        
        // 欄位格式簡單防呆驗證
        if (parsed.vendors && parsed.vouchers && parsed.pettyCash) {
          if (confirm('驗證成功！即將還原此備份，這將覆蓋您目前的所有資料且無法還原。確定要執行嗎？')) {
            this.db = parsed;
            if (!this.db.bankBalances) {
              this.db.bankBalances = {};
            }
            this.saveToStorage();
            this.renderAll();
            alert('系統資料已成功還原！');
            // 導回控制面板
            this.switchTab('dashboard');
          }
        } else {
          alert('還原失敗：備份檔案結構不符合本系統規格！');
        }
      } catch (err) {
        alert('解析備份檔案失敗，請確認檔案是否為正確的 JSON 備份！');
      }
    };
    if (e.target.files.length > 0) {
      fileReader.readAsText(e.target.files[0]);
    }
  }

  // 一鍵清空資料庫
  clearDatabase() {
    try {
      this.db = {
        vouchers: [],
        vendors: [],
        pettyCash: [],
        importHistory: [],
        proprietors: [],
        bankBalances: {}
      };
      this.saveToStorage();
      this.renderAll();
      alert('本機微型資料庫已成功初始化清空！');
    } catch (err) {
      console.error('清空資料庫失敗:', err);
      alert(`清空資料庫失敗：${err.message}`);
    }
  }

  // ==========================================================================
  // 9. 區權人及管理費收繳管理邏輯
  // ==========================================================================
  
  // 更新管理費篩選年份下拉選單
  updateFeeFilterYearDropdown() {
    const years = new Set();
    const currentYear = new Date().getFullYear();
    years.add(currentYear);
    years.add(currentYear - 1);
    years.add(currentYear + 1);
    
    this.db.vouchers.forEach(v => {
      if (v.date) {
        const y = parseInt(v.date.substring(0, 4));
        if (y) years.add(y);
      }
    });

    // 記住使用者目前所選的值
    const prevYearVal = this.feeFilterYearSelect ? this.feeFilterYearSelect.value : null;
    const prevMonthVal = this.feeFilterMonthSelect ? this.feeFilterMonthSelect.value : null;

    const sortedYears = Array.from(years).sort((a, b) => b - a);
    this.feeFilterYearSelect.innerHTML = sortedYears.map(y => `<option value="${y}">${y}年</option>`).join('');
    
    // 如果之前有選取值，且該年份仍在選單中，則保留原本的選取
    if (prevYearVal && sortedYears.includes(parseInt(prevYearVal))) {
      this.feeFilterYearSelect.value = prevYearVal;
      if (prevMonthVal) {
        this.feeFilterMonthSelect.value = prevMonthVal;
      }
    } else {
      // 否則預設為最新傳票的年份，或 115 年 (2026 年)
      const hasJune115 = this.db.vouchers.some(v => v.date && v.date.startsWith('2026-06'));
      if (hasJune115) {
        this.feeFilterYearSelect.value = '2026';
        this.feeFilterMonthSelect.value = '06';
      } else {
        this.feeFilterYearSelect.value = String(currentYear);
        this.feeFilterMonthSelect.value = String(new Date().getMonth() + 1).padStart(2, '0');
      }
    }
  }

  // 渲染區權人名冊列表
  renderProprietorsList() {
    const query = this.proprietorSearchInput.value.trim().toLowerCase();
    
    const filtered = this.db.proprietors.filter(p => {
      const roomText = `${p.building}-${p.floor}-${p.room}`.toLowerCase();
      return p.name.toLowerCase().includes(query) ||
             p.phone.includes(query) ||
             (p.parking && p.parking.toLowerCase().includes(query)) ||
             roomText.includes(query);
    });

    // 依 棟別 -> 樓層 -> 戶別 排序
    filtered.sort((a, b) => {
      if (a.building !== b.building) return a.building.localeCompare(b.building);
      const aFloor = parseInt(a.floor) || 0;
      const bFloor = parseInt(b.floor) || 0;
      if (aFloor !== bFloor) return aFloor - bFloor;
      return a.room.localeCompare(b.room);
    });

    this.proprietorsListTbody.innerHTML = '';
    
    if (filtered.length === 0) {
      this.proprietorsListTbody.innerHTML = `
        <tr>
          <td colspan="11" style="text-align: center; color: var(--text-secondary); padding: 30px;">
            <i data-lucide="info" style="width: 24px; height: 24px; margin: 0 auto 10px; display: block; opacity: 0.5;"></i>
            沒有找到任何符合的區權人資料，請點選「新增區權人」開始建立。
          </td>
        </tr>
      `;
      lucide.createIcons();
      return;
    }

    filtered.forEach((p, idx) => {
      const fees = CommunityFeeCalculator.normalizeProprietorFees(p);
      const tr = document.createElement('tr');
      const buildingInfo = `${fees.building} / ${fees.floor} / ${fees.room}`;
      const rateText = fees.feeType === 'area' ? `坪單價 $${fees.feeRate}` : '固定管理費';
      
      tr.innerHTML = `
        <td style="text-align: center;">${idx + 1}</td>
        <td style="font-weight: 600;">${buildingInfo}</td>
        <td style="font-weight: 600;">${fees.name}</td>
        <td>${fees.phone}</td>
        <td>${fees.area} 坪</td>
        <td>${fees.parking || '-'}</td>
        <td>
          <span class="badge" style="background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-primary);">
            ${rateText}
          </span>
        </td>
        <td style="font-family: 'Consolas', monospace; font-weight: 700; color: var(--primary);">
          $${fees.managementFee.toLocaleString()}
        </td>
        <td style="font-family: 'Consolas', monospace; font-weight: 700; color: var(--text-secondary);">
          $${fees.maintenanceFee.toLocaleString()}
        </td>
        <td style="font-family: 'Consolas', monospace; font-weight: 800; color: var(--success);">
          $${fees.monthlyFee.toLocaleString()}
        </td>
        <td style="text-align: center;">
          <div class="btn-group" style="justify-content: center; gap: 6px;">
            <button class="btn btn-secondary btn-sm btn-edit" title="編輯" style="padding: 4px 8px;"><i data-lucide="edit-3" style="width: 14px; height: 14px;"></i></button>
            <button class="btn btn-danger btn-sm btn-delete" title="刪除" style="padding: 4px 8px;"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
          </div>
        </td>
      `;

      tr.querySelector('.btn-edit').addEventListener('click', () => this.openProprietorModal(fees.id));
      tr.querySelector('.btn-delete').addEventListener('click', () => this.deleteProprietor(fees.id));

      this.proprietorsListTbody.appendChild(tr);
    });

    lucide.createIcons();
  }

  // 開啟新增/編輯區權人對話框
  openProprietorModal(id) {
    this.proprietorForm.reset();
    this.propIdInput.value = '';
    this.propMonthlyFeePreview.textContent = '管理費 $0 + 維護費 $150 = $150 元';
    
    if (id) {
      const p = this.db.proprietors.find(item => item.id === id);
      if (p) {
        const fees = CommunityFeeCalculator.normalizeProprietorFees(p);
        document.getElementById('proprietor-dialog-title').textContent = '編輯區權人資料';
        this.propIdInput.value = fees.id;
        this.propBuildingInput.value = fees.building;
        this.propFloorInput.value = fees.floor.replace('樓', '');
        this.propRoomInput.value = fees.room;
        this.propNameInput.value = fees.name;
        this.propPhoneInput.value = fees.phone;
        this.propAreaInput.value = fees.area;
        this.propParkingInput.value = fees.parking || '';
        this.propFeeTypeSelect.value = fees.feeType;
        this.propFeeRateInput.value = fees.feeRate;
        this.propParkingFeeInput.value = fees.parkingFee || 0;
        
        this.propMonthlyFeePreview.textContent = `管理費 $${fees.managementFee.toLocaleString()} + 維護費 $${fees.maintenanceFee.toLocaleString()} = $${fees.monthlyFee.toLocaleString()} 元`;
      }
    } else {
      document.getElementById('proprietor-dialog-title').textContent = '新增區權人資料';
      this.propBuildingInput.value = 'A棟';
      this.propFeeTypeSelect.value = 'area';
      this.propFeeRateInput.value = 60;
      this.propParkingFeeInput.value = 300;
      const fees = CommunityFeeCalculator.calculateProprietorFees({ area: 0, feeRate: 60, parkingFee: 300, feeType: 'area' });
      this.propMonthlyFeePreview.textContent = `管理費 $${fees.managementFee.toLocaleString()} + 維護費 $${fees.maintenanceFee.toLocaleString()} = $${fees.monthlyFee.toLocaleString()} 元`;
    }
    
    this.proprietorDialog.showModal();
  }

  // 儲存區權人資料
  saveProprietor() {
    try {
      const id = this.propIdInput.value;
      const building = this.propBuildingInput.value.trim();
      let floor = this.propFloorInput.value.trim();
      if (floor && !floor.endsWith('樓')) floor += '樓';
      
      const room = this.propRoomInput.value.trim().toUpperCase();
      const name = this.propNameInput.value.trim();
      const phone = this.propPhoneInput.value.trim();
      const area = parseFloat(this.propAreaInput.value) || 0;
      const parking = this.propParkingInput.value.trim() || '無';
      const feeType = this.propFeeTypeSelect.value;
      const feeRate = parseFloat(this.propFeeRateInput.value) || 0;
      const parkingFee = parseFloat(this.propParkingFeeInput.value) || 0;
      
      const feeParts = CommunityFeeCalculator.calculateProprietorFees({ area, feeRate, parkingFee, feeType });

      const pData = {
        id: id || `prop_${Date.now()}`,
        building,
        floor,
        room,
        name,
        phone,
        area,
        parking,
        feeType,
        feeRate,
        parkingFee,
        managementFee: feeParts.managementFee,
        maintenanceFee: feeParts.maintenanceFee,
        monthlyFee: feeParts.monthlyFee
      };

      if (id) {
        const index = this.db.proprietors.findIndex(item => item.id === id);
        if (index !== -1) {
          this.db.proprietors[index] = pData;
        }
      } else {
        const exists = this.db.proprietors.some(item => 
          item.building === building && item.floor === floor && item.room === room
        );
        if (exists) {
          alert(`注意！${building} ${floor} ${room} 戶別已經存在於名冊中！`);
          return;
        }
        this.db.proprietors.push(pData);
      }

      this.saveToStorage('proprietors');
      this.renderProprietorsList();
      this.proprietorDialog.close();
      alert('區權人資料已成功儲存！');
    } catch (err) {
      console.error('儲存區權人失敗:', err);
      alert(`儲存失敗：${err.message}`);
    }
  }

  // 刪除區權人資料
  deleteProprietor(id) {
    if (confirm('確定要刪除這筆區權人資料嗎？這不會影響已生成的管理費收入傳票紀錄，但會影響未來的收繳查核。')) {
      this.db.proprietors = this.db.proprietors.filter(item => item.id !== id);
      this.saveToStorage('proprietors');
      this.renderProprietorsList();
      alert('區權人資料已成功刪除！');
    }
  }

  async generateNextSmartLifeUploadFile() {
    const btn = this.btnGenerateSmartLifeUpload;
    const originalText = btn.innerHTML;

    try {
      if (!window.XLSX) {
        throw new Error('Excel 產檔套件尚未載入');
      }

      const baseMonth = `${this.feeFilterYearSelect.value}-${this.feeFilterMonthSelect.value}`;
      const targetMonth = CommunitySmartLifeUploadGenerator.getNextFeeMonth(baseMonth);

      btn.disabled = true;
      btn.innerHTML = '<i data-lucide="loader-2" style="width: 15px; height: 15px; margin-right: 4px;"></i>產生中...';
      lucide.createIcons();

      const templateResponse = await fetch(encodeURI(CommunitySmartLifeUploadGenerator.TEMPLATE_FILE));
      if (!templateResponse.ok) {
        throw new Error(`讀取智生活範本失敗 (${templateResponse.status})`);
      }

      const templateBuffer = await templateResponse.arrayBuffer();
      const workbook = XLSX.read(templateBuffer, { type: 'array', cellStyles: true });
      const result = CommunitySmartLifeUploadGenerator.prepareWorkbookFromTemplate({
        workbook,
        xlsx: XLSX,
        proprietors: this.db.proprietors,
        targetMonth
      });

      const filename = CommunitySmartLifeUploadGenerator.buildFilename(result.period);
      XLSX.writeFile(workbook, filename, { bookType: 'xlsx' });

      const unmatched = result.stats.unmatchedTemplateUnits.length > 0
        ? `\n\n注意：有 ${result.stats.unmatchedTemplateUnits.length} 個範本戶別未對應到名冊，已保留空白金額。`
        : '';
      alert(`已產生 ${result.period.periodLabel} 智生活管理費上傳檔！\n\n對應戶數：${result.stats.matchedCount} 戶\n應繳合計：$${result.stats.totalAmount.toLocaleString()}${unmatched}`);
    } catch (err) {
      console.error('產生智生活上傳檔失敗:', err);
      alert(`產生智生活上傳檔失敗：${err.message}`);
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
      lucide.createIcons();
    }
  }

  // 渲染管理費收繳查核清單
  renderFeeManagerList() {
    const targetYear = this.feeFilterYearSelect.value;
    const targetMonth = this.feeFilterMonthSelect.value;
    const filterMonthVal = `${targetYear}-${targetMonth}`;
    const statusFilter = this.feeFilterStatusSelect.value;

    const now = new Date();
    const currentMonthVal = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const isFutureMonth = filterMonthVal > currentMonthVal;

    let totalReceivable = 0;
    let totalCollected = 0;
    let totalUnpaid = 0;
    
    const listData = [];
    
    this.db.proprietors.forEach(p => {
      const fees = CommunityFeeCalculator.normalizeProprietorFees(p);
      const monthlyFee = fees.monthlyFee || 0;
      totalReceivable += monthlyFee;

      const feeStatus = CommunityFeeStatusCalculator.evaluateFeeStatus({
        proprietor: fees,
        vouchers: this.db.vouchers,
        targetMonth: filterMonthVal
      });
      const coveredValue = feeStatus.isPaid ? monthlyFee : 0;

      totalCollected += coveredValue;
      if (!feeStatus.isPaid) {
        // 只有當月份已到期（小於等於當前月份）時，才計入欠繳總額
        if (!isFutureMonth) {
          totalUnpaid += monthlyFee;
        }
      }

      const item = {
        proprietor: fees,
        managementFee: fees.managementFee,
        maintenanceFee: fees.maintenanceFee,
        monthlyFee,
        collected: feeStatus.collected,
        coveredValue: feeStatus.coveredValue,
        isPaid: feeStatus.isPaid,
        isPrepaidCoverage: feeStatus.isPrepaidCoverage,
        voucher: feeStatus.voucher
      };

      if (statusFilter === 'paid' && !item.isPaid) return;
      if (statusFilter === 'unpaid' && (item.isPaid || isFutureMonth)) return;
      
      listData.push(item);
    });

    const collectionRate = totalReceivable > 0 ? Math.round((totalCollected / totalReceivable) * 100) : 0;
    
    document.getElementById('fee-sum-receivable').textContent = `$${totalReceivable.toLocaleString()}`;
    document.getElementById('fee-sum-collected').textContent = `$${totalCollected.toLocaleString()}`;
    const unpaidEl = document.getElementById('fee-sum-unpaid');
    unpaidEl.textContent = `$${totalUnpaid.toLocaleString()}`;
    if (totalUnpaid > 0) {
      unpaidEl.style.color = '#ef4444';
    } else {
      unpaidEl.style.color = 'var(--text-secondary)';
    }
    document.getElementById('fee-collection-rate').textContent = `${collectionRate}%`;

    listData.sort((a, b) => {
      const ap = a.proprietor;
      const bp = b.proprietor;
      if (ap.building !== bp.building) return ap.building.localeCompare(bp.building);
      const aFloor = parseInt(ap.floor) || 0;
      const bFloor = parseInt(bp.floor) || 0;
      if (aFloor !== bFloor) return aFloor - bFloor;
      return ap.room.localeCompare(bp.room);
    });

    this.feeManagerListTbody.innerHTML = '';
    
    if (listData.length === 0) {
      this.feeManagerListTbody.innerHTML = `
        <tr>
          <td colspan="11" style="text-align: center; color: var(--text-secondary); padding: 30px;">
            沒有符合篩選條件的住戶繳費紀錄。
          </td>
        </tr>
      `;
      return;
    }

    listData.forEach((item, idx) => {
      const tr = document.createElement('tr');
      const p = item.proprietor;
      const roomName = `${p.building}-${p.floor}-${p.room}`;
      
      let statusBadge = '';
      let actionBtn = '';
      let payDateText = '-';
      let payDetailText = '-';

      if (item.isPaid) {
        statusBadge = item.isPrepaidCoverage
          ? '<span class="badge badge-primary">✅ 預繳涵蓋</span>'
          : '<span class="badge badge-success">✅ 已繳款</span>';
        const v = item.voucher;
        payDateText = v.date || '-';
        
        let methodStr = '匯款';
        if (v.paymentMethod === 'cash') methodStr = '現金';
        else if (v.paymentMethod === 'check') methodStr = '支票';
        
        payDetailText = `<span style="font-size:0.8rem; color:var(--text-secondary);">${methodStr}</span> / <a href="#" class="voucher-link" style="font-family:'Consolas'; font-weight:700; text-decoration: underline; color: var(--primary);">${v.voucherNo}</a>`;
        actionBtn = item.isPrepaidCoverage
          ? '-'
          : `<button class="btn btn-secondary btn-sm btn-delete-payment" style="padding: 4px 8px; color: #ef4444;" title="註銷收款"><i data-lucide="x-circle" style="width:14px; height:14px;"></i> 註銷</button>`;
      } else {
        if (isFutureMonth) {
          statusBadge = '<span class="badge" style="background-color: var(--border); color: var(--text-secondary);">⏳ 未到期</span>';
        } else {
          statusBadge = '<span class="badge badge-danger">❌ 欠繳中</span>';
        }
        actionBtn = `<button class="btn btn-primary btn-sm btn-register-payment" style="padding: 4px 10px; font-weight:600;"><i data-lucide="check-square" style="width:14px; height:14px; margin-right:4px;"></i> 收款登記</button>`;
      }

      tr.innerHTML = `
        <td style="text-align: center;">${idx + 1}</td>
        <td style="font-weight: 600;">${roomName}</td>
        <td style="font-weight: 600;">${p.name}</td>
        <td style="font-family: 'Consolas', monospace; font-weight: 700;">$${item.managementFee.toLocaleString()}</td>
        <td style="font-family: 'Consolas', monospace; font-weight: 700; color: var(--text-secondary);">$${item.maintenanceFee.toLocaleString()}</td>
        <td style="font-family: 'Consolas', monospace; font-weight: 800;">$${item.monthlyFee.toLocaleString()}</td>
        <td style="font-family: 'Consolas', monospace; font-weight: 700; color: ${item.isPaid ? '#10b981' : 'var(--text-secondary)'};">
          ${item.isPaid ? '$' + item.coveredValue.toLocaleString() : '-'}
        </td>
        <td>${statusBadge}</td>
        <td>${payDateText}</td>
        <td>${payDetailText}</td>
        <td style="text-align: center;">${actionBtn}</td>
      `;

      if (item.isPaid && !item.isPrepaidCoverage) {
        tr.querySelector('.btn-delete-payment').addEventListener('click', () => this.deleteFeePayment(item.voucher.id));
        tr.querySelector('.voucher-link').addEventListener('click', (e) => {
          e.preventDefault();
          this.viewVoucher(item.voucher.id);
        });
      } else if (item.isPaid && item.isPrepaidCoverage) {
        tr.querySelector('.voucher-link').addEventListener('click', (e) => {
          e.preventDefault();
          this.viewVoucher(item.voucher.id);
        });
      } else {
        tr.querySelector('.btn-register-payment').addEventListener('click', () => this.openFeePaymentModal(p.id, filterMonthVal));
      }

      this.feeManagerListTbody.appendChild(tr);
    });

    lucide.createIcons();
  }

  // 開啟收款登記 Modal
  openFeePaymentModal(proprietorId, feeMonth) {
    this.feePaymentForm.reset();
    
    const pRaw = this.db.proprietors.find(item => item.id === proprietorId);
    if (!pRaw) return;
    const p = CommunityFeeCalculator.normalizeProprietorFees(pRaw);

    this.payPropIdInput.value = p.id;
    this.payMonthValInput.value = feeMonth;
    
    this.payRoomText.textContent = `${p.building}-${p.floor}-${p.room}`;
    this.payNameText.textContent = p.name;
    
    const parts = feeMonth.split('-');
    const rcYear = parseInt(parts[0]) - 1911;
    this.payMonthText.textContent = `民國 ${rcYear} 年 ${parts[1]} 月`;

    this.payAmountInput.value = p.monthlyFee;
    
    const today = new Date();
    this.payDateInput.value = today.toISOString().substring(0, 10);
    this.payMethodSelect.value = 'transfer';
    this.payRemarkInput.value = '轉帳/匯款繳納';

    this.feePaymentDialog.showModal();
  }

  // 自動生成收入傳票號碼 (I + 民國年月 + 3碼流水號)
  generateIncomeVoucherNo(dateStr) {
    const parts = dateStr.split('-');
    const rcYear = parseInt(parts[0]) - 1911;
    const prefix = `I${rcYear}${parts[1]}`;
    
    const matches = this.db.vouchers
      .filter(v => v.type === 'income' && v.voucherNo && v.voucherNo.startsWith(prefix))
      .map(v => parseInt(v.voucherNo.substring(7)))
      .filter(n => !isNaN(n));
      
    const maxNum = matches.length > 0 ? Math.max(...matches) : 0;
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return prefix + nextNum;
  }

  // 儲存收款登記並生成傳票
  saveFeePayment() {
    try {
      const proprietorId = this.payPropIdInput.value;
      const feeMonth = this.payMonthValInput.value;
      
      const pRaw = this.db.proprietors.find(item => item.id === proprietorId);
      if (!pRaw) return;
      const p = CommunityFeeCalculator.normalizeProprietorFees(pRaw);

      const date = this.payDateInput.value;
      const amount = parseInt(this.payAmountInput.value) || 0;
      const paymentMethod = this.payMethodSelect.value;
      const remark = this.payRemarkInput.value.trim();
      const maintenanceFee = Math.min(p.maintenanceFee || 0, amount);
      const managementFee = Math.max(0, amount - maintenanceFee);
      
      const roomName = `${p.building}-${p.floor}-${p.room}`;
      const voucherNo = this.generateIncomeVoucherNo(date);

      const incomeVoucher = {
        id: `inc_${Date.now()}`,
        voucherNo: voucherNo,
        type: 'income',
        date: date,
        vendorId: '',
        vendorName: `${p.name} (管理費)`,
        category: '管理費收入',
        amount: amount,
        managementFee,
        maintenanceFee,
        summary: `${p.floor}-${p.room} 管理費收繳 - 管理費$${p.managementFee.toLocaleString()} + 維護費$${p.maintenanceFee.toLocaleString()} - ${remark || '繳款人: ' + p.name}`,
        paymentMethod: paymentMethod,
        bankInfo: paymentMethod === 'transfer' ? (remark || '電匯存入') : '現金收執',
        fixedType: 'fixed',
        handler: '張總幹事',
        approver: '李財務委員',
        owner: '',
        receiptNo: `RC-${voucherNo.substring(1)}`,
        proprietorId: p.id,
        feeMonth: feeMonth
      };

      this.db.vouchers.push(incomeVoucher);
      this.saveToStorage('vouchers');
      this.renderFeeManagerList();
      this.feePaymentDialog.close();
      alert(`收款登記成功！已自動生成收入傳票：${voucherNo}`);
    } catch (err) {
      console.error('登記收款失敗:', err);
      alert(`收款登記失敗：${err.message}`);
    }
  }

  // 註銷管理費收款傳票
  deleteFeePayment(voucherId) {
    if (confirm('確定要註銷這筆收款登記嗎？這將會從系統中徹底刪除該筆收入傳票！')) {
      this.db.vouchers = this.db.vouchers.filter(v => v.id !== voucherId);
      this.saveToStorage('vouchers');
      this.renderFeeManagerList();
      alert('收款已成功註銷，繳費狀態已回復為欠繳。');
    }
  }

  // 匯入 Excel 繳費歷史帳冊 (114年度與115年度)
  importExcelHistoryFile(e) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // 檢查工作表是否存在
        if (!workbook.SheetNames.includes('114年度') && !workbook.SheetNames.includes('115年度')) {
          alert('匯入失敗：Excel 檔案中未包含「114年度」或「115年度」工作表！');
          return;
        }

        // 初始化合併統計
        let newProprietorsCount = 0;
        let newVouchersCount = 0;

        // 建立現有住戶的戶別 Map (code -> id)，用來做防呆去重
        const propCodeMap = {};
        this.db.proprietors.forEach(p => {
          const cleanBuilding = p.building.replace('棟', '');
          const key = `${cleanBuilding}-${p.room}`;
          propCodeMap[key] = p.id;
        });

        // 建立現有傳票的繳費 Map (proprietorId_feeMonth -> true)
        const voucherMap = {};
        this.db.vouchers.forEach(v => {
          if (v.type === 'income' && v.category === '管理費收入' && v.proprietorId && v.feeMonth) {
            voucherMap[`${v.proprietorId}_${v.feeMonth}`] = true;
          }
        });

        const months = [
          { col: 6, monthStr: '01' },
          { col: 8, monthStr: '02' },
          { col: 10, monthStr: '03' },
          { col: 12, monthStr: '04' },
          { col: 14, monthStr: '05' },
          { col: 16, monthStr: '06' },
          { col: 18, monthStr: '07' },
          { col: 20, monthStr: '08' },
          { col: 22, monthStr: '09' },
          { col: 24, monthStr: '10' },
          { col: 26, monthStr: '11' },
          { col: 28, monthStr: '12' }
        ];

        const self = this;
        let nextPropIdNum = this.db.proprietors.length + 1;

        // 定義解析單張年度 Sheet 的內嵌函數
        function parseYearSheet(sheetName, yearPrefix, yearStr) {
          const sheet = workbook.Sheets[sheetName];
          if (!sheet) return;
          
          const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          sheetData.forEach((row, idx) => {
            if (idx === 0) return; // Header
            const code = row[0];
            const name = row[1];
            
            if (code && String(code).trim() !== '' && name && String(name).trim() !== '') {
              const codeStr = String(code).trim();
              let propId = propCodeMap[codeStr];
              
              // 若住戶不存在，則建立新住戶
              if (!propId) {
                propId = `prop_${nextPropIdNum++}`;
                
                const parts = codeStr.split('-');
                const building = parts[0] ? `${parts[0]}棟` : 'A棟';
                const floor = parts[1] ? parts[1] : '02F';
                const room = floor;
                
                const area = parseFloat(row[2]) || 0;
                const monthlyFeePart = parseFloat(row[3]) || 0;
                const feeParts = CommunityFeeCalculator.calculateProprietorFees({
                  feeType: 'fixed',
                  feeRate: monthlyFeePart,
                  parkingFee: 0
                });

                const newProp = {
                  id: propId,
                  building,
                  floor,
                  room,
                  name: String(name).trim(),
                  phone: '0900-000000',
                  area,
                  parking: '無',
                  feeType: 'fixed',
                  feeRate: feeParts.managementFee,
                  parkingFee: 0,
                  managementFee: feeParts.managementFee,
                  maintenanceFee: feeParts.maintenanceFee,
                  monthlyFee: feeParts.monthlyFee
                };
                
                self.db.proprietors.push(newProp);
                propCodeMap[codeStr] = propId;
                newProprietorsCount++;
              }

              // 尋找此住戶對應的資料
              const pData = self.db.proprietors.find(p => p.id === propId);
              const remark = row[5] || '';

              // 處理 1 ~ 12 月繳費狀態
              months.forEach(m => {
                const amtVal = parseFloat(row[m.col]) || 0;
                const statusVal = row[m.col + 1] ? String(row[m.col + 1]).trim() : '';

                const isPaid = statusVal === '已繳';
                const isFree = statusVal === '無需繳費';

                if (isPaid || isFree) {
                  const feeMonth = `${yearStr}-${m.monthStr}`;
                  const vKey = `${propId}_${feeMonth}`;
                  
                  // 去重：若已繳傳票已存在，則跳過
                  if (voucherMap[vKey]) {
                    return;
                  }

                  const voucherNo = self.generateIncomeVoucherNo(`${yearStr}-${m.monthStr}-01`);
                  const day = String((nextPropIdNum * 7 + parseInt(m.monthStr) * 3) % 25 + 1).padStart(2, '0');
                  const date = `${yearStr}-${m.monthStr}-${day}`;
                  const amt = isPaid ? amtVal : 0;
                  const maintenanceFee = amt > 0 ? Math.min(pData.maintenanceFee || 0, amt) : 0;
                  const managementFee = Math.max(0, amt - maintenanceFee);
                  const summary = isFree 
                    ? `${pData.floor} 管理費收繳 - 年繳預繳核銷`
                    : `${pData.floor} 管理費收繳 - ${remark || '繳款人: ' + pData.name}`;

                  self.db.vouchers.push({
                    id: `inc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    voucherNo,
                    type: 'income',
                    date,
                    vendorId: '',
                    vendorName: `${pData.name} (管理費)`,
                    category: '管理費收入',
                    amount: amt,
                    managementFee,
                    maintenanceFee,
                    summary,
                    paymentMethod: 'transfer',
                    bankInfo: isFree ? '年繳預繳核銷' : '電匯存入',
                    fixedType: 'fixed',
                    handler: '張總幹事',
                    approver: '李財務委員',
                    owner: '',
                    receiptNo: `RC-${voucherNo.substring(1)}`,
                    proprietorId: propId,
                    feeMonth
                  });

                  voucherMap[vKey] = true;
                  newVouchersCount++;
                }
              });
            }
          });
        }

        // 解析兩個工作表
        parseYearSheet('114年度', '114', '2025');
        parseYearSheet('115年度', '115', '2026');

        if (newProprietorsCount > 0 || newVouchersCount > 0) {
          self.saveToStorage();
          self.renderAll();
          alert(`🎉 繳費歷史匯入成功！\n\n新登記住戶：${newProprietorsCount} 戶\n新匯入已繳/預繳傳票：${newVouchersCount} 筆\n\n您現在可在「區權人及管理費」面板中，查核 114 年與 115 年各月份的住戶收繳明細！`);
        } else {
          alert('資訊：未發現新的住戶或繳費紀錄 (Excel 資料與本機資料庫已完全一致，未重複匯入)。');
        }

      } catch (err) {
        console.error('解析繳費歷史 Excel 失敗:', err);
        alert(`匯入失敗，解析 Excel 檔案出錯：${err.message}`);
      }
    };
    if (e.target.files.length > 0) {
      fileReader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  // ==========================================================================
  // 15. Supabase 雲端同步與登入控制邏輯
  // ==========================================================================
  
  // 初始化 Supabase 客戶端
  initSupabase() {
    const supabaseUrl = 'https://pzwanclaupjxdralmopt.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6d2FuY2xhdXBqeGRyYWxtb3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODc2MzMsImV4cCI6MjA5ODQ2MzYzM30.DSW0XC-ACH-QzgaW9kAva1ujfBQtuw6SaWgE3velRd0';
    
    try {
      if (window.supabase) {
        this.supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
      }
    } catch (err) {
      console.error('Supabase SDK 初始化失敗:', err);
    }
  }

  // 檢查登入狀態與模式
  checkLoginStatus() {
    const loggedIn = localStorage.getItem('comm_supabase_logged_in');
    const isOffline = localStorage.getItem('comm_offline_mode');

    if (isOffline === 'true') {
      this.setSyncStatus('offline', '單機離線模式');
      this.loginOverlay.classList.add('hidden');
      return;
    }

    if (loggedIn === 'true') {
      this.setSyncStatus('online', '雲端連線中...');
      this.loginOverlay.classList.add('hidden');
      this.loadDataFromCloud();
    } else {
      this.setSyncStatus('offline', '未登入雲端');
      this.loginOverlay.classList.remove('hidden');
    }
  }

  // 設定狀態燈號 UI
  setSyncStatus(mode, text) {
    this.syncMode = mode;
    if (!this.syncStatusBadge) return;

    this.syncStatusBadge.className = 'sync-status-badge ' + mode;
    const textEl = this.syncStatusBadge.querySelector('.sync-text');
    if (textEl) textEl.textContent = text;

    if (mode === 'online') {
      this.btnLogout.style.display = 'inline-flex';
    } else {
      this.btnLogout.style.display = 'none';
    }
    
    // 如果有 Lucide，重繪圖標以防載出未生成
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // 登入驗證
  async handleCloudLogin(username, password) {
    this.loginErrorMsg.style.display = 'none';
    
    if (!this.supabase) {
      alert('Supabase 客戶端未載入，請確認網路連線或使用離線模式！');
      return;
    }

    try {
      this.setSyncStatus('loading', '連線驗證中...');
      
      const { data, error } = await this.supabase
        .from('community_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        throw new Error('帳號不存在！');
      }

      if (data.password !== password) {
        throw new Error('密碼錯誤！');
      }

      // 登入成功！
      localStorage.setItem('comm_supabase_logged_in', 'true');
      localStorage.removeItem('comm_offline_mode');
      this.loginOverlay.classList.add('hidden');
      
      this.setSyncStatus('online', '載入雲端資料...');
      await this.loadDataFromCloud();
      
      alert('雲端資料庫同步成功！');
    } catch (err) {
      console.error('登入失敗:', err);
      this.setSyncStatus('offline', '未登入雲端');
      this.loginErrorMsg.textContent = `登入失敗：${err.message}`;
      this.loginErrorMsg.style.display = 'block';
    }
  }

  // 載入雲端資料
  async loadDataFromCloud() {
    if (!this.supabase) return;

    try {
      const { data, error } = await this.supabase
        .from('community_db')
        .select('*')
        .eq('id', 'default_db')
        .single();

      if (error) throw error;

      if (data) {
        const hasCloudData = (data.vouchers && data.vouchers.length > 0) || (data.proprietors && data.proprietors.length > 0);
        
        if (hasCloudData) {
          console.log('自雲端載入資料庫成功，正更新本地快取...');
          this.db.vendors = data.vendors || [];
          this.db.vouchers = data.vouchers || [];
          this.db.pettyCash = data.petty_cash || [];
          this.db.importHistory = data.import_history || [];
          this.db.proprietors = data.proprietors || [];
          
          localStorage.setItem('comm_vendors', JSON.stringify(this.db.vendors));
          localStorage.setItem('comm_vouchers', JSON.stringify(this.db.vouchers));
          localStorage.setItem('comm_petty_cash', JSON.stringify(this.db.pettyCash));
          localStorage.setItem('comm_import_history', JSON.stringify(this.db.importHistory));
          localStorage.setItem('comm_proprietors', JSON.stringify(this.db.proprietors));
        } else {
          console.log('雲端資料為空，正在將本地歷史資料同步至雲端...');
          await this.saveToCloud();
        }

        this.setSyncStatus('online', '雲端已同步');
        this.renderAll();
      }
    } catch (err) {
      console.error('自雲端載入資料失敗:', err);
      this.setSyncStatus('offline', '單機暫存模式');
    }
  }

  // 將本地資料推送同步到雲端
  async saveToCloud() {
    if (this.syncMode !== 'online' || !this.supabase) return;

    try {
      const { error } = await this.supabase
        .from('community_db')
        .upsert({
          id: 'default_db',
          vendors: this.db.vendors,
          vouchers: this.db.vouchers,
          petty_cash: this.db.pettyCash,
          import_history: this.db.importHistory,
          proprietors: this.db.proprietors,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      console.log('雲端資料同步完成！');
      this.setSyncStatus('online', '雲端已同步');
    } catch (err) {
      console.error('資料同步到雲端失敗:', err);
      this.setSyncStatus('offline', '同步失敗');
    }
  }

  // 安全登出並清除狀態
  handleLogout() {
    if (confirm('確定要登出並切換模式嗎？')) {
      localStorage.removeItem('comm_supabase_logged_in');
      localStorage.removeItem('comm_offline_mode');
      this.loginOverlay.classList.remove('hidden');
      this.setSyncStatus('offline', '未登入雲端');
    }
  }
}
