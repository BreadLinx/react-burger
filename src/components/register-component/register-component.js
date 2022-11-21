import styles from './register-component.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useState, useRef, useMemo, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {sendRegistration} from '../../services/actions/sendRegistration-action.js';

export function RegisterComponent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {registrationRequest, registrationError, registrationSuccess} = useSelector(state => state.loginAuthReducer.requestStatus);

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleNameChange(e) {
    if(nameValue.length <= 1) {
      enableValidation('nameInput');
    }
    setNameValue(e.target.value);
  }

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
    nameInput: false,
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
    dispatch(sendRegistration({nameValue, emailValue, passwordValue}));
  }

  useEffect(() => {
    if(registrationSuccess) {
      setNameValue('');
      setEmailValue('');
      setPasswordValue('');
      history.replace({pathname: '/'});
    }
    if(registrationError) {
      alert('При попытке регистрации произошла ошибка. Проверьте введенные данные и попробуйте еще раз.');
    }
  }, [registrationError, registrationSuccess]);

  // show input error in password input
  const isNameWrong = useMemo(() => {
    if(validationEnabled.nameInput && !nameRef?.current?.validity?.valid) {
      return true;
    }
    if(validationEnabled.nameInput && nameValue === '') {
      return true;
    }
    return false;
  }, [validationEnabled.nameInput, nameValue, nameRef?.current?.validity?.valid]);

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
    if(!validationEnabled.nameInput && !validationEnabled.emailInput && !validationEnabled.passwordInput) {
      return true;
    }
    if(!nameValue || !emailValue || !passwordValue) {
      return true;
    }
    if(!isNameWrong && !isEmailWrong && !isPasswordWrong) {
      return false;
    }
    return true;
  }, [validationEnabled.nameInput, validationEnabled.emailInput, validationEnabled.passwordInput, isNameWrong, isEmailWrong, isPasswordWrong, passwordValue, nameValue, emailValue]);

  // password visibility toggler
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function onIconClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.loginBox}`}>
        <h1 className={`text text_type_main-medium`}>Регистрация</h1>
        <form className={`${styles.form}`} noValidate onSubmit={handleSubmit}>
          <Input 
            type={'text'}
            placeholder={'Имя'}
            onChange={handleNameChange}
            value={nameValue}
            name={'name'}
            error={isNameWrong}
            errorText={'Некорректное имя. Мин длина 2 символа.'}
            ref={nameRef}
            minLength={2}
            maxLength={50}
            disabled={registrationRequest}
            size={'default'} />
          <Input 
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleEmailChange}
            value={emailValue}
            name={'email'}
            error={isEmailWrong}
            errorText={'Некорректный формат Email.'}
            ref={emailRef}
            disabled={registrationRequest}
            size={'default'} />
          <Input 
            type={isPasswordVisible ? 'password' : 'text'}
            placeholder={'Пароль'}
            onIconClick={onIconClick}
            onChange={handlePasswordChange}
            icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
            value={passwordValue}
            name={'password'}
            error={isPasswordWrong}
            ref={passwordRef}
            disabled={registrationRequest}
            errorText={'Придумайте более надежный пароль. Мин 1 цифра.'}
            pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
            size={'default'} />
          <Button
            disabled={isSubmitButtonDisabled || registrationRequest}
            htmlType='submit'
            type="primary"
            size="medium">Зарегестрироваться</Button>
        </form>
      </div>
      <div className={`${styles.otherStuffBox}`}>
        <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? <Link to='/login' className={`text text_type_main-default ${styles.link}`} >Войти</Link></span>
      </div>
    </section>
  );
}