export function useAuthenticated() {
    return useState<boolean | null>('authenticationStatus', () => null);
};