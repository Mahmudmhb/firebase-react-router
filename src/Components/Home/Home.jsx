import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase.init";
import { useState } from "react";
const Home = () => {
  const [user, setUser] = useState(null);
  const googleSignProvider = new GoogleAuthProvider();
  const githubSignProvider = new GithubAuthProvider();
  const auth = getAuth(app);
  const handelGoogleSignup = () => {
    signInWithPopup(auth, googleSignProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSingeOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };
  const handelGithubSignup = () => {
    signInWithPopup(auth, githubSignProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={handleSingeOut}>Sign Out</button>
          <div>{user.displayName}</div>
          <img src={user.photoURL} alt="" />
          <div>{user.email}</div>
        </div>
      ) : (
        <div>
          <button onClick={handelGithubSignup}>Github login</button>
          <button onClick={handelGoogleSignup}>Google login</button>
        </div>
      )}
    </div>
  );
};

export default Home;
