(() => {
  const init = () => {
    initEvent();
  };
  const initEvent = () => {
    formContainer.addEventListener('submit', onFormSubmitClick);
  };
  const onFormSubmitClick = (e) => {
    /* 组织form表单的默认行为 */
    e.preventDefault();
    /* 获取表单数据 */
    const loginId = userName.value.trim();
    const loginPwd = userPassword.value.trim();
    /* 进行表单数据的发送 */
    if (!loginId || !loginPwd) {
      window.alert('用户名或密码不能为空');
    }
    sendData(loginId, loginPwd);
  };

  const sendData = async (loginId, loginPwd) => {
    const res = await fethcFn({
      url: '/user/login',
      method: 'POST',
      params: { loginId, loginPwd },
    });

    // const res = await fetch('https://study.duyiedu.com/api/user/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ loginId, loginPwd }),
    // });

    // const result = await res.json();

    // if (result.code !== 0) {
    //   window.alert(result.msg);
    //   return;
    // }
    res && window.location.replace('/');
  };

  init();
})();
