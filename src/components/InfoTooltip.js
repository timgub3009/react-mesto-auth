import React from "react";
import yes from "../images/yes.svg";
import no from "../images/no.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_infotooltip ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} />
        {props.isSignedUp ? (
          <>
            <img
              className="popup__sign"
              src={yes}
              alt="Регистрация успешно завершена"
            />
            <h2 className="popup__status">Вы успешно зарегистрировались!</h2>
          </>
        ) : (
          <>
            <img
              className="popup__sign"
              src={no}
              alt="Регистрация не удалась"
            />
            <h2 className="popup__status">
              Что-то пошло не так! Попробуйте ещё раз
            </h2>
          </>
        )}
      </div>
    </section>
  );
}

export default InfoTooltip;
