import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import {
  Box,
  Button,
  FormControl,
  Input,
  Heading,
  Image,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cookies, setCookie] = useCookies("token")
  const toast = useToast();
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      pass,
    };
    axios
      .post("http://localhost:4000/users/login", user)
      .then((res) =>{ console.log(res.data.msg)
        
      setCookie("token", res.data.token, { path: '/' });
      res.data.msg == "Wrong Credentials" ?
      toast({
        title: "Wrong Credentials.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }) : toast({
        title: 'Login Successfull.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      } ,)  }

      
      )
      .catch((err) => console.log(err));
   
      setEmail("")
      setPass("")

      navigate("/")
  };


 

  return (
    <Box
      height={"539px"}
      bgColor={"#B9E9FC"}
      display={"flex"}
      alignItems="center"
      justifyContent={"space-around"}
    >
      <Image
        mixBlendMode={"multiply"}
        src="https://i.pinimg.com/564x/40/36/89/403689fe701fedda5ceb6f82c7a88992.jpg"
      />

      <form onSubmit={handleLogin}>
        <FormControl
          w="sm"
          boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
          bgColor="white"
          p="20px"
          borderRadius={"10px"}
        >
          <Heading textAlign={"center"} fontSize={"30px"} mb="20px">
            Login 📘
          </Heading>
          <FormLabel mt="20px" fontSize={"15px"}>
            Enter Registered Email
          </FormLabel>
          <Input
            type="email"
            value={email}
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            size={"sm"}
            w="xs"
          />

          <FormLabel mt={"20px"} fontSize={"15px"}>
            Enter Your Password
          </FormLabel>
          <Input
            type="password"
            value={pass}
            variant="filled"
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter Your Password"
            size={"sm"}
            w="xs"
          />
          <Button
            m="auto"
            display={"block"}
            mt={"20px"}
            type="submit"
            colorScheme={"messenger"}
          >
           Login
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Login;
