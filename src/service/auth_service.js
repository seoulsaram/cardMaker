import { firebaseAuth, githubProvider, googleProvider } from "./firebase";

//사용자의 로그인, 로그아웃을 담당하는 클래스
class AuthService {
  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return googleProvider;
      case "Github":
        return githubProvider;
      default:
        throw new Error(`not supported provider : ${providerName}`);
    }
  }
  //providerName : Google, github, facebook.. 인지
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
      //사용자가 바뀔때마다 사용자 정보를 등록
      //새로운 사용자가 아닐 경우 유지
    });
  }
}

export default AuthService;
