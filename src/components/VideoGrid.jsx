import { SimpleGrid } from "@chakra-ui/react";
import VideoCard from './VideoCard.jsx';
import { Link } from "react-router-dom";

const VideoGrid = ({ videos }) => {
    console.log();
    console.log(videos);
    return (<>
        <SimpleGrid minChildWidth='250px' spacing='10px' m={6}>
            {[...videos].reverse().map((video) => (<Link to={`/video/${video._id}`}>
                <VideoCard props={video} key={video.id}></VideoCard>
            </Link>))}
        </SimpleGrid>
    </>);
}

export default VideoGrid;

