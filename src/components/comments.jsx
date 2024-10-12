import React, { useState, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  postCommentStart,
  postCommentSuccess,
  postCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
} from '../utils/commentsSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import {
  Menu, MenuButton, MenuList,MenuItem,Input,  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Divider,
  
} from '@chakra-ui/react';


const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState(''); // State to manage new comment input
  const { currentUser } = useSelector((state) => state.user);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    const fetchComments = async () => {
      dispatch(fetchCommentsStart());
      try {
        const response = await fetch(`https://vercel-backend-blue.vercel.app/comments/${videoId}`);
          const data = await response.json();
          console.log(data)
        dispatch(fetchCommentsSuccess(data));
      } catch (err) {
        dispatch(fetchCommentsFailure());
      }
    };
    fetchComments();
  }, [videoId, dispatch]);

  const handlePostComment = async () => {
    dispatch(postCommentStart());
    try {
      const commentData = {
        videoId,
        desc: newComment, // Comment description from input
        profileImg:currentUser.profileImg
      };

      const response = await fetch(`https://vercel-backend-blue.vercel.app/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        credentials:'include',
        body: JSON.stringify(commentData),
      });
      const createdComment = await response.json();
      dispatch(postCommentSuccess(createdComment));
      setNewComment(''); // Clear the input after successful submission
    } catch (err) {
      dispatch(postCommentFailure());
    }
  };

  const handleDeleteComment = async (commentId) => {
    dispatch(deleteCommentStart());
    try {
      await fetch(`https://vercel-backend-blue.vercel.app/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
                    'Content-Type': 'application/json',
        },
          credentials:'include',
      });
      dispatch(deleteCommentSuccess(commentId));
    } catch (err) {
      dispatch(deleteCommentFailure());
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading comments.</p>;

 const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = (event) => {
    // Check if the click is on the button
    if (event.relatedTarget !== null && event.relatedTarget.tagName === 'BUTTON') {
      // Do nothing to prevent focus loss
      return;
    }
    setIsInputFocused(false);
  };
 const handleButtonClick = () => {
    handlePostComment();
    
  };

  return (
    <div>

{/* Add Comment Form */}
      {currentUser ? ( // Only show the input if the user is logged in
        <Box display='flex' pt={2} pl={4}><Image src={currentUser.profileImg} alt="" height={'40px'} width={'40px'} borderRadius={'50px'} mr={4}/>
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            borderBottom={'solid 1px'}
            borderRight={'none'}
            borderTop={'none'}
            borderLeft={'none'}
            width={'70%'}
            mr={2}
          />
           {isInputFocused && (
        <button onClick={handleButtonClick} disabled={!newComment.trim()}>
          Post
        </button>
      )}
        </Box>
      ) : (
        <p>Please <Link to='/login'>log in</Link> to add comments.</p> // Message for logged-out users
      )}


      {/* Comments List */}
       <Box>
      {comments.map((comment) => (
        <Flex
          key={comment._id}
          pt={6}
          alignItems="flex-start"
          // _hover={{ bg: "gray.100" }}
        >
          <Image
            src={comment.profileImg}
            alt="Profile"
            boxSize="40px"
            borderRadius="full"
            mr={3}
          />
          <Box flex="1">
            <Text fontWeight="bold" fontSize="sm">
              {comment.username} {/* Assuming you have a username field */}
            </Text>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {comment.desc}
            </Text>
          </Box>
          <Menu>
            <MenuButton as={IconButton} icon={<FontAwesomeIcon icon={faEllipsisVertical} />} variant="outline" size="sm" />
            <MenuList minWidth="auto">
              {currentUser && comment.userId === currentUser._id && (
                <MenuItem onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      ))}
    </Box>

      
    </div>
  );
};

export default Comments;
