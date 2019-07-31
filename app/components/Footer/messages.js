import { defineMessages } from 'react-intl';

export const scope = 'app.components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: 'Copyright © 2019 sheep-music.com. Все права защищены.',
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Made with love by {author}.
    `,
  },
  footerMessage: {
    id: `${scope}.right.message`,
    defaultMessage:
      'Материалы, присутствующие на сайте, получены с публичных (широкодоступных) ресурсов. Если вы обладаете авторским правом на какую либо информацию, размещенную на сайте sheep-music.com и не согласны с её общедоступностью в будущем, то мы согласны рассмотреть предложения по удалению определенного материала, а также обсудить предложения о договоренностях, разрешающих использовать данный контент. Мы не отслеживаем действия пользователей, которые самостоятельно выкладывают источники текстов, являющиеся объектом вашего авторского права. Все данные на сайт, загружаются автоматически, не проходя заранее отбора с чьей либо стороны, что является нормой в мировом опыте размещения информации в сети интернет.',
  },
  menuMessage: {
    id: `${scope}.website.menu`,
    defaultMessage: 'Меню:',
  },
  languageMessage: {
    id: `${scope}.website.language`,
    defaultMessage: 'Язык:',
  },
});
