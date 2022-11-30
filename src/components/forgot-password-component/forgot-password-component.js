import styles from "./forgot-password-component.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPassword } from "../../services/actions/sendForgotPassword-action.js";
import { errorSlice } from "../../services/reducers/error-slice.js";
import { successSlice } from "../../services/reducers/success-slice.js";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";

export function ForgotPasswordComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { request, success, error, errorMessage } = useSelector(
    state => state.forgotPasswordReducer.requestStatus.forgotPassword,
  );

  const { showError, hideError } = errorSlice.actions;
  const { showSuccess, hideSuccess } = successSlice.actions;

  function handleSubmit(e) {
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
}
