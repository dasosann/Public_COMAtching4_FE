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
    username: "",
    major: "",
    age: null,
    admissionYear: null,  // 입학년도
    song: "",
    mbti: "",
    point: 0,
    pickMe: 0,
    contact_id: "",
    canRequestCharge: false,
    hobby: [],
    comment: "",
    numParticipants: 0,
    contact_frequency: "",
    contact: "",
  },
});


export const adminUserState = atom({
  key: "adminUserState",
  default: {
    acountId: "",  
    schoolEmail:"",
    nickname: "",           
    role: "",
    university:"",
    universityAuth:"",
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
    { id: "1", label: "MBTI", key: "mbti" },
    { id: "2", label: "관심사", key: "hobby" },
    { id: "3", label: "나이", key: "age" },
    { id: "4", label: "연락빈도", key: "contact" }
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