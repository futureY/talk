(() => {
  let isRepeat = false;
  const init = () => {
    initEvent();
  };
  const initEvent = () => {
    userName.addEventListener('blur', onUserNameBlur);
    formContainer.addEventListener('submit', onFormSubmit);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const loginId = userName.value.trim();
    const nickname = userNickname.value.trim();
    const loginPwd = userPassword.value.trim();
    const conformPwd = userConfirmPassword.value.trim();
    if (!checkForm(loginId, nickname, loginPwd, conformPwd)) {
      return;
    }

    sendData(loginId, nickname, loginPwd);
  };

  const sendData = async (loginId, nickname, loginPwd) => {
    const res = await fethcFn({
      url: '/user/reg',
      method: 'POST',
      params: { loginId, nickname, loginPwd },
    });
    // const res = await fetch('https://study.duyiedu.com/api/user/reg', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ loginId, nickname, loginPwd }),
    // });
    // const result = await res.json();
    // if (result.code !== 0) {
    //   window.alert(result.message);
    //   return;
    // }

    res && window.location.replace(baseURL + 'login.html');
  };
  const checkForm = (loginId, nickname, loginPwd, conformPwd) => {
    switch (true) {
      case !loginId:
        alert('账号不能为空');
        return;
      case !nickname:
        alert('昵称不能为空');
        return;
      case !loginPwd:
        alert('密码不能为空');
        return;
      case !conformPwd:
        alert('验证密码不能为空');
        return;
      case loginPwd !== conformPwd:
        alert('输入密码不相同');
        return;
      case isRepeat:
        alert('账户名已经注册');
      default:
        return true;
    }
  };
  const onUserNameBlur = async () => {
    const loginId = userName.value.trim();
    if (!loginId) return;
    const res = await fethcFn({
      url: '/user/exists',
      method: 'GET',
      params: { loginId },
    });
    isRepeat = res;
    // const response = await fetch(
    //   `https://study.duyiedu.com/api/user/exists?loginId=${loginId}`
    // );
    // const result = await response.json();
    // isRepeat = result.data;
    // if (result.code !== 0) {
    //   window.alert(result.msg);
    // }
  };

  init();
})();
