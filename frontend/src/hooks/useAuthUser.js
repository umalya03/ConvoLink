import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api';
import { useThemeStore } from '../store/useThemeStore';
import { useEffect } from 'react';

const useAuthUser = () => {
  const { setTheme } = useThemeStore();

  const authUserQuery = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false,
  });

  useEffect(() => {
    if (authUserQuery.data?.user?.theme) {
      setTheme(authUserQuery.data.user.theme); // Set theme from user profile
    }
  }, [authUserQuery.data, setTheme]);

  return { isLoading: authUserQuery.isLoading, authUser: authUserQuery.data?.user };
};

export default useAuthUser;