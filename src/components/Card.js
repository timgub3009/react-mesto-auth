import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_type_active"
  }`;

  const cardDeleteButtonClassName = `elements__delete-button ${
    !isOwn && "elements__delete-button_type_hidden"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__card">
      <img
        className="elements__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        />
      <div className="elements__info">
        <h2 className="elements__card-heading">{props.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="elements__like-counter">{props.likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
