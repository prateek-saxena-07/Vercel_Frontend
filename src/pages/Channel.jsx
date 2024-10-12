import { Grid,GridItem,ButtonGroup,Button,HStack,VStack,Image,Box ,Text,Heading, Tab, Tabs, TabList} from "@chakra-ui/react"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChannelVideoGrid from "../components/ChannelVideoGrid";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";


const Channel = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { videoData } = useSelector((state) => state.homeVideosGrid)
    const params = useParams();
    //const videoArr = videoData || [];for error debugging
    const videoArr = videoData
    // console.log(typeof(videoData),videoData);
    const currentUservideos = videoArr.filter(video => (params.id === video.userId));  //filtering according to user ID


    //Todo add filter on channel page as well
    
    const navigate = useNavigate();
    // console.log(currentUser)

 if (!currentUser) {
        // Redirect to home page
        navigate('/');
        return null; // Prevent rendering the rest of the component
    }


    return (<>
        
        <Header></Header>
        <VStack>
            <Box mb={8}  ml={10} mr={4}>
                {/* Banner */}
                <Image borderRadius={'30px'} src={currentUser.banner} height={'150px'} width={'1500px'}></Image>
                
            </Box>
            <Box width={'90vw'}>
                <HStack>
                    <Box>
                        {/* Logo */}
                        <Image src={currentUser.profileImg} borderRadius={'50%'} height={'200px'}></Image>
                    </Box>

                    <Box>
                        <VStack>
                            {/* Channel name,moto etc */}<Box>
                                <Heading as='h2'>{currentUser.channel_name}</Heading>
                        <Text>{currentUser.handle}
•
2.18M subscribers
•
                                    {currentUservideos.length} videos</Text>
                            <Text>
                                Sponsorship Enquires: Yeahmad@rightclick.gg ...<b>more</b></Text>
                            <Text>yeahmad.com
                                    <b>and 3 more links</b></Text>
                            <Button mt={4} borderRadius={'30px'} color={"black"} background={'Red'}>
                                Subscribe
                            </Button>
                            </Box>
                            
                        </VStack>
                    </Box>
                </HStack>
            </Box>
            <Box width={'90vw'}>
                {/* Tabs =>Home,video,etc */}
                <Tabs>
                    <TabList>
                        <Tab>
                            Home
                        </Tab>
                        <Tab>
                            Videos
                        </Tab>
                        <Tab>Shorts</Tab>
                        <Tab>Playlists</Tab>
                        <Tab>
                            Posts
                        </Tab>
                        <Tab>
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </Tab>
                    </TabList>
                </Tabs>
                
            </Box>

            <Box width={'90vw'}>
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
        </ButtonGroup>
        </Box>
        </VStack>
        <Box ml={6}>
            <ChannelVideoGrid videos={currentUservideos}></ChannelVideoGrid>
        </Box>
            

            

    </>)
}

export default Channel;