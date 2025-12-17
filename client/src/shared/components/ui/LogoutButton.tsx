import { useLogout } from '@/features/auth/hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './Button';

export function LogoutButton() {
  const { logout, loading } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Button
        variant="ghost"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </Button>
    </motion.div>
  );
}

export default LogoutButton;
