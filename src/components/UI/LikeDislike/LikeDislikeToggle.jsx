import React, { useState } from 'react';
import LikeButton from './LikeButton';
import DislikeButton from './DislikeButton';

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
        likedIcon="/icons/liked.svg"
        notLikedIcon="/icons/notliked.svg"
      />
      <DislikeButton
        disliked={disliked}
        onClick={handleDislike}
        count={dislikeCount}
        dislikedIcon="/icons/disliked.svg"
        notDislikedIcon="/icons/notdisliked.svg"
      />
    </div>
  );
}

export default LikeDislikeToggle;
