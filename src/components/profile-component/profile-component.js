import {Input} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile-component.module.css';
import {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'

export function ProfileComponent() {
  const [namevalue, setNameValue] = useState('');
  const [emailvalue, setEmailValue] = useState('');
  const [passwordvalue, setPasswordValue] = useState('');

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const {email, name} = useSelector(state => state.loginAuthReducer.user);

  useEffect(() => {
    setNameValue(name);
    setEmailValue(email);
  }, [email, name]);

  return (
    <form className={`mt-30 ${styles.formBox}`}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setNameValue(e.target.value)}
        icon={'EditIcon'}
        value={namevalue}
        name={'name'}
        error={false}
        ref={nameInputRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={e => setEmailValue(e.target.value)}
        icon={'EditIcon'}
        value={emailvalue}
        name={'email'}
        error={false}
        ref={emailInputRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={e => setPasswordValue(e.target.value)}
        icon={'EditIcon'}
        value={passwordvalue}
        name={'password'}
        error={false}
        ref={passwordInputRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />
      {
        false &&
        <div className={styles.buttonsWrapper}>
          <Button 
            // disabled={isSubmitButtonDisabled}
            htmlType='submit'
            type='primary'
            size='medium'>Сохранить</Button>
          <Button 
            // disabled={isSubmitButtonDisabled}
            htmlType='reset'
            type='primary'
            size='medium'>Отмена</Button>
        </div>
      }
    </form>
  );
}