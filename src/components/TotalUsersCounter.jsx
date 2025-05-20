import React, { Fragment, useEffect, useState } from 'react';
import * as styles from '../css/components/TotalUsersCounter.css.ts';
import fetchRequest from '../fetchConfig.jsx';

// 유저가 몇명인지 보여주기 위한 컴포넌트입니다.
function TotalUsersCounter({ font_size }) {
    const [numParticipants, setNumParticipants] = useState(0);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetchRequest('/api/participations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                // 응답 구조에 따라 사용자 수 추출 (예: data.data.count)
                const count = data.data;
                setNumParticipants(count);
            } catch (error) {
                console.error('사용자 수 가져오기 오류:', error);
                setNumParticipants(0);
            } 
        };
        fetchParticipants();
    }, []);

    // 페이지마다 fontsize가 달라서 사이즈를 불러오는 형식으로 진행하였습니다.
    return (
    <Fragment>
      <div className={styles.totalUsersCounter} style={{ fontSize: font_size }}>
        현재 <span className={styles.totalUsersCounter_span}>{numParticipants}명</span> 참여중이에요!
      </div>
    </Fragment>
  );
}

export default TotalUsersCounter;