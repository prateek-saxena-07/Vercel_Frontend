import Search from './Search';
import Logo from './Logo';
import Signin from './Signinbtn';
import { Flex, Box, Spacer, Button,Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure,VStack,Text,Divider
} from '@chakra-ui/react';
  import {faCompass, faGamepad, faBook, faAddressCard, faBacon, faCab, faDashboard, faDownload,faBars, faVideo,faHouse  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdOutlineNotificationsNone } from "react-icons/md";


import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../utils/userSlice';
import ChannelModal from './ChannelModal';
import UploadModal from './UploadModal';
import ColorModeToggleButton from './Theme';


const Header = ({setSearchTerm}) => { // Accept props
    const { currentUser } = useSelector(state => state.user);
     const { isOpen, onOpen, onClose } = useDisclosure()
  
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

   

    return (
        <>
            <Flex m={2}>

<Button  onClick={onOpen}>
            <FontAwesomeIcon icon={faBars} />
      </Button>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent >
        <DrawerHeader borderBottomWidth="1px">
          <Box display={'flex'} ml={1}>
            <Box cursor="pointer" onClick={onClose} mt={1} mr={6} >
              <FontAwesomeIcon icon={faBars} />
            </Box>
            <Box pt={0}> <Logo/>
            </Box>
          </Box>
        </DrawerHeader>
        
        <DrawerBody>
          <VStack align="start" spacing={4} w="full">
            <Link to='/'>
              <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
                <FontAwesomeIcon icon={faHouse} />
                <Text ml={4}>Home</Text>
              </Box>
            </Link>
            <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faCompass} />
              <Text ml={4}>Explore</Text>
            </Box> 
            <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faGamepad} />
              <Text ml={4}>Gaming</Text>
            </Box>
            <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faBook} />
              <Text ml={4}>Books</Text>
            </Box>
            
            {/* Divider to separate sections */}
            <Divider my={2} />

            <Text fontWeight="bold">You</Text>
            {currentUser?(<Link to={`/channel/${currentUser._id}`}>
              <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
                <FontAwesomeIcon icon={faAddressCard} />
                <Text ml={4}>Profile</Text>
              </Box>
            </Link>):(<Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faAddressCard} />
              <Text ml={4}>Profile</Text>
            </Box>)}
            <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faBacon} />
              <Text ml={4}>Dining</Text>
            </Box>
            <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faCab} />
              <Text ml={4}>Travel</Text>
            </Box>
            <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faDashboard} />
              <Text ml={4}>Dashboard</Text>
            </Box>

            {/* Divider to separate sections */}
            <Divider my={2} />

            <Text fontWeight="bold">Downloads</Text>
            <Box display="flex" alignItems="center" w="full" cursor={'pointer'}>
              <FontAwesomeIcon icon={faDownload} />
              <Text ml={4}>Download</Text>
                  </Box>
                  
                  {currentUser?(<Button onClick={handleLogout}>Logout</Button>):(<Link to='/signup'><Signin /></Link>)}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>


                <Spacer />
                <Box>
                    <Logo />
                </Box>
                <Spacer />
                <Spacer />
                <Spacer />
                <Box width='55%'>
                    <Search  setSearchTerm={setSearchTerm} /> {/* Pass props to Search */}
                </Box>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
          <Box display={'flex'} justifyContent="space-between" alignItems="center" gap={4} >
            <ColorModeToggleButton/>
                    {currentUser ? (
                        <>
                <UploadModal></UploadModal>
                <MdOutlineNotificationsNone size={24} cursor={'pointer'}/>
                            <Box>
                              <ChannelModal />
                              
                            </Box>
                            
                        </>
                    ) : (
                        <Link to='/signup'><Signin /></Link>
                    )}
                </Box>
            </Flex>
        </>
    );
}

export default Header;
