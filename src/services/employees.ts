import { supabase } from "./supabase";

export type Employee = {
  id: string;
  employee_number: string;
  full_name: string;
  email: string | null;
  employment_status: string;
  created_at: string;
};

export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}