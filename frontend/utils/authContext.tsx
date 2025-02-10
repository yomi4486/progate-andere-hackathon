import { GoogleSignin, SignInSuccessResponse, SignInResponse } from '@react-native-google-signin/google-signin';
import { createContext, useContext, useState } from 'react';
import { AppType } from '../../backend/src';
import { HonoResponseType } from './resnposeType';
const { hc } = require("hono/dist/client") as typeof import("hono/client");
import * as userRequest from './users';

const AuthContext = createContext<AuthHandler>({} as AuthHandler);
const base_url: string = `${process.env.EXPO_PUBLIC_BASE_URL}`;
const client = hc<AppType>(base_url);

let authHandler:AuthHandler | null =null;

export const useAuthContext = () => {
    if(authHandler){
        return authHandler
    }else{
        authHandler = new AuthHandler()
        return authHandler
    }
};

class AuthHandler {
    user:SignInSuccessResponse | undefined
    idToken: string | undefined

    constructor(){

    }

    async googleSignIn(){
        GoogleSignin.configure({ iosClientId: "165387728661-co452vd2hfojg56nnknpu9j8ddksm66l.apps.googleusercontent.com", offlineAccess: false });

        try {
            await GoogleSignin.hasPlayServices();
            let userInfo = await GoogleSignin.signIn();
            
            if (userInfo.data == null || !userInfo.data.idToken) {
                throw Error("Login Cancel")
            }

            this.user = userInfo
            this.idToken = userInfo.data.idToken

        } catch(error) {
            throw Error("Login UnSuccessfull")
        }
    }

    async isSetupAccount(){
        try{
            const res = await userRequest.get(this.idToken)
            console.log(res)
            return true
        }catch{
            return false
        }
    }
}

/*
const useAuthProvider = () => {
    const [user, setUser] = useState<SignInSuccessResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [idToken, setIdToken] = useState<string | null>(null);
    const [myStatus, setMyStatus] = useState<HonoResponseType<typeof client.users.$get> | null>(null);

    const googleSignIn = async (): Promise<boolean> => {
        setLoading(true);
        GoogleSignin.configure({ iosClientId: "165387728661-co452vd2hfojg56nnknpu9j8ddksm66l.apps.googleusercontent.com", offlineAccess: false });
        
        try {
            await GoogleSignin.hasPlayServices();
            let userInfo = await GoogleSignin.signIn();
            
            if (userInfo["data"] == null) {
                throw Error("Login Cancel")
            }
            
            setUser(userInfo);
            setIdToken(userInfo.data.idToken);
            
            const res = await get();
            console.log(res);
            setMyStatus(res)
            console.log("ddddd");
            return true
        } catch(error) {
            console.error(error);
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
        myStatus,
        googleSignIn,
        signOut
    };
};
*/


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authContext = useAuthContext()

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};