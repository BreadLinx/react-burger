import styles from "./register-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRegistration } from "../../services/actions/sendRegistration-action.js";
import { errorSlice } from "../../services/reducers/error-slice.js";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";

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

  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  // Обрабатываем сабмит
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      sendRegistration({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    );
  }

  // Переадресовываем в случае успеха регистрации или показываем ошибку
  useEffect(() => {
    if (success) {
      setValues({
        name: "",
        email: "",
        password: "",
      });
      history.replace({ pathname: "/" });
    }
    if (error) {
      switch (errorMessage) {
        case "User already exists":
          dispatch(
            showError(
              "Ошибка при регистрации. Такой пользователь уже существует. Вы можете зайти в личный кабинет через страницу авторизации.",
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
      }, 10000);
    }
  }, [
    error,
    success,
    history,
    dispatch,
    errorMessage,
    hideError,
    showError,
    setValues,
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
          <div className={styles.inputWrapper}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              value={values.name || ""}
              name={"name"}
              error={!!errors.name}
              errorText={errors.name}
              minLength={2}
              maxLength={50}
              disabled={request}
              size={"default"}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={"email"}
              placeholder={"E-mail"}
              onChange={handleChange}
              value={values.email || ""}
              name={"email"}
              error={!!errors.email}
              errorText={errors.email}
              disabled={request}
              size={"default"}
              maxLength={80}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={isPasswordVisible ? "password" : "text"}
              placeholder={"Пароль"}
              onIconClick={onIconClick}
              onChange={handleChange}
              icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
              value={values.password || ""}
              name={"password"}
              error={!!errors.password}
              disabled={request}
              errorText={"Минимум 8 симолов. Мининмум 1 цифра в пароле."}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              size={"default"}
            />
          </div>
          <Button
            disabled={!isValid || request}
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
