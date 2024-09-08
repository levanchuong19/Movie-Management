import { Link } from "react-router-dom";
import "./index.scss";
import { auth, googleProvider } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
function Login() {
  const handelLoginGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login">
      <iframe
        className="login__video"
        src="https://player.vimeo.com/video/695343114?h=1a71dea0f0?controls=0&sidedock=0&title=0&autoplay=1&muted=1&loop=1"
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="swapper">
        <div className="login__logo">
          <Link to="">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/57dce043604507.57f570bb1809c.png"
              alt=""
              width={200}
            />
          </Link>
        </div>
        <div className="line"></div>
        <div className="login__form">
          <h3>Login Your Account</h3>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="password" />
          <button>Login</button>
          <button className="login__google" onClick={handelLoginGoogle}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
              alt=""
              width={30}
            />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
