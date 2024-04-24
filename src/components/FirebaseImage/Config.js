// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyB-sxY58gdNn-Wje85InWuNM2RUMPAzBHA",
  authDomain: "capstone-project-5362d.firebaseapp.com",
  projectId: "capstone-project-5362d",
  storageBucket: "capstone-project-5362d.appspot.com",
  messagingSenderId: "980584491873",
  appId: "1:980584491873:web:c5a6d1b719de8aed957320",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);
export const messaging = getMessaging(app);
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log(permission);
      const token = await getToken(messaging, {
        vapidKey:
        "BMlqyj5Nejw6sc5cEkgMvk1F5ZZr7AxAfkRv_PYNpUQNFZvYa5ts18UN2UVStnb-sTSNbqIJr75IrJ7FWtzciag",
      });
      console.log(token);
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

