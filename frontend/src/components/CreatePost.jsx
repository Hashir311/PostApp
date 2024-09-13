// import React from 'react'
import { Box, Button,Flex,FormControl,FormLabel,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Radio,RadioGroup,Textarea,useDisclosure} from '@chakra-ui/react';
import { BiAddToQueue } from "react-icons/bi";

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20}/>
        </Button> 
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>New Post</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6} >
                    <Flex alignItems={"center"} gap={4}>
                        <FormControl>
                            <FormLabel>Your Name</FormLabel>
                            <Input placeholder='John Wick'/>
                        </FormControl>
                        <Box mt={8}>
                            <RadioGroup defaultValue='male'>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </RadioGroup>
                        </Box>
                    </Flex>
                    <FormControl mt={4}>
                            <FormLabel>What's on your mind ?</FormLabel>
                            <Textarea resize={"none"} overflow={"hidden"} placeholder='It is a beautiful day'/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Post
                    </Button>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    </>
};

export default CreatePost;