import { GoogleSignin, SignInSuccessResponse } from '@react-native-google-signin/google-signin';
import { createContext, useContext, useState } from 'react';
import * as userRequest from './users';

export interface AuthContextType {
    user: SignInSuccessResponse | null;
    idToken: string | null;
    googleSignIn: () => Promise<void>;
    isSetupAccount: () => Promise<boolean>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<SignInSuccessResponse | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);

    const googleSignIn = async () => {
        GoogleSignin.configure({ iosClientId: "165387728661-co452vd2hfojg56nnknpu9j8ddksm66l.apps.googleusercontent.com", offlineAccess: false });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (!userInfo.data || !userInfo.data.idToken) {
                throw new Error("Login Cancel");
            }

            setUser(userInfo);
            setIdToken(userInfo.data.idToken);
        } catch (error) {
            throw new Error("Login Unsuccessful");
        }
    };

    const isSetupAccount = async (): Promise<boolean> => {
        if (!idToken) return false;
        try {
            const res = await userRequest.get(idToken);
            console.log(res);
            return true;
        } catch {
            return false;
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUser(null);
            setIdToken(null);
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, idToken, googleSignIn, isSetupAccount, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// カスタムフックで `useAuth` を提供
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
