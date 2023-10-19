import React, { useState } from "react";
import { Tabs, Tab, Image, Button, Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle, ArrowLeftCircle } from "react-bootstrap-icons";
import './LineInfo.css';
import 경부선 from "../images/경부선.png";
import 호남선 from "../images/호남선.png";
import 경전선 from "../images/경전선.png";
import 전라선 from "../images/전라선.png";
import 강릉선 from "../images/강릉선.png";
import 중앙선 from "../images/중앙선.png";
import 중부내륙선 from "../images/중부내륙선.png";
import './FontCss.css';
const trainLines = [
  {
      name: "경부선",
      stations: [
      {
          name: "서울역",
          number: "1544-7788",
          address: "서울특별시 용산구 한강대로 405 (동자동 43-205)",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/d793880d5ba70feb1c2e259d1a373add.jpg"
      },
      {
          name: "행신역",
          number: "1544-7788",
          address: "경기도 고양시 덕양구 소원로 102",
          route: "경의선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/handsin.jpg"
      },
      {
          name: "영등포역",
          number: "1544-7788",
          address: "서울특별시 영등포구 경인로 846",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_4e311ccb_77d2_4e0d_966a_bdc1ad87bee4_00000438.jpg"
      },
      {
          name: "광명역",
          number: "1544-7788",
          address: "경기도 광명시 광명역로 21(일직동)",
          route: "경부고속",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_d481e6e8_206e_4173_9757_195d35d75d86_00020696.jpg"
      },
      {
          name: "수원역",
          number: "1544-7788",
          address: "경기도 수원시 팔달구 덕영대로 924 수원역",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/f6752c763c249d2e906d40435312856a.jpg"
      },
      {
          name: "천안아산역",
          number: "1544-7788",
          address: "충청남도 아산시 배방읍 희망로 100번지(장재리 364-4)",
          route: "경부고속",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_ab87593b_eec9_4446_bc8d_a83a9b0751c6_00001109.jpg"
      },
      {
          name: "오송역",
          number: "1544-7788",
          address: "충청북도 청주시 흥덕구 오송읍 오송가락로 123",
          route: "충북선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001321.jpg"
      },
      {
          name: "대전역",
          number: "1544-7788",
          address: "대전 동구 중앙로 218",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00000905.jpg"
      },
      {
          name: "김천구미역",
          number: "1544-7788",
          address: "경상북도 김천시 남면 혁신1로 51 김천(구미)역",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/7d4a0811d3b012f164f3c1d8741aa066.jpg"
      },
      {
          name: "서대구역",
          number: "1544-7788",
          address: "대구광역시 서구 와룡로 527",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/seodaegu.jpg"
      },
      {
          name: "동대구역",
          number: "1544-7788",
          address: "대구광역시 동구 동대구로 550",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_401496d6_1d89_4f50_a581_5f255c30efb3_00064586.jpg"
      },
      {
          name: "포항(KTX)역",
          number: "1544-7788",
          address: "경상북도 포항시 북구 흥해읍 포항역로1",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_c7d8065d_377f_441b_a8db_95d5cb365e94_00011328.jpg"
      },
      {
          name: "신경주역",
          number: "1544-7788",
          address: "경상북도 경주시 건천읍 신경주역로 80",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_01326561_396a_4f4d_9dc9_e684151b360a_00003537.jpeg"
      },
      {
          name: "밀양역",
          number: "1544-7788",
          address: "경상남도 밀양시 중앙로 62",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00001384.jpg"
      },
      {
          name: "울산역",
          number: "1544-7788",
          address: "울산광역시 울주군 삼남면 울산역로 177",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00001084.jpg"
      },
      {
          name: "구포역",
          number: "1544-7788",
          address: "부산광역시 북구 구포만세길 82",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00001444.jpg"
      },
      {
          name: "부산역",
          number: "1544-7788",
          address: "부산광역시 동구 중앙대로 206 (초량3동 1187-1번지) 부산역",
          route: "경부선",
          image: 경부선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00002148.jpg"
      }
      ]
  },
  {
      name: "호남선",
      stations: [
      {
          name: "용산역",
          number: "1544-7788",
          address: "서울특별시 용산구 한강대로 23길 55",
          route: "경부선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_baec4e51_eed3_485b_97b8_2167a3977298_00000089.jpg"
      },
      {
          name: "행신역",
          number: "1544-7788",
          address: "경기도 고양시 덕양구 소원로 102",
          route: "경의선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/handsin.jpg"
      },
      {
          name: "광명역",
          number: "1544-7788",
          address: "경기도 광명시 광명역로 21(일직동)",
          route: "경부고속",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_d481e6e8_206e_4173_9757_195d35d75d86_00020696.jpg"
      },
      {
          name: "천안아산역",
          number: "1544-7788",
          address: "충청남도 아산시 배방읍 희망로 100번지(장재리 364-4)",
          route: "경부고속",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_ab87593b_eec9_4446_bc8d_a83a9b0751c6_00001109.jpg"
      },
      {
          name: "오송역",
          number: "1544-7788",
          address: "충청북도 청주시 흥덕구 오송읍 오송가락로 123",
          route: "충북선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001321.jpg"
      },
      {
          name: "서대전역",
          number: "1544-7788",
          address: "대전광역시 중구 오류로 23(오류동 74)서대전역",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001501.jpg"
      },
      {
          name: "계룡역",
          number: "1544-7788",
          address: "충청남도 계룡시 두마면 팥거리로 95 (두계리 136-4)",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001641.jpg"
      },
      {
          name: "공주역",
          number: "1544-7788",
          address: "충청남도 공주시 이인면 새빛로 100",
          route: "호남고속선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00000375.jpg"
      },
      {
          name: "논산역",
          number: "1544-7788",
          address: "충청남도 논산시 해월로 236-12",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00000435.jpg"
      },
      {
          name: "익산역",
          number: "1544-7788",
          address: "전라북도 익산시 익산대로 153",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_c7d8065d_377f_441b_a8db_95d5cb365e94_00007980.jpg"
      },
      {
          name: "정읍역",
          number: "1544-7788",
          address: "전라북도 정읍시 서부산업도로 305",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_a8078a63_0041_41c2_a3a9_5a8174b8027e_00003194.jpg"
      },
      {
          name: "광주송정역",
          number: "1544-7788",
          address: "광주광역시 광산구 상무대로 201",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/upload_c7d8065d_377f_441b_a8db_95d5cb365e94_00007263.jpg"
      },
      {
          name: "나주역",
          number: "1544-7788",
          address: "전라남도 나주시 나주역길 56",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/naju.jpg"
      },
      {
          name: "목포역",
          number: "1544-7788",
          address: "전라남도 목포시 영산로 98(호남동1-1)",
          route: "호남선",
          image: 호남선,
          image2: "https://info.korail.com/upload/station/basic/303f609a4dc5d7c703178e2cada6cc0f.jpg"
      }
      ]
  },
  {
      name: "경전선",
      stations: [
      {
          name: "서울역",
          number: "1544-7788",
          address: "서울특별시 용산구 한강대로 405 (동자동 43-205)",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/d793880d5ba70feb1c2e259d1a373add.jpg"
      },
      {
          name: "행신역",
          number: "1544-7788",
          address: "경기도 고양시 덕양구 소원로 102",
          route: "경의선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/handsin.jpg"
      },
      {
          name: "광명역",
          number: "1544-7788",
          address: "경기도 광명시 광명역로 21(일직동)",
          route: "경부고속",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_d481e6e8_206e_4173_9757_195d35d75d86_00020696.jpg"
      },
      {
          name: "천안아산역",
          number: "1544-7788",
          address: "충청남도 아산시 배방읍 희망로 100번지(장재리 364-4)",
          route: "경부고속",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_ab87593b_eec9_4446_bc8d_a83a9b0751c6_00001109.jpg"
      },
      {
          name: "오송역",
          number: "1544-7788",
          address: "충청북도 청주시 흥덕구 오송읍 오송가락로 123",
          route: "충북선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001321.jpg"
      },
      {
          name: "대전역",
          number: "1544-7788",
          address: "대전광역시 동구 중앙로 218",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00000905.jpg"
      },
      {
          name: "김천구미역",
          number: "1544-7788",
          address: "경상북도 김천시 남면 혁신1로 51 김천(구미)역",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/7d4a0811d3b012f164f3c1d8741aa066.jpg"
      },
      {
          name: "서대구역",
          number: "1544-7788",
          address: "대구광역시 서구 와룡로 527",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/seodaegu.jpg"
      },
      {
          name: "동대구역",
          number: "1544-7788",
          address: "대구광역시 동구 동대구로 550",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_401496d6_1d89_4f50_a581_5f255c30efb3_00064586.jpg"
      },
      {
          name: "밀양역",
          number: "1544-7788",
          address: "경상남도 밀양시 중앙로 62",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00001384.jpg"
      },
      {
          name: "진영역",
          number: "1544-7788",
          address: "경상남도 김해시 진영읍 김해대로 809 (진영역)",
          route: "경전선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_b8a9010c_8ca1_4f4b_bd19_3e78b4cdc3ce_00001861.jpg"
      },
      {
          name: "창원중앙역",
          number: "1544-7788",
          address: "경상남도 창원시 의창구 상남로 381 (용동 산 32-9번지, 창원중앙역사)",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/5372635c031a668959691fd34d70739a.jpg"
      },
      {
          name: "창원역",
          number: "1544-7788",
          address: "경상남도 창원시 의창구 의창대로 67 (동정동)",
          route: "경전선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/e7607671a1655f1e42951597d7259605.jpg"
      },
      {
          name: "마산역",
          number: "1544-7788",
          address: "경상남도 창원시 마산회원구 마산역 광장로 18",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00001292.jpg"
      },
      {
          name: "진주역",
          number: "1544-7788",
          address: "경상남도 진주시 진주역로 130",
          route: "경부선",
          image: 경전선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00002640.jpeg"
      }
      ]
  },
  {
      name: "전라선",
      stations: [
      {
          name: "용산역",
          number: "1544-7788",
          address: "서울특별시 용산구 한강대로 23길 55",
          route: "경부선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_baec4e51_eed3_485b_97b8_2167a3977298_00000089.jpg"
      },
      {
          name: "행신역",
          number: "1544-7788",
          address: "경기도 고양시 덕양구 소원로 102",
          route: "경의선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/handsin.jpg"
      },
      {
          name: "광명역",
          number: "1544-7788",
          address: "경기도 광명시 광명역로 21(일직동)",
          route: "경부고속",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_d481e6e8_206e_4173_9757_195d35d75d86_00020696.jpg"
      },
      {
          name: "천안아산역",
          number: "1544-7788",
          address: "충청남도 아산시 배방읍 희망로 100번지(장재리 364-4)",
          route: "경부고속",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_ab87593b_eec9_4446_bc8d_a83a9b0751c6_00001109.jpg"
      },
      {
          name: "오송역",
          number: "1544-7788",
          address: "충청북도 청주시 흥덕구 오송읍 오송가락로 123",
          route: "충북선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001321.jpg"
      },
      {
          name: "서대전역",
          number: "1544-7788",
          address: "대전광역시 중구 오류로 23(오류동 74)서대전역",
          route: "호남선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001501.jpg"
      },
      {
          name: "계룡역",
          number: "1544-7788",
          address: "충청남도 계룡시 두마면 팥거리로 95 (두계리 136-4)",
          route: "호남선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_2e5c2375_214d_4f83_8f70_2185d20641f2_00001641.jpg"
      },
      {
          name: "공주역",
          number: "1544-7788",
          address: "충청남도 공주시 이인면 새빛로 100",
          route: "호남고속선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00000375.jpg"
      },
      {
          name: "논산역",
          number: "1544-7788",
          address: "충청남도 논산시 해월로 236-12",
          route: "호남선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00000435.jpg"
      },
      {
          name: "익산역",
          number: "1544-7788",
          address: "전라북도 익산시 익산대로 153",
          route: "호남선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_c7d8065d_377f_441b_a8db_95d5cb365e94_00007980.jpg"
      },
      {
          name: "전주역",
          number: "1544-7788",
          address: "전라북도 전주시 덕진구 동부대로 680",
          route: "전라선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/jeonju.jpg"
      },
      {
          name: "남원역",
          number: "1544-7788",
          address: "전라북도 남원시 교룡로 71",
          route: "전라선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/9bb70b57218b6af4433c33cebbc76e91.bmp"
      },
      {
          name: "곡성역",
          number: "1544-7788",
          address: "전라남도 곡성군 곡성읍 곡성로 920",
          route: "전라선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/ef1f2acc3138e635b8f809cbd43647d1.bmp"
      },
      {
          name: "구례구역",
          number: "1544-7788",
          address: "전라남도 순천시 황전면 섬진강로 217",
          route: "전라선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/414c8eff80bc91de38f6d06e5577a3a8.jpg"
      },
      {
          name: "순천역",
          number: "1544-7788",
          address: "전라남도 순천시 팔마로 135",
          route: "전라선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/e81c4a6700337353ba5a82e2908ae9b7.jpg"
      },
      {
          name: "여천역",
          number: "1544-7788",
          address: "전라남도 여수시 시청로 200(여천동)",
          route: "전라선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/0e32c4a59bae168cdc472a4431f82e23.jpg"
      },
      {
          name: "여수엑스포역",
          number: "1544-7788",
          address: "전라남도 여수시 망양로 2",
          route: "전라선",
          image: 전라선,
          image2: "https://info.korail.com/upload/station/basic/upload_316252f7_a1a8_4c70_8fd8_f2b74d438ecc_00009286.jpg"
      }
      ]
  },
  {
      name: "강릉선",
      stations: [
      {
          name: "서울역",
          number: "1544-7788",
          address: "서울특별시 용산구 한강대로 405 (동자동 43-205)",
          route: "경부선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/d793880d5ba70feb1c2e259d1a373add.jpg"
      },
      {
          name: "행신역",
          number: "1544-7788",
          address: "경기도 고양시 덕양구 소원로 102",
          route: "경의선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/handsin.jpg"
      },
      {
          name: "청량리역",
          number: "1544-7788",
          address: "서울특별시 동대문구 전농동 588-1",
          route: "경원선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_d481e6e8_206e_4173_9757_195d35d75d86_00020604.jpg"
      },
      {
          name: "상봉역",
          number: "1544-7788",
          address: "서울특별시 중랑구 망우로 297 (상봉1동 100-9번지)",
          route: "경춘선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_d481e6e8_206e_4173_9757_195d35d75d86_00002411.jpg"
      },
      {
          name: "양평역",
          number: "1544-7788",
          address: "경기도 양평군 양평읍 역전길 30",
          route: "중앙선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_315b0e6f_bb91_4d25_bea5_2e936e80b564_00006997.jpg"
      },
      {
          name: "만종역",
          number: "1544-7788",
          address: "강원도 원주시 호저면 운동들2길 21-33",
          route: "강릉선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_59d9dd19_b908_45e4_9b71_d6764c85374a_00006398.jpg"
      },
      {
          name: "횡성역",
          number: "1544-7788",
          address: "강원도 횡성군 횡성읍 덕고로 591",
          route: "강릉선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_59d9dd19_b908_45e4_9b71_d6764c85374a_00006434.jpg"
      },
      {
          name: "둔내역",
          number: "1544-7788",
          address: "강원도 횡성군 둔내면 자포곡리 429-1",
          route: "강릉선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_59d9dd19_b908_45e4_9b71_d6764c85374a_00006362.jpg"
      },
      {
          name: "평창역",
          number: "1544-7788",
          address: "강원도 평창군 용평면 평창대로 1715(평창역)",
          route: "강릉선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_59d9dd19_b908_45e4_9b71_d6764c85374a_00006290.jpg"
      },
      {
          name: "진부(오대산)역",
          number: "1544-7788",
          address: "강원도 평창군 진부면 송정길 120",
          route: "강릉선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_315b0e6f_bb91_4d25_bea5_2e936e80b564_00007077.jpg"
      },
      {
          name: "강릉역",
          number: "1544-7788",
          address: "강원도 강릉시 용지로 176",
          route: "강릉선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/upload_59d9dd19_b908_45e4_9b71_d6764c85374a_00006326.jpg"
      },
      {
          name: "정동진역",
          number: "1544-7788",
          address: "강원도 강릉시 정동역길 17",
          route: "영동선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/7709ad2fd62fe7b762ea56f637a3c110.jpg"
      },
      {
          name: "묵호역",
          number: "1544-7788",
          address: "강원도 동해시 해안로 520",
          route: "영동선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/3c51e73d23cf500ea80ba16d89a1d259.jpg"
      },
      {
          name: "동해역",
          number: "1544-7788",
          address: "강원도 동해시 동해역길 69",
          route: "영동선",
          image: 강릉선,
          image2: "https://info.korail.com/upload/station/basic/0424a706f5499157f88f70cb849a3300.jpg"
      }
      ]
  },
  {
      name: "중앙선",
      stations: [
      {
          name: "청량리역",
          number: "1544-7788",
          address: "서울특별시 동대문구 전농동 588-1",
          route: "경원선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/upload_d481e6e8_206e_4173_9757_195d35d75d86_00020604.jpg"
      },
      {
          name: "양평역",
          number: "1544-7788",
          address: "경기도 양평군 양평읍 역전길 30",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/upload_315b0e6f_bb91_4d25_bea5_2e936e80b564_00006997.jpg"
      },
      {
          name: "서원주역",
          number: "1544-7788",
          address: "강원도 원주시 지정로 145",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/upload_6d88902d_b4fe_4e6d_8111_197420a4109a_00001037.jpg"
      },
      {
          name: "원주역",
          number: "1544-7788",
          address: "강원도 원주시 북원로 1860",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/upload_6d88902d_b4fe_4e6d_8111_197420a4109a_00001609.jpg"
      },
      {
          name: "제천역",
          number: "1544-7788",
          address: "충청북도 제천시 의림대로 1 (영천동 1381)",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/upload_7b975c9e_5984_4c39_afb9_55eb69cb6459_00000503.jpg"
      },
      {
          name: "단양역",
          number: "1544-7788",
          address: "충청북도 단양군 단양읍 단양로 896",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/danyang.jpg"
      },
      {
          name: "풍기역",
          number: "1544-7788",
          address: "경상북도 영주시 풍기읍 인삼로 1(서부리 150)",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/5c79c9fac568e0872fba7f0edf6b369e.jpg"
      },
      {
          name: "영주역",
          number: "1544-7788",
          address: "경상북도 영주시 선비로 64(휴천동 257)",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/55f3a639385aaaa8ceeb55c779fb8ea9.jpg"
      },
      {
          name: "안동역",
          number: "1544-7788",
          address: "경상북도 안동시 경동로 122-16(송현동)",
          route: "중앙선",
          image: 중앙선,
          image2: "https://info.korail.com/upload/station/basic/upload_f0b1668e_5457_4a60_ab87_ca9dd05d47c0_00000767.jpg"
      }
      ]
  },
  {
      name: "중부내륙선",
      stations: [
      {
          name: "부발역",
          number: "1544-7788",
          address: "경기도 이천시 부발읍 신아로 87",
          route: "강릉선",
          image: 중부내륙선,
          image2: "https://info.korail.com/upload/station/basic/upload_01326561_396a_4f4d_9dc9_e684151b360a_00063368.jpg"
      },
      {
          name: "가남역",
          number: "1544-7788",
          address: "경기도 여주시 가남읍 태평리 516",
          route: "중부내륙선",
          image: 중부내륙선,
          image2: "https://info.korail.com/upload/station/basic/ganam.jpg"
      },
      {
          name: "감곡장호원역",
          number: "1544-7788",
          address: "충청북도 음성군 감곡면 왕장리 312-2",
          route: "중부내륙선",
          image: 중부내륙선,
          image2: "https://info.korail.com/upload/station/basic/gamgok.jpg"
      },
      {
          name: "앙성온천역",
          number: "1544-7788",
          address: "충청북도 충주시 앙성면 가곡로 1390-22",
          route: "중부내륙선",
          image: 중부내륙선,
          image2: "https://info.korail.com/upload/station/basic/angsung.jpg"
      },
      {
          name: "충주역",
          number: "1544-7788",
          address: "충청북도 충주시 충원대로 539",
          route: "충북선",
          image: 중부내륙선,
          image2: "https://info.korail.com/upload/station/basic/upload_401496d6_1d89_4f50_a581_5f255c30efb3_00019640.jpg"
      }
      ]
  }
];

