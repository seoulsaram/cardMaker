import React from "react";
import Button from "../button/button";
import styles from "./card_edit_form.module.css";

const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
  const { name, company, title, email, message, theme, fileName } = card;

  const onFileChange = (file) => {
    updateCard({
      ...card,
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onChange = (event) => {
    if (event.currentTarget == null) {
      //event의 currentTarget이 널이라면 아무것도 해주지 않을 것임
      return;
    }
    event.preventDefault();
    updateCard({
      ...card,
      [event.currentTarget.name]: event.currentTarget.value,
      //...card로 기존의 카드를 복사해오고, 그 뒤에 위의 값을 붙여줄것
      //key값은 input태그의 name을, value는 value를 쓸 거니까 위와 같이 가져옴
    });
  };
  const onSubmit = (event) => {
    deleteCard(card);
    //<CardEditForm key={key} card={cards[key]} updateCard={updateCard} deleteCard={deleteCard} />
    //상위 컴포넌트에서 만들어지는 card마다 key를 전달하고 있기 때문에
    //해당 key값을 이용해서 컴포넌트가 delete되는 것
  };
  return (
    <form className={styles.form}>
      <input className={styles.input} type="text" name="name" value={name} onChange={onChange} />
      <input
        className={styles.input}
        type="text"
        name="company"
        value={company}
        onChange={onChange}
      />
      <select className={styles.select} name="theme" value={theme} onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="colorful">Colorful</option>
      </select>
      <input className={styles.input} type="text" name="title" value={title} onChange={onChange} />
      <input className={styles.input} type="text" name="email" value={email} onChange={onChange} />
      <textarea
        className={styles.textarea}
        name="message"
        value={message}
        onChange={onChange}
      ></textarea>
      <div className={styles.fileInput}>
        <FileInput name={fileName} onFileChange={onFileChange} />
      </div>
      <Button name="Delete" onClick={onSubmit} />
    </form>
  );
};

export default CardEditForm;
