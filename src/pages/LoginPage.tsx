import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <p>Halaman login pekerja dan HRD.</p>

      <Link to="/">Kembali</Link>
    </main>
  );
}