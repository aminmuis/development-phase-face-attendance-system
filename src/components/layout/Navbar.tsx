import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          FaceAttend
        </NavLink>

        <nav className="navbar-menu" aria-label="Navigasi utama">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Beranda
          </NavLink>

          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Absensi
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Daftar
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "navbar-login active"
                : "navbar-login"
            }
          >
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}