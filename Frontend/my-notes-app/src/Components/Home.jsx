import React from "react";
import { Box, Button, Image } from "@chakra-ui/react";
import wallpaper from "../assets/wallpaper.jpg";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Box
      position={"relative"}
      h="540px"
      bgSize={"cover"}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgImage={wallpaper}
    >
      <Box
        w="800px"
        borderRadius={"15px"}
        m="auto"
        position={"absolute"}
        top="40px"
        left={"18%"}
        bgColor={"white"}
        h="150px"
        display={"flex"}
        alignItems="center"
        gap="30px"
      >
        <Box>
          <Image
            borderRadius={"6px"}
            w="150px"
            src="https://play-lh.googleusercontent.com/36szRvmqeewn6fxpx9V88zhpPU3c84Im9zjAFPZl-cReiztnAD6cn0jSnWBGsNNdPsU"
          />
        </Box>
        <Box fontSize="30px" fontFamily={"cursive"}>
          <Typewriter
            options={{
              loop: true, // Add the loop option to make it run again and again
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Transforming Ideas into Digital Notes.")
                .pauseFor(1000)
                .deleteAll()
                .start();
            }}
          />
        </Box>
      </Box>
      <Link to="/notes">
      <Button
        position={"relative"}
        top="150px"
        left={"600px"}
        size="sm"
        colorScheme={"blue"}
        >
        Create Notes
      </Button>
        </Link>
    </Box>
  );
};

export default Home;
