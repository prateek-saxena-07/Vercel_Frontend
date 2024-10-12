import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Avatar,
    FormLabel,
    Input
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginSuccess } from '../utils/userSlice';

const ChannelModal = () => {
     const { currentUser } = useSelector(state => state.user);
    const [channelData, setChannelData] = useState({ channel_name: '', handle: '',profileImg:currentUser.profileImg,banner:currentUser.banner});
    const { isOpen, onOpen, onClose } = useDisclosure();
   
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setChannelData({ ...channelData, [e.target.name]: e.target.value });
    };

    const handleUpdates = async () => {
        try {
            const response = await fetch(`https://vercel-backend-blue.vercel.app/user/${currentUser._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(channelData),
            });
            const data = await response.json();
            dispatch(loginSuccess(data));
            navigate(`/channel/${currentUser._id}`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAvatarClick = () => {
        // Check if the user already has a channel
        if (currentUser.channel_name || currentUser.handle) {
            navigate(`/channel/${currentUser._id}`);
        } else {
            onOpen();  // Open modal to create a new channel
        }
    };

    return (
        <>
            {/* Conditionally redirect or open modal */}
            <Avatar onClick={handleAvatarClick} cursor="pointer" src={currentUser.profileImg} size={'sm'}/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>How you'll appear</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <Avatar />
                            <FormLabel>Channel Name</FormLabel>
                            <Input
                                name="channel_name"
                                value={channelData.channel_name}
                                type="text"
                                onChange={handleChange}
                            />
                            <FormLabel>Handle</FormLabel>
                            <Input
                                name="handle"
                                value={channelData.handle}
                                type="text"
                                onChange={handleChange}
                            />
                             <FormLabel>Profile/Channel Image</FormLabel>
                            <Input
                                name="profileImg"
                                value={channelData.profileImg}
                                type="text"
                                onChange={handleChange}
                            />
                             <FormLabel>Channel Banner</FormLabel>
                            <Input
                                name="banner"
                                value={channelData.banner}
                                type="text"
                                onChange={handleChange}
                            />
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={handleUpdates}>
                            Create channel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChannelModal;