function TrainStation() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [activeDestImage, setActiveDestImage] = useState(0);

  const handleTabSelect = (tabIndex) => {
    setActiveTab(tabIndex);
    setActiveImage(0);
    setActiveDestImage(0);
  };

  const handlePrevImage = () => {
    setActiveDestImage(0);
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    } else {
      // 현재 이미지가 첫 번째 이미지인 경우, 마지막 이미지로 이동
      setActiveImage(currentLine.stations.length - 1);
    }
  };
  
  const handleNextImage = () => {
    const currentLine = trainLines[activeTab];
    setActiveDestImage(0);
    if (activeImage < currentLine.stations.length - 1) {
      setActiveImage(activeImage + 1);
    } else {
      // 현재 이미지가 마지막 이미지인 경우, 첫 번째 이미지로 이동
      setActiveImage(0);
    }
  };
  

  const currentLine = trainLines[activeTab];
  const currentStation = currentLine.stations[activeImage];


  const travelDestination = [
    {
      name: "경부선",
      destination: [
      {
        image1: "https://ak-d.tripcdn.com/images/0104p120008ars39uB986_C_500_300_R5.jpg_.webp?proc=source%2ftrip",
        region1: "서울",
        place1: "경복궁",
        description1: "경복궁은 서울 중앙부에 위치해 있으며 조선시대에 건립된 최초의 궁궐입니다. "
        + "경복궁은 일년 내내 아름다운 경관을 자랑하는데, 봄에는 벚꽃이, 여름에는 푸르른 나무가, 가을에는 은행나무가, 그리고 겨울에는 백옥같이 하얀 눈이 참으로 아름답습니다.",

        image2: "https://ak-d.tripcdn.com/images/100n1f000001gp9yo95A8.jpg",
        region2: "대구",
        place2: "송해공원",
        description2: "E-World는 대구 스카이 라인의 가장 눈에 띄는 특징인 우방 타워를 둘러싸고있는 테마 파크입니다. "
         + "공원은 1993년에 종합 테마파크로 건설되어 유럽풍 모델로 조성되었습니다. "
         + "모험을 좋아하는 방문객을 위한 스카이 점프는 우방 타워 꼭대기에서 스릴 넘치는 123m 드롭으로 도시 전체의 탁 트인 전망을 제공합니다.",

        image3: "https://ak-d.tripcdn.com/images/0104z120006eqga182B80_C_670_376_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
        region3: "부산",
        place3: "광안리 해수욕장",
        description3: "모든 사람을 위한 음식과 쇼핑 및 엔터테인먼트를 위한 좋은 위치에 있는 또 다른 훌륭한 해변. " 
        + "풍경은 배경에 유명한 다리를 포함하고 일몰에 전체 전망이 꽤 장관입니다. 해운대 해수욕장과 이 지역의 많은 좋은 레스토랑과 가깝습니다."
      }
    ]
  },
  {
      name: "호남선",
      destination: [
      {
        image1: "https://youimg1.tripcdn.com/target/0103112000b22vrj25355_C_900_600_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
        region1: "천안",
        place1: "독립운동기념관",
        description1: "천안에 들를일이 있다면 꼭 가보도록 추천합니다. 규모가 큰편이니 천천히 걸어서 여러 관람관도 둘러보고 역사에대해 많은것도 알고, 느끼게되는 뜻깊은 시간이 됩니다. "
         + "타국인들이 오디오까지 챙겨가며 진지하게 관람하는 유명한 명소입니다.",

        image2: "https://youimg1.tripcdn.com/target/0ww7012000acd38usC8B7_C_900_600_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
        region2: "광주",
        place2: "1913 송정역시장",
        description2: "송정시장은 광주송정역 앞에 위치한 한국 전통시장으로 시장에 있는 할머니에 따르면 1913년에 시작된 시장으로 수백 피트 거리에 야채와 과일 가게가 있습니다. "
        + " 전통 시장과 건식품 가게, 정육점 외에도 현재 문학적 분위기의 커피숍과 문화적 창의적 기념품 가게가 많이 있어 체크인하고 사진을 찍기에 보기 드문 곳입니다.",

        image3: "https://ak-d.tripcdn.com/images/0ww1h12000c7b1lz5110B_C_300_210_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
        region3: "목포",
        place3: "갓바위",
        description3: "대한민국 전라남도 목포시 해변경관대 끝에 위치한 돔바위는 목포시의 중요한 자연경관이자 관광명소입니다. "
        + " 돔바위는 파도에 의해 형성된 천연암입니다. "
        + "밤에는 조명도 있고 일반적으로 바다 입구 근처의 풍경에 의존하는 이 모자바위는 꽤 좋습니다."
      }
    ]
  },
  {
      name: "경전선",
      destination: [
      {
        image1: "https://ak-d.tripcdn.com/images/0106x120008ovfvs975E4_C_900_600_Q70.png?proc=source%2ftrip&proc=source%2ftrip",
        region1: "밀양",
        place1: "밀양시립박물관",
        description1: "밀양시립박물관에는 한국에 대한 기록이 굉장히 많이 남아 있습니다. "
        + "그리고 박물관 밖 광장은 여전히 아주 좋은 공원, 조용하고 아름다운 풍경, 연못, 개울, 언덕, 예, 비행기와 탱크가 함께 사진을 찍을 수 있습니다.",

        image2: "https://youimg1.tripcdn.com/target/100t1f000001gqd4028C1_C_900_600_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
        region2: "창원",
        place2: "여좌천",
        description2: "요사강은 진해시를 흐르는 작은 강으로, 강 양쪽에는 벚꽃이 우거져 만개하면 분홍색과 흰색의 벚꽃 터널이 형성되어 진해에서 벚꽃을 감상할 수 있는 필수 명소 중 하나입니다.",

        image3: "https://youimg1.tripcdn.com/target/0ww6h12000aum3spaA71D.jpg",
        region3: "진주",
        place3: "진주성",
        description3: "풍경이 매우 아름다워 많은 사람들이 이 장소를 좋아합니다. "
        + "평소에 봐도 아름다운 장소지만, 유등 축제 기간에 방문하면 강에도 유등이 있어 배로 아름다운 장소가 됩니다."
      }
    ]
  },
  {
      name: "전라선",
      destination: [
      {
        image1: "https://ak-d.tripcdn.com/images/100v0z000000nwfg32AB5_C_900_600_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
        region1: "전주",
        place1: "전주 한옥마을",
        description1: "전주 풍남동 일대에 위치한 국내 최대 규모의 전통 한옥촌이자 전국 유일의 도심 한옥군인 전주 한옥마을은 한옥의 고즈넉한 아름다움을 느낄 수 있는 마을입니다. " 
        + "마을에는 한옥 스테이 등 다양한 체험 공간이 있어 남녀노소 모두가 좋아하는 관광지입니다. 한복을 입고 마을을 거닐다보면 어느새 타임머신을 타고 과거로 와있는 듯한 느낌이 드는 곳이랍니다.",

        image2: "https://youimg1.tripcdn.com/target/10021f000001gxd0t3087_C_900_600_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
        region2: "순천",
        place2: "순천만 습지",
        description2: "순천만 자연생태공원은 남한 전라남도 순천시에 위치하고 있으며 도시에서 가장 유명한 관광 명소 중 하나입니다. "
        + "공원의 갈대 해변에서 갈대는 매우 높고, 수면은 엄격하고 밀폐되어 있으며, 매우 아름답습니다.",

        image3: "https://ak-d.tripcdn.com/images/100i1f000001gp3lq5D31_C_900_600_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
        region3: "여수",
        place3: "오동도",
        description3: "여수시 동쪽에 위치한 신항(新港)부두에서 1㎞ 거리에 있습니다. "
        + "동경 127°46′, 북위 34°44′에 위치하며, 면적은 0.13㎢, 해안선은 14㎞이다. 멀리서 보면 지형의 생김새가 오동잎처럼 보이고, 옛날에는 오동나무가 많이 있어 오동도라 불리게 되었습니다."
      }
    ]
  },
  {
      name: "강릉선",
      destination: [
      {
        image1: "https://youimg1.tripcdn.com/target/tg/218/726/587/9e7b6702929c486ca97db5d50cf9d4cc_C_670_376_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
        region1: "평창",
        place1: "대관령 삼양목장",
        description1: "대관령 삼양목장을 방문하면 눈앞에 펼쳐지는 드넓고 푸른 초원이 인상적입니다. "
        + "그 위를 몽실몽실한 양들이 걷고 있어서 이곳이 양목장임을 더욱 느끼게 됩니다. 특히, 양몰이쇼에서는 보더콜리라는 양몰이견이 히어로로 등장해 양떼를 안전하게 이끌어주는 모습이 멋집니다.",

        image2: "https://ak-d.tripcdn.com/images/100j0f0000007js9m4B30_C_900_600_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
        region2: "강릉",
        place2: "경포대",
        description2: "경포대는 경포호수 북쪽 언덕에 위치한 정자입니다. 모두 48개의 기둥으로 이루어져 있으며, 입체적인 마루의 높이가 고려시대 양식의 특징을 고스란히 잘 담고 있습니다. "
        +"정자 주변에는 푸른 나무들이 우거져있어 더욱 운치 있는 곳입니다. 특히 은은한 달빛 아래에서 바라보는 야경도 예쁘다고 하니, 잊지 말고 꼭 들러보세요.",

        image3: "https://ak-d.tripcdn.com/images/1me1s12000bbdsk3oCCDF_C_900_600_Q70.png?proc=source%2ftrip&proc=source%2ftrip",
        region3: "동해",
        place3: "논골담길",
        description3: "논골담길은 1941년 개항된 묵호항의 역사와 삶의 이야기를 고스란히 간직한 감성스토리 마을입니다. "
        + "과거 동네 개도 만원짜리를 물고 다녔다고 할 만큼 풍요롭고 넉넉했던 시절이 지나고 지금은 묵호의 삶을 지게에 지고 이겨냈던 사람들만이 마을을 지키고 있다고 합니다."
      }
    ]
  },
  {
      name: "중앙선",
      destination: [
      {
        image1: "https://ak-d.tripcdn.com/images/100c1f000001gsv2xBB01_C_900_600_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
        region1: "원주",
        place1: "오크밸리 리조트",
        description1: "천혜의 자연 속에서 이국적인 아름다움을 자랑하는 오크밸리는 수려한 자연 경관을 만끽할 수 있는 다이내믹한 골프 코스, 고객 편의를 위한 각종 레저시설 및 편의시설, "
        + "편안한 휴식에 최적화된 객실을 갖춘 프리미엄 리조트입니다. 오크밸리는 골프 빌리지와 스키 빌리지로 구성되어 있습니다.",

        image2: "https://youimg1.tripcdn.com/target/01056120009a2uo4g9456_C_900_600_Q70.png?proc=source%2ftrip&proc=source%2ftrip",
        region2: "단양",
        place2: "하선암",
        description2: "단양팔경의 제6경으로 3단으로 이루어진 흰 바위가 넓게 마당을 내어주고 그 위에 둥글고 커다란 바위가 덩그러니 앉아 있는 형상이 미륵 같다 하여 부처바위(佛岩)라고 부르기도 합니다.",

        image3: "https://youimg1.tripcdn.com/target/10071f000001h6yfz1CF0.jpg",
        region3: "안동",
        place3: "안동 하회마을",
        description3: "안동 하회마을은 경상북도 안동시 풍천면에 있는 전통 민속마을입니다. 문화재로 지정된 건축물들은 보물 2점, 국가민속문화재 9점 등을 포함하여 11점이고 이밖에 국보 2점이 있습니다. "
        + "2010년 7월 31일 브라질 브라질리아에서 열린 유네스코 세계유산위원회(WHC)의 제34차 회의에서 경주 양동마을과 함께 세계문화유산 등재가 확정되었습니다."
      }
    ]
  },
  {
      name: "중부내륙선",
      destination: [
      {
        image1: "https://ak-d.tripcdn.com/images/35021900000189jxx7066_C_900_600_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
        region1: "이천",
        place1: "지산 포레스트리조트",
        description1: "지산스키장은 서울 교외에서 단 1시간 거리에 있어 관광객들이 놀기에 더 적합합니다. 다양한 수준의 스키 애호가에게 적합한 다양한 슬라이드가 있습니다. " 
        + "초보자도 시도해 볼 수 있습니다. 스키장에서는 스키 장비 스노보드를 제공하며 출근까지 완비됩니다. 스키 리조트에는 관광객들이 휴식을 취하고 배고픔을 달래기 위해 쉴 수 있는 레스토랑과 편의점이 있습니다.",

        image2: "https://youimg1.tripcdn.com/target/0102b3224utkdcirkECBA_C_900_600_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
        region2: "여주",
        place2: "명성황후생가",
        description2: "명성황후가 출생하여 8세까지 살던 집입니다. 현재 생가가 복원되어 있고, 그 옆에 감고당과 명성황후 기념관이 존재합니다. " 
        + "조선 26대 임금인 대한제국 고종의 처가(妻家)이자 27대 임금인 대한제국 순종의 외가로 있던 곳이기도 합니다.",

        image3: "https://ak-d.tripcdn.com/images/0102q120008oxfk253FEC_C_900_600_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
        region3: "충주",
        place3: "충주박물관",
        description3: "중원 문화권의 학술 연구와 유물 및 유적 등을 보존하고 박물관 학교 와 각종 특별전 등의 행사를 통하여 시민과 함께 하는 박물관 실현을 목적으로 설립되었습니다. " 
        + "1986년 11월 25일 성내동에 유물전시관을 개관하였습니다."
      }
    ]
  }
]

  // const currentLine = trainLines[activeTab];
  // const currentStation = currentLine.stations[activeImage];

  const currentTravel = travelDestination[activeTab];
  const currentDestination = currentTravel.destination[activeDestImage];



