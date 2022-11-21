import styles from './login-component.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useState, useRef, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {sendLogin} from '../../services/actions/sendLogin-action';

export function LoginComponent() {
  const dispatch = useDispatch();
  const history = useHistory()
  const {loginRequest, loginError, loginSuccess} = useSelector(state => state.loginAuthReducer.requestStatus);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleEmailChange(e) {
    if(emailValue.length <= 1) {
      enableValidation('emailInput');
    }
    setEmailValue(e.target.value);
  }

  function handlePasswordChange(e) {
    if(passwordValue.length <= 1) {
      enableValidation('passwordInput');
    }
    setPasswordValue(e.target.value);
  }

  // validation
  const [validationEnabled, setValidationEnabled] = useState({
    emailInput: false,
    passwordInput: false,
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
    dispatch(sendLogin({emailValue, passwordValue}));
  }

  useEffect(() => {
    if(loginSuccess) {
      setEmailValue('');
      setPasswordValue('');
      history.replace({pathname: '/'});
    }
    if(loginError) {
      alert('При попытке логина произошла ошибка. Проверьте введенные данные и попробуйте еще раз.');
    }
  }, [loginError, loginSuccess]);

  // show input error in inputs
  const isEmailWrong = useMemo(() => {
    if(validationEnabled.emailInput && !emailRef?.current?.validity?.valid) {
      return true;
    }
    if(validationEnabled.emailInput && emailValue === '') {
      return true;
    }
    return false;
  }, [validationEnabled.emailInput, emailValue, emailRef?.current?.validity?.valid]);

  const isPasswordWrong = useMemo(() => {
    if(validationEnabled.passwordInput && !passwordRef?.current?.validity?.valid) {
      return true;
    }
    if(validationEnabled.passwordInput && passwordValue === '') {
      return true;
    }
    return false;
  }, [validationEnabled.passwordInput, passwordValue, passwordRef?.current?.validity?.valid]);
  

  // toggle button when there is a wrong meaning in an input
  const isSubmitButtonDisabled = useMemo(() => {
    if(!validationEnabled.emailInput && !validationEnabled.passwordInput) {
      return true;
    }
    if(!emailValue || !passwordValue) {
      return true;
    }
    if(!isEmailWrong && !isPasswordWrong) {
      return false;
    }
    return true;
  }, [validationEnabled.emailInput, validationEnabled.passwordInput, isEmailWrong, isPasswordWrong, emailValue, passwordValue]);

  // password visibility toggler
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function onIconClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Вход</h1>
        <form onSubmit={handleSubmit} className={`${styles.form}`} noValidate>
          <Input 
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleEmailChange}
            value={emailValue}
            name={'name'}
            error={isEmailWrong}
            ref={emailRef}
            errorText={'Некорректный формат Email.'}
            disabled={loginRequest}
            size={'default'} />
          <Input 
            type={isPasswordVisible ? 'password' : 'text'}
            icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
            onIconClick={onIconClick}
            placeholder={'Пароль'}
            onChange={handlePasswordChange}
            value={passwordValue}
            ref={passwordRef}
            name={'password'}
            error={isPasswordWrong}
            errorText={'Неверный формат пароля.'}
            minLength={8}
            disabled={loginRequest}
            size={'default'} />
          <Button
            disabled={isSubmitButtonDisabled || loginRequest}
            htmlType='submit'
            type="primary"
            size="medium">Войти</Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
        <span className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to='/register' className={`text text_type_main-default ${styles.link}`} >Зарегестрироваться</Link></span>
        <span className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password' className={`text text_type_main-default ${styles.link}`} >Восстановить пароль</Link></span>
      </div>
    </section>
  );
}