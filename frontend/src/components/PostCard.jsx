import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useColorMode, useToast } from '@chakra-ui/react'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import EditPost from './EditPost'
import { BASE_URL } from '../App'

const PostCard = ({user,setUsers}) => {
    const toast = useToast();
	const { colorMode } = useColorMode();
	const handleDelete = async () => {
		try {
			const res = await fetch(BASE_URL + "api/friends/" + user.id, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
			toast({
				status: "success",
				title: "Success",
				description: "Post deleted successfully.",
				duration: 2000,
				position: "top-center",
			});
		} catch (error) {
			toast({
				title: "Something went wrong",
				description: error.message,
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top-center",
			});
		}
	};
  return (
    <Card bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}>
        <CardHeader>
            <Flex>
                <Flex flex={"1"} gap={4} alignItems={"center"}>
                    <Avatar src={user.imgUrl}/>
                    <Box>
                        <Heading size="sm">{user.name}</Heading>
                    </Box>
                </Flex>
                <Flex>
                    <EditPost user={user} setUsers={setUsers}/>
                    <IconButton onClick={handleDelete} variant='ghost' colorScheme='red' size={'sm'} aria-label='See menu' icon={<BiTrash size={20}/>}/>
                </Flex>
            </Flex>
        </CardHeader>

        <CardBody>
            <Text>
                {user.post}
            </Text>
        </CardBody>
    </Card>)
}

export default PostCard