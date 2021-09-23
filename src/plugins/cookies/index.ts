/*
*
*
*     操作Cookie
*
*
*/

export const get_cookie = function(name:string = '') {
  if (!name) {
    name = "ton";
  }
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
  return null;
}

export const set_cookie = function(name: string, value: string = '', usefulDay: number) {
  const d = new Date();
  d.setTime(d.getTime() + (usefulDay * 24 * 60 * 60 * 1000));
  const expires = "expires="+d.toUTCString();
  document.cookie = name + "=" + value + ";path=/; " + expires;
}

export const delete_cookie = function(name: string) {
  set_cookie(name, '', -1);
}
