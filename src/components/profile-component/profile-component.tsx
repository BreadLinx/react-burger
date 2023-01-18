import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-component.module.css";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  FC,
  FormEvent,
} from "react";
import { updateUserData } from "services/actions/updateUserData-action";
import { errorSlice } from "services/reducers/error-slice";
import { successSlice } from "services/reducers/success-slice";
import { loginAuthSlice } from "services/reducers/login-auth-slice";
import { useFormAndValidationProfile } from "hooks/useFormAndValidationProfile";
import { useAppDispatch, useAppSelector } from "hooks";

export const ProfileComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidationProfile();

  // Достаем Юзера и статус запроса
  const { user, requestStatus } = useAppSelector(
    state => state.loginAuthReducer,
  );
  const { name, email } = user;

  // При загрузки и изменении name или email ставим новые значения
  useEffect(() => {
    setValues({
      name: name,
      email: email,
      password: "",
    });
  }, [email, name, setValues]);

  // Достаем статусы запроса
  const { request, error, errorMessage, success } =
    requestStatus.updateUserData;
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
      switch (errorMessage) {
        case "User with such email already exists":
          dispatch(
            showError(
              "Пользователь с такой почтой уже существует. Выберите другую почту и попробуйте еще раз.",
            ),
          );
          break;
        default:
          dispatch(
            showError(
              "При попытке обновлении данных пользователя произошла ошибка. Проверьте введенные данные и попробуйте еще раз. Возможно почта введена в неверном формате, попробуйте изменить ее.",
            ),
          );
      }
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
    resetUpdateUserDataRequestStatus,
    errorMessage,
  ]);

  // При изменении полей, показываем
  const areButtonsVisible = useMemo(() => {
    if (
      values.name !== name ||
      values.email !== email ||
      values.password.length >= 1
    ) {
      return true;
    }
    return false;
  }, [values, name, email]);

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

  // Обработка сабмита
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      updateUserData({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    );
    setValues({
      ...values,
      password: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => {
        resetForm({ name, email, password: "" });
      }}
      className={`mt-30 ${styles.formBox}`}
      noValidate
    >
      <div className={styles.inputWrapper}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={values.name || ""}
          name={"name"}
          error={!!errors.name}
          minLength={2}
          maxLength={50}
          disabled={request}
          errorText={errors.name}
          size={"default"}
          extraClass="ml-1"
          required
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={values.email || ""}
          name={"email"}
          error={!!errors.email}
          disabled={request}
          errorText={errors.email}
          size={"default"}
          extraClass="ml-1"
          required
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          type={passwordType}
          placeholder={"Пароль"}
          onChange={handleChange}
          icon={passwordIcon}
          onIconClick={onIconClick}
          value={values.password || ""}
          name={"password"}
          error={!!errors.password}
          disabled={request}
          minLength={8}
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          errorText={"Минимум 8 симолов. Мининмум 1 цифра в пароле."}
          size={"default"}
          extraClass="ml-1"
        />
      </div>
      {areButtonsVisible && (
        <div className={styles.buttonsWrapper}>
          <Button
            disabled={request || !isValid}
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
};
