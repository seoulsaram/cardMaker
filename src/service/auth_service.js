import firebase from "firebase";
import firebaseApp from "./firebase";

//사용자의 로그인, 로그아웃을 담당하는 클래스
class AuthService {
  //providerName : Google, github, facebook.. 인지
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user);
      //사용자가 바뀔때마다 사용자 정보를 등록
      //새로운 사용자가 아닐 경우 유지
    });
  }
}

export default AuthService;
