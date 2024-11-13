import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase_app from "../config";

const signin = async (email: string, password: string) => {
  const auth = getAuth(firebase_app);

  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredential.user) {
      throw new Error("Credential compromised !");
    }

    return userCredential.user;
  } catch (error) {
    console.log("Error :", error);
  }
};

export default signin;
