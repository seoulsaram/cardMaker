import React, { useRef, useState } from "react";
import styles from "./image_file_input.module.css";

//사용자에게 file이름을 받기
//업로드가 완료되면 불러줄 callback도 불러와야 함
const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  //로딩스피너
  const inputRef = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
    //input이 못생겼기 때문에 display:none을 할거라서
    //버튼이 눌렸을 때 input이 눌린 것 처럼 작동하도록 이렇게 해줌
  };

  const onChange = async (event) => {
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    //이미지가 받아와 진 후 로딩 없애기
    setLoading(false);
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
      {!loading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || "No file"}
        </button>
      )}
      {/* name이 없다면 "No file"을 표시할 것 */}
      {loading && <div className={styles.loading}></div>}
    </div>
  );
};

export default ImageFileInput;
