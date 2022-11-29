import styles from "./login-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { sendLogin } from "../../services/actions/sendLogin-action";
import { errorSlice } from "../../services/reducers/error-slice.js";

export function LoginComponent() {
  // Объявляем констунты
  const dispatch = useDispatch();
  const history = useHistory();

  // Достаем статусы запроса
  const { request, error, errorMessage, success } = useSelector(
    state => state.loginAuthReducer.requestStatus.login,
  );

  // Достаем экшны для показа ошибок
  const { showError, hideError } = errorSlice.actions;

  // Создаем стейты для инпутов
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // Создаем рефы для инпутов
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Объект валидации
  const [validationEnabled, setValidationEnabled] = useState({
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

  // Обрабатываем изменения на инпуте почты/логина
  function handleEmailChange(e) {
    if (!validationEnabled.nameInput && e.target.value.length >= 1) {
      enableValidation("emailInput");
    }
    setEmailValue(e.target.value);
  }

  // Обрабатываем изменения на инпуте пароля
  function handlePasswordChange(e) {
    if (!validationEnabled.passwordInput && e.target.value.length >= 1) {
      enableValidation("passwordInput");
    }
    setPasswordValue(e.target.value);
  }

  // Переадресовываем в случае успеха логина или показываем ошибку
  useEffect(() => {
    if (success) {
      setEmailValue("");
      setPasswordValue("");
      history.replace({ pathname: "/" });
    }
    if (error) {
      switch (errorMessage) {
        case "email or password are incorrect":
          dispatch(
            showError(
              "Ошибка при попытке входи в личный кабинет. Пароль или почта некорректные. Перепроверьте правильность введенных данных и попробуйте еще раз.",
            ),
          );
          break;
        default:
          dispatch(
            showError(
              "При выполнении запроса произошла ошибка. Проверьте корректность введенных данных и попробуйте еще раз.",
            ),
          );
      }
      setTimeout(() => {
        dispatch(hideError());
      }, 12000);
    }
  }, [error, success, history, dispatch, showError, hideError, errorMessage]);

  // Показываем ошибку если инпут почты невалидный
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

  // Показываем ошибку если инпут пароля невалидный
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

  // Выключаем кнопку если какой то инпут невалидный
  const isSubmitButtonDisabled = useMemo(() => {
    if (!validationEnabled.emailInput && !validationEnabled.passwordInput) {
      return true;
    }
    if (!emailValue || !passwordValue) {
      return true;
    }
    if (!isEmailWrong && !isPasswordWrong) {
      return false;
    }
    return true;
  }, [
    validationEnabled.emailInput,
    validationEnabled.passwordInput,
    isEmailWrong,
    isPasswordWrong,
    emailValue,
    passwordValue,
  ]);

  // Логика переключения видимости пароля
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function onIconClick() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  // Обрабатываем сабмит
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendLogin({ emailValue, passwordValue }));
  }

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Вход</h1>
        <form onSubmit={handleSubmit} className={`${styles.form}`} noValidate>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleEmailChange}
            value={emailValue}
            name={"name"}
            error={isEmailWrong}
            ref={emailRef}
            errorText={"Некорректный формат Email."}
            disabled={request}
            size={"default"}
          />
          <Input
            type={isPasswordVisible ? "password" : "text"}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            onIconClick={onIconClick}
            placeholder={"Пароль"}
            onChange={handlePasswordChange}
            value={passwordValue}
            ref={passwordRef}
            name={"password"}
            error={isPasswordWrong}
            errorText={"Неверный формат пароля."}
            minLength={8}
            disabled={request}
            size={"default"}
          />
          <Button
            disabled={isSubmitButtonDisabled || request}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Войти
          </Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
        <span className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link
            to="/register"
            className={`text text_type_main-default ${styles.link}`}
          >
            Зарегестрироваться
          </Link>
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link
            to="/forgot-password"
            className={`text text_type_main-default ${styles.link}`}
          >
            Восстановить пароль
          </Link>
        </span>
      </div>
    </section>
  );
}
