import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
export default function Auth() {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="w-[100vw] gap-4 flex min-h-lvh text-white items-center justify-center drop-shadow-textColor bg-gradient-to-r from-cyan-500 to-blue-500 bg-[#219ebc]">
      <p className="text-4xl font-bold">Sign in with GOOGLE to continue</p>
      <button
        className="login-with-google-btn cursor-pointer border-none p-6 rounded shadow-slate-400 text-4xl font-medium
          bg-no-repeat bg-[center_top_1rem] focus:outline-none focus:shadow-[sm-#c8dafc] disabled:grayscale bg-[#ebebeb] disabled:shadow-sm disabled:cursor-not-allowed text-black"
        onClick={signInWithGoogle}
      >
        Sign In With Google
        <span className="relative inline-flex">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            className="w-[40px] h-[40px]  top-[1.5rem] left-[1.5rem]"
          />
        </span>
      </button>
    </div>
  );
}
