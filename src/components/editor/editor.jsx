import CardAddForm from "../card_add_form/card_add_form";
import CardEditForm from "../card_edit_form/card_edit_form";
import styles from "./editor.module.css";

const Editor = ({ FileInput, cards, addCard, updateCard, deleteCard }) => {
  return (
    <section className={styles.editor}>
      <h1 className={styles.title}>Card Maker</h1>
      {Object.keys(cards).map((key) => (
        <CardEditForm
          key={key}
          FileInput={FileInput}
          card={cards[key]}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ))}
      <CardAddForm FileInput={FileInput} onAdd={addCard} />
    </section>
  );
};
//현재 cards의 형태
//cards =
// { 1: {
//   id: "1",
//   name: "ellie",
//   company: "samsung",
//   theme: "light",
//   title: "software engineer",
//   email: "kaste3@naver.com",
//   message: "go for it",
//   filenam: "ellie",
//   fileURL: null,
// },}

// const obj = { 0: {name:'ellie'}, 1: 'b', 2: 'c' };
// function ob(obj){
//   Object.keys(obj).map((key)=>{console.log(`obj[key] : ${obj[key].name}, key: ${key}`)});
// }
// ob(obj);

// > "obj[key] : ellie, key: 0"
// > "obj[key] : undefined, key: 1"
// > "obj[key] : undefined, key: 2"

export default Editor;
