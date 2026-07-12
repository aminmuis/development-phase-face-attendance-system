import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <main>
      <h1>Pendaftaran Pekerja</h1>
      <p>Formulir pendaftaran pekerja baru akan dibuat di sini.</p>

      <Link to="/">Kembali</Link>
    </main>
  );
}