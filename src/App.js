import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase.js";
import Monitor from "./Monitor.js";
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    getToken(messaging, {
      vapidKey:
        "BHWRgCF4zCbM3ugcGt9ob-yiZUZntwxCGpztS-076frSudE-KyIQcOCPHg74u3seRr24TpQnuU_EIGdxRn5zALs",
    })
      .then((token) => {
        if (token) {
          //We can send token to server
          axios
            .post("https://notify-server-cs3l.onrender.com/token", {
              token: token,
            })
            .then((response) => {
              console.log("Token sent ");
            })
            .catch((error) => {
              console.error("Error sending token:", error);
            });

          console.log("Token generated : ", token);
        }
        else{
          console.log("Token not generated");
        }
      })
      .catch((error) => {
        console.log(error); 
      });
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    toast(<Message notification={payload.notification} />);
  });

  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Monitor />
    </div>
  );
}

export default App;
