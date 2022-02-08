const channel = new MessageChannel();

const { port1, port2 } = channel;

const oTitle = document.querySelector('h1');

port1.onmessage = function (e) {
  oTitle.textContent = e.data;
  port1.postMessage('修改DOM已结束');
}

export default port2;

