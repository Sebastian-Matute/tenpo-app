"use client";
import Input from "./Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import generateToken from "@/utils/utils";

export default function Home() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (
        credentials.email === "jhon.doe@mail.com" &&
        credentials.password === "Doe123*"
      ) {
        localStorage.setItem("token", generateToken(20));
        localStorage.setItem("isLoggedIn", "true");
        router.push("/home");
      } else {
        setError("Wrong credentials!");
      }
    } catch (err: any) {
      setError(err.message || "Error trying login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      router.push("/home");
    }
  }, [router]);

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 ">
      <Input
        label="Email"
        type="email"
        id="email"
        value={credentials.email}
        required={true}
        disabled={false}
        placeholder="user@example.com"
        onChange={handleChange}
      />
      <Input
        label="Password"
        type="password"
        id="password"
        required={true}
        disabled={false}
        value={credentials.password}
        placeholder="*********"
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </form>
  );
}
