import styles from "./register-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useMemo, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRegistration } from "../../services/actions/sendRegistration-action.js";
import { errorSlice } from "../../services/reducers/error-slice.js";

export function RegisterComponent() {
  // Объявляем константы
  const dispatch = useDispatch();
  const history = useHistory();

  // Достаем экшны для показа ошибок
  const { showError, hideError } = errorSlice.actions;

  // Достаем статусы запроса
  const { request, error, errorMessage, success } = useSelector(
    state => state.loginAuthReducer.requestStatus.registration,
  );

  // Объявляем стейты для инпутов
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // Объявляем рефы для инпутов
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Объект валидации
  const [validationEnabled, setValidationEnabled] = useState({
    nameInput: false,
    emailInput: false,
    passwordInput: false,
  });

  // Включаем валидацию
  function enableValidation(input) {
    setValidationEnabled({
      ...validationEnabled,
      [input]: true,
    });
  }

  // Обрабатываем изменение инпута имени
  function handleNameChange(e) {
    if (!validationEnabled.nameInput && e.target.value.length >= 1) {
      enableValidation("nameInput");
    }
    setNameValue(e.target.value);
  }

  // Обрабатываем изменение инпута почты/логина
  function handleEmailChange(e) {
    if (!validationEnabled.emailInput && e.target.value.length >= 1) {
      enableValidation("emailInput");
    }
    setEmailValue(e.target.value);
  }

  // Обрабатываем изменения инпута пароля
  function handlePasswordChange(e) {
    if (!validationEnabled.passwordInput && e.target.value.length >= 1) {
      enableValidation("passwordInput");
    }
    setPasswordValue(e.target.value);
  }

  // Обрабатываем сабмит
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendRegistration({ nameValue, emailValue, passwordValue }));
  }

  // Переадресовываем в случае успеха регистрации или показываем ошибку
  useEffect(() => {
    if (success) {
      setNameValue("");
      setEmailValue("");
      setPasswordValue("");
      history.replace({ pathname: "/" });
    }
    if (error) {
      switch (errorMessage) {
        case "User already exists":
          dispatch(
            showError(
              "Ошибка при регистрации. Такой пользователь уже существует. Вы можете зайти в личный кабинет через страницу логина.",
            ),
          );
          break;
        default:
          dispatch(
            showError(
              "При попытке регистрации произошла ошибка. Проверьте введенные данные и попробуйте еще раз. Возможно почта введена в неверном формате, попробуйте изменить ее.",
            ),
          );
      }
      setTimeout(() => {
        dispatch(hideError());
      }, 13000);
    }
  }, [error, success, history, dispatch, errorMessage, hideError, showError]);

  // Если имя некорректное, выводим ошибку
  const isNameWrong = useMemo(() => {
    if (validationEnabled.nameInput && !nameRef?.current?.validity?.valid) {
      return true;
    }
    if (validationEnabled.nameInput && nameValue === "") {
      return true;
    }
    return false;
  }, [
    validationEnabled.nameInput,
    nameValue,
    nameRef?.current?.validity?.valid,
  ]);

  // Если почта некорректная, выводим ошибку
  const isEmailWrong = useMemo(() => {
    if (validationEnabled.emailInput && !emailRef?.current?.validity?.valid) {
      return true;
    }
    if (validationEnabled.emailInput && emailValue === "") {
      return true;
    }
    return false;
  }, [
    validationEnabled.emailInput,
    emailValue,
    emailRef?.current?.validity?.valid,
  ]);

  // Если пароль некорректный, выводим ошибку
  const isPasswordWrong = useMemo(() => {
    if (
      validationEnabled.passwordInput &&
      !passwordRef?.current?.validity?.valid
    ) {
      return true;
    }
    if (validationEnabled.passwordInput && passwordValue === "") {
      return true;
    }
    return false;
  }, [
    validationEnabled.passwordInput,
    passwordValue,
    passwordRef?.current?.validity?.valid,
  ]);

  // Выключаем кнопку если поля невалидны
  const isSubmitButtonDisabled = useMemo(() => {
    if (
      !validationEnabled.nameInput &&
      !validationEnabled.emailInput &&
      !validationEnabled.passwordInput
    ) {
      return true;
    }
    if (!nameValue || !emailValue || !passwordValue) {
      return true;
    }
    if (!isNameWrong && !isEmailWrong && !isPasswordWrong) {
      return false;
    }
    return true;
  }, [
    validationEnabled.nameInput,
    validationEnabled.emailInput,
    validationEnabled.passwordInput,
    isNameWrong,
    isEmailWrong,
    isPasswordWrong,
    passwordValue,
    nameValue,
    emailValue,
  ]);

  // Логика изменения видимости пароля
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function onIconClick() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Регистрация</h1>
        <form className={`${styles.form}`} noValidate onSubmit={handleSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleNameChange}
            value={nameValue}
            name={"name"}
            error={isNameWrong}
            errorText={"Некорректное имя. Мин длина 2 символа."}
            ref={nameRef}
            minLength={2}
            maxLength={50}
            disabled={request}
            size={"default"}
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleEmailChange}
            value={emailValue}
            name={"email"}
            error={isEmailWrong}
            errorText={"Некорректный формат Email."}
            ref={emailRef}
            disabled={request}
            size={"default"}
          />
          <Input
            type={isPasswordVisible ? "password" : "text"}
            placeholder={"Пароль"}
            onIconClick={onIconClick}
            onChange={handlePasswordChange}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            value={passwordValue}
            name={"password"}
            error={isPasswordWrong}
            ref={passwordRef}
            disabled={request}
            errorText={"Придумайте более надежный пароль. Мин 1 цифра."}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            size={"default"}
          />
          <Button
            disabled={isSubmitButtonDisabled || request}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Зарегестрироваться
          </Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link
            to="/login"
            className={`text text_type_main-default ${styles.link}`}
          >
            Войти
          </Link>
        </span>
      </div>
    </section>
  );
}
