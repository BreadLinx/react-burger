import styles from "./reset-password-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useMemo, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendResetPassword } from "../../services/actions/sendResetPassword-action.js";
import { errorSlice } from "../../services/reducers/error-slice.js";
import { successSlice } from "../../services/reducers/success-slice.js";
import { forgotPasswordSlice } from "../../services/reducers/forgot-password-slice.js";
import { sendForgotPassword } from "../../services/actions/sendForgotPassword-action.js";

export function ResetPasswordComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  const { request, success, error, errorMessage } = useSelector(
    state => state.forgotPasswordReducer.requestStatus.resetPassword,
  );

  const { forgotPassword } = useSelector(
    state => state.forgotPasswordReducer.requestStatus,
  );

  const { resetStatuses } = forgotPasswordSlice.actions;
  const { showError, hideError } = errorSlice.actions;
  const { showSuccess, hideSuccess } = successSlice.actions;

  // input
  const [passwordValue, setPasswordValue] = useState("");
  const [codeValue, setCodeValue] = useState("");

  const passwopdInputRef = useRef(null);
  const codeInputRef = useRef(null);

  function handlePasswordInputChange(e) {
    if (!validationEnabled.passwordInput && e.target.value.length >= 1) {
      enableValidation("passwordInput");
    }
    setPasswordValue(e.target.value);
  }

  function handleCodeInputChange(e) {
    if (!validationEnabled.codeInput && e.target.value.length >= 1) {
      enableValidation("codeInput");
    }
    setCodeValue(e.target.value);
  }

  // validation
  const [validationEnabled, setValidationEnabled] = useState({
    passwordInput: false,
    codeInput: false,
  });

  function enableValidation(input) {
    setValidationEnabled({
      ...validationEnabled,
      [input]: true,
    });
  }

  // onSubmit
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendResetPassword({ password: passwordValue, code: codeValue }));
  }

  useEffect(() => {
    if (success) {
      setPasswordValue("");
      setCodeValue("");
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
      }, 10000);
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

  // show input error in password input
  const isPasswordWrong = useMemo(() => {
    if (
      validationEnabled.passwordInput &&
      !passwopdInputRef?.current?.validity?.valid
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
    passwopdInputRef?.current?.validity?.valid,
  ]);

  // show input error in code input
  const isCodeWrong = useMemo(() => {
    if (
      validationEnabled.codeInput &&
      !codeInputRef?.current?.validity?.valid
    ) {
      return true;
    }
    if (validationEnabled.codeInput && codeValue === "") {
      return true;
    }
    return false;
  }, [
    validationEnabled.codeInput,
    codeValue,
    codeInputRef?.current?.validity?.valid,
  ]);

  // toggle button when there is a wrong meaning in an input
  const isSubmitButtonDisabled = useMemo(() => {
    if (!validationEnabled.passwordInput && !validationEnabled.codeInput) {
      return true;
    }
    if (!passwordValue || !codeValue) {
      return true;
    }
    if (!isPasswordWrong && !isCodeWrong) {
      return false;
    }
    return true;
  }, [
    validationEnabled.passwordInput,
    validationEnabled.codeInput,
    isPasswordWrong,
    isCodeWrong,
    passwordValue,
    codeValue,
  ]);

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
          <Input
            type={isPasswordVisible ? "password" : "text"}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            error={isPasswordWrong}
            onChange={handlePasswordInputChange}
            onIconClick={onIconClick}
            value={passwordValue}
            ref={passwopdInputRef}
            placeholder={"Введите новый пароль"}
            name={"new-password"}
            errorText={"Придумайте более надежный пароль. Мин 1 цифра."}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            disabled={request}
            size={"default"}
          />
          <Input
            error={isCodeWrong}
            onChange={handleCodeInputChange}
            value={codeValue}
            ref={codeInputRef}
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"code"}
            errorText={"Неверный код."}
            minLength={6}
            maxLength={40}
            disabled={request}
            size={"default"}
          />
          <Button
            disabled={isSubmitButtonDisabled || request}
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
}
