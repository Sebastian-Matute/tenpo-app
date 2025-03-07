import Alert from "./components/Alert";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div className="items-center sm:items-start">
      <h1 className="text-3xl font-bold text-center p-3">Login</h1>
      <div className="my-4">
        <Alert color="info">
          <span>
            <span className="font-bold">Email:</span> jhon.doe@mail.com
          </span>
          <span>
            <span className="font-bold">Password: </span>Doe123*
          </span>
        </Alert>
      </div>
      <LoginForm />
    </div>
  );
}
