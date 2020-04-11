// const SockJS = SockJS;
// const Stomp = Stomp;
// stompClient.connect({}, frame => {
//   let bean = {
//     username: "Test"
//   };
//   stompClient.send("/serverStatus", {}, JSON.stringify(bean)); //发送信息
//   stompClient.subscribe("/receive/message", receive => {
//     //订阅并接收消息
//     console.log("greeting", JSON.parse(receive.body));
//   });
// });

export default function(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      const socket = new window.SockJS(url);
      const stompClient = window.Stomp.over(socket); //创建STOMP客户端
      resolve(stompClient);
    }, 0);
  });
}
