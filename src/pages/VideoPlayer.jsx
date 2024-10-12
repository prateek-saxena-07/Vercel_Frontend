import Header from '../components/Header';
import { Box, Grid, Text, Image, Flex, Button, VStack, HStack, Divider,ButtonGroup,IconButton } from "@chakra-ui/react";
import { faThumbsUp, faThumbsDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Comments from '../components/Comments';
import { dislike, fetchSuccess, like } from '../utils/videoPlayerSlice';
import { PiShareFat } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import { format } from 'timeago.js';
import { MdOutlineSort } from "react-icons/md";
const VideoPageLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const params = useParams();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const[numberOfComments,setNumberOfComments]=useState(0)

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await fetch(`https://vercel-backend-blue.vercel.app/temp/find/${params.id}`);
      const data = await response.json();
      dispatch(fetchSuccess(data));
    };
    fetchVideo();
  }, [dispatch, params.id]);

  useEffect(() => {
    const updateViews = async () => {
      await fetch(`https://vercel-backend-blue.vercel.app/temp/view/${params.id}`, { method: 'PUT' });
    };
    updateViews();
  }, [params.id]);

  const handleLike = async () => {
    await fetch(`https://vercel-backend-blue.vercel.app/user/like/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await fetch(`https://vercel-backend-blue.vercel.app/user/dislike/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    dispatch(dislike(currentUser._id));
  };

   useEffect(() => {
    const profile = async () => {
      const response = await fetch(`https://vercel-backend-blue.vercel.app/user/${currentVideo.userId}`);
      const commentres=await fetch(`https://vercel-backend-blue.vercel.app/comments/${params.id}`)
      const data = await response.json()
      const commentdata = await commentres.json();
      // console.log(data.profileImg)
      // console.log(commentdata)
      setProfile(data.profileImg);
      setName(data.channel_name)
      setNumberOfComments(commentdata.length)
     };
     

    profile();
  },[currentVideo]);

  if (!currentVideo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Grid
        templateAreas={`"video video recommendations" 
          "description description recommendations"
           "comments comments recommendations"`}
        gridTemplateRows={'auto auto 1fr'}
        gridTemplateColumns={'3fr 1fr'}
        gap={6}
        padding={6}
      >
        {/* Video Player */}
        <Box gridArea="video" bg="gray.900" height="400px" borderRadius="md">
          <iframe
            width="100%"
            height="100%"
            src={currentVideo.videoUrl}
           
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>

        {/* Video Description Section */}
        <Box gridArea="description" padding="4">
          <VStack align="stretch" spacing={4}>
            <Box>Title of the video</Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              {/* for channel image channel name subscribe button like dislikes and other icons.. */}


              <Box display={'flex'} gap={4}>
                {/* channel image name  subs */}
                <Image src={profile} height={'30px'} width={'30px'} />
                <Text>{name}</Text>
                 <Button borderRadius={'30px'} color={"black"} background={'Gray'}>
                    Subscribe
                  </Button>
              </Box>

              <Box>
                {/* likes dislike,share and other icons */}
                {currentUser && currentVideo ? (
                <Button onClick={handleLike} leftIcon={
                  currentVideo.likes?.includes(currentUser._id) ? <FontAwesomeIcon icon={faThumbsUp} /> : <FontAwesomeIcon icon={faThumbsUpOutline} />
                } mr={1} borderRadius={'50px'}>
                  {currentVideo.likes.length}
                </Button>
              ) : (
                <Button leftIcon={<FontAwesomeIcon icon={faThumbsUpOutline} />} borderRadius={'50px'} mr={1}>{currentVideo.likes.length}</Button>
              )}
              {currentUser && currentVideo ? (
                <Button onClick={handleDislike} leftIcon={
                  currentVideo.dislikes?.includes(currentUser._id) ? <FontAwesomeIcon icon={faThumbsDown} /> : <FontAwesomeIcon icon={faThumbsDownOutline} />
                } borderRadius={'50px'}>
                  {currentVideo.dislikes.length}
                </Button>
              ) : (
                <Button leftIcon={<FontAwesomeIcon icon={faThumbsDownOutline} />} borderRadius={'50px'}>{currentVideo.dislikes.length}</Button >
                )}
                &nbsp;
                <Button borderRadius={'50px'}><PiShareFat/>&nbsp;Share</Button>&nbsp;
                <Button borderRadius={'50px'}><TfiDownload/>&nbsp;Download</Button>&nbsp;
                <Button borderRadius={'50px'}><FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon></Button>
              </Box>
            </Box>

            <Box bg={'gray.600'} borderRadius={'30px'}>
              {/* For views date posted on, description  */}

              <Text><span>{currentVideo.views + " "}views</span><span>{" " + format(currentVideo.createdAt)}</span></Text>
              <Text>{currentVideo.desc}</Text>
              
            </Box>

          </VStack>
        </Box>

        {/* Comments Section */}
        <Box gridArea="comments" padding="4" bg="black.100" borderRadius="md">
          <Box display={'flex'} gap={16}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>{numberOfComments + " "}Comments</Text>
            <Box display={'flex'}>
              <MdOutlineSort size={28} />
              Sort By
            </Box>
          </Box>
          <Comments videoId={params.id} />
        </Box>

        {/* Recommended Videos */}
        <Box gridArea="recommendations" padding="4"  borderRadius="md"  height="full" overflowY="auto">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Recommended Videos</Text>
           <Box pb={4} >
                {/* Filters */}
                <ButtonGroup>
            <Button>
                Latest
            </Button>
            <Button>
                Popular
                    </Button>
                    <Button>
                        Oldest
              </Button>

              <IconButton borderRadius={'50px'} backgroundColor={'transparent'}
          icon={<ChevronRightIcon />} ml={2}
        />
            </ButtonGroup>
              
        </Box>
          <VStack spacing={4} align="stretch">
            <Flex>
              <Image src="https://via.placeholder.com/120" alt="Thumbnail" width="120px" height="90px" borderRadius="md" />
              <Box ml={3}>
                <Text fontWeight="bold">React.js Basics</Text>
                <Text fontSize="sm" color="gray.500">Awesome Coder</Text>
                <Text fontSize="sm" color="gray.500">100K views · 1 week ago</Text>
              </Box>
            </Flex>
            <Flex>
              <Image src="https://via.placeholder.com/120" alt="Thumbnail" width="120px" height="90px" borderRadius="md" />
              <Box ml={3}>
                <Text fontWeight="bold">Advanced React Techniques</Text>
                <Text fontSize="sm" color="gray.500">Awesome Coder</Text>
                <Text fontSize="sm" color="gray.500">50K views · 2 days ago</Text>
              </Box>
            </Flex>
            <Flex>
              <Image src="https://via.placeholder.com/120" alt="Thumbnail" width="120px" height="90px" borderRadius="md" />
              <Box ml={3}>
                <Text fontWeight="bold">Advanced React Techniques</Text>
                <Text fontSize="sm" color="gray.500">Awesome Coder</Text>
                <Text fontSize="sm" color="gray.500">50K views · 2 days ago</Text>
              </Box>
            </Flex>
            <Flex>
              <Image src="https://via.placeholder.com/120" alt="Thumbnail" width="120px" height="90px" borderRadius="md" />
              <Box ml={3}>
                <Text fontWeight="bold">Advanced React Techniques</Text>
                <Text fontSize="sm" color="gray.500">Awesome Coder</Text>
                <Text fontSize="sm" color="gray.500">50K views · 2 days ago</Text>
              </Box>
            </Flex>
            <Flex>
              <Image src="https://via.placeholder.com/120" alt="Thumbnail" width="120px" height="90px" borderRadius="md" />
              <Box ml={3}>
                <Text fontWeight="bold">Advanced React Techniques</Text>
                <Text fontSize="sm" color="gray.500">Awesome Coder</Text>
                <Text fontSize="sm" color="gray.500">50K views · 2 days ago</Text>
              </Box>
            </Flex>
            <Flex>
              <Image src="https://via.placeholder.com/120" alt="Thumbnail" width="120px" height="90px" borderRadius="md" />
              <Box ml={3}>
                <Text fontWeight="bold">Advanced React Techniques</Text>
                <Text fontSize="sm" color="gray.500">Awesome Coder</Text>
                <Text fontSize="sm" color="gray.500">50K views · 2 days ago</Text>
              </Box>
              
            </Flex>
            <Flex>
              <Image src="https://via.placeholder.com/120" alt="Thumbnail" width="120px" height="90px" borderRadius="md" />
              <Box ml={3}>
                <Text fontWeight="bold">Advanced React Techniques</Text>
                <Text fontSize="sm" color="gray.500">Awesome Coder</Text>
                <Text fontSize="sm" color="gray.500">50K views · 2 days ago</Text>
              </Box>
            </Flex>
          
           
           

          </VStack>
        </Box>
      </Grid>
    </>
  );
};

export default VideoPageLayout;
