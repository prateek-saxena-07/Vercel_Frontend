import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTrademark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export default function Logo() {
    return (<>
        <Link to='/'>
            <Box className="logo" style={{display:'flex'}} mt={1}>
                <FontAwesomeIcon icon={faYoutube} style={{ color: 'red', padding: '5px',width:'20px',height:'20px'}} />
            
                <Box style={{display:'flex'}} fontWeight={'bold'} fontSize={18}>YouTube
                    <FontAwesomeIcon icon={faTrademark} style={{width:'8px', height:'12px'}} />
            </Box>
            </Box>
        </Link>
    </>)
}