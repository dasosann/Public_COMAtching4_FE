import { Client } from "@stomp/stompjs";

export const createStompClient = (roomId, onMessageCallback) => {
  const stompClient = new Client({
    brokerURL: `wss://backend.comatching.site/ws/chat?roomId=${roomId}`, // ✅ 직접 wss 사용
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("✅ WebSocket 연결 성공");

      // 메시지 구독
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        const parsed = JSON.parse(message.body);
        onMessageCallback(parsed);
      });
    },
    onStompError: (frame) => {
      console.error("❌ STOMP 오류 발생:", frame);
    },
  });

  stompClient.activate();
  return stompClient;
};
