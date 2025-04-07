
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  adminUser: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_USERNAME = 'onlineshop@admin';
const ADMIN_PASSWORD = 'password';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth') === 'true';
    const storedUser = localStorage.getItem('adminUser');
    setIsAuthenticated(authStatus);
    if (storedUser) {
      setAdminUser(storedUser);
    }
  }, []);

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAdminUser(username);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUser', username);
      toast.success('Successfully logged in as admin');
      return true;
    } else {
      toast.error('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    toast.info('Logged out from admin panel');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, adminUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
