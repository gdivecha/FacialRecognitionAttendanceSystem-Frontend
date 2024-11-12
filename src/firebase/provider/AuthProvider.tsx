import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import { User } from "firebase/auth";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={user}>
          {children}
        </AuthContext.Provider>
    );
};
