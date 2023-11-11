import { useDispatch, useSelector } from "react-redux"
import { AuthUserI, RootState, clearErrorMesssage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import { calendarApi } from "../api";
import { AxiosError } from "axios";

export const useAuthStore = () => {
    const { status, user: userE, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const user = userE as AuthUserI;
    
    const startLogin = async({ email, password }: { email: string, password: string }) => {
        dispatch(onChecking());
        try {
            const {data} = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({name: data.name, _id: data.uid}))
        } catch(error) {
            console.log("error", error);
            dispatch(onLogout("Invalid Email / Password"))
            setTimeout(()=> {
                dispatch(clearErrorMesssage())
            }, 10)
        }
    };

    const startRegister = async ({name, email, password} : {name: string; email:string; password:string}) => {
        dispatch(onChecking());
        try {
            const {data} = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({name: data.name, _id: data.uid}))
        } catch(error) {
            const axiosError = error as AxiosError<{msg: string}>;
            dispatch(onLogout(axiosError.response?.data.msg || 'Error'))
            setTimeout(()=> {
                dispatch(clearErrorMesssage())
            }, 10)
        }
    }
    
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());
        
        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({name: data.name, _id: data.uid}))
        } catch(error) {
            localStorage.clear();
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout())
    }

    return{
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}