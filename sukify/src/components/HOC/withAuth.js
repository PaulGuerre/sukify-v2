import { useEffect } from 'react';
import { redirect } from 'next/navigation'

export default function withAuth(Component) {
  return function ProtectedRoute({...props}) {
    const token = localStorage.getItem('token');

    useEffect(() => {
      if (!token) {
        redirect('/login');
      }
    }, [token]);

    return (
      <Component {...props} />
    );
  }
}
