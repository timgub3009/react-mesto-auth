import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import Skeleton from "./Skeleton";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={`Аватар ${currentUser.name}`}
          />
          <button
            className="profile__avatar-edit-button"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={props.onEditProfile}
          />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__table">
          {props.isImageLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : props.cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  link={card.link}
                  name={card.name}
                  likes={card.likes.length}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
