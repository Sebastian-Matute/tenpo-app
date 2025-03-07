'use client';
import Input from "./Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Opción 1: API interna
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar token en localStorage o cookies
      localStorage.setItem("token", data.token);

      // Redireccionar al home
      router.push("/home");

      // Opción 2: Para demo, simplemente verificar credenciales hardcodeadas
      /*
      if (credentials.email === 'usuario@ejemplo.com' && credentials.password === '123456') {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/home');
      } else {
        setError('Credenciales incorrectas');
      }
      */
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 ">
      <Input
        label="Email"
        type="email"
        id="email"
        required={true}
        disabled={false}
        placeholder=""
      />
      <Input
        label="Password"
        type="password"
        id="password"
        required={true}
        disabled={false}
        placeholder=""
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
