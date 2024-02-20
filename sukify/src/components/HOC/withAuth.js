import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

export default function withAuth(Component) {
  return function ProtectedRoute({...props}) {
    const token = localStorage.getItem('token');
    const [ islogged, setIsLogged ] = useState(false);

    useEffect(() => {
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
