import { REMOTE_STATIC } from "@/utils/constant";

export type TourConfig = {
  name: string;
  scale: number;
  icon: string;
  data: {
    name: string;
    latitude: string;
    longitude: string;
  }[];
}[];

export const TOUR_CONFIG: TourConfig = [
  {
    name: "景点",
    scale: 16,
    icon: REMOTE_STATIC + "map/jd.png",
    data: [
      { name: "图书馆(原花海)", latitude: "36.0033064857", longitude: "120.1241040230" },
      { name: "若水园", latitude: "36.0045606558", longitude: "120.1292592287" },
      { name: "砚湖", latitude: "36.0056542411", longitude: "120.1208209991" },
      { name: "名人园", latitude: "36.0029245891", longitude: "120.1209497452" },
      { name: "晨读园", latitude: "36.0030113839", longitude: "120.1213735342" },
      { name: "励志坊", latitude: "36.0036666819", longitude: "120.1271188259" },
      { name: "风雨操场", latitude: "36.0060404640", longitude: "120.1259493828" },
      { name: "高地操场", latitude: "36.0029419481", longitude: "120.1171034575" },
      { name: "体育馆", latitude: "36.0076330712", longitude: "120.1260298491" },
      { name: "图书馆", latitude: "36.0015575578", longitude: "120.1206439734" },
      { name: "大学生活动中心", latitude: "36.0061489533", longitude: "120.1236641407" },
    ],
  },
  {
    name: "教学楼",
    scale: 16,
    icon: REMOTE_STATIC + "map/jxl.png",
    data: [
      { name: "J1教学楼", latitude: "36.0021087129", longitude: "120.1241737604" },
      { name: "J2材料学院、化工学院", latitude: "36.0009890393", longitude: "120.1236695051" },
      { name: "J3外国语学院", latitude: "36.0012400000", longitude: "120.1255000000" },
      { name: "J4矿业学院", latitude: "35.9992140203", longitude: "120.1220709085" },
      { name: "J5教学楼", latitude: "36.0012090000", longitude: "120.1274370000" },
      {
        name: "J6经管学院、地质学院、测绘学院",
        latitude: "36.0006700000",
        longitude: "120.1222300000",
      },
      { name: "J7教学楼", latitude: "36.0017528494", longitude: "120.1272636652" },
      { name: "J8机电学院楼", latitude: "35.9991923206", longitude: "120.1209443808" },
      {
        name: "J9艺术学院、数学学院、海洋研究院、马克思学院、文法学院、交通学院",
        latitude: "36.0013360000",
        longitude: "120.1284020000",
      },
      { name: "J11自动化学院、电信学院", latitude: "36.0022085280", longitude: "120.1285403967" },
      { name: "J13计算机学院", latitude: "36.0013709453", longitude: "120.1294845343" },
      { name: "J14教学楼", latitude: "36.0016877523", longitude: "120.1220548153" },
      { name: "J15土建学院、体育学院", latitude: "36.0024341965", longitude: "120.1294952631" },
      { name: "S1实验楼", latitude: "36.0035581892", longitude: "120.1286637783" },
      {
        name: "S2实验楼(海岛(礁)测绘技术国家测绘地理信息局重点实验室)",
        latitude: "35.9998693499",
        longitude: "120.1222103834",
      },
      { name: "S3实验楼", latitude: "35.9994179977", longitude: "120.1209121943" },
    ],
  },
  {
    scale: 16,
    name: "校门",
    icon: REMOTE_STATIC + "map/xm.png",
    data: [
      { name: "南门", latitude: "35.9994400000", longitude: "120.1248500000" },
      { name: "北门", latitude: "36.0078000000", longitude: "120.1231300000" },
    ],
  },
  {
    scale: 16,
    name: "餐厅超市",
    icon: REMOTE_STATIC + "map/st.png",
    data: [
      { name: "B区学海餐厅", latitude: "36.0056151847", longitude: "120.1292538643" },
      { name: "A区学苑餐厅", latitude: "36.0047776382", longitude: "120.1237553358" },
      { name: "C区学者餐厅", latitude: "36.0038966859", longitude: "120.1189273596" },
      { name: "C区维客购物广场", latitude: "36.0044912213", longitude: "120.1197910309" },
      { name: "A区科大超市", latitude: "36.0049382048", longitude: "120.1233637333" },
      { name: "田园超市", latitude: "36.0071470473", longitude: "120.1225054264" },
    ],
  },
  {
    name: "宿舍楼",
    scale: 16,
    icon: REMOTE_STATIC + "map/ss.png",
    data: [
      { name: "B1-3", latitude: "36.0058408434", longitude: "120.1300799847" },
      { name: "B2-4", latitude: "36.0055240532", longitude: "120.1283580065" },
      { name: "B6", latitude: "36.0060578223", longitude: "120.1274245977" },
      { name: "B8-10", latitude: "36.0068562995", longitude: "120.1272529364" },
      { name: "B12-14", latitude: "36.0076243922", longitude: "120.1270866394" },
      { name: "A1-3", latitude: "36.0051768843", longitude: "120.1247799397" },
      { name: "A6-8", latitude: "36.0055934867", longitude: "120.1224088669" },
      { name: "A2-4", latitude: "36.0048123553", longitude: "120.1226073503" },
      { name: "A5-7", latitude: "36.0059797100", longitude: "120.1246297359" },
      { name: "A10", latitude: "36.0055717888", longitude: "120.1227843761" },
      { name: "A11", latitude: "36.0061098972", longitude: "120.1242434978" },
      { name: "A13-15", latitude: "36.0067434717", longitude: "120.1244151592" },
      { name: "A17", latitude: "36.0074638311", longitude: "120.1247155666" },
      { name: "A19-21", latitude: "36.0067478112", longitude: "120.1240396500" },
      { name: "A18-20", latitude: "36.0064917783", longitude: "120.1225644350" },
      { name: "A12", latitude: "36.0058929184", longitude: "120.1227092743" },
      { name: "A14-A16", latitude: "36.0064180060", longitude: "120.1222372055" },
      { name: "C1-3", latitude: "36.0050163182", longitude: "120.1193726063" },
      { name: "C2-4", latitude: "36.0038532889", longitude: "120.1178598404" },
      { name: "C6-8", latitude: "36.0048514121", longitude: "120.1175057888" },
      { name: "C10", latitude: "36.0054763175", longitude: "120.1175594330" },
      { name: "C12", latitude: "36.0059232955", longitude: "120.1176452637" },
      { name: "C14", latitude: "36.0063789500", longitude: "120.1175969839" },
      { name: "C11", latitude: "36.0052636766", longitude: "120.1189273596" },
      { name: "C16-18", latitude: "36.0050640541", longitude: "120.1179671288" },
      { name: "C5-7-9", latitude: "36.0061619720", longitude: "120.1188737154" },
      { name: "C13", latitude: "36.0055934867", longitude: "120.1185089350" },
      { name: "C15", latitude: "36.0060317849", longitude: "120.1182353497" },
      { name: "C17", latitude: "36.0064961179", longitude: "120.1182407141" },
    ],
  },
  {
    scale: 16,
    name: "生活",
    icon: REMOTE_STATIC + "map/jd.png",
    data: [
      { name: "钟楼广场", latitude: "36.0040529146", longitude: "120.1196086407" },
      { name: "尤洛卡广场", latitude: "36.0071774239", longitude: "120.1231759787" },
      { name: "繁星广场", latitude: "36.0057366933", longitude: "120.1235622168" },
      { name: "泰山广场", latitude: "36.0005463733", longitude: "120.1247155666" },
      { name: "C区篮球场", latitude: "36.0044825420", longitude: "120.1215666533" },
      { name: "B区篮球场", latitude: "36.0070168619", longitude: "120.1254183054" },
      { name: "校医院", latitude: "36.0028030762", longitude: "120.1184928417" },
      { name: "校友会", latitude: "36.0069387505", longitude: "120.1220011711" },
      { name: "水卡办卡充值处C3", latitude: "36.0051031107", longitude: "120.1193296909" },
      { name: "行政楼", latitude: "35.9998606700", longitude: "120.1234602928" },
    ],
  },
];
