import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Image,
  useToast,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_Notes from "./Add_Notes";
import add from "../assets/add.png";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleAdd = () => {
    setShow(!show);
  };

  const getRandomColor = () => {
    const colors = [
      "#FFF3DA",
      "#FFD1DA",
      "#A7ECEE",
      "#FEFF86",
      "#A5F1E9",
      "#E3ACF9",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getNotes = () => {
    axios
      .get("http://localhost:4000/notes", {
        headers: {
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      })
      .then((res) => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteNotes=(id) => {
    console.log(id)
    console.log(document.cookie?.split('=')[1])
    axios.delete(`http://localhost:4000/notes/delete/${id}`, {
        headers:{
            Authorization:`Bearer ${document.cookie?.split('=')[1]}`
        }
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Box w="100%">
      <Add_Notes getNotes={getNotes} />

      <Grid
        templateColumns={"repeat(5, 1fr)"}
        justifyContent="center"
        p="20px"
        boxSizing="border-box"
        alignItems={"flex-start"}
        gap="20px"
        // border={"2px solid black"}
      >
        {notes.map((el) => (
          <Box
            key={el._id}
            // border="2px solid black"
            boxSizing="border-box"
            p="20px"
            maxWidth={"250px"}
            maxHeight={"400px"}
            overflow="auto"
            borderRadius={"15px"}
            backgroundColor={getRandomColor()}
            
            
          >
            <Heading fontSize={"17px"} mb="10px">
              {el.title}
            </Heading>
            
            <Button onClick={() => deleteNotes(el._id)} fontSize={"12px"} position={"absolute"} top="10px" left="190px" size={"xxs"} mixBlendMode="darken">❌</Button>

            {/* <Divider w="100%" h="1px" mb="10px" color={"black"} bgColor="black" /> */}
            <Text>{el.body}</Text>
          </Box>
        ))}
      </Grid>

      
    </Box>
  );
};

export default AllNotes;
