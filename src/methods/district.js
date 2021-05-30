import _ from 'lodash';

export const cityMap = {
  "基隆市": {
    "label": "基隆市",
    "code": "10017",
    "longitude": 121.7081,
    "latitude": 25.10898
  },
  "臺北市": {
    "label": "臺北市",
    "code": "63000",
    "longitude": 121.5598,
    "latitude": 25.09108
  },
  "新北市": {
    "label": "新北市",
    "code": "65000",
    "longitude": 121.6739,
    "latitude": 24.91571
  },
  "桃園市": {
    "label": "桃園市",
    "code": "68000",
    "longitude": 121.2168,
    "latitude": 24.93759
  },
  "新竹縣": {
    "label": "新竹縣",
    "code": "10004",
    "longitude": 121.1252,
    "latitude": 24.70328
  },
  "新竹市": {
    "label": "新竹市",
    "code": "10018",
    "longitude": 120.9647,
    "latitude": 24.80395
  },
  "苗栗縣": {
    "label": "苗栗縣",
    "code": "10005",
    "longitude": 120.9417,
    "latitude": 24.48927
  },
  "臺中市": {
    "label": "臺中市",
    "code": "66000",
    "longitude": 120.9417,
    "latitude": 24.23321
  },
  "彰化縣": {
    "label": "彰化縣",
    "code": "10007",
    "longitude": 120.4818,
    "latitude": 23.99297
  },
  "南投縣": {
    "label": "南投縣",
    "code": "10008",
    "longitude": 120.9876,
    "latitude": 23.83876
  },
  "雲林縣": {
    "label": "雲林縣",
    "code": "10009",
    "longitude": 120.3897,
    "latitude": 23.75585
  },
  "嘉義市": {
    "label": "嘉義市",
    "code": "10020",
    "longitude": 120.4473,
    "latitude": 23.47545
  },
  "嘉義縣": {
    "label": "嘉義縣",
    "code": "10010",
    "longitude": 120.574,
    "latitude": 23.45889
  },
  "臺南市": {
    "label": "臺南市",
    "code": "67000",
    "longitude": 120.2513,
    "latitude": 23.1417
  },
  "宜蘭縣": {
    "label": "宜蘭縣",
    "code": "10002",
    "longitude": 121.7195,
    "latitude": 24.69295
  },
  "花蓮縣": {
    "label": "花蓮縣",
    "code": "10015",
    "longitude": 121.3542,
    "latitude": 23.7569
  },
  "臺東縣": {
    "label": "臺東縣",
    "code": "10014",
    "longitude": 120.9876,
    "latitude": 22.98461
  },
  "高雄市": {
    "label": "高雄市",
    "code": "64000",
    "longitude": 120.666,
    "latitude": 23.01087
  },
  "屏東縣": {
    "label": "屏東縣",
    "code": "10013",
    "longitude": 120.62,
    "latitude": 22.54951
  },
  "澎湖縣": {
    "label": "澎湖縣",
    "code": "10016",
    "longitude": 119.6151,
    "latitude": 23.56548
  },
  "連江縣": {
    "label": "連江縣",
    "code": "09007",
    "longitude": 119.5397,
    "latitude": 26.19737
  },
  "金門縣": {
    "label": "金門縣",
    "code": "09020",
    "longitude": 118.3186,
    "latitude": 24.43679
  },
}

