import React, { useState } from 'react';
import LikeButton from './LikeButton';
import DislikeButton from './DislikeButton';
import likedIcon from './liked.svg'; // Шлях до іконки "liked"
import notLikedIcon from './notliked.svg'; // Шлях до іконки "not liked"
import dislikedIcon from './disliked.svg'; // Шлях до іконки "disliked"
import notDislikedIcon from './notdisliked.svg'; // Шлях до іконки "not disliked"

function LikeDislikeToggle() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(10); // Початкове значення лайків
  const [dislikeCount, setDislikeCount] = useState(2); // Початкове значення дизлайків

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    }
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
    } else {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
    if (!disliked) {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
    } else {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    }
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
