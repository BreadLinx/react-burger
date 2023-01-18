import styles from "./forgot-password-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, FC, FormEvent } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { sendForgotPassword } from "services/actions/sendForgotPassword-action";
import { errorSlice } from "services/reducers/error-slice";
import { successSlice } from "services/reducers/success-slice";
import { useFormAndValidation } from "hooks/useFormAndValidation";

export const ForgotPasswordComponent: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { state } = useLocation() as {
    state: {
      [key: string]: any;
    };
  };
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { request, success, error, errorMessage } = useAppSelector(
    state => state.forgotPasswordReducer.requestStatus.forgotPassword,
  );

  const { showError, hideError } = errorSlice.actions;
  const { showSuccess, hideSuccess } = successSlice.actions;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(sendForgotPassword(values.email));
  }

  useEffect(() => {
    if (success) {
      dispatch(showSuccess("Код успешно запрошен."));
      setTimeout(() => {
        dispatch(hideSuccess());
      }, 5000);

      history.replace({
        pathname: "/reset-password",
        state: { ...state, forgotStatus: "success", email: values.email },
      });
      setValues({
        email: "",
      });
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
      }, 10000);
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
    setValues,
    values.email,
  ]);

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputWrapper}>
            <Input
              type={"email"}
              placeholder={"Укажите e-mail"}
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
          <Button
            disabled={!isValid || request}
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
};
