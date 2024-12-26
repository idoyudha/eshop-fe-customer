"use client"

import { getCurrentUser, fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

const useAuthUser = () => {
    const [user, setUser] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const session = await fetchAuthSession();
            if (!session.tokens) {
                return;
            }

            const user = {
                ...(await getCurrentUser()),
                ...(await fetchUserAttributes())
            };

            setUser(user);
        };

        getUser();
    }, []);
    
    return user;
};

export default useAuthUser;