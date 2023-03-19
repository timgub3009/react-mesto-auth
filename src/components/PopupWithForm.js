function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.formName}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className={
              props.isDisabled
                ? "popup__submit-button popup__submit-button_inactive"
                : "popup__submit-button"
            }
            disabled={props.isDisabled}
          >
            {props.submitText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
