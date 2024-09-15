import React from 'react';
import { Box, Container, Flex, Text, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreatePost from './CreatePost';


const Navbar = ({setUsers}) => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (<Container maxW={"85%"}>
                <Box px={4} my={4} bg={useColorModeValue("gray.200","gray.700")} borderRadius={5}>
                    <Flex h='16' alignItems={"center"} justifyContent={"space-between"} >

                        <Flex alignItems={"center"} justifyContent={"center"} gap={3} display={{base:"none", sm:"flex"}}>
                            <Text bgGradient='linear(to-l, #7928CA, #FF0080)'bgClip='text'fontSize='45px'fontWeight='extrabold' >THE POSTS...</Text>
                        </Flex>

                        <Flex alignItems={"center"} gap={3}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? <IoMoon /> : <LuSun size={20}/> }
                            </Button>
                            <CreatePost setUsers={setUsers}/>
                        </Flex>
                    </Flex>
                </Box>
            </Container>)
  
};
export default Navbar;