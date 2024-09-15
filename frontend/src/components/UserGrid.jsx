import { Flex, Grid, Spinner,Text } from '@chakra-ui/react'
import React, { useEffect,useState } from 'react'
import PostCard from './PostCard'
import { BASE_URL } from '../App';

const UserGrid = ({users,setUsers}) => {
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const res = await fetch(BASE_URL+"api/friends");
                const data = await res.json();
                if (!res.ok){
                    throw new Error(data.error);
                }
                setUsers(data);
            }catch(error){
                console.error(error);
            }finally{
                setIsLoading(false);
            }
        }
        getUsers();
    },[setUsers]);
    return (
        <>
            <Grid templateColumns={{base:"1fr",md:"repeat(2,1fr)",lg:"repeat(3,1fr)",}} gap={4}>
                {users.map((user) => (
                <PostCard key={user.id} user={user} setUsers={setUsers}/>
                ))}
            </Grid>
            {isLoading && (
                <Flex justifyContent={"center"}>
                    <Spinner size={"xl"}/>
                </Flex>
            )}
            {!isLoading && users.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text fontSize={"xl"}>
                        No posts yet... be the 🥇
                    </Text>
                </Flex>
            )}
            
        </>
    )    
}

export default UserGrid