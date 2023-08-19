import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { easeOut } from "framer-motion";
import React, { useState, useRef } from "react";
import add from "../assets/add.png";

const Add_Notes = ({ getNotes }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toast = useToast();

  const addNotes = () => {
    const newNote = {
      title,
      body,
    };

    if ((title)) {
      axios
        .post("http://localhost:4000/notes/create", newNote, {
          headers: {
            Authorization: `Bearer ${document.cookie?.split("=")[1]}`,
          },
        })
        .then((res) => {
          toast({
            title: "Note Created.",
            description: "We've created Note for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          getNotes();
          setBody("");
          setTitle("");
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    else{
        toast({
            title: "Title cannot be empty.",
        
            status: "error",
            duration: 5000,
            isClosable: true,
          });
    }
  };
  return (
    <Box>
      <Box onClick={onOpen} position="relative">
        {" "}
        <Image position={"fixed"} top="80%" left="90%" src={add} width="60px" />
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Textarea
                placeholder="Note"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (title.trim() !== "") {
                  addNotes();
                  onClose();
                }
              }}
              isDisabled={title.trim() === ""}
             
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Add_Notes;