const distMap = {
  "連江縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "09007",
      "longitude": 119.5397,
      "latitude": 26.19737
    },
    "南竿鄉": {
      "label": "南竿鄉",
      "longitude": 119.931128,
      "latitude": 26.154321,
      "code": "09007010"
    },
    "北竿鄉": {
      "label": "北竿鄉",
      "longitude": 119.994251,
      "latitude": 26.225637,
      "code": "09007020"
    },
    "莒光鄉": {
      "label": "莒光鄉",
      "longitude": 119.938877,
      "latitude": 25.97298,
      "code": "09007030"
    },
    "東引鄉": {
      "label": "東引鄉",
      "longitude": 120.4903,
      "latitude": 26.366101,
      "code": "09007040"
    }
  },
  "金門縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "09020",
      "longitude": 118.3186,
      "latitude": 24.43679
    },
    "金城鎮": {
      "label": "金城鎮",
      "longitude": 118.30128,
      "latitude": 24.38402,
      "code": "09020010"
    },
    "金沙鎮": {
      "label": "金沙鎮",
      "longitude": 118.40841,
      "latitude": 24.45865,
      "code": "09020020"
    },
    "金湖鎮": {
      "label": "金湖鎮",
      "longitude": 118.40373,
      "latitude": 24.41496,
      "code": "09020030"
    },
    "金寧鄉": {
      "label": "金寧鄉",
      "longitude": 118.31705,
      "latitude": 24.42482,
      "code": "09020040"
    },
    "烈嶼鄉": {
      "label": "烈嶼鄉",
      "longitude": 118.22789,
      "latitude": 24.40166,
      "code": "09020050"
    },
    "烏坵鄉": {
      "label": "烏坵鄉",
      "longitude": 119.452738,
      "latitude": 24.992338,
      "code": "09020060"
    }
  },
  "澎湖縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10016",
      "longitude": 119.6151,
      "latitude": 23.56548
    },
    "馬公市": {
      "label": "馬公市",
      "longitude": 119.59234,
      "latitude": 23.55534,
      "code": "10016010"
    },
    "湖西鄉": {
      "label": "湖西鄉",
      "longitude": 119.64462,
      "latitude": 23.57364,
      "code": "10016020"
    },
    "白沙鄉": {
      "label": "白沙鄉",
      "longitude": 119.59251,
      "latitude": 23.64178,
      "code": "10016030"
    },
    "西嶼鄉": {
      "label": "西嶼鄉",
      "longitude": 119.50783,
      "latitude": 23.59975,
      "code": "10016040"
    },
    "望安鄉": {
      "label": "望安鄉",
      "longitude": 119.50406,
      "latitude": 23.36904,
      "code": "10016050"
    },
    "七美鄉": {
      "label": "七美鄉",
      "longitude": 119.43393,
      "latitude": 23.20108,
      "code": "10016060"
    }
  },
  "宜蘭縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10002",
      "longitude": 121.7195,
      "latitude": 24.69295
    },
    "羅東鎮": {
      "label": "羅東鎮",
      "longitude": 121.7701782,
      "latitude": 24.67884824,
      "code": "10002020"
    },
    "蘇澳鎮": {
      "label": "蘇澳鎮",
      "longitude": 121.8346892,
      "latitude": 24.55467058,
      "code": "10002030"
    },
    "頭城鎮": {
      "label": "頭城鎮",
      "longitude": 121.845797,
      "latitude": 24.90075882,
      "code": "10002040"
    },
    "礁溪鄉": {
      "label": "礁溪鄉",
      "longitude": 121.7346606,
      "latitude": 24.81144192,
      "code": "10002050"
    },
    "壯圍鄉": {
      "label": "壯圍鄉",
      "longitude": 121.8017622,
      "latitude": 24.75183042,
      "code": "10002060"
    },
    "員山鄉": {
      "label": "員山鄉",
      "longitude": 121.6612282,
      "latitude": 24.74199237,
      "code": "10002070"
    },
    "冬山鄉": {
      "label": "冬山鄉",
      "longitude": 121.760255,
      "latitude": 24.64214986,
      "code": "10002080"
    },
    "五結鄉": {
      "label": "五結鄉",
      "longitude": 121.8058342,
      "latitude": 24.68887343,
      "code": "10002090"
    },
    "三星鄉": {
      "label": "三星鄉",
      "longitude": 121.6642714,
      "latitude": 24.66771972,
      "code": "10002100"
    },
    "大同鄉": {
      "label": "大同鄉",
      "longitude": 121.5040369,
      "latitude": 24.55152082,
      "code": "10002110"
    },
    "南澳鄉": {
      "label": "南澳鄉",
      "longitude": 121.6560593,
      "latitude": 24.44864058,
      "code": "10002120"
    }
  },
  "新竹縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10004",
      "longitude": 121.1252,
      "latitude": 24.70328
    },
    "竹北市": {
      "label": "竹北市",
      "longitude": 120.9948704,
      "latitude": 24.83816209,
      "code": "10004010"
    },
    "竹東鎮": {
      "label": "竹東鎮",
      "longitude": 121.0753632,
      "latitude": 24.73075802,
      "code": "10004020"
    },
    "新埔鎮": {
      "label": "新埔鎮",
      "longitude": 121.0939886,
      "latitude": 24.84133959,
      "code": "10004030"
    },
    "關西鎮": {
      "label": "關西鎮",
      "longitude": 121.1866221,
      "latitude": 24.78514681,
      "code": "10004040"
    },
    "湖口鄉": {
      "label": "湖口鄉",
      "longitude": 121.0517242,
      "latitude": 24.88566341,
      "code": "10004050"
    },
    "新豐鄉": {
      "label": "新豐鄉",
      "longitude": 120.9956033,
      "latitude": 24.90731298,
      "code": "10004060"
    },
    "芎林鄉": {
      "label": "芎林鄉",
      "longitude": 121.1046394,
      "latitude": 24.7657116,
      "code": "10004070"
    },
    "橫山鄉": {
      "label": "橫山鄉",
      "longitude": 121.1469732,
      "latitude": 24.7078092,
      "code": "10004080"
    },
    "北埔鄉": {
      "label": "北埔鄉",
      "longitude": 121.0642745,
      "latitude": 24.67207405,
      "code": "10004090"
    },
    "寶山鄉": {
      "label": "寶山鄉",
      "longitude": 120.9991605,
      "latitude": 24.73697351,
      "code": "10004100"
    },
    "峨眉鄉": {
      "label": "峨眉鄉",
      "longitude": 121.0110809,
      "latitude": 24.67811197,
      "code": "10004110"
    },
    "尖石鄉": {
      "label": "尖石鄉",
      "longitude": 121.2819341,
      "latitude": 24.59493235,
      "code": "10004120"
    },
    "五峰鄉": {
      "label": "五峰鄉",
      "longitude": 121.1389495,
      "latitude": 24.578054,
      "code": "10004130"
    }
  },
  "彰化縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10007",
      "longitude": 120.4818,
      "latitude": 23.99297
    },
    "彰化市": {
      "label": "彰化市",
      "longitude": 120.5694208,
      "latitude": 24.07532909,
      "code": "10007010"
    },
    "鹿港鎮": {
      "label": "鹿港鎮",
      "longitude": 120.4385491,
      "latitude": 24.08286685,
      "code": "10007020"
    },
    "和美鎮": {
      "label": "和美鎮",
      "longitude": 120.5112045,
      "latitude": 24.11379535,
      "code": "10007030"
    },
    "線西鄉": {
      "label": "線西鄉",
      "longitude": 120.452157,
      "latitude": 24.13158127,
      "code": "10007040"
    },
    "伸港鄉": {
      "label": "伸港鄉",
      "longitude": 120.486449,
      "latitude": 24.16367107,
      "code": "10007050"
    },
    "福興鄉": {
      "label": "福興鄉",
      "longitude": 120.4310511,
      "latitude": 24.03021674,
      "code": "10007060"
    },
    "秀水鄉": {
      "label": "秀水鄉",
      "longitude": 120.5041184,
      "latitude": 24.03249405,
      "code": "10007070"
    },
    "花壇鄉": {
      "label": "花壇鄉",
      "longitude": 120.5597655,
      "latitude": 24.03006875,
      "code": "10007080"
    },
    "芬園鄉": {
      "label": "芬園鄉",
      "longitude": 120.6294414,
      "latitude": 24.00628794,
      "code": "10007090"
    },
    "員林市": {
      "label": "員林市",
      "longitude": 120.593073,
      "latitude": 23.95650448,
      "code": "10007100"
    },
    "溪湖鎮": {
      "label": "溪湖鎮",
      "longitude": 120.4831739,
      "latitude": 23.95171456,
      "code": "10007110"
    },
    "田中鎮": {
      "label": "田中鎮",
      "longitude": 120.5903471,
      "latitude": 23.85723872,
      "code": "10007120"
    },
    "大村鄉": {
      "label": "大村鄉",
      "longitude": 120.5586866,
      "latitude": 23.99209206,
      "code": "10007130"
    },
    "埔鹽鄉": {
      "label": "埔鹽鄉",
      "longitude": 120.4594626,
      "latitude": 23.99204417,
      "code": "10007140"
    },
    "埔心鄉": {
      "label": "埔心鄉",
      "longitude": 120.5342802,
      "latitude": 23.95277521,
      "code": "10007150"
    },
    "永靖鄉": {
      "label": "永靖鄉",
      "longitude": 120.5416032,
      "latitude": 23.92139507,
      "code": "10007160"
    },
    "社頭鄉": {
      "label": "社頭鄉",
      "longitude": 120.6021661,
      "latitude": 23.90536413,
      "code": "10007170"
    },
    "二水鄉": {
      "label": "二水鄉",
      "longitude": 120.628589,
      "latitude": 23.8092402,
      "code": "10007180"
    },
    "北斗鎮": {
      "label": "北斗鎮",
      "longitude": 120.5331566,
      "latitude": 23.867574,
      "code": "10007190"
    },
    "二林鎮": {
      "label": "二林鎮",
      "longitude": 120.404225,
      "latitude": 23.91621405,
      "code": "10007200"
    },
    "田尾鄉": {
      "label": "田尾鄉",
      "longitude": 120.5223244,
      "latitude": 23.90056065,
      "code": "10007210"
    },
    "埤頭鄉": {
      "label": "埤頭鄉",
      "longitude": 120.4675642,
      "latitude": 23.88234118,
      "code": "10007220"
    },
    "芳苑鄉": {
      "label": "芳苑鄉",
      "longitude": 120.3539226,
      "latitude": 23.9537906,
      "code": "10007230"
    },
    "大城鄉": {
      "label": "大城鄉",
      "longitude": 120.3113284,
      "latitude": 23.85069276,
      "code": "10007240"
    },
    "竹塘鄉": {
      "label": "竹塘鄉",
      "longitude": 120.4136645,
      "latitude": 23.8505872,
      "code": "10007250"
    },
    "溪州鄉": {
      "label": "溪州鄉",
      "longitude": 120.5224904,
      "latitude": 23.82725185,
      "code": "10007260"
    }
  },
  "屏東縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10013",
      "longitude": 120.62,
      "latitude": 22.54951
    },
    "屏東市": {
      "label": "屏東市",
      "longitude": 120.4799948,
      "latitude": 22.6647375,
      "code": "10013010"
    },
    "潮州鎮": {
      "label": "潮州鎮",
      "longitude": 120.5568063,
      "latitude": 22.53642947,
      "code": "10013020"
    },
    "東港鎮": {
      "label": "東港鎮",
      "longitude": 120.4751333,
      "latitude": 22.46265635,
      "code": "10013030"
    },
    "恆春鎮": {
      "label": "恆春鎮",
      "longitude": 120.7632537,
      "latitude": 21.98531645,
      "code": "10013040"
    },
    "萬丹鄉": {
      "label": "萬丹鄉",
      "longitude": 120.4766188,
      "latitude": 22.58849547,
      "code": "10013050"
    },
    "長治鄉": {
      "label": "長治鄉",
      "longitude": 120.555979,
      "latitude": 22.69454952,
      "code": "10013060"
    },
    "麟洛鄉": {
      "label": "麟洛鄉",
      "longitude": 120.5299693,
      "latitude": 22.64876367,
      "code": "10013070"
    },
    "九如鄉": {
      "label": "九如鄉",
      "longitude": 120.4845044,
      "latitude": 22.7316677,
      "code": "10013080"
    },
    "里港鄉": {
      "label": "里港鄉",
      "longitude": 120.5061276,
      "latitude": 22.79854831,
      "code": "10013090"
    },
    "鹽埔鄉": {
      "label": "鹽埔鄉",
      "longitude": 120.5693941,
      "latitude": 22.74253636,
      "code": "10013100"
    },
    "高樹鄉": {
      "label": "高樹鄉",
      "longitude": 120.6017678,
      "latitude": 22.80992022,
      "code": "10013110"
    },
    "萬巒鄉": {
      "label": "萬巒鄉",
      "longitude": 120.601817,
      "latitude": 22.58233459,
      "code": "10013120"
    },
    "內埔鄉": {
      "label": "內埔鄉",
      "longitude": 120.5888222,
      "latitude": 22.65116933,
      "code": "10013130"
    },
    "竹田鄉": {
      "label": "竹田鄉",
      "longitude": 120.5266379,
      "latitude": 22.58855636,
      "code": "10013140"
    },
    "新埤鄉": {
      "label": "新埤鄉",
      "longitude": 120.5846257,
      "latitude": 22.48676279,
      "code": "10013150"
    },
    "枋寮鄉": {
      "label": "枋寮鄉",
      "longitude": 120.5975845,
      "latitude": 22.40334199,
      "code": "10013160"
    },
    "新園鄉": {
      "label": "新園鄉",
      "longitude": 120.4501429,
      "latitude": 22.5171903,
      "code": "10013170"
    },
    "崁頂鄉": {
      "label": "崁頂鄉",
      "longitude": 120.5006598,
      "latitude": 22.51528151,
      "code": "10013180"
    },
    "林邊鄉": {
      "label": "林邊鄉",
      "longitude": 120.5125095,
      "latitude": 22.44142101,
      "code": "10013190"
    },
    "南州鄉": {
      "label": "南州鄉",
      "longitude": 120.5180561,
      "latitude": 22.47980704,
      "code": "10013200"
    },
    "佳冬鄉": {
      "label": "佳冬鄉",
      "longitude": 120.5476124,
      "latitude": 22.42980624,
      "code": "10013210"
    },
    "琉球鄉": {
      "label": "琉球鄉",
      "longitude": 120.3710466,
      "latitude": 22.34000278,
      "code": "10013220"
    },
    "車城鄉": {
      "label": "車城鄉",
      "longitude": 120.7432633,
      "latitude": 22.07915617,
      "code": "10013230"
    },
    "滿州鄉": {
      "label": "滿州鄉",
      "longitude": 120.8435675,
      "latitude": 22.04930015,
      "code": "10013240"
    },
    "枋山鄉": {
      "label": "枋山鄉",
      "longitude": 120.6567673,
      "latitude": 22.27086962,
      "code": "10013250"
    },
    "三地門鄉": {
      "label": "三地門鄉",
      "longitude": 120.6865219,
      "latitude": 22.79786847,
      "code": "10013260"
    },
    "霧臺鄉": {
      "label": "霧臺鄉",
      "longitude": 120.8008099,
      "latitude": 22.75990478,
      "code": "10013270"
    },
    "瑪家鄉": {
      "label": "瑪家鄉",
      "longitude": 120.6799239,
      "latitude": 22.67107764,
      "code": "10013280"
    },
    "泰武鄉": {
      "label": "泰武鄉",
      "longitude": 120.6917929,
      "latitude": 22.60408477,
      "code": "10013290"
    },
    "來義鄉": {
      "label": "來義鄉",
      "longitude": 120.6857232,
      "latitude": 22.50157206,
      "code": "10013300"
    },
    "春日鄉": {
      "label": "春日鄉",
      "longitude": 120.6975799,
      "latitude": 22.40399754,
      "code": "10013310"
    },
    "獅子鄉": {
      "label": "獅子鄉",
      "longitude": 120.7356454,
      "latitude": 22.26084921,
      "code": "10013320"
    },
    "牡丹鄉": {
      "label": "牡丹鄉",
      "longitude": 120.8173609,
      "latitude": 22.15552859,
      "code": "10013330"
    }
  },
  "臺東縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10014",
      "longitude": 120.9876,
      "latitude": 22.98461
    },
    "臺東市": {
      "label": "臺東市",
      "longitude": 121.1103647,
      "latitude": 22.75165721,
      "code": "10014010"
    },
    "成功鎮": {
      "label": "成功鎮",
      "longitude": 121.3537983,
      "latitude": 23.12663716,
      "code": "10014020"
    },
    "關山鎮": {
      "label": "關山鎮",
      "longitude": 121.1766197,
      "latitude": 23.03780684,
      "code": "10014030"
    },
    "卑南鄉": {
      "label": "卑南鄉",
      "longitude": 121.0015521,
      "latitude": 22.76494453,
      "code": "10014040"
    },
    "鹿野鄉": {
      "label": "鹿野鄉",
      "longitude": 121.1560376,
      "latitude": 22.95125666,
      "code": "10014050"
    },
    "池上鄉": {
      "label": "池上鄉",
      "longitude": 121.2184501,
      "latitude": 23.09248714,
      "code": "10014060"
    },
    "東河鄉": {
      "label": "東河鄉",
      "longitude": 121.2517917,
      "latitude": 22.98006921,
      "code": "10014070"
    },
    "長濱鄉": {
      "label": "長濱鄉",
      "longitude": 121.4261725,
      "latitude": 23.33476899,
      "code": "10014080"
    },
    "太麻里鄉": {
      "label": "太麻里鄉",
      "longitude": 120.9797643,
      "latitude": 22.59098082,
      "code": "10014090"
    },
    "大武鄉": {
      "label": "大武鄉",
      "longitude": 120.8991703,
      "latitude": 22.38359522,
      "code": "10014100"
    },
    "綠島鄉": {
      "label": "綠島鄉",
      "longitude": 121.4901951,
      "latitude": 22.66017537,
      "code": "10014110"
    },
    "海端鄉": {
      "label": "海端鄉",
      "longitude": 121.0175672,
      "latitude": 23.11478528,
      "code": "10014120"
    },
    "延平鄉": {
      "label": "延平鄉",
      "longitude": 120.9831902,
      "latitude": 22.90343174,
      "code": "10014130"
    },
    "金峰鄉": {
      "label": "金峰鄉",
      "longitude": 120.8570384,
      "latitude": 22.58161687,
      "code": "10014140"
    },
    "達仁鄉": {
      "label": "達仁鄉",
      "longitude": 120.8355239,
      "latitude": 22.38430718,
      "code": "10014150"
    },
    "蘭嶼鄉": {
      "label": "蘭嶼鄉",
      "longitude": 121.5508328,
      "latitude": 22.04616835,
      "code": "10014160"
    }
  },
  "花蓮縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10015",
      "longitude": 121.3542,
      "latitude": 23.7569
    },
    "花蓮市": {
      "label": "花蓮市",
      "longitude": 121.6071463,
      "latitude": 23.99700271,
      "code": "10015010"
    },
    "鳳林鎮": {
      "label": "鳳林鎮",
      "longitude": 121.4698848,
      "latitude": 23.74324462,
      "code": "10015020"
    },
    "玉里鎮": {
      "label": "玉里鎮",
      "longitude": 121.3604476,
      "latitude": 23.37143588,
      "code": "10015030"
    },
    "新城鄉": {
      "label": "新城鄉",
      "longitude": 121.6137969,
      "latitude": 24.05579952,
      "code": "10015040"
    },
    "吉安鄉": {
      "label": "吉安鄉",
      "longitude": 121.5646738,
      "latitude": 23.95546585,
      "code": "10015050"
    },
    "壽豐鄉": {
      "label": "壽豐鄉",
      "longitude": 121.5341569,
      "latitude": 23.84459714,
      "code": "10015060"
    },
    "光復鄉": {
      "label": "光復鄉",
      "longitude": 121.4351231,
      "latitude": 23.64658742,
      "code": "10015070"
    },
    "豐濱鄉": {
      "label": "豐濱鄉",
      "longitude": 121.4942331,
      "latitude": 23.58519428,
      "code": "10015080"
    },
    "瑞穗鄉": {
      "label": "瑞穗鄉",
      "longitude": 121.4073472,
      "latitude": 23.5156124,
      "code": "10015090"
    },
    "富里鄉": {
      "label": "富里鄉",
      "longitude": 121.2980494,
      "latitude": 23.19672092,
      "code": "10015100"
    },
    "秀林鄉": {
      "label": "秀林鄉",
      "longitude": 121.4807194,
      "latitude": 24.12374414,
      "code": "10015110"
    },
    "萬榮鄉": {
      "label": "萬榮鄉",
      "longitude": 121.3189531,
      "latitude": 23.72772629,
      "code": "10015120"
    },
    "卓溪鄉": {
      "label": "卓溪鄉",
      "longitude": 121.1804222,
      "latitude": 23.39062875,
      "code": "10015130"
    }
  },
  "高雄市": {
    "全部地區": {
      "label": "全部地區",
      "code": "64000",
      "longitude": 120.666,
      "latitude": 23.01087
    },
    "大樹區": {
      "label": "大樹區",
      "longitude": 120.425407,
      "latitude": 22.71100364,
      "code": "64000150"
    },
    "大社區": {
      "label": "大社區",
      "longitude": 120.3707994,
      "latitude": 22.73983479,
      "code": "64000160"
    },
    "仁武區": {
      "label": "仁武區",
      "longitude": 120.3605265,
      "latitude": 22.70120782,
      "code": "64000170"
    },
    "鳥松區": {
      "label": "鳥松區",
      "longitude": 120.3727783,
      "latitude": 22.66249302,
      "code": "64000180"
    },
    "岡山區": {
      "label": "岡山區",
      "longitude": 120.2978906,
      "latitude": 22.80505886,
      "code": "64000190"
    },
    "橋頭區": {
      "label": "橋頭區",
      "longitude": 120.3006534,
      "latitude": 22.75252398,
      "code": "64000200"
    },
    "燕巢區": {
      "label": "燕巢區",
      "longitude": 120.370799,
      "latitude": 22.78769626,
      "code": "64000210"
    },
    "田寮區": {
      "label": "田寮區",
      "longitude": 120.3959842,
      "latitude": 22.86394307,
      "code": "64000220"
    },
    "阿蓮區": {
      "label": "阿蓮區",
      "longitude": 120.3210967,
      "latitude": 22.87022883,
      "code": "64000230"
    },
    "路竹區": {
      "label": "路竹區",
      "longitude": 120.2659871,
      "latitude": 22.85724171,
      "code": "64000240"
    },
    "湖內區": {
      "label": "湖內區",
      "longitude": 120.2259375,
      "latitude": 22.89324952,
      "code": "64000250"
    },
    "茄萣區": {
      "label": "茄萣區",
      "longitude": 120.1980519,
      "latitude": 22.88241399,
      "code": "64000260"
    },
    "永安區": {
      "label": "永安區",
      "longitude": 120.228051,
      "latitude": 22.82224585,
      "code": "64000270"
    },
    "彌陀區": {
      "label": "彌陀區",
      "longitude": 120.2394571,
      "latitude": 22.77944528,
      "code": "64000280"
    },
    "梓官區": {
      "label": "梓官區",
      "longitude": 120.2593989,
      "latitude": 22.748209,
      "code": "64000290"
    },
    "旗山區": {
      "label": "旗山區",
      "longitude": 120.4754554,
      "latitude": 22.86497033,
      "code": "64000300"
    },
    "美濃區": {
      "label": "美濃區",
      "longitude": 120.5634635,
      "latitude": 22.90005529,
      "code": "64000310"
    },
    "六龜區": {
      "label": "六龜區",
      "longitude": 120.6585635,
      "latitude": 23.01195426,
      "code": "64000320"
    },
    "甲仙區": {
      "label": "甲仙區",
      "longitude": 120.6232895,
      "latitude": 23.11654995,
      "code": "64000330"
    },
    "杉林區": {
      "label": "杉林區",
      "longitude": 120.5621971,
      "latitude": 22.99694681,
      "code": "64000340"
    },
    "內門區": {
      "label": "內門區",
      "longitude": 120.4719272,
      "latitude": 22.95668817,
      "code": "64000350"
    },
    "茂林區": {
      "label": "茂林區",
      "longitude": 120.752384,
      "latitude": 22.91993256,
      "code": "64000360"
    },
    "桃源區": {
      "label": "桃源區",
      "longitude": 120.8523383,
      "latitude": 23.2249459,
      "code": "64000370"
    },
    "那瑪夏區": {
      "label": "那瑪夏區",
      "longitude": 120.741944,
      "latitude": 23.275008,
      "code": "64000380"
    }
  },
  "臺中市": {
    "全部地區": {
      "label": "全部地區",
      "code": "66000",
      "longitude": 120.9417,
      "latitude": 24.23321
    },
    "中區": {
      "label": "中區",
      "longitude": 120.680598,
      "latitude": 24.14168566,
      "code": "66000010"
    },
    "東區": {
      "label": "東區",
      "longitude": 120.6970865,
      "latitude": 24.13733209,
      "code": "66000020"
    },
    "南區": {
      "label": "南區",
      "longitude": 120.6646178,
      "latitude": 24.12114107,
      "code": "66000030"
    },
    "西區": {
      "label": "西區",
      "longitude": 120.6647579,
      "latitude": 24.14391082,
      "code": "66000040"
    },
    "北區": {
      "label": "北區",
      "longitude": 120.6809521,
      "latitude": 24.15863985,
      "code": "66000050"
    },
    "西屯區": {
      "label": "西屯區",
      "longitude": 120.6270131,
      "latitude": 24.18308895,
      "code": "66000060"
    },
    "南屯區": {
      "label": "南屯區",
      "longitude": 120.6177379,
      "latitude": 24.14165524,
      "code": "66000070"
    },
    "北屯區": {
      "label": "北屯區",
      "longitude": 120.7362319,
      "latitude": 24.18400298,
      "code": "66000080"
    },
    "豐原區": {
      "label": "豐原區",
      "longitude": 120.7375715,
      "latitude": 24.24990298,
      "code": "66000090"
    },
    "東勢區": {
      "label": "東勢區",
      "longitude": 120.8401401,
      "latitude": 24.24952637,
      "code": "66000100"
    },
    "大甲區": {
      "label": "大甲區",
      "longitude": 120.6357901,
      "latitude": 24.37827161,
      "code": "66000110"
    },
    "清水區": {
      "label": "清水區",
      "longitude": 120.5809094,
      "latitude": 24.29205743,
      "code": "66000120"
    },
    "沙鹿區": {
      "label": "沙鹿區",
      "longitude": 120.5838628,
      "latitude": 24.23425212,
      "code": "66000130"
    },
    "梧棲區": {
      "label": "梧棲區",
      "longitude": 120.5301259,
      "latitude": 24.24552431,
      "code": "66000140"
    },
    "后里區": {
      "label": "后里區",
      "longitude": 120.7146127,
      "latitude": 24.30962483,
      "code": "66000150"
    },
    "神岡區": {
      "label": "神岡區",
      "longitude": 120.6733321,
      "latitude": 24.26568008,
      "code": "66000160"
    },
    "潭子區": {
      "label": "潭子區",
      "longitude": 120.710997,
      "latitude": 24.21171121,
      "code": "66000170"
    },
    "大雅區": {
      "label": "大雅區",
      "longitude": 120.6411818,
      "latitude": 24.22704181,
      "code": "66000180"
    },
    "新社區": {
      "label": "新社區",
      "longitude": 120.8313228,
      "latitude": 24.17769289,
      "code": "66000190"
    },
    "石岡區": {
      "label": "石岡區",
      "longitude": 120.7903822,
      "latitude": 24.26493299,
      "code": "66000200"
    },
    "外埔區": {
      "label": "外埔區",
      "longitude": 120.6650639,
      "latitude": 24.33551071,
      "code": "66000210"
    },
    "大安區": {
      "label": "大安區",
      "longitude": 120.5914407,
      "latitude": 24.36509555,
      "code": "66000220"
    },
    "烏日區": {
      "label": "烏日區",
      "longitude": 120.6293305,
      "latitude": 24.0839271,
      "code": "66000230"
    },
    "大肚區": {
      "label": "大肚區",
      "longitude": 120.5543243,
      "latitude": 24.14467504,
      "code": "66000240"
    },
    "龍井區": {
      "label": "龍井區",
      "longitude": 120.5283728,
      "latitude": 24.20062892,
      "code": "66000250"
    },
    "霧峰區": {
      "label": "霧峰區",
      "longitude": 120.7201989,
      "latitude": 24.04332785,
      "code": "66000260"
    },
    "太平區": {
      "label": "太平區",
      "longitude": 120.7734217,
      "latitude": 24.11477375,
      "code": "66000270"
    },
    "大里區": {
      "label": "大里區",
      "longitude": 120.6926261,
      "latitude": 24.09575742,
      "code": "66000280"
    },
    "和平區": {
      "label": "和平區",
      "longitude": 121.140185,
      "latitude": 24.27620277,
      "code": "66000290"
    }
  },
  "桃園市": {
    "全部地區": {
      "label": "全部地區",
      "code": "68000",
      "longitude": 121.2168,
      "latitude": 24.93759
    },
    "桃園區": {
      "label": "桃園區",
      "longitude": 121.2996612,
      "latitude": 25.00040024,
      "code": "68000010"
    },
    "中壢區": {
      "label": "中壢區",
      "longitude": 121.2147243,
      "latitude": 24.97993803,
      "code": "68000020"
    },
    "大溪區": {
      "label": "大溪區",
      "longitude": 121.296342,
      "latitude": 24.86797026,
      "code": "68000030"
    },
    "楊梅區": {
      "label": "楊梅區",
      "longitude": 121.1291697,
      "latitude": 24.91820989,
      "code": "68000040"
    },
    "蘆竹區": {
      "label": "蘆竹區",
      "longitude": 121.2831266,
      "latitude": 25.06073337,
      "code": "68000050"
    },
    "大園區": {
      "label": "大園區",
      "longitude": 121.21177,
      "latitude": 25.06384709,
      "code": "68000060"
    },
    "龜山區": {
      "label": "龜山區",
      "longitude": 121.3569265,
      "latitude": 25.02417472,
      "code": "68000070"
    },
    "八德區": {
      "label": "八德區",
      "longitude": 121.2913102,
      "latitude": 24.94968903,
      "code": "68000080"
    },
    "龍潭區": {
      "label": "龍潭區",
      "longitude": 121.2117877,
      "latitude": 24.85064954,
      "code": "68000090"
    },
    "平鎮區": {
      "label": "平鎮區",
      "longitude": 121.2140051,
      "latitude": 24.92117923,
      "code": "68000100"
    },
    "新屋區": {
      "label": "新屋區",
      "longitude": 121.067758,
      "latitude": 24.97280352,
      "code": "68000110"
    },
    "觀音區": {
      "label": "觀音區",
      "longitude": 121.1155021,
      "latitude": 25.02671611,
      "code": "68000120"
    },
    "復興區": {
      "label": "復興區",
      "longitude": 121.3754588,
      "latitude": 24.72949884,
      "code": "68000130"
    }
  },
  "苗栗縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10005",
      "longitude": 120.9417,
      "latitude": 24.48927
    },
    "苗栗市": {
      "label": "苗栗市",
      "longitude": 120.8112299,
      "latitude": 24.56382141,
      "code": "10005010"
    },
    "苑裡鎮": {
      "label": "苑裡鎮",
      "longitude": 120.6882195,
      "latitude": 24.4110232,
      "code": "10005020"
    },
    "通霄鎮": {
      "label": "通霄鎮",
      "longitude": 120.7146378,
      "latitude": 24.4850464,
      "code": "10005030"
    },
    "竹南鎮": {
      "label": "竹南鎮",
      "longitude": 120.8777316,
      "latitude": 24.69862459,
      "code": "10005040"
    },
    "頭份市": {
      "label": "頭份市",
      "longitude": 120.9189437,
      "latitude": 24.67628243,
      "code": "10005050"
    },
    "後龍鎮": {
      "label": "後龍鎮",
      "longitude": 120.781205,
      "latitude": 24.6156265,
      "code": "10005060"
    },
    "卓蘭鎮": {
      "label": "卓蘭鎮",
      "longitude": 120.8561966,
      "latitude": 24.32510167,
      "code": "10005070"
    },
    "大湖鄉": {
      "label": "大湖鄉",
      "longitude": 120.8631192,
      "latitude": 24.39359641,
      "code": "10005080"
    },
    "公館鄉": {
      "label": "公館鄉",
      "longitude": 120.8505904,
      "latitude": 24.50249686,
      "code": "10005090"
    },
    "銅鑼鄉": {
      "label": "銅鑼鄉",
      "longitude": 120.7992043,
      "latitude": 24.45591832,
      "code": "10005100"
    },
    "南庄鄉": {
      "label": "南庄鄉",
      "longitude": 121.017471,
      "latitude": 24.56608432,
      "code": "10005110"
    },
    "頭屋鄉": {
      "label": "頭屋鄉",
      "longitude": 120.8826631,
      "latitude": 24.57345497,
      "code": "10005120"
    },
    "三義鄉": {
      "label": "三義鄉",
      "longitude": 120.7701929,
      "latitude": 24.38081659,
      "code": "10005130"
    },
    "西湖鄉": {
      "label": "西湖鄉",
      "longitude": 120.7614144,
      "latitude": 24.54153218,
      "code": "10005140"
    },
    "造橋鄉": {
      "label": "造橋鄉",
      "longitude": 120.8695663,
      "latitude": 24.62481314,
      "code": "10005150"
    },
    "三灣鄉": {
      "label": "三灣鄉",
      "longitude": 120.9525745,
      "latitude": 24.63599405,
      "code": "10005160"
    },
    "獅潭鄉": {
      "label": "獅潭鄉",
      "longitude": 120.9206688,
      "latitude": 24.51978614,
      "code": "10005170"
    },
    "泰安鄉": {
      "label": "泰安鄉",
      "longitude": 121.0681571,
      "latitude": 24.41925819,
      "code": "10005180"
    }
  },
  "南投縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10008",
      "longitude": 120.9876,
      "latitude": 23.83876
    },
    "南投市": {
      "label": "南投市",
      "longitude": 120.6787658,
      "latitude": 23.92173537,
      "code": "10008010"
    },
    "埔里鎮": {
      "label": "埔里鎮",
      "longitude": 120.9625259,
      "latitude": 23.97892591,
      "code": "10008020"
    },
    "草屯鎮": {
      "label": "草屯鎮",
      "longitude": 120.7326182,
      "latitude": 23.98321081,
      "code": "10008030"
    },
    "竹山鎮": {
      "label": "竹山鎮",
      "longitude": 120.7100797,
      "latitude": 23.69805518,
      "code": "10008040"
    },
    "集集鎮": {
      "label": "集集鎮",
      "longitude": 120.7854192,
      "latitude": 23.83701687,
      "code": "10008050"
    },
    "名間鄉": {
      "label": "名間鄉",
      "longitude": 120.6774402,
      "latitude": 23.8510771,
      "code": "10008060"
    },
    "鹿谷鄉": {
      "label": "鹿谷鄉",
      "longitude": 120.7815065,
      "latitude": 23.73776029,
      "code": "10008070"
    },
    "中寮鄉": {
      "label": "中寮鄉",
      "longitude": 120.7859159,
      "latitude": 23.90589214,
      "code": "10008080"
    },
    "魚池鄉": {
      "label": "魚池鄉",
      "longitude": 120.9256736,
      "latitude": 23.87601213,
      "code": "10008090"
    },
    "國姓鄉": {
      "label": "國姓鄉",
      "longitude": 120.8676052,
      "latitude": 24.03135413,
      "code": "10008100"
    },
    "水里鄉": {
      "label": "水里鄉",
      "longitude": 120.8622721,
      "latitude": 23.79612907,
      "code": "10008110"
    },
    "信義鄉": {
      "label": "信義鄉",
      "longitude": 121.0212867,
      "latitude": 23.6554647,
      "code": "10008120"
    },
    "仁愛鄉": {
      "label": "仁愛鄉",
      "longitude": 121.1443879,
      "latitude": 24.02886513,
      "code": "10008130"
    }
  },
  "雲林縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10009",
      "longitude": 120.3897,
      "latitude": 23.75585
    },
    "斗六市": {
      "label": "斗六市",
      "longitude": 120.5600044,
      "latitude": 23.70651883,
      "code": "10009010"
    },
    "斗南鎮": {
      "label": "斗南鎮",
      "longitude": 120.4826356,
      "latitude": 23.67066393,
      "code": "10009020"
    },
    "虎尾鎮": {
      "label": "虎尾鎮",
      "longitude": 120.4293061,
      "latitude": 23.71661545,
      "code": "10009030"
    },
    "西螺鎮": {
      "label": "西螺鎮",
      "longitude": 120.4580795,
      "latitude": 23.77942109,
      "code": "10009040"
    },
    "土庫鎮": {
      "label": "土庫鎮",
      "longitude": 120.3647252,
      "latitude": 23.69110665,
      "code": "10009050"
    },
    "北港鎮": {
      "label": "北港鎮",
      "longitude": 120.2940164,
      "latitude": 23.59219528,
      "code": "10009060"
    },
    "古坑鄉": {
      "label": "古坑鄉",
      "longitude": 120.6117351,
      "latitude": 23.62545469,
      "code": "10009070"
    },
    "大埤鄉": {
      "label": "大埤鄉",
      "longitude": 120.4255592,
      "latitude": 23.6455971,
      "code": "10009080"
    },
    "莿桐鄉": {
      "label": "莿桐鄉",
      "longitude": 120.5290419,
      "latitude": 23.76973894,
      "code": "10009090"
    },
    "林內鄉": {
      "label": "林內鄉",
      "longitude": 120.6155018,
      "latitude": 23.7557209,
      "code": "10009100"
    },
    "二崙鄉": {
      "label": "二崙鄉",
      "longitude": 120.3964598,
      "latitude": 23.7925521,
      "code": "10009110"
    },
    "崙背鄉": {
      "label": "崙背鄉",
      "longitude": 120.3339769,
      "latitude": 23.77849791,
      "code": "10009120"
    },
    "麥寮鄉": {
      "label": "麥寮鄉",
      "longitude": 120.243533,
      "latitude": 23.78817056,
      "code": "10009130"
    },
    "東勢鄉": {
      "label": "東勢鄉",
      "longitude": 120.2564173,
      "latitude": 23.69612324,
      "code": "10009140"
    },
    "褒忠鄉": {
      "label": "褒忠鄉",
      "longitude": 120.3116122,
      "latitude": 23.71613204,
      "code": "10009150"
    },
    "臺西鄉": {
      "label": "臺西鄉",
      "longitude": 120.2054952,
      "latitude": 23.71600815,
      "code": "10009160"
    },
    "元長鄉": {
      "label": "元長鄉",
      "longitude": 120.3279617,
      "latitude": 23.64243095,
      "code": "10009170"
    },
    "四湖鄉": {
      "label": "四湖鄉",
      "longitude": 120.2064699,
      "latitude": 23.64206875,
      "code": "10009180"
    },
    "口湖鄉": {
      "label": "口湖鄉",
      "longitude": 120.1413711,
      "latitude": 23.55365395,
      "code": "10009190"
    },
    "水林鄉": {
      "label": "水林鄉",
      "longitude": 120.2352734,
      "latitude": 23.56162849,
      "code": "10009200"
    }
  },
  "嘉義縣": {
    "全部地區": {
      "label": "全部地區",
      "code": "10010",
      "longitude": 120.574,
      "latitude": 23.45889
    },
    "太保市": {
      "label": "太保市",
      "longitude": 120.3440009,
      "latitude": 23.4729191,
      "code": "10010010"
    },
    "朴子市": {
      "label": "朴子市",
      "longitude": 120.2538977,
      "latitude": 23.44610605,
      "code": "10010020"
    },
    "布袋鎮": {
      "label": "布袋鎮",
      "longitude": 120.1777498,
      "latitude": 23.37494276,
      "code": "10010030"
    },
    "大林鎮": {
      "label": "大林鎮",
      "longitude": 120.4807865,
      "latitude": 23.59890827,
      "code": "10010040"
    },
    "民雄鄉": {
      "label": "民雄鄉",
      "longitude": 120.4442798,
      "latitude": 23.54255347,
      "code": "10010050"
    },
    "溪口鄉": {
      "label": "溪口鄉",
      "longitude": 120.4010282,
      "latitude": 23.59353089,
      "code": "10010060"
    },
    "新港鄉": {
      "label": "新港鄉",
      "longitude": 120.3482873,
      "latitude": 23.54581295,
      "code": "10010070"
    },
    "六腳鄉": {
      "label": "六腳鄉",
      "longitude": 120.2714728,
      "latitude": 23.51020984,
      "code": "10010080"
    },
    "東石鄉": {
      "label": "東石鄉",
      "longitude": 120.1738682,
      "latitude": 23.46866059,
      "code": "10010090"
    },
    "義竹鄉": {
      "label": "義竹鄉",
      "longitude": 120.2239433,
      "latitude": 23.34575872,
      "code": "10010100"
    },
    "鹿草鄉": {
      "label": "鹿草鄉",
      "longitude": 120.3045468,
      "latitude": 23.40811736,
      "code": "10010110"
    },
    "水上鄉": {
      "label": "水上鄉",
      "longitude": 120.4147357,
      "latitude": 23.42911287,
      "code": "10010120"
    },
    "中埔鄉": {
      "label": "中埔鄉",
      "longitude": 120.5365312,
      "latitude": 23.40408998,
      "code": "10010130"
    },
    "竹崎鄉": {
      "label": "竹崎鄉",
      "longitude": 120.5965771,
      "latitude": 23.50376527,
      "code": "10010140"
    },
    "梅山鄉": {
      "label": "梅山鄉",
      "longitude": 120.6387459,
      "latitude": 23.55535465,
      "code": "10010150"
    },
    "番路鄉": {
      "label": "番路鄉",
      "longitude": 120.6075335,
      "latitude": 23.42765669,
      "code": "10010160"
    },
    "大埔鄉": {
      "label": "大埔鄉",
      "longitude": 120.5896466,
      "latitude": 23.28848426,
      "code": "10010170"
    },
    "阿里山鄉": {
      "label": "阿里山鄉",
      "longitude": 120.7596173,
      "latitude": 23.44077619,
      "code": "10010180"
    }
  },
  "嘉義市": {
    "全部地區": {
      "label": "全部地區",
      "code": "10020",
      "longitude": 120.4473,
      "latitude": 23.47545
    },
    "東區": {
      "label": "東區",
      "longitude": 120.4706244,
      "latitude": 23.48170334,
      "code": "10020010"
    },
    "西區": {
      "label": "西區",
      "longitude": 120.4248724,
      "latitude": 23.47915529,
      "code": "10020020"
    }
  },
  "基隆市": {
    "全部地區": {
      "label": "全部地區",
      "code": "10017",
      "longitude": 121.7081,
      "latitude": 25.10898
    },
    "中正區": {
      "label": "中正區",
      "longitude": 121.7783549,
      "latitude": 25.14365754,
      "code": "10017010"
    },
    "七堵區": {
      "label": "七堵區",
      "longitude": 121.683628,
      "latitude": 25.10962028,
      "code": "10017020"
    },
    "暖暖區": {
      "label": "暖暖區",
      "longitude": 121.7447344,
      "latitude": 25.08097003,
      "code": "10017030"
    },
    "仁愛區": {
      "label": "仁愛區",
      "longitude": 121.7434205,
      "latitude": 25.11945421,
      "code": "10017040"
    },
    "中山區": {
      "label": "中山區",
      "longitude": 121.7308913,
      "latitude": 25.14986365,
      "code": "10017050"
    },
    "安樂區": {
      "label": "安樂區",
      "longitude": 121.7078325,
      "latitude": 25.14139521,
      "code": "10017060"
    },
    "信義區": {
      "label": "信義區",
      "longitude": 121.772646,
      "latitude": 25.12576579,
      "code": "10017070"
    }
  },
  "新竹市": {
    "全部地區": {
      "label": "全部地區",
      "code": "10018",
      "longitude": 120.9647,
      "latitude": 24.80395
    },
    "東區": {
      "label": "東區",
      "longitude": 120.9927505,
      "latitude": 24.79028174,
      "code": "10018010"
    },
    "北區": {
      "label": "北區",
      "longitude": 120.9491233,
      "latitude": 24.82269542,
      "code": "10018020"
    },
    "香山區": {
      "label": "香山區",
      "longitude": 120.9236727,
      "latitude": 24.77104342,
      "code": "10018030"
    }
  },
  "臺北市": {
    "全部地區": {
      "label": "全部地區",
      "code": "63000",
      // "longitude": 121.5598,
      // "latitude": 25.09108
      // 先修正為中山區
      "longitude": 121.5381597,
      "latitude": 25.06969917,
    },
    "松山區": {
      "label": "松山區",
      "longitude": 121.5575876,
      "latitude": 25.05999101,
      "code": "63000010"
    },
    "信義區": {
      "label": "信義區",
      "longitude": 121.5716697,
      "latitude": 25.03062083,
      "code": "63000020"
    },
    "大安區": {
      "label": "大安區",
      "longitude": 121.5434446,
      "latitude": 25.02677012,
      "code": "63000030"
    },
    "中山區": {
      "label": "中山區",
      "longitude": 121.5381597,
      "latitude": 25.06969917,
      "code": "63000040"
    },
    "中正區": {
      "label": "中正區",
      "longitude": 121.5198839,
      "latitude": 25.03240487,
      "code": "63000050"
    },
    "大同區": {
      "label": "大同區",
      "longitude": 121.5130417,
      "latitude": 25.06342433,
      "code": "63000060"
    },
    "萬華區": {
      "label": "萬華區",
      "longitude": 121.4979858,
      "latitude": 25.0285899,
      "code": "63000070"
    },
    "文山區": {
      "label": "文山區",
      "longitude": 121.5736082,
      "latitude": 24.98857934,
      "code": "63000080"
    },
    "南港區": {
      "label": "南港區",
      "longitude": 121.6097573,
      "latitude": 25.03600934,
      "code": "63000090"
    },
    "內湖區": {
      "label": "內湖區",
      "longitude": 121.5923828,
      "latitude": 25.08370623,
      "code": "63000100"
    },
    "士林區": {
      "label": "士林區",
      "longitude": 121.5508473,
      "latitude": 25.12546704,
      "code": "63000110"
    },
    "北投區": {
      "label": "北投區",
      "longitude": 121.5177992,
      "latitude": 25.1480682,
      "code": "63000120"
    }
  },
  "新北市": {
    "全部地區": {
      "label": "全部地區",
      "code": "65000",
      // 先修正為中山區
      "longitude": 121.5381597,
      "latitude": 25.06969917,
    },
    "板橋區": {
      "label": "板橋區",
      "longitude": 121.4579675,
      "latitude": 25.01186453,
      "code": "65000010"
    },
    "三重區": {
      "label": "三重區",
      "longitude": 121.4870977,
      "latitude": 25.06281651,
      "code": "65000020"
    },
    "中和區": {
      "label": "中和區",
      "longitude": 121.4936744,
      "latitude": 24.99088039,
      "code": "65000030"
    },
    "永和區": {
      "label": "永和區",
      "longitude": 121.516745,
      "latitude": 25.00810199,
      "code": "65000040"
    },
    "新莊區": {
      "label": "新莊區",
      "longitude": 121.4367535,
      "latitude": 25.0358303,
      "code": "65000050"
    },
    "新店區": {
      "label": "新店區",
      "longitude": 121.5316565,
      "latitude": 24.93039008,
      "code": "65000060"
    },
    "樹林區": {
      "label": "樹林區",
      "longitude": 121.401034,
      "latitude": 24.97970609,
      "code": "65000070"
    },
    "鶯歌區": {
      "label": "鶯歌區",
      "longitude": 121.3466269,
      "latitude": 24.9566258,
      "code": "65000080"
    },
    "三峽區": {
      "label": "三峽區",
      "longitude": 121.4163094,
      "latitude": 24.88209766,
      "code": "65000090"
    },
    "淡水區": {
      "label": "淡水區",
      "longitude": 121.463904,
      "latitude": 25.18907636,
      "code": "65000100"
    },
    "汐止區": {
      "label": "汐止區",
      "longitude": 121.6546992,
      "latitude": 25.07331322,
      "code": "65000110"
    },
    "瑞芳區": {
      "label": "瑞芳區",
      "longitude": 121.8232018,
      "latitude": 25.0981293,
      "code": "65000120"
    },
    "土城區": {
      "label": "土城區",
      "longitude": 121.445737,
      "latitude": 24.96425102,
      "code": "65000130"
    },
    "蘆洲區": {
      "label": "蘆洲區",
      "longitude": 121.4712461,
      "latitude": 25.08927173,
      "code": "65000140"
    },
    "五股區": {
      "label": "五股區",
      "longitude": 121.4332139,
      "latitude": 25.09614746,
      "code": "65000150"
    },
    "泰山區": {
      "label": "泰山區",
      "longitude": 121.4162785,
      "latitude": 25.05549774,
      "code": "65000160"
    },
    "林口區": {
      "label": "林口區",
      "longitude": 121.3527235,
      "latitude": 25.1000868,
      "code": "65000170"
    },
    "深坑區": {
      "label": "深坑區",
      "longitude": 121.6200624,
      "latitude": 24.99767506,
      "code": "65000180"
    },
    "石碇區": {
      "label": "石碇區",
      "longitude": 121.6472277,
      "latitude": 24.94714107,
      "code": "65000190"
    },
    "坪林區": {
      "label": "坪林區",
      "longitude": 121.724223,
      "latitude": 24.91097073,
      "code": "65000200"
    },
    "三芝區": {
      "label": "三芝區",
      "longitude": 121.515558,
      "latitude": 25.23159891,
      "code": "65000210"
    },
    "石門區": {
      "label": "石門區",
      "longitude": 121.5692761,
      "latitude": 25.26518079,
      "code": "65000220"
    },
    "八里區": {
      "label": "八里區",
      "longitude": 121.4138359,
      "latitude": 25.13812763,
      "code": "65000230"
    },
    "平溪區": {
      "label": "平溪區",
      "longitude": 121.7578817,
      "latitude": 25.02607068,
      "code": "65000240"
    },
    "雙溪區": {
      "label": "雙溪區",
      "longitude": 121.8329822,
      "latitude": 24.99698394,
      "code": "65000250"
    },
    "貢寮區": {
      "label": "貢寮區",
      "longitude": 121.9182466,
      "latitude": 25.02485641,
      "code": "65000260"
    },
    "金山區": {
      "label": "金山區",
      "longitude": 121.6052639,
      "latitude": 25.21714594,
      "code": "65000270"
    },
    "萬里區": {
      "label": "萬里區",
      "longitude": 121.6439307,
      "latitude": 25.17572457,
      "code": "65000280"
    },
    "烏來區": {
      "label": "烏來區",
      "longitude": 121.5414806,
      "latitude": 24.78824295,
      "code": "65000290"
    }
  },
  "臺南市": {
    "全部地區": {
      "label": "全部地區",
      "code": "67000",
      "longitude": 120.2513,
      "latitude": 23.1417
    },
    "新營區": {
      "label": "新營區",
      "longitude": 120.2954067,
      "latitude": 23.30152488,
      "code": "67000010"
    },
    "鹽水區": {
      "label": "鹽水區",
      "longitude": 120.2482977,
      "latitude": 23.29798622,
      "code": "67000020"
    },
    "白河區": {
      "label": "白河區",
      "longitude": 120.4578565,
      "latitude": 23.35132068,
      "code": "67000030"
    },
    "柳營區": {
      "label": "柳營區",
      "longitude": 120.3549205,
      "latitude": 23.26887001,
      "code": "67000040"
    },
    "後壁區": {
      "label": "後壁區",
      "longitude": 120.3485081,
      "latitude": 23.36201478,
      "code": "67000050"
    },
    "東山區": {
      "label": "東山區",
      "longitude": 120.4441211,
      "latitude": 23.2783187,
      "code": "67000060"
    },
    "麻豆區": {
      "label": "麻豆區",
      "longitude": 120.241308,
      "latitude": 23.18248033,
      "code": "67000070"
    },
    "下營區": {
      "label": "下營區",
      "longitude": 120.26484,
      "latitude": 23.23103978,
      "code": "67000080"
    },
    "六甲區": {
      "label": "六甲區",
      "longitude": 120.3800259,
      "latitude": 23.2272672,
      "code": "67000090"
    },
    "官田區": {
      "label": "官田區",
      "longitude": 120.3479918,
      "latitude": 23.19098548,
      "code": "67000100"
    },
    "大內區": {
      "label": "大內區",
      "longitude": 120.3988147,
      "latitude": 23.14482152,
      "code": "67000110"
    },
    "佳里區": {
      "label": "佳里區",
      "longitude": 120.178593,
      "latitude": 23.1669941,
      "code": "67000120"
    },
    "學甲區": {
      "label": "學甲區",
      "longitude": 120.1841865,
      "latitude": 23.25219805,
      "code": "67000130"
    },
    "西港區": {
      "label": "西港區",
      "longitude": 120.2002309,
      "latitude": 23.12491893,
      "code": "67000140"
    },
    "七股區": {
      "label": "七股區",
      "longitude": 120.1005854,
      "latitude": 23.12326578,
      "code": "67000150"
    },
    "將軍區": {
      "label": "將軍區",
      "longitude": 120.1276958,
      "latitude": 23.20834413,
      "code": "67000160"
    },
    "北門區": {
      "label": "北門區",
      "longitude": 120.1262357,
      "latitude": 23.2777708,
      "code": "67000170"
    },
    "新化區": {
      "label": "新化區",
      "longitude": 120.3357964,
      "latitude": 23.03394545,
      "code": "67000180"
    },
    "善化區": {
      "label": "善化區",
      "longitude": 120.2988274,
      "latitude": 23.14031072,
      "code": "67000190"
    },
    "新市區": {
      "label": "新市區",
      "longitude": 120.2923941,
      "latitude": 23.08319496,
      "code": "67000200"
    },
    "安定區": {
      "label": "安定區",
      "longitude": 120.2296235,
      "latitude": 23.09974927,
      "code": "67000210"
    },
    "山上區": {
      "label": "山上區",
      "longitude": 120.370977,
      "latitude": 23.09689329,
      "code": "67000220"
    },
    "玉井區": {
      "label": "玉井區",
      "longitude": 120.4609622,
      "latitude": 23.11480926,
      "code": "67000230"
    },
    "楠西區": {
      "label": "楠西區",
      "longitude": 120.5170304,
      "latitude": 23.17885854,
      "code": "67000240"
    },
    "南化區": {
      "label": "南化區",
      "longitude": 120.5441223,
      "latitude": 23.1151111,
      "code": "67000250"
    },
    "左鎮區": {
      "label": "左鎮區",
      "longitude": 120.4123917,
      "latitude": 23.02604611,
      "code": "67000260"
    },
    "仁德區": {
      "label": "仁德區",
      "longitude": 120.2418788,
      "latitude": 22.94130931,
      "code": "67000270"
    },
    "歸仁區": {
      "label": "歸仁區",
      "longitude": 120.2930627,
      "latitude": 22.94679469,
      "code": "67000280"
    },
    "關廟區": {
      "label": "關廟區",
      "longitude": 120.3342821,
      "latitude": 22.95577909,
      "code": "67000290"
    },
    "龍崎區": {
      "label": "龍崎區",
      "longitude": 120.3869373,
      "latitude": 22.95482276,
      "code": "67000300"
    },
    "永康區": {
      "label": "永康區",
      "longitude": 120.2542795,
      "latitude": 23.02729532,
      "code": "67000310"
    },
    "東區": {
      "label": "東區",
      "longitude": 120.2281858,
      "latitude": 22.98178202,
      "code": "67000320"
    },
    "南區": {
      "label": "南區",
      "longitude": 120.1903743,
      "latitude": 22.95561863,
      "code": "67000330"
    },
    "北區": {
      "label": "北區",
      "longitude": 120.2068735,
      "latitude": 23.01012179,
      "code": "67000340"
    },
    "安南區": {
      "label": "安南區",
      "longitude": 120.1526189,
      "latitude": 23.04869681,
      "code": "67000350"
    },
    "安平區": {
      "label": "安平區",
      "longitude": 120.1649949,
      "latitude": 22.99008437,
      "code": "67000360"
    },
    "中西區": {
      "label": "中西區",
      "longitude": 120.192874,
      "latitude": 22.99594458,
      "code": "67000370"
    }
  }
}

// 區碼 => 縣市區 對照表
export function getDistrictCodeMap(prefixCity = false) {
  let map = {}
  let mapCitys = getCityMap()
  let mapDists = getDistMap(false)
  Object.keys(distMap).forEach(cityKey => {
    let dists = mapDists[cityKey]
    let city = mapCitys[cityKey]
    map[city.code] = cityKey
    Object.keys(dists).forEach(distKey => {
      let dist = dists[distKey]
      map[dist.code] = prefixCity
        ? city.label + dist.label
        : dist.label
    })
  })

  return map
}

export function getDistCategory() {
  let mapCitys = getCityMap()
  let mapDists = getDistMap(false)
  let output = {}
  Object.keys(mapCitys).forEach(cityKey => {
    let child = []
    let dists = mapDists[cityKey]

    Object.values(dists).forEach(dist => {
      child.push({
        label: dist.label,
        value: dist.code,
        model: false,
      })
    })

    output[cityKey] = {
      expand: false,
      checkedAll: {
        label: `${cityKey}全區`,
        value: mapCitys[cityKey].code,
        model: false
      },
      child
    }
  })

  return output
}

export function getCityMap() {
  return JSON.parse(JSON.stringify(cityMap))
}

export function getCityOptions() {
  return Object.values(cityMap).map(city => {
    city.value = city.code
    return city
  })
}

export function getDistOptions(city_code) {
  let city = Object.values(cityMap).find(city => city.code === city_code)
  if (!city) return []
  let cityName = city.label
  let dists = distMap[cityName]
  return Object.values(dists)
    .map(city => {
      city.value = city.code
      return city
    })
    .filter(d => d.label !== '全部地區')
}

export function getDistMap(addCheckAllChild = true) {
  let mapCity = getCityMap()
  let output = JSON.parse(JSON.stringify(distMap))
  if (!addCheckAllChild) {
    Object.keys(output).forEach(cityKey => {
      let dists = output[cityKey]
      delete dists['全部地區']
    })
  }

  return output
}
