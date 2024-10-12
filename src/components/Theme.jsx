import React from 'react';
import { Button, Box, useColorMode} from '@chakra-ui/react';
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

const ColorModeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} borderRadius={'50px'}>
       {colorMode === 'light' ? <IoMoonSharp /> : <IoSunnyOutline />} 
    </Button>
  );
};

export default ColorModeToggleButton;