import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const history = useHistory();
  const [cards, setCards] = useState({
    //key는 카드의 id이고, 이 자체가 card의 오브젝트가 된다. (현재 cards는 배열이 아닌 오브젝트 형태)
    1: {
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
    2: {
      id: "2",
      name: "ellie",
      company: "samsung",
      theme: "light",
      title: "software engineer",
      email: "kaste3@naver.com",
      message: "go for it",
      filenam: "ellie",
      fileURL: null,
    },
    3: {
      id: "3",
      name: "ellie",
      company: "samsung",
      theme: "colorful",
      title: "software engineer",
      email: "kaste3@naver.com",
      message: "go for it",
      filenam: "ellie",
      fileURL: null,
    },
  });

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

  const CreateOrUpdateCard = (card) => {
    // const updated = { ...cards };
    // updated[card.id] = card;
    // setCards(updated);
    // 이 방법은 state인 cards의 상태가 최신이 아닌 예전 상태일 수가 있어서
    // 업데이트가 동기적으로 일어나지 못할 수도 있다.

    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      //card.id를 통해 updated에서 val을 찾는다.
      //card.id == 1 이면
      //updated에서 첫번째 {id:1, name:ellie} 오브젝트가 찾아진다.
      //card.id == 12 라면 12번째를 찾게 되겠지 근데 없으면
      //key=12 인 새로운걸 만든다. 그래서 card.id와 updated(or cards)의 key값이 동일해야 하는 것
      console.log("id:::::", updated[card.id]);
      return updated;
    });
    //setState함수는 위와 같이 콜백을 함수를 쓸 수 있는데
    //위와 같은 경우는 setCards가 실행되는 그 순간의 state를 불러와서
    //새로운 값을 리턴하도록 만드는 것
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          cards={cards}
          addCard={CreateOrUpdateCard}
          updateCard={CreateOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
