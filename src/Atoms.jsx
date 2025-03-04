import { atom } from "recoil";

export const charge = atom({
  key: "charge",
  default: {
    chargeclick: false,
  },
});

export const adminRequests = atom({
  key: "adminRequests",
  default: [],
});

// export const userState = atom({
//   key: "userState",
//   default: {
//     username: "",
//     major: "",
//     age: "",
//     admissionYear: null,
//     song: "",
//     mbti: "",
//     point: 0,
//     pickMe: 0,
//     contact_id: "",
//     canRequestCharge: true,
//     hobby: [],
//     comment: "",
//     numParticipants: 0,
//     contact_frequency:"",
//     contact: "kakao",
//   },
// });

export const userState = atom({
  key: "userState",
  default: {
    username: "겨울이오길",
    major: "경영학과",
    age: 22,
    admissionYear: 2021,  // 입학년도 (22살 기준)
    song: "한로로 - 사랑하게 될 거야",
    mbti: "ENTP",
    point: 120, // 적당한 기본 포인트 값 설정
    pickMe: 5, // 임의 값
    contact_id: "@winterizcoming_",
    canRequestCharge: true,
    hobby: ["인디음악", "독서", "영화 감상"], // 취미에 추가 요소 넣음
    comment: "친하게 지내요@!🙃",
    numParticipants: 3, // 예제 값
    contact_frequency: "보통 ➡️", 
    contact: "kakao",
  },
});

export const adminUserState = atom({
  key: "adminUserState",
  default: {
    isChecked: false,  // 관리자 로그인 여부
    userId: "",  
    email:"",
    name: "",           // 관리자 실명
    authority: "",
    university:"",      
  },
});
export const selectedMBTIState = atom({
  key: "selectedMBTIState",
  default: {
    EI: "",
    SN: "",
    TF: "",
    PJ: "",
  },
});

export const MatchPickState = atom({
  key: "MatchPickState",
  default: {
    selectedMBTI: ["X", "X", "X", "X"],
    selectedCategory: [],
    point: 1000,
    balance: null,
    isUseOption: [false, false, false, false],
    formData: {
      ageOption: "",

      mbtiOption: "",
      hobbyOption: [],
      contactFrequencyOption: "",
      sameMajorOption: false,
    },
  },
});

export const MatchResultState = atom({
  key: "MatchResultState",
  default: {
    age: 0,
    comment: "",
    contactFrequency: "",
    currentPoint: 0,
    gender: "",
    hobby: [],
    major: "",
    mbti: "",
    socialId: "",
    song: "",
  },
});

export const checkresultState = atom({
  key: "checkresultState",
  default: [],
});

export const priorityState = atom({
  key: "priorityState",
  default: [
    { id: "1", label: "MBTI" },
    { id: "2", label: "관심사" },
    { id: "3", label: "나이" },
    { id: "4", label: "연락빈도" }
  ],
});

export const profileEditState = atom({
  key: 'profileEditState',
  default: {
    nickname: '겨울이오길',
    age: '25',
    school: '가톨릭대학교',
    department: '정보통신전자공학부',
    contact: 'instagram',
    
    contact_id: "@winterizcoming_",
    interests:["헬스", "맛집탐방"],
    favoriteSong: '실리카겔 - Tik Tak Tok',
    selectedMBTIEdit: "ESFJ",
    major:"공학",
    ageOption: "YOUNGER",
    introduction: '인디노래 좋아하세요? 😌',
  },
});