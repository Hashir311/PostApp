import {Container,Text, Stack} from '@chakra-ui/react'
import Navbar from './components/Navbar'
import UserGrid from './components/UserGrid'
import { useState } from 'react'

export const BASE_URL = "http://127.0.0.1:5000/" 

function App() {
  const [users,setUsers] = useState([])
  return (
    <>
      <Stack minH={"100vh"}>
        <Navbar setUsers={setUsers}/>

        <Container maxW={"1200px"} my={4}>
          <Text fontSize={{base:"3x1",md:"30"}} letterSpacing={"2px"} textAlign={"center"} mb={8}>
            <Text as={"span"} >Say what's on your mind</Text>
          </Text>
          <UserGrid users={users} setUsers={setUsers}/>
        </Container>
      </Stack>
    </>
  )
}

export default App
