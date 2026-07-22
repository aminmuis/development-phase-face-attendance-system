import { useEffect, useState } from "react";
import {
  getEmployees,
  type Employee,
} from "../services/employees";

export default function HrdDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    void loadEmployees();
  }, []);

  if (loading) {
    return <main>Memuat data pekerja...</main>;
  }

  if (errorMessage) {
    return <main>Gagal: {errorMessage}</main>;
  }

  return (
    <main>
      <h1>Portal HRD</h1>
      <p>Jumlah pekerja aktif: {employees.length}</p>

      {employees.map((employee) => (
        <article key={employee.id}>
          <h2>{employee.full_name}</h2>
          <p>Nomor: {employee.employee_number}</p>
          <p>Status: {employee.employment_status}</p>
        </article>
      ))}
    </main>
  );
}