import { useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  const loc = useLocation();
  const [hide, setHide] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, [user]);

  useEffect(() => {
    if (loc.pathname === "/home") {
      setSearchTerm("");
    }
  }, [loc]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {
      navigator(`/search?query=${encodeURIComponent(value)}`);
    } else {
      navigator("/search");
    }
  };

  return (
    <div className="bg-none absolute flex justify-between items-center w-screen px-12 h-16">
      <Link to={user ? "/home" : "/"}>
        <img
          src="/images/logo.svg"
          alt="logo"
          className="w-20 h-20 cursor-pointer"
        />
      </Link>
      {(loc.pathname === "/home" || loc.pathname === "/search") && (
        <input
          type="text"
          placeholder="영화 제목을 입력해주세요"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-gray-800 rounded-lg px-4 py-2 w-60 bg-opacity-100 bg-black outline-none text-white"
        />
      )}
      {user ? (
        <div>
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
