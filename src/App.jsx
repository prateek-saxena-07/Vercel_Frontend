import VideoGrid from "./components/VideoGrid";
import Header from "./components/Header";
import VideoFilter from "./components/VideoFilter";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVideos } from "./utils/homeVideosSlice";

const App = () => {
    // const [bars, setBars] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [activeFilter, setActiveFilter] = useState("all");
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.homeVideosGrid.videoData);
    console.log(videos);
    console.log(activeFilter)
    
    const getFilteredItems = (videos) => {
    // If the active filter is 'all', return all videos
    if (activeFilter.toLowerCase() === 'all') {
        return videos;
    }

    // Otherwise, filter videos by tags
    return videos.filter((item) => item.tags.includes(activeFilter));
    };
    

 const FinalVideos = videos.filter((item) => {
        // First, filter videos based on search term (or show all videos if search is empty)
        const isSearchMatch = searchTerm
            ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true; // If searchTerm is empty, all videos match

        // Then, apply any active filters (or all if "all" is selected)
        const filteredItems = getFilteredItems([item]);

        return isSearchMatch && filteredItems.length > 0;
    });


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('https://vercel-backend-blue.vercel.app/temp/getVideos');
                const data = await response.json();
                console.log(data.data);
                dispatch(setVideos(data.data));
            } catch (err) {
                setError(err.message || 'failed to fetch Videos');
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
//   console.log(searchTerm);

    return (
        <>
            <Header setSearchTerm={setSearchTerm}  /> 
            <Grid
                templateAreas={`
                    "sidebar filter"
                    "sidebar grid"`}
                gridTemplateRows={'51px 40px'}
                gridTemplateColumns={'70px 3fr'}
                h='200px'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
            >
                {/* <GridItem pl={2} area={'header'}>
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
                </GridItem> */}
                <GridItem pl='2' area={'sidebar'} pt={6} mt={0}>
                    <Sidebar  />
                </GridItem>
                <GridItem pl='3' area={'filter'} pt={4}>
                    <VideoFilter setFilter={setActiveFilter} />
                </GridItem>
                <GridItem pl='3' area={'grid'} pt={0}>
                    <VideoGrid videos={FinalVideos} />
                </GridItem>
            </Grid>
        </>
    );
}

export default App;
