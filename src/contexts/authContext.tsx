const AuthContext = createContext({} as AuthContextDataProps);
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from 'react-native';
import { IUser } from '../dtos/user';
import { api } from '../services/axios';
import { verifyInternet } from '../services/verifyInternet';
import { IAxiosSignIn, ISignIn, ISignInReturn } from './dto/signIn';
import { AxiosError } from 'axios';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextDataProps {
    user: IUser;
    signIn: ({user, password}: ISignIn) => Promise<ISignInReturn>;
    signOut: () => void;
    userLoaded: boolean;
}

function AuthProviderContext({ children }: AuthProviderProps) {
    const authStorageKey = '@SOL:auth';

    const [user, setUser] = useState({} as IUser);
    const [userLoaded, setUserLoaded] = useState(false);

    async function signIn({ user, password }: ISignIn) {
        try {
            if(user.trim().length == 0 || password.trim().length == 0) {
                Alert.alert("Preencha os dois campos", "Para fazer login você precisa preencher os campos de usuário e senha.");
                return
            }

            const hasInternet = await verifyInternet();

            const passwordEncoded = base64.encode(password);
            if(!hasInternet) {
                Alert.alert("Sem conexão", "Verifique sua conexão com a internet.")
                return {
                    code: 4
                }
            }

            const query = `user=${user}&password=${passwordEncoded}`;
            const { data } = await api.get<IAxiosSignIn>('/auth?'+query);

            const info = {
                id: data.userInfo.id,
                user: data.userInfo.user,
                token: data.token
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            setUser(info);

            await AsyncStorage.setItem(authStorageKey, JSON.stringify(info));

            return {
                code: 2
            }
        } catch (e: any) {
            console.log(e?.response)
            if(e?.response?.data?.code){
                const data = e?.response?.data;
                
                return data;
            }
            return {
                code: 3,
                title: 'Houve um erro ao tentar fazer login',
                message: JSON.stringify(e)
            }
        }
    }

    async function signOut() {
        try {
            await AsyncStorage.setItem(authStorageKey, '');
            setUser({} as IUser);
        } catch (error) {
            
        }
    }

    async function recoveryToken() {
        try {
            const value = await AsyncStorage.getItem(authStorageKey);
            if(value !== null) {
                const valueFormatted = JSON.parse(value);
                api.defaults.headers.common['Authorization'] = `Bearer ${valueFormatted.token}`;
                setUser(valueFormatted);
            }
        } catch(e) {
            
        } finally {
            setUserLoaded(true);
        }
    }

    useEffect(() => {
        recoveryToken();
    },[])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            userLoaded,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function authContext() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProviderContext, authContext }