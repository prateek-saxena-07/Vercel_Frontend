import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
    ModalCloseButton,
    Button,
  useDisclosure
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { setVideos } from '../utils/homeVideosSlice';

export default function VideoDeleteModal({videoId}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleDelete = async() => {
  
    try {
      const response = await fetch(`https://vercel-backend-blue.vercel.app/temp/${videoId}`, {
        method: 'DELETE',
       headers: {
                    'Content-Type': 'application/json',
        },
        credentials:'include' 
      },
        
        )
      const data = await response.json();
      dispatch(setVideos(data.data));
      console.log('data.data', data.data);
      console.log('data',data)
      onClose();
      
    }
    catch(err) {
      console.log(err)
    }
}

    return (<>
    <Button onClick={onOpen}>Delete</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' background={'red'} onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        
    </>)
}