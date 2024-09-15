// import React from 'react'
import { Box, Button,Flex,FormControl,FormLabel,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Radio,RadioGroup,Textarea,useDisclosure, usePrevious, useToast} from '@chakra-ui/react';
import { useState } from 'react';
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from '../App';

const CreatePost = ({setUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name:"",
        post:"",
        gender:"",
    });
    const toast = useToast();
    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!inputs.name || !inputs.post || !inputs.gender) {
            toast({
                title: 'Error!',
                description: 'All fields are required.',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top center',
            });
            return;
        }
        setIsLoading(true);
        try {
           const res = await fetch(BASE_URL + "/api/friends", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(inputs)
           })

           const data = await res.json();
           if (!res.ok){
               throw new Error(data.error);
           }
           toast({
            title: 'Success!',
            description: "Post created successfully.",
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top center",
           });
           onClose();
           setUsers((prev) => [...prev, data]);
           setInputs({
            name:"",
            post:"",
            gender:"",
        });
        }catch(error){
            toast({
                title: 'Error!',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top center",
            });
        }finally{
            setIsLoading(false);
            
        }
    }
    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20}/>
        </Button> 
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <form onSubmit={handleCreatePost}>
                <ModalContent>
                    <ModalHeader>New Post</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6} >
                        <Flex alignItems={"center"} gap={4}>
                            <FormControl>
                                <FormLabel>Your Name</FormLabel>
                                <Input placeholder='John Wick' value={inputs.name} onChange={(e) => setInputs({...inputs,name:e.target.value})}/>
                            </FormControl>
                            <Box mt={8}>
                                <RadioGroup>
                                    <Radio value='male' onChange={(e) => setInputs({...inputs,gender:e.target.value})}>Male</Radio>
                                    <Radio value='female' onChange={(e) => setInputs({...inputs,gender:e.target.value})}>Female</Radio>
                                </RadioGroup>
                            </Box>
                        </Flex>
                        <FormControl mt={4}>
                                <FormLabel>What's on your mind ?</FormLabel>
                                <Textarea resize={"none"} overflow={"hidden"} placeholder='It is a beautiful day' value={inputs.post} onChange={(e) => setInputs({...inputs,post:e.target.value})}/>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
                            Post
                        </Button>
                        <Button onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
            

        </Modal>
    </>
};

export default CreatePost;