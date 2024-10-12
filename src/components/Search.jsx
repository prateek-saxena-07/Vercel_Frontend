import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Box, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';


const Search = ({ setSearchTerm = () => {} }) => { //default to a no-op function
    const [inputValue, setInputValue] = useState(''); // Manage local input value

    const handleSearchClick = () => {
        setSearchTerm(inputValue); // Update searchTerm on button click
    };
    useEffect(() => {
        if (inputValue === '') {
            setSearchTerm(''); // Automatically send empty state if input is cleared
        }
    }, [inputValue, setSearchTerm]);

    return (
        <>
            <Box className="search" mt={1} onClick={handleSearchClick}  display="flex" 
                alignItems="center" 
                width="100%">
                <input
                    className="search-input"
                    type="text"
                    placeholder='Search'
                    style={{ width: '92%' }}
                    value={inputValue} // Controlled by local state
                    onChange={(e) => setInputValue(e.target.value)} // Update local state on input change
                />
               
                    <FontAwesomeIcon icon={faMagnifyingGlass} cursor={'pointer'}/>
               
            </Box>
        </>
    );
}

export default Search;
