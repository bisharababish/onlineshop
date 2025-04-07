
import { ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader />
      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
