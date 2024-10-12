// import { faBars, faHouse, faCompass, faGamepad, faBook, faAddressCard, faBacon, faCab, faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';
import { PiHouseLight } from "react-icons/pi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LiaDownloadSolid } from "react-icons/lia";
import { SiYoutubeshorts } from "react-icons/si";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VStack,Box, Spacer,Text } from '@chakra-ui/react';
const Sidebar = () =>
{
    return (<>
          <VStack
      
      
      align="start"
      p={0}
      h="100vh"
      spacing={6}
      w="60px" // Adjust width to control text wrapping
    >
      <Box display="flex" flexDirection="column" alignItems="center" w="100%" cursor={'pointer'}>
        <PiHouseLight size={24} />
        <Text mt={1} fontSize="sm" textAlign="left" ml="2px" noOfLines={1}>
          Home
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" w="100%" cursor={'pointer'}>
        <SiYoutubeshorts size={24} />
        <Text mt={1} fontSize="sm" textAlign="left" ml="2px" noOfLines={1}>
          Shorts
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" w="100%" cursor={'pointer'}>
        <MdOutlineSubscriptions size={24} />
        <Text mt={1} fontSize="sm" textAlign="left" ml="2px" noOfLines={1} pl={2}>
          Subscriptions
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" w="100%" cursor={'pointer'}>
        <LiaDownloadSolid size={24} />
        <Text mt={1} fontSize="sm" textAlign="left" ml="2px" noOfLines={1}>
          Downloads
        </Text>
      </Box>
    </VStack>
        
    </>)
}
export default Sidebar;