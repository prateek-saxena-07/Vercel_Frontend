import { SimpleGrid } from "@chakra-ui/react";
import ChannelVideoCard from './ChannelVideoCard.jsx';
// import { Link } from "react-router-dom";

const ChannelVideoGrid = ({ videos }) => {
    //props are immutable thats why [...video] is used as it creates a copy of the original array passed as props
    
    return (<>
        <SimpleGrid minChildWidth='250px' spacing='10px' m={6}>
            {[...videos].reverse().map((video) => ( <ChannelVideoCard props={video} key={video.id}></ChannelVideoCard>))}
        </SimpleGrid>
    </>);
}

export default ChannelVideoGrid;