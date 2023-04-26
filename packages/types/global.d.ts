declare global {
    interface CurrentUser {
        id: number;
        firstName: string;
        lastName: string;
        code: string;
        type: 'admin' | 'user';
        email: string;
    }
}

export {}
