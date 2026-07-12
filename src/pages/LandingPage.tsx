import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main>
      <h1>FaceAttend</h1>
      <p>Sistem absensi pekerja berbasis pengenalan wajah.</p>

      <nav>
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/register">Daftar Pekerja</Link>
        {" | "}
        <Link to="/attendance">Buka Absensi</Link>
      </nav>
    </main>
  );
}
