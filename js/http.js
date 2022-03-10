const BASE_URL = 'https://study.duyiedu.com/api';
const fethcFn = async ({ url, method = 'GET', params = {} }) => {
  let result = null;
  const extendsObj = {};
  sessionStorage.token &&
    (extendsObj.Authorization = 'Bearer ' + sessionStorage.token);

  if (method === 'GET' && Object.keys(params).length) {
    url +=
      '?' +
      Object.keys(params)
        .map((key) => ''.concat(key, '=', params[key]))
        .join('&');
  }
  try {
    const response = await fetch(BASE_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...extendsObj,
      },
      body: method === 'GET' ? null : JSON.stringify(params),
    });
    const token = response.headers.get('Authorization');
    token && (sessionStorage.token = token);
    result = await response.json();
    if (result.code === 0) {
      if (result.hasOwnProperty('chatTotal')) {
        return (result.data = {
          chatTotal: result.chatTotal,
          data: result.data,
        });
      }
      return result.data;
    } else {
      if (result.status === 401) {
        window.alert('权限token不正确');
        sessionStorage.removeItem('token');
        window.location.replace('/login.html');
        return;
      }
      alert(result.msg);
    }
  } catch (err) {
    console.log(err);
  }
};
