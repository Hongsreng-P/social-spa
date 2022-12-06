import { UserInfo } from '@/constants/types';

export function useUser() {
    return useState<UserInfo>('userInfo', () => null);
};