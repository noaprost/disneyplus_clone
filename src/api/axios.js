import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // 공통 baseURL 설정
  params: {
    api_key: API_KEY, // 모든 요청에 API_KEY를 자동으로 포함시킴
  },
  headers: {
    "Content-Type": "application/json", // 요청의 기본 헤더 설정
  },
  timeout: 5000, // 타임아웃 설정 (옵션)
});

// 인스턴스 내보내기
export default instance;
