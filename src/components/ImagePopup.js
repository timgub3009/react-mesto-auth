function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_closeup ${props.isOpen && "popup_opened"}`}
    >
      <figure className="popup__figure">
        <button className="popup__close-button" onClick={props.onClose} />
        <img
          className="popup__image"
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
        />
        <figcaption className="popup__figcaption">
          {props.card && props.card.name}
        </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
