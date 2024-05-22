// SessionContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SessionContextType {
  role: string | null;
  name: string | null;
  img: string | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>('Loading...');
  const [img, setImg] = useState<string | null>('/user.png');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/session');
        const data = await response.json();
        setRole(data.role);
        setName(data.name);
        setImg(data.img);
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <SessionContext.Provider value={{ loading, role, name, img }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
