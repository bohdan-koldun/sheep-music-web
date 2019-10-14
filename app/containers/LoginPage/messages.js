import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Вход в систему:',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'эл. адрес',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'пароль',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Войти',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Ошибка авторизации!',
  },
});
