import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Login from "./components/login/login";
import Maker from "./components/maker/maker";
//로그인 후 홈화면으로 가기 (해더, 푸터, 가운데 빈 화면)
//파이어베이스에서 로그아웃 하는 법 찾아서 구현하기
function App({ FileInput, authService }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <Login authService={authService} />
          </Route>
          <Route path="/maker">
            <Maker FileInput={FileInput} authService={authService} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
