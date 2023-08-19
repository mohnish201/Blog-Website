import React, {useEffect} from "react";
import { Box, Button, Image, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  let token = document.cookie?.split('=')[1]
  const navigate = useNavigate()

  const handleLogout=()=>{
     axios.get("http://localhost:4000/users/logout")
     .then((res)=> {console.log(res.data)
     navigate("/login")
    })
     .catch((err) => console.log(err))
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setShouldElevate(isScrolled);
    };

    

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      gap="60px"
      alignItems={"center"}
      bgColor="dodgerblue"
      color={"white"}
      fontSize="17px"
      w="100%"
      p="8px 30px 8px 30px "
      position="sticky"
      top={0}
      zIndex="sticky"
      

    >
      <Box display={"flex"} alignItems="center" gap="40px">
        <Image
          borderRadius={"6px"}
          mixBlendMode={"hard-light"}
          w="40px"
          src="https://play-lh.googleusercontent.com/36szRvmqeewn6fxpx9V88zhpPU3c84Im9zjAFPZl-cReiztnAD6cn0jSnWBGsNNdPsU"
        />
        <Link to="/">
          <Button  size={"sm"}>
            Home
          </Button>
        </Link>
      </Box>

      <HStack spacing={"60px"}>
        <Link to="/register">
          <Button colorScheme={"whiteAlpha"} size={"sm"}>
            Register
          </Button>
        </Link>
        <Link to="/login">
          <Button size={"sm"}>Login</Button>
        </Link>

       
          <Button onClick={handleLogout} size={"sm"}>Logout</Button>
        
      </HStack>
    </Box>
  );
};

export default Navbar;
