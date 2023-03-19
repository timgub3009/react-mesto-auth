function InfoTooltip(props) {
    return (
        <section
            className={`popup popup_type_infotooltip ${props.isOpen && "popup_opened"}`}
            >
                <div className="popup__container">
                <button className="popup__close-button" onClick={props.onClose} />
                    <img className="popup__sign" src="" alt=""/>
                    <h2 className="popup__status"></h2>
                </div>
        </section>
    )
}

export default InfoTooltip;