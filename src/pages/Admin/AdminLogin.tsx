
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access the admin dashboard</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                Login
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              Default credentials: onlineshop@admin / password
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-teal-600 hover:underline"
          >
            Return to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
