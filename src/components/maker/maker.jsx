import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  //사용자의 id별로 카드가 저장될 수 있게 만들어야 함
  //사용자의 id는 로그인을 할 때 히스토리에 함께 전달하는데, 전달된 히스토리 안에 있는 id를
  //maker컴포넌트 안에서 state로 저장할거다.
  //userId의 초기값은 useHistory안의 state를 먼저 받아올건데,
  //history state는 로그인과 같은 컴포넌트를 통해 왔다면값이 있을 것이고
  //아니라면 값이 없을 수도 있다.
  //그래서 userId의 초기값에 historystate가 있다면 그 id를 사용한다고 써준것
  const [cards, setCards] = useState({});

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);
  //useCallback : 함수가 계속 호출되어도 동일한 데이터를 쓰려면 이것을 사용
  //useCallback을 사용한 함수는 props나 state가 변경되어도, 한 번 만들어진 함수를 계속 그대로 재사용한다는 것을 의미한다
  //때문에 어떤 프롭이 변경되었을 때 새로운 콜백을 만들어야 한다면, 그 프롭을 useCallback의 인자로 전달해주면
  //그 프롭이 변경되었을 때는 함수를 재사용하지 않고 다시 만든다

  //마운트 되었을 때와 사용자 id가 변경될 때마다 사용할 것
  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
      //cardRepository의 syncCards메서드는 return으로 ref.off를 하고 있으므로
      //변수 stopSync에는 이 return된 ref.off가 담긴다
    });
    return () => stopSync();
    //useEffect메서드의 return은 컴포넌트가 unmount될 때 자동으로 호출된다.
  }, [userId, cardRepository]);

  //login용
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [authService, userId, history]);

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
      return updated;
      //setState함수는 위와 같이 콜백을 함수를 쓸 수 있는데
      //위와 같은 경우는 setCards가 실행되는 그 순간의 state를 불러와서
      //새로운 값을 리턴하도록 만드는 것
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
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
          FileInput={FileInput}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
