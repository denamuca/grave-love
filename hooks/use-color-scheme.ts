import { useColorScheme as useRNColorScheme } from 'react-native';
import { ForceDark } from '@/constants/theme';

export function useColorScheme(): 'light' | 'dark' | null {
  if (ForceDark) return 'dark';
  return useRNColorScheme();
}
