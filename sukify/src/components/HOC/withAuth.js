import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

export default function withAuth(Component) {
  return function ProtectedRoute({...props}) {
    const [ islogged, setIsLogged ] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        redirect('/login');
      } else {
        setIsLogged(true);
      }
    }, [token]);

    return (
      islogged ? <Component {...props} /> : null
    );
  }
}
