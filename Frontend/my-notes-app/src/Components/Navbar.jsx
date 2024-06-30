import React, { useEffect } from "react";
import { Box, Button, Image, HStack, Heading } from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  };

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
          <Button size={"sm"}>Home</Button>
        </Link>
      </Box>

      <HStack spacing={"60px"}>
        {!isAuth ? (
          <Link to="/register">
            <Button colorScheme={"whiteAlpha"} size={"sm"}>
              Register
            </Button>
          </Link>
        ) : (
          <Heading fontSize={"15px"}>{`Welcome ${username}`}</Heading>
        )}

        {isAuth ? (
          <Button onClick={handleLogout} size={"sm"}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button size={"sm"}>Login</Button>
          </Link>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
