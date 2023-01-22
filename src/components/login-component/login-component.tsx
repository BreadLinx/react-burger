import styles from "./login-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { Link, useHistory } from "react-router-dom";
import { sendLogin } from "services/actions/sendLogin-action";
import { errorSlice } from "services/reducers/error-slice";
import { useFormAndValidation } from "hooks/useFormAndValidation";

export const LoginComponent: FC = () => {
  // Объявляем констунты
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  // Достаем статусы запроса
  const { request, error, errorMessage, success } = useAppSelector(
    state => state.loginAuthReducer.requestStatus.login,
  );

  // Достаем экшны для показа ошибок
  const { showError, hideError } = errorSlice.actions;

  // Переадресовываем в случае успеха логина или показываем ошибку
  useEffect(() => {
    if (success) {
      setValues({
        email: "",
        password: "",
      });
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
  }, [
    error,
    success,
    history,
    dispatch,
    showError,
    hideError,
    errorMessage,
    setValues,
  ]);

  // Логика переключения видимости пароля
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function onIconClick() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  // Обрабатываем сабмит
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(sendLogin({ email: values.email, password: values.password }));
  }

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Вход</h1>
        <form onSubmit={handleSubmit} className={`${styles.form}`} noValidate>
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
              required
              size={"default"}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={isPasswordVisible ? "password" : "text"}
              icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
              onIconClick={onIconClick}
              placeholder={"Пароль"}
              onChange={handleChange}
              value={values.password || ""}
              name={"password"}
              error={!!errors.password}
              errorText={errors.password}
              disabled={request}
              required
              size={"default"}
            />
          </div>
          <Button
            disabled={!isValid || request}
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
};
