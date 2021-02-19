import firebase from "firebase";

//사용자의 로그인, 로그아웃을 담당하는 클래스
class AuthService {
  //providerName : Google, github, facebook.. 인지
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebase.auth().signInWithPopup(authProvider);
  }
}

export default AuthService;
