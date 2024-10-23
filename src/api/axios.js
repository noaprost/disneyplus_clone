import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // 공통 baseURL 설정
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
  headers: {
    "Content-Type": "application/json", // 요청의 기본 헤더 설정
  },
  timeout: 5000, // 타임아웃 설정
});

// 인스턴스 내보내기
export default instance;
