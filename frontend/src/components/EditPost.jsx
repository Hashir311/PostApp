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
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditModal({ user,setUsers }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: user.name,
		post: user.post,
	});
	const toast = useToast();
	const handleEdit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "api/friends/" + user.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prev) =>
				prev.map((u) => (u.id === user.id ? data : u))
			);
			onClose();
			toast({
				title: "Success!",
				description: "Post updated successfully.",
				status: "success",
				duration: 2000,
				isClosable: true,
				position: "top center",
			});
		} catch (error) {
			console.error(error);
			toast({
				title: "Error!",
				description: error.message,
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top center",
			});
		} finally {
			setIsLoading(false);
		}
	};
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
			<form onSubmit={handleEdit }>
				<ModalContent>
					<ModalHeader>Edit</ModalHeader>
					<ModalCloseButton/>
					<ModalBody pb={6} >
						<Flex alignItems={"center"} gap={4}>
							<FormControl>
								<FormLabel>Your Name</FormLabel>
								<Input value={inputs.name} onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}/>
							</FormControl>
						</Flex>
						<FormControl mt={4}>
								<FormLabel>Your post</FormLabel>
								<Textarea resize={"none"} overflow={"hidden"} value={inputs.post} onChange={(e) => setInputs((prev) => ({ ...prev, post: e.target.value }))}/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} type="submit">
							Apply Changes
						</Button>
						<Button onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</form>
            

        </Modal>
		</>
	);
	}

export default EditModal;