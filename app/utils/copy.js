export function handlerCopy(event) {
  const selection = document.getSelection();

  event.clipboardData.setData('text/plain', `${selection.toString()}`);
  event.preventDefault();
}
