import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Button } from '@/shared/components/ui/Button';

export function Header() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const user = useSelector((state: RootState) => state.auth.userData);
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold cursor-pointer" 
          onClick={() => navigate('/')}
        >
          EdTech Platform
        </div>
        
        <nav className="flex items-center gap-4">
          <Link to="/courses">
            <Button variant="ghost">Courses</Button>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to={user?.role === 'student' ? '/dashboard/student' : '/dashboard/instructor'}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost">{user?.name}</Button>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
