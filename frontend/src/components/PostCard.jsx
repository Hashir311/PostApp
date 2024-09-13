import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import EditPost from './EditPost'

const PostCard = ({user}) => {
  return (
    <Card>
        <CardHeader>
            <Flex>
                <Flex flex={"1"} gap={4} alignItems={"center"}>
                    <Avatar src='https://avatar.iran.liara.run/public'/>
                    <Box>
                        <Heading size="sm">{user.name}</Heading>
                    </Box>
                </Flex>
                <Flex>
                    <EditPost user={user}/>
                    <IconButton variant='ghost' colorScheme='red' size={'sm'} aria-label='See menu' icon={<BiTrash size={20}/>}/>
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