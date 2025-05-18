import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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
    admissionYear: null,  // 입학년도f
    song: "",
    mbti: "",
    point: 0,
    pickMe: 0,
    contact_id: "",
    year: "",
    month: "",
    day : "",
    university:"",
    canRequestCharge: false,
    hobby: [],
    comment: "",
    numParticipants: 0,
    contact_frequency: "",
    contact: "",
  },
});

const { persistAtom } = recoilPersist({
  key: 'adminUserState', // localStorage 키
  storage: localStorage, // 또는 sessionStorage
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
  effects_UNSTABLE: [persistAtom], // 상태 지속성 추가
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

const MatchPickState = atom({
  key: "MatchPickState",
  default: {
    point: 0,
    formData: {
      mbtiOption: "",
      hobbyOption: [],
      ageOption: "",
      contactFrequencyOption: "",
    },
    selectedMBTI: ["X", "X", "X", "X"],
    selectedCategory: [],
    isUseOption: [false, false, false, false],
    duplication: [], // ✅ 추가
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
    nickname: "",
    age: "",
    school: "",
    department: "",
    contact_id: "",
    favoriteSong: "",
    mbti: "",
    interests: [],
    contactFrequency: "",
    gender: "",
    introduction: "",
    schoolAuth: "",
    schoolEmail: "",
    ageOption: "", // 연락빈도 버튼 선택값
    },
});