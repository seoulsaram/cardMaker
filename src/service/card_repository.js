import { firebaseDatabase } from "./firebase";

class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards/`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    //userId의 모든 cards를 받아와서, 만약 이 cards에 value가 있다면 on메서드를 통해
    //onUpdate를 실행할 것
    return () => ref.off();
  }

  saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }
  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