return (
  <div>
    <h1>기차역 노선정보</h1>
    <Tabs className="lineTab"
      activeKey={activeTab}
      onSelect={handleTabSelect}
      id="train-line-tabs"
    >
      {trainLines.map((line, index) => (
        <Tab key={index} eventKey={index} title={line.name}>
          <Container>
          <Row>
            <table className="image-table" frame="void">
              <tbody>
                <tr>
                  <th width="50%">
                    <Image src={currentStation.image} alt={currentStation.name} fluid width={430} height={477}/>
                  </th>
                  <th width="50%">
                    <Image src={currentStation.image2} alt={currentStation.name} fluid width={546} height={477}/>
                  </th>
                </tr>
              </tbody>
            </table>
          </Row>
          <Row className="image-nav">
            <Col>
              <Button onClick={handlePrevImage} variant="light">
                <ArrowLeftCircle size={24} />
              </Button>
            </Col>
            <Col>
              <Button onClick={handleNextImage} variant="light">
                <ArrowRightCircle size={24} />
              </Button>
            </Col>
          </Row>
          <Row>
            <div className="info-table">
              <table>
                <tbody>
                  <tr>
                    <th>역명</th>
                    <td>{currentStation.name}</td>
                  </tr>
                  <tr>
                    <th>노선</th>
                    <td>{currentStation.route}</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>{currentStation.address}</td>
                  </tr>
                  <tr>
                    <th>연락처</th>
                    <td>{currentStation.number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Row>
        </Container>

          <Container>
            <Row>
              <h1 className="tab-title">추천 여행지</h1>
              <table className="travel-info-table">
                <thead>
                  <tr>
                    <th width="30%">이미지</th>
                    <th width="10%">지역</th>
                    <th width="15%">장소</th>
                    <th width="45%">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Image src={currentDestination.image1} alt={currentDestination.place1} fluid /></td>
                    <td>{currentDestination.region1}</td>
                    <td>{currentDestination.place1}</td>
                    <td>{currentDestination.description1}</td>
                  </tr>
                  <tr>
                    <td><Image src={currentDestination.image2} alt={currentDestination.place2} fluid /></td>
                    <td>{currentDestination.region2}</td>
                    <td>{currentDestination.place2}</td>
                    <td>{currentDestination.description2}</td>
                  </tr>
                  <tr>
                    <td><Image src={currentDestination.image3} alt={currentDestination.place3} fluid /></td>
                    <td>{currentDestination.region3}</td>
                    <td>{currentDestination.place3}</td>
                    <td>{currentDestination.description3}</td>
                  </tr>
                </tbody>
              </table>
            </Row>
          </Container>
        </Tab>
      ))}
    </Tabs>
  </div>
  );
}

export default TrainStation;
