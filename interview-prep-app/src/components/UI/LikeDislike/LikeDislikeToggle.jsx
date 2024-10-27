import React, { useState } from 'react';
import LikeButton from './LikeButton';
import DislikeButton from './DislikeButton';
import likedIcon from './liked.svg';
import notLikedIcon from './notliked.svg';
import dislikedIcon from './disliked.svg';
import notDislikedIcon from './notdisliked.svg';

function LikeDislikeToggle({ id, isLiked, onRemove }) {
  const [liked, setLiked] = useState(isLiked === true);
  const [disliked, setDisliked] = useState(isLiked === false);
  const [likeCount, setLikeCount] = useState(10);
  const [dislikeCount, setDislikeCount] = useState(2);

  const like = () => {
    setLiked(true);
    setLikeCount(likeCount + 1);
    console.log('Like ' + id);
  };

  const dislike = () => {
    setDisliked(true);
    setDislikeCount(dislikeCount + 1);
    console.log('Dislike ' + id);
    if (onRemove) onRemove(); // виклик onRemove при дизлайку
  };

  const deleteLike = () => {
    setLiked(false);
    setLikeCount(likeCount - 1);
    console.log('Delete like ' + id);
    if (onRemove) onRemove(); // виклик onRemove при знятті лайку
  };

  const deleteDislike = () => {
    setDisliked(false);
    setDislikeCount(dislikeCount - 1);
    console.log('Delete dislike ' + id);
  };

  const handleLike = () => {
    if (disliked) {
      deleteDislike();
    }
    liked ? deleteLike() : like();
  };

  const handleDislike = () => {
    if (liked) {
      deleteLike();
    }
    disliked ? deleteDislike() : dislike();
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <LikeButton
        liked={liked}
        onClick={handleLike}
        count={likeCount}
        likedIcon={likedIcon}
        notLikedIcon={notLikedIcon}
      />
      <DislikeButton
        disliked={disliked}
        onClick={handleDislike}
        count={dislikeCount}
        dislikedIcon={dislikedIcon}
        notDislikedIcon={notDislikedIcon}
      />
    </div>
  );
}

export default LikeDislikeToggle;
