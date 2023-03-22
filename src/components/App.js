import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import React, { useEffect } from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AppPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, card]) => {
        setCurrentUser(userData);
        setCards(card);
        setIsImageLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAuthorization(password, email) {
    auth.authorize(password, email)
    .then((res) => {
      if (res.token) {
        setEmail(res.email);
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true);
        navigate("/", { replace: true });
      }
    })
  }

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then(() => {
        handleSuccessfulRegistration();
        handleInfoTooltipClick();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        handleFailedRegistration();
        handleInfoTooltipClick();
        console.log(err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res.email) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      });
    }
  }, [setLoggedIn, navigate]);

  function handleSuccessfulRegistration() {
    setSuccess(true);
  }

  function handleFailedRegistration() {
    setSuccess(false);
  }

  function handleAddPlaceSubmit(items) {
    setIsLoading(true);
    api
      .addCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(items) {
    setIsLoading(true);
    api
      .editProfile(items)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(item) {
    setIsLoading(true);
    api
      .changeAvatar(item)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isDeleteCardPopupOpen ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    function closeByOverlayClick(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", closeByOverlayClick);
      return () => {
        document.removeEventListener("mousedown", closeByOverlayClick);
      };
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  function handleDeleteConfirmation(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }
  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <Header title="Регистрация" link="/sign-up" />
                <Login onLogin={handleAuthorization} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header title="Войти" link="/sign-in" />
                <Register onRegister={handleRegistration} />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <Navigate to={loggedIn ? "/" : "/sign-in"} />
                <Header title="Выйти" email={email} />
                <ProtectedRoute
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteConfirmation}
                  cards={cards}
                  isImageLoading={isImageLoading}
                />
                <Footer />
              </>
            }
          />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSignedUp={success}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <PopupWithConfirmation
          card={selectedCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
