import { useEffect } from 'react';
import { router } from 'expo-router';

import { useApp } from '@/lib/store/AppContext';

/**
 * Redirects to the onboarding home screen when the user is not authenticated.
 * Returns the current authentication state for conditional rendering.
 */
export function useRequireAuth() {
  const { isAuthenticated } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(main)/home');
    }
  }, [isAuthenticated]);

  return isAuthenticated;
}
