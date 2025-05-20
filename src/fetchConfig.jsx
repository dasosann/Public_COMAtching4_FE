import Cookies from 'js-cookie';

const baseURL = 'https://backend.comatching.site';

const fetchRequest = async (path, options = {}) => {
    const url = `${baseURL}${path}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        ...options,
    };

    try {
        const response = await fetch(url, requestOptions);

        // 200 OK지만 리다이렉트된 HTML 응답 확인
        if (response.ok && response.redirected) {
            const text = await response.text();
            if (text.startsWith('<!DOCTYPE') || text.includes('<html')) {
                alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
                window.location.href = '/';
                return; // 함수 종료
            }
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log('errorData', errorData);
            if (response.status === 401 && (errorData.code === 'SEC-001' || errorData.code === 'SEC-002')) {
                alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                window.location.href = '/adminpage';
            } else if (response.status === 403) {
                alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                window.location.href = '/';
            } else if (response.status === 302) {
                alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
                window.location.href = '/';
            }
            return Promise.reject(new Error(`Error: ${response.status}`));
        }

        return response;
    } catch (error) {
        console.error('Network error or server is down:', error);
        alert('서버에 연결할 수 없습니다. 다시 시도해 주세요.');
        throw error;
    }
};

export default fetchRequest;