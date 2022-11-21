import styles from './reset-password-component.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useState, useRef, useMemo, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {sendResetPassword} from '../../services/actions/sendResetPassword-action.js';

export function ResetPasswordComponent() {
  const dispatch = useDispatch();
  const {resetPasswordRequest, resetPasswordSuccess, resetPasswordError} = useSelector(state => state.forgotPasswordReducer)

  // input
  const [passwordValue, setPasswordValue] = useState('');
  const passwopdInputRef = useRef(null);
  const [codeValue, setCodeValue] = useState('');
  const codeInputRef = useRef(null);

  function handlePasswordInputChange(e) {
    if(passwordValue.length <= 1) {
      enableValidation('passwordInput');
    }
    setPasswordValue(e.target.value);
  }

  function handleCodeInputChange(e) {
    if(codeValue.length <= 1) {
      enableValidation('codeInput');
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
    dispatch(sendResetPassword(passwordValue, codeValue));
  }

  useEffect(() => {
    if(resetPasswordSuccess) {
      setPasswordValue('');
      setCodeValue('');
    }
    if(resetPasswordError) {
      alert('При попытке сброса пароля произошла ошибка. Проверьте введенные данные и попробуйте еще раз.');
    }
  }, [resetPasswordSuccess, resetPasswordError]);

  // password visibility toggler
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function onIconClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  // show input error in password input
  const isPasswordWrong = useMemo(() => {
    if(validationEnabled.passwordInput && !passwopdInputRef?.current?.validity?.valid) {
      return true;
    }
    if(validationEnabled.passwordInput && passwordValue === '') {
      return true;
    }
    return false;
  }, [validationEnabled.passwordInput, passwordValue, passwopdInputRef?.current?.validity?.valid]);

  // show input error in code input
  const isCodeWrong = useMemo(() => {
    if(validationEnabled.codeInput && !codeInputRef?.current?.validity?.valid) {
      return true;
    }
    if(validationEnabled.codeInput && codeValue === '') {
      return true;
    }
    return false;
  }, [validationEnabled.codeInput, codeValue, codeInputRef?.current?.validity?.valid]);

  // toggle button when there is a wrong meaning in an input
  const isSubmitButtonDisabled = useMemo(() => {
    if(!validationEnabled.passwordInput && !validationEnabled.codeInput) {
      return true;
    }
    if(!passwordValue || !codeValue) {
      return true;
    };
    if(!isPasswordWrong && !isCodeWrong) {
      return false;
    }
    return true;
  }, [validationEnabled.passwordInput, validationEnabled.codeInput, isPasswordWrong, isCodeWrong, passwordValue, codeValue]);

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={`${styles.form}`} noValidate onSubmit={handleSubmit}>
          <Input
            type={isPasswordVisible ? 'password' : 'text'}
            icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
            error={isPasswordWrong}
            onChange={handlePasswordInputChange}
            onIconClick={onIconClick}
            value={passwordValue}
            ref={passwopdInputRef}
            placeholder={'Введите новый пароль'}
            name={'new-password'}
            errorText={'Придумайте более надежный пароль. Мин 1 цифра.'}
            pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
            disabled={resetPasswordRequest}
            size={'default'} />
          <Input 
            error={isCodeWrong}
            onChange={handleCodeInputChange}
            value={codeValue}
            ref={codeInputRef}
            type={'text'}
            placeholder={'Введите код из письма'}
            name={'code'}
            errorText={'Неверный код.'}
            minLength={6}
            maxLength={40}
            disabled={resetPasswordRequest}
            size={'default'} />
          <Button 
            disabled={isSubmitButtonDisabled || resetPasswordRequest}
            htmlType='submit'
            type="primary"
            size="medium">Сохранить</Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
        <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login' className={`text text_type_main-default ${styles.link}`} >Войти</Link></span>
      </div>
    </section>
  );
}