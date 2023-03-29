import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { auth } from 'src/firebase/index';
import { useState } from 'react' 
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';



export const useAuth = () =>{
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');
    const [ user, setUser ] = useState<User | null>(null);
    const router = useRouter()

    const signUp = async (email: string, password: string) => {
        setIsLoading(true);

        const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(response => {
            setUser(response.user)
            router.push('/')
            fetch('/api/customer', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: response.user.email, user_id: response.user.uid}),
              })
              Cookie.set('user_id', response.user.uid)
            setIsLoading(true)
        })
        .catch(err => setError(err.message))
        .finally( () => setIsLoading(false))        
    }

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);

        const response = await signInWithEmailAndPassword(auth, email, password)
        .then(response => {
            setUser(response.user)
            router.push('/')
            Cookie.set('user_id', response.user.uid)
            setIsLoading(true)
        })
        .catch(err => setError(err.message))
        .finally( () => setIsLoading(false))        
    }

    const logout = async () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            Cookie.remove('user_id')
            setUser(null)
            router.push('/auth')
        })
        .catch(error => setError( error.message))
        .finally(()=> setIsLoading(false))
    }

    return { error, isLoading, user, signIn, signUp, logout, setIsLoading, setUser}
}