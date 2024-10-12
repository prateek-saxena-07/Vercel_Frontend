import { Button, ButtonGroup } from "@chakra-ui/react";

const VideoFilter = ({setFilter}) => {

    return (<>
        <ButtonGroup pl={6}>
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>All</Button>
            
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>Podcast</Button>
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>Music</Button>
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>News</Button>
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>Satire</Button>
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>Gaming</Button>
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>Dad Jokes</Button>
            <Button onClick={(e)=>setFilter(e.target.textContent.toLowerCase())}>Live</Button>
        </ButtonGroup>
    </>)
}

export default VideoFilter;