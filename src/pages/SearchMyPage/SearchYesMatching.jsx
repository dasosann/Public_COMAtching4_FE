import React from 'react';
import SearchResultCard from '../../components/SearchResultCard';

const SearchYesMatching = () => {
    const sampleProfiles = [
        {
          nickname: "JaneDoe",
          major: "컴퓨터공학과",
          mbti: "INTJ",
          age: 22,
          admissionYear: 23,
          contact_id: "@janedoe",
          song: "IU - Love Poem",
          comment: "안녕하세요!!",
          hobby: ["해외여행"],
          contactFrequency: "보통",
        },
        {
          nickname: "JohnSmith",
          major: "경영학과",
          mbti: "ENTP",
          age: 24,
          admissionYear: 21,
          contact_id: "@johnsmith",
          song: "Coldplay - Fix You",
          comment: "새로운 도전을 즐깁니다!",
          hobby: ["인디음악", "사랑","인디음악", "사랑","인디음악", "사랑","인디음악", "사랑"],
          contactFrequency: "자주",
        },
        {
          nickname: "AliceKim",
          major: "심리학과",
          mbti: "INFJ",
          age: 23,
          admissionYear: 22,
          contact_id: "@alicekim",
          song: "BTS - Spring Day",
          comment: "심리학이 흥미로워요!",
          hobby: [  "영화"],
          contactFrequency: "가끔",
        },
      ];
    return (
        <div style={{width:'100%'}}>
            {sampleProfiles.map((profile, index) => (
              <SearchResultCard key={index} profile={profile} />
            ))}
        </div>
    );
};

export default SearchYesMatching;