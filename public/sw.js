importScripts('https://js.pusher.com/4.2/pusher.worker.min.js');

function notify(data) {
  new Notification(data.title, { body: data.message });
}

self.addEventListener('install', (_event) => {
  const pusher = new Pusher("cfdf3c0b0c4a559c3dfe");
  const channel = pusher.subscribe('game');

  //channel.bind('update', function(data) {
    //self.registration.showNotification(data.title, { body: data.message });
  //});
})
