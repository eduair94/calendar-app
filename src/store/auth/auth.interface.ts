export enum AuthStatus {
    checking = 'checking',
    authenticated = 'authenticated',
    notAuthenticated = 'notAuthenticated'
}

export interface AuthUserI {
    name: string;
    _id: string;
  }
  
export interface AuthStateI {
    status: AuthStatus;
    user: AuthUserI | object;
    errorMessage?: string | null;
}