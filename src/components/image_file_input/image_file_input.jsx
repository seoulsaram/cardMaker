import React, { useRef } from "react";
import styles from "./image_file_input.module.css";

//사용자에게 file이름을 받기
//업로드가 완료되면 불러줄 callback도 불러와야 함
const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
  const inputRef = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
    //버튼이 클릭되면 input의
  };

  const onChange = async (event) => {
    const uploaded = await imageUploader.upload(event.target.files[0]);
    console.log(uploaded);
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
    //onfileChange에 새로 등록된 파일 이름과 url을 보내서 상태변화를 알려야 한다.
  };
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <button className={styles.button} onClick={onButtonClick}>
        {name || "No file"}
      </button>
      {/* name이 없다면 "No file"을 표시할 것 */}
    </div>
  );
};

export default ImageFileInput;
