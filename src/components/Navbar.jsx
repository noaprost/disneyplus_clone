import { useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  const [hide, setHide] = useState(true);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, [user]);

  const handleLogin = () => {
    login().then((user) => {
      setUser(user);
      if (user) {
        navigator("/home");
      }
    });
  };

  const handleLogout = () => {
    logout().then((user) => {
      setUser(user);
      navigator("/");
    });
  };

  return (
    <div className="bg-none absolute flex justify-between items-center w-screen px-12">
      <Link to={user ? "/home" : "/"}>
        <img
          src="/images/logo.svg"
          alt="logo"
          className="w-24 h-24 cursor-pointer"
        />
      </Link>
      {user ? (
        <div className="">
          <img
            src={user.photoURL}
            alt={user.name}
            className="rounded-full w-10 h-10 cursor-pointer"
            onMouseEnter={() => {
              setHide(false);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setHide(true);
              }, 1500);
            }}
          />
          {!hide && (
            <button
              className="border-solid border-2 rounded-md bg-black text-white opacity-75 px-5 py-1 text-center hover:bg-white hover:text-black hover:opacity-100 transition-colors fixed top-20 right-5 ease-in-out"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          )}
        </div>
      ) : (
        <button
          className="border-solid border-2 rounded-md bg-black text-white opacity-75 px-5 py-1 text-center hover:bg-white hover:text-black hover:opacity-100 transition-colors"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      )}
    </div>
  );
}
