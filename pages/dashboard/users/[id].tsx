import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { api_signup } from '@/api/APIs';

const UserDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const cookie = new Cookies();
    const [user, setUser] = useState();

    useEffect(() => {
        if (id) {
            // Fetch user details based on the ID
            axios.get(`${api_signup}${id}/`, {
                headers: {
                    Authorization: `Token ${cookie.get('token')}`,
                }
            })
                .then(response => {
                    console.log('User details:', response.data);
                    setUser(response.data)
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, [id]);

    return (
        <LayoutDashboard>
            <div>
                <h1>User Details {id}</h1>
                {/* Display user details here */}
            </div>
        </LayoutDashboard>
    );
};

export default UserDetails; // Ensure there is a default export
