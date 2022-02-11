export default function statusMessege({ status }) {
   if (status === 'NoConnect') {
      return 'произошла ошибка соеденения с сервером.';
   }
   else if (status === 400) {
      return 'произошла ошибка. Неверно заполнены данные';
   }
   else if (status === 401) {
      return 'произошла ошибка. Авторизуйтесь';
   }
   else if (status === 403) {
      return 'Необходима повторная авторизация';
   }
   else if (status === 500) {
      return 'произошла непредвиденная ошибка.';
   }
   else {
      return '';
   }
}