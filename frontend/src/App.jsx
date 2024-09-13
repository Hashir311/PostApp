import {Container,Text, Stack} from '@chakra-ui/react'
import Navbar from './components/Navbar'
import UserGrid from './components/UserGrid'

function App() {

  return (
    <>
      <Stack minH={"100vh"}>
        <Navbar />

        <Container maxW={"1200px"} my={4}>
          <Text fontSize={{base:"3x1",md:"30"}} letterSpacing={"2px"} textAlign={"center"} mb={8}>
            <Text as={"span"} >Say what's on your mind</Text>
          </Text>
          <UserGrid/>
        </Container>
      </Stack>
    </>
  )
}

export default App
