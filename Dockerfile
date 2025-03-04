# 1. Node.js 기반 Vite 개발 서버 실행
FROM node:18-alpine
# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package.json package-lock.json ./

# 4. 의존성 설치 (빌드에만 필요, 실행 환경을 가볍게 하기 위함)
RUN npm ci

# 5. 프로젝트 전체 파일 복사
COPY . .



# 2. Vite 개발 서버 실행
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

