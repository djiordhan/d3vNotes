import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setInitializing] = useState(true);

  const [user, setUser] = useState(null as any);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setIsAuthenticated(!!user);
      setUser(auth.currentUser);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, isInitializing, user };
}

export default useIsAuthenticated;