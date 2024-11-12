
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDP03W8RVlJzrGtlrT-00ZjOgytSkk96yM",
    authDomain: "iot-project-169dd.firebaseapp.com",
    databaseURL: "https://iot-project-169dd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-project-169dd",
    storageBucket: "iot-project-169dd.firebasestorage.app",
    messagingSenderId: "98722196139",
    appId: "1:98722196139:web:a3fd61f4b92ed8181065ee",
    measurementId: "G-09JG05SPWR"
  };

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Recieved background message",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
