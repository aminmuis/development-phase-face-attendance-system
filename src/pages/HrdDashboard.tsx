import { Link } from "react-router-dom";

export default function HrdDashboard() {
  return (
    <main>
      <h1>Portal HRD</h1>
      <p>HRD dapat mengelola pekerja dan data absensi.</p>

      <Link to="/">Kembali</Link>
    </main>
  );
}