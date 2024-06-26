import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(function() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });
    const [token, setToken] = useState(function() {
        return localStorage.getItem('token');
    });

    async function login( codigo, senha) {

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo: codigo, senha: senha })
        });
        if (response.ok) {
            console.log('Login bem-sucedido');
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            setToken(data.token);
            localStorage.setItem('token', data.token);
        } else {
            console.error('Erro ao fazer login:', response);
            throw new Error('Usuário ou senha incorretos');
        }
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

 return (
   <AuthContext.Provider value={{ login, user, token, logout }}>
     {children}
   </AuthContext.Provider>
 );
};

export {AuthContext};