import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app.jsx";
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./components/image_file_input/image_file_input";

const authService = new AuthService();
const imageUploader = new ImageUploader();
const FileInput = (props) => <ImageFileInput {...props} imageUploader={imageUploader} />;
//ImageFileInput 컴포넌트를 index.js에서 만들어 FileInput에 넣은 뒤 하위 컴포넌트로 전달하고 있는 이유는
//ImageFileInput은 하하하하위 컴포넌트로, 이 컴포넌트를 사용하기 위해서
//상위컴포넌트 ->>>> ImageFileInput까지 계속해서 props를 전달해줘야 하는데
//만약 ImageFileInput에 보내야 할 porps가 많아질 경우
//각 상위 컴포넌트 마다 <Maker props1={props1} props2={props2} props3={props3}..../>
//컴포넌트를 일일이 다 써줘야 한다.
//하지만 최상위에서 FileInput에 ImageFileInput을 넣고, FileInput 안에서만 props들을 추가해주면
//전달 할 때 <Maker fileInput={FileInput}/> 으로 끝나기 때문에 훨씬 간단해진다.
// 메모 : props이 컴포넌트 자체일 경우, 이름은 대문자로 정해준다.(규칙)

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} />
  </React.StrictMode>,
  document.getElementById("root")
);
