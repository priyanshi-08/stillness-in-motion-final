import useAuth from "./useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: currentUser, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            try {
                const res = await axiosSecure.get(`user/${user?.email}`);
                return res.data;
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                return null;
            }
        },
        enabled: !!user?.email,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        retry: 2
    });

    return { 
        currentUser, 
        isLoading,
        refetch 
    };
}

export default useUser
