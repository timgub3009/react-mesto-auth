import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onDelete(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitText={props.isLoading ? "Удаление..." : "Да"}
      formName={"removal-form"}
      name={"confirm-removal"}
      title={"Вы уверены?"}
      onSubmit={handleSubmit}
    />
  );
}

export default PopupWithConfirmation;
