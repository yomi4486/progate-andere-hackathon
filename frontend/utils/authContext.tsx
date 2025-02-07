import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { createContext, useContext, useEffect, useState } from 'react';

type Auth = {
    user: User | null;
    loading: boolean;
    googleSignIn: () => Promise<boolean>;
};

const AuthContext = createContext<Auth>({} as Auth);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useAuthProvider = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GoogleSignin.configure({ iosClientId: "165387728661-co452vd2hfojg56nnknpu9j8ddksm66l.apps.googleusercontent.com" });
    }, []);

    const googleSignIn = async (): Promise<boolean> => {
        setLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            if(userInfo["data"] == null){
                return false;
            }
            if (userInfo) {
                setUser(userInfo);
            }
            setLoading(false);
            return true;
        } catch(error) {
            console.error(error)
            setLoading(false);
            return false;
        }
    };

    return {
        user,
        loading,
        googleSignIn,
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useAuthProvider();

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};