import styles from "./forgot-password-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useMemo, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPassword } from "../../services/actions/sendForgotPassword-action.js";
import { errorSlice } from "../../services/reducers/error-slice.js";
import { successSlice } from "../../services/reducers/success-slice.js";

export function ForgotPasswordComponent() {
  // написать коменты и сделать протект роут
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  const { request, success, error, errorMessage } = useSelector(
    state => state.forgotPasswordReducer.requestStatus.forgotPassword,
  );

  const { showError, hideError } = errorSlice.actions;
  const { showSuccess, hideSuccess } = successSlice.actions;

  const [emailValue, setEmailValue] = useState("");
  const [validationEnabled, setValidationEnabled] = useState({
    emailInput: false,
  });
  const emailInputRef = useRef(null);

  function enableValidation(input) {
    setValidationEnabled({
      ...validationEnabled,
      [input]: true,
    });
  }

  function handleEmailChange(e) {
    if (!validationEnabled.emailInput && e.target.value.length >= 1) {
      enableValidation("emailInput");
    }
    setEmailValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendForgotPassword(emailValue));
  }

  useEffect(() => {
    if (success) {
      dispatch(showSuccess("Код успешно запрошен."));
      setTimeout(() => {
        dispatch(hideSuccess());
      }, 3000);

      history.replace({
        pathname: "/reset-password",
        state: { ...state, forgotStatus: "success", email: emailValue },
      });
      setEmailValue("");
    }
    if (error) {
      switch (errorMessage) {
        default:
          dispatch(
            showError(
              "При попытке отправки запроса произошла ошибка. Проверьте введенные данные и попробуйте еще раз. Возможно почта введена в неверном формате, попробуйте изменить ее.",
            ),
          );
      }
      setTimeout(() => {
        dispatch(hideError());
      }, 13000);
    }
  }, [
    success,
    error,
    dispatch,
    errorMessage,
    showError,
    hideError,
    history,
    state,
    hideSuccess,
    showSuccess,
    emailValue,
  ]);

  const isSubmitButtonDisabled = useMemo(() => {
    if (request || !emailInputRef?.current?.validity?.valid) {
      return true;
    }
    return false;
  }, [request, emailInputRef?.current?.validity?.valid]);

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={handleEmailChange}
            value={emailValue}
            name={"email"}
            error={
              validationEnabled.emailInput &&
              !emailInputRef?.current?.validity?.valid
                ? true
                : false
            }
            errorText={"Неверный E-mail"}
            disabled={request ? true : false}
            ref={emailInputRef}
            required
            minLength={2}
            maxLength={50}
            size={"default"}
          />
          <Button
            disabled={isSubmitButtonDisabled}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Восстановить
          </Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
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
}
