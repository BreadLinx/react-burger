import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-component.module.css";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserData } from "../../services/actions/updateUserData-action.js";
import { errorSlice } from "../../services/reducers/error-slice.js";
import { successSlice } from "../../services/reducers/success-slice.js";
import { loginAuthSlice } from "../../services/reducers/login-auth-slice.js";

export function ProfileComponent() {
  const dispatch = useDispatch();

  // Объявление стейтов для значения инпутов
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // Объявление рефов инпутов
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Достаем Юзера и статус запроса
  const { user, requestStatus } = useSelector(state => state.loginAuthReducer);
  const { name, email } = user;

  // При загрузки и изменении name или email ставим новые значения
  useEffect(() => {
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue("");
  }, [email, name]);

  // Достаем статусы запроса
  const { request, error, success } = requestStatus.updateUserData;
  const { showError, hideError } = errorSlice.actions;
  const { showSuccess, hideSuccess } = successSlice.actions;
  const { resetUpdateUserDataRequestStatus } = loginAuthSlice.actions;

  // При ошибке выводим ошибку
  useEffect(() => {
    if (success) {
      dispatch(showSuccess("Данные были успешно изменены."));
      setTimeout(() => {
        dispatch(hideSuccess());
        dispatch(resetUpdateUserDataRequestStatus());
      }, 3500);
    }
    if (error) {
      dispatch(
        showError(
          "При попытке обновлении данных пользователя произошла ошибка. Проверьте введенные данные и попробуйте еще раз. Возможно почта введена в неверном формате, попробуйте изменить ее.",
        ),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 13000);
    }
  }, [
    error,
    dispatch,
    hideError,
    showError,
    success,
    showSuccess,
    hideSuccess,
  ]);

  // При изменении полей, показываем
  const areButtonsVisible = useMemo(() => {
    if (
      nameValue !== name ||
      emailValue !== email ||
      passwordValue.length >= 1
    ) {
      return true;
    }
    return false;
  }, [nameValue, emailValue, passwordValue, name, email]);

  // Стейт валидации
  const [validationEnabled, setValidationEnabled] = useState({
    nameInput: false,
    emailInput: false,
    passwordInput: false,
  });

  // Включаем валидацию на инпуте
  function enableValidation(input) {
    setValidationEnabled({
      ...validationEnabled,
      [input]: true,
    });
  }

  // Выключаем валидацию на инпуте
  function disableValidation(input) {
    setValidationEnabled({
      ...validationEnabled,
      [input]: false,
    });
  }

  // Логика переключения видимости или невидимости пароля
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onIconClick = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
    return;
  }, [setIsPasswordVisible, isPasswordVisible]);

  // Логика подстановки нужной иконки при переключении пароля
  const passwordIcon = useMemo(() => {
    return isPasswordVisible ? "HideIcon" : "ShowIcon";
  }, [isPasswordVisible]);

  // Логика подстановки нужного типа инпута при изменении пароля
  const passwordType = useMemo(() => {
    return isPasswordVisible ? "text" : "password";
  }, [isPasswordVisible]);

  // Функция обработчик изменений на инпуте с именем
  function handleNameChange(e) {
    if (!validationEnabled.nameInput && e.target.value.length >= 1) {
      enableValidation("nameInput");
    }
    setNameValue(e.target.value);
  }

  // Функция обработчик изменений на инпуте с почтой/логином
  function handleEmailChange(e) {
    if (!validationEnabled.emailInput && e.target.value.length >= 1) {
      enableValidation("emailInput");
    }
    setEmailValue(e.target.value);
  }

  // Функция обработчик изменений на инпуте с паролем
  function handlePasswordChange(e) {
    if (!validationEnabled.passwordInput && e.target.value.length >= 1) {
      enableValidation("passwordInput");
    }
    if (e.target.value.length === 0) {
      disableValidation("passwordInput");
    }
    setPasswordValue(e.target.value);
  }

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

  // Если поля формы невалидны, вылючаем сабмит
  const isSubmitButtonDisabled = useMemo(() => {
    if (
      !validationEnabled.nameInput &&
      !validationEnabled.emailInput &&
      !validationEnabled.passwordInput
    ) {
      return true;
    }
    if (!nameValue || !emailValue) {
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

  // Обработка сабмита
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateUserData({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    );
    setPasswordValue("");
    setValidationEnabled({
      nameInput: false,
      emailInput: false,
      passwordInput: false,
    });
  }

  // Обработка ресета
  function handleReset(e) {
    e.preventDefault();
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue("");

    setValidationEnabled({
      nameInput: false,
      emailInput: false,
      passwordInput: false,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={`mt-30 ${styles.formBox}`}
      noValidate
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleNameChange}
        icon={"EditIcon"}
        value={nameValue}
        name={"name"}
        error={isNameWrong}
        ref={nameRef}
        minLength={2}
        maxLength={50}
        disabled={request}
        errorText={"Некорректное имя. Мин длина 2 символа."}
        size={"default"}
        extraClass="ml-1"
      />
      <Input
        type={"email"}
        placeholder={"Логин"}
        onChange={handleEmailChange}
        icon={"EditIcon"}
        value={emailValue}
        name={"email"}
        error={isEmailWrong}
        ref={emailRef}
        disabled={request}
        errorText={"Некорректный формат Email."}
        size={"default"}
        extraClass="ml-1"
      />
      <Input
        type={passwordType}
        placeholder={"Пароль"}
        onChange={handlePasswordChange}
        icon={validationEnabled.passwordInput ? passwordIcon : "EditIcon"}
        onIconClick={validationEnabled.passwordInput ? onIconClick : null}
        value={passwordValue}
        name={"password"}
        error={isPasswordWrong}
        ref={passwordRef}
        disabled={request}
        minLength={8}
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
        errorText={"Придумайте более надежный пароль. Мин 1 цифра."}
        size={"default"}
        extraClass="ml-1"
      />
      {areButtonsVisible && (
        <div className={styles.buttonsWrapper}>
          <Button
            disabled={request || isSubmitButtonDisabled}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
          <Button
            disabled={request}
            htmlType="reset"
            type="primary"
            size="medium"
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
}
