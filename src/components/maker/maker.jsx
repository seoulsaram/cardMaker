import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const history = useHistory();
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "ellie",
      company: "samsung",
      theme: "light",
      title: "software engineer",
      email: "kaste3@naver.com",
      message: "go for it",
      filenam: "ellie",
      fileURL: null,
    },
    {
      id: "2",
      name: "ellie",
      company: "samsung",
      theme: "colorful",
      title: "software engineer",
      email: "kaste3@naver.com",
      message: "go for it",
      filenam: "ellie",
      fileURL: null,
    },
    {
      id: "3",
      name: "ellie",
      company: "samsung",
      theme: "dark",
      title: "software engineer",
      email: "kaste3@naver.com",
      message: "go for it",
      filenam: "ellie",
      fileURL: "ellie.png",
    },
  ]);
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
