import { use } from "react";
import useAuth from "./useAuth"
import { useQuery} from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: currentUser, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`user/${user?.email}`);
            return res.data;
    },
    enabled: !!user?.email && !!localStorage.getItem('token')
    })
    
    return { currentUser, isLoading }; 
}

export default useUser