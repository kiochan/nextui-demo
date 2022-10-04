export interface User {
    token: string | null;
    name: string
    id: number
    email: string | null
    isLogin: boolean
    isLoading: boolean
}
  
export const user: User = {
    token: null,
    name: '',
    id: -1,
    email: null,
    isLogin: false,
    isLoading: false
};
