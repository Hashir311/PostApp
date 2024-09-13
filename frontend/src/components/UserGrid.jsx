import { Grid } from '@chakra-ui/react'
import React from 'react'
import { USERS } from '../dummy/dummy'
import PostCard from './PostCard'

const UserGrid = () => {
    return <Grid templateColumns={{base:"1fr",md:"repeat(2,1fr)",lg:"repeat(3,1fr)",}} gap={4}>
        {USERS.map((user) => (
        <PostCard key={user.id} user={user}/>
        ))}
    </Grid>
}

export default UserGrid