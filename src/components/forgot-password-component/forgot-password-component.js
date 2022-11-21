import styles from './forgot-password-component.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useState, useRef, useMemo, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {sendForgotPassword} from '../../services/actions/sendForgotPassword-action.js';

export function ForgotPasswordComponent() {
  const dispatch = useDispatch();
  const {forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordError} = useSelector(state => state.forgotPasswordReducer);

  const [emailValue, setEmailValue] = useState('');
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendForgotPassword(emailValue));
  }

  useEffect(() => {
    if(forgotPasswordSuccess) {
      setEmailValue('');
    }
    if(forgotPasswordError) {
      alert('При попытке восстановления пароля произошла ошибка. Проверьте введенные данные и попробуйте еще раз.');
    }
  }, [forgotPasswordSuccess, forgotPasswordError]);

  const isSubmitButtonDisabled = useMemo(() => {
    if(forgotPasswordRequest || !emailInputRef?.current?.validity?.valid) {
      return true;
    }
    return false;
  }, [forgotPasswordRequest, emailInputRef?.current?.validity?.valid]);

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input 
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => {
              if(emailValue.length <= 1) enableValidation('emailInput');
              setEmailValue(e.target.value);
            }}
            value={emailValue}
            name={'email'}
            error={validationEnabled.emailInput && !emailInputRef?.current?.validity?.valid ? true : false}
            errorText={'Неверный E-mail'}
            disabled={forgotPasswordRequest ? true : false}
            ref={emailInputRef}
            required
            minLength={2}
            maxLength={50}
            size={'default'} />
          <Button 
            disabled={isSubmitButtonDisabled}
            htmlType='submit'
            type='primary'
            size='medium'>Восстановить</Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
        <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login' className={`text text_type_main-default ${styles.link}`} >Войти</Link></span>
      </div>
    </section>
  );
}