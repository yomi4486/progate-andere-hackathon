import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { createContext, useContext, useEffect, useState } from 'react';

type Auth = {
    user: User | null;
    loading: boolean;
    idToken: string;
    googleSignIn: () => Promise<boolean>;
    signOut :() => Promise<void>;
};

const AuthContext = createContext<Auth>({} as Auth);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useAuthProvider = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [idToken, setIdToken] = useState<string | null>(null);
    useEffect(() => {
        GoogleSignin.configure({ iosClientId: "165387728661-co452vd2hfojg56nnknpu9j8ddksm66l.apps.googleusercontent.com",offlineAccess:false });
    }, []);

    const googleSignIn = async (): Promise<boolean> => {
        setLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const accessToken = await GoogleSignin.getTokens();
            if(userInfo["data"] == null){
                return false;
            }
            if (userInfo) {
                console.log(accessToken);
                setUser(userInfo);
                setIdToken(accessToken.accessToken);
            }
            setLoading(false);
            return true;
        } catch(error) {
            console.error(error)
            setLoading(false);
            return false;
        }
    };

    const signOut = async (): Promise<void> => {
        await GoogleSignin.signOut();
        setUser(null);
        setLoading(true);
    };

    return {
        user,
        loading,
        idToken,
        googleSignIn,
        signOut
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useAuthProvider();

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};