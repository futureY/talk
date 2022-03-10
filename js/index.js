(() => {
  let page = 0;
  let size = 10;
  let chatTotal = null;
  let sendType = 'enter';
  const init = () => {
    getUserInfo();
    initChatList('bottom');
    initEvent();
  };
  const initEvent = () => {
    sendBtn.addEventListener('click', onSendBtnClick);
    contentBody.addEventListener('scroll', onContentScroll);
    arrowBtn.addEventListener('click', onArrowClick);
    document
      .querySelectorAll('.select-item')
      .forEach((node) => node.addEventListener('click', onSelectItem));
    inputContainer.addEventListener('keyup', onInputkeyup);
    closeBtn.addEventListener('click', onClose);
  };
  const onClose = () => {
    sessionStorage.removeItem('token');
    window.location.replace(baseURL + 'login.html');
  };
  const onInputkeyup = (e) => {
    if (
      (e.keyCode === 13 && sendType === 'enter' && !e.ctrlKey) ||
      (e.keyCode === 13 && sendType === 'ctrlEnter' && e.ctrlKey)
    ) {
      sendBtn.click();
    }
  };
  const onSelectItem = function () {
    document
      .querySelectorAll('.select-item')
      .forEach((node) => node.classList.remove('on'));
    this.classList.add('on');
    sendType = this.getAttribute('type');
    selectType.style.display = 'none';
  };

  const onArrowClick = () => {
    selectType.style.display = 'block';
  };
  const onContentScroll = function (e) {
    if (this.scrollTop === 0) {
      if (chatTotal <= (page + 1) * size) {
        return;
      }
      page++;
      initChatList('top');
    }
  };
  const onSendBtnClick = async () => {
    const content = inputContainer.value.trim();
    if (!content) {
      alert('消息不能为空');
      return;
    }
    renderChatForm([{ from: 'user', content }], 'bottom');
    inputContainer.value = '';
    const rest = await fethcFn({
      method: 'POST',
      url: '/chat',
      params: { content },
    });
    console.log(rest);
    renderChatForm([{ from: 'robot', content: rest.content }], 'bottom');
  };
  const getUserInfo = async () => {
    const res = await fethcFn({
      url: '/user/profile',
    });
    nickName.innerHTML = res.nickname;
    accountName.innerHTML = res.loginId;
    loginTime.innerHTML = formaDate(res.lastLoginTime);
  };
  const initChatList = async (direction) => {
    const res = await fethcFn({
      url: '/chat/history',
      params: {
        page,
        size,
      },
    });
    chatTotal = res.chatTotal;
    renderChatForm(res.data, direction);
  };
  const renderChatForm = (list, direction) => {
    list.reverse();
    if (!list.length) {
      contentBody.innerHTML = `<div class="chat-container robot-container">
          <img src="./img/robot.jpg" alt="" />
          <div class="chat-txt">
            您好！我是腾讯机器人，非常欢迎您的到来，有什么想和我聊聊的吗？
          </div>
        </div>`;
      return;
    }
    const chatData = list.map((item) => {
      return item.from === 'user'
        ? `   <div class="chat-container avatar-container">
      <img src="./img/avtar.png" alt="" />
      <div class="chat-txt">${item.content}</div>
    </div>`
        : `<div class="chat-container robot-container">
    <img src="./img/robot.jpg" alt="" />
    <div class="chat-txt">
    ${item.content}
    </div>
  </div>`;
    });
    if (direction === 'bottom') {
      contentBody.innerHTML += chatData.join(' ');
      const bottomDistance =
        document.querySelectorAll('.chat-container')[
          document.querySelectorAll('.chat-container').length - 1
        ].offsetTop;
      contentBody.scrollTo(0, bottomDistance);
    } else {
      contentBody.innerHTML = chatData.join(' ') + contentBody.innerHTML;
    }
  };
  init();
})();
