import React, { memo } from "react";
import styles from "./card.module.css";

const DEFAULT_IMAGE = "/images/default_logo.png";
const Card = memo(({ card }) => {
  const { name, company, title, email, message, theme, fileURL } = card;
  //card안에 있는 key를 변수로 선언하고 card를 넣어주면 각각 이름에 맞는 값들이 알아서 들어간다.
  const url = fileURL || DEFAULT_IMAGE;
  //fileURL이 없다면 DEFAULT_IMAGE를 사용한다.

  return (
    <li className={`${styles.card} ${getStyles(theme)}`}>
      <img className={styles.avatar} src={url} alt="profile" />
      <div className={styles.info}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.company}>{company}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.email}>{email}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </li>
  );
});

function getStyles(theme) {
  switch (theme) {
    case "dark":
      return styles.dark;
    case "light":
      return styles.light;
    case "colorful":
      return styles.colorful;
    default:
      throw new Error(`unknown theme: ${theme}`);
  }
}

export default Card;
