import styles from "./reset-password-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, FC, FormEvent } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { sendResetPassword } from "services/actions/sendResetPassword-action";
import { errorSlice } from "services/reducers/error-slice";
import { successSlice } from "services/reducers/success-slice";
import { forgotPasswordSlice } from "services/reducers/forgot-password-slice";
import { sendForgotPassword } from "services/actions/sendForgotPassword-action";
import { useFormAndValidation } from "hooks/useFormAndValidation";
import { useAppDispatch, useAppSelector } from "hooks";

export const ResetPasswordComponent: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { state } = useLocation() as { state: { [key: string]: string } };
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { request, success, error, errorMessage } = useAppSelector(
    state => state.forgotPasswordReducer.requestStatus.resetPassword,
  );

  const { forgotPassword } = useAppSelector(
    state => state.forgotPasswordReducer.requestStatus,
  );

  const { resetStatuses } = forgotPasswordSlice.actions;
  const { showError, hideError } = errorSlice.actions;
  const { showSuccess, hideSuccess } = successSlice.actions;

  // onSubmit
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      sendResetPassword({ password: values.password, code: values.code }),
    );
  }

  useEffect(() => {
    if (success) {
      setValues({
        password: "",
        code: "",
      });
      history.replace({ pathname: "/login" });
      dispatch(resetStatuses());
    }
    if (error) {
      switch (errorMessage) {
        case "Invalid credentials provided":
          dispatch(
            showError(
              "При попытке сброса пароля произошла ошибка. Введеный код неверный или устарел, попробуйте еще раз запросить код.",
            ),
          );
          break;
        default:
          dispatch(
            showError(
              "При попытке сброса пароля произошла ошибка. Проверьте введенные данные и попробуйте еще раз.",
            ),
          );
      }
      setTimeout(() => {
        dispatch(hideError());
      }, 7000);
    }
  }, [
    success,
    error,
    dispatch,
    showError,
    hideError,
    errorMessage,
    history,
    resetStatuses,
    setValues,
  ]);

  useEffect(() => {
    if (forgotPassword.success) {
      dispatch(
        showSuccess(
          "Код успешно отправлен. Следующий код можно будет запросить через 30 секунд.",
        ),
      );
      setTimeout(() => {
        dispatch(hideSuccess());
      }, 7000);
    }
    if (forgotPassword.error) {
      dispatch(
        showError(
          "При попытке запроса нового кода произошла ошибка. Попробуйте еще раз немного позже.",
        ),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 7000);
    }
  }, [
    forgotPassword.success,
    forgotPassword.error,
    dispatch,
    hideSuccess,
    showSuccess,
    hideError,
    showError,
  ]);

  // password visibility toggler
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function onIconClick() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const [isCodeButtonDisabled, setIsCodeButtonDisabled] = useState(false);
  function handleRequestCodeAgain() {
    dispatch(sendForgotPassword(state.email));
    setIsCodeButtonDisabled(true);
    setTimeout(() => {
      setIsCodeButtonDisabled(false);
    }, 30000);
  }

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={`${styles.form}`} noValidate onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <Input
              type={isPasswordVisible ? "password" : "text"}
              icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
              error={!!errors.password}
              onChange={handleChange}
              onIconClick={onIconClick}
              value={values.password || ""}
              placeholder={"Введите новый пароль"}
              name={"password"}
              errorText={"Минимум 8 симолов. Мининмум 1 цифра в пароле."}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              disabled={request}
              size={"default"}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              error={!!errors.code}
              onChange={handleChange}
              value={values.code || ""}
              type={"text"}
              placeholder={"Введите код из письма"}
              name={"code"}
              errorText={errors.code}
              required
              minLength={6}
              maxLength={40}
              disabled={request}
              size={"default"}
            />
          </div>
          <Button
            disabled={!isValid || request}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
        <span className="text text_type_main-default text_color_inactive">
          <button
            onClick={handleRequestCodeAgain}
            disabled={isCodeButtonDisabled}
            className={`text text_type_main-default ${styles.button} ${
              isCodeButtonDisabled ? styles.buttonActivated : ""
            }`}
          >
            Запросить код повторно
          </button>
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
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
};
