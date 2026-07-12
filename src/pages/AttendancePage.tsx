import { Link } from "react-router-dom";

export default function AttendancePage() {
  return (
    <main>
      <h1>Mesin Absensi</h1>
      <p>Kamera dan pengenalan wajah akan ditempatkan di sini.</p>

      <Link to="/">Kembali</Link>
    </main>
  );
}