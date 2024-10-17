import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// * 기본 설정 *
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// * Auth *
export async function login() {
  return signInWithPopup(auth, provider)
    .then((res) => {
      const user = res.user;
      return user;
    })
    .catch((error) => console.log(error));
}

export async function logout() {
  console.log("logout!");
  return signOut(auth).then(() => null);
}

// user의 상태 변화를 감시하는 함수
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    const updatedUser = user ? user : null;
    callback(updatedUser);
  });
}
