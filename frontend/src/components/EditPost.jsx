import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

function EditModal({ user }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='See menu'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

            <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Edit</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6} >
                    <Flex alignItems={"center"} gap={4}>
                        <FormControl>
                            <FormLabel>Your Name</FormLabel>
                            <Input placeholder={user.name}/>
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                            <FormLabel>Your post</FormLabel>
                            <Textarea resize={"none"} overflow={"hidden"} placeholder={user.post}/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Apply Changes
                    </Button>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
		</>
	);
}

export default EditModal;