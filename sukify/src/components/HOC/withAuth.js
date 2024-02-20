import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import { getCookie } from 'cookies-next';

export default function withAuth(Component) {
  return function ProtectedRoute({...props}) {
    const [ islogged, setIsLogged ] = useState(false);
    const token = getCookie('token');

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
