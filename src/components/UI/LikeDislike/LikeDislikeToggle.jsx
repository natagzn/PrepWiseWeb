import React, { useState } from 'react';
import LikeButton from './LikeButton';
import DislikeButton from './DislikeButton';
import { addFavoriteResource, removeFavoriteResource } from 'api/apiResource';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function LikeDislikeToggle({ id, isLiked, onRemove, likes, dislikes }) {
  const [liked, setLiked] = useState(isLiked === true);
  const [disliked, setDisliked] = useState(isLiked === false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const { t } = useTranslation();

  const handleLike = async () => {
    try {
      if (liked) {
        await removeFavoriteResource(id);
        setLiked(false);
        setLikeCount(likeCount - 1);
        toast.success(t('like_removed'));
      } else {
        await addFavoriteResource(id, true);
        setLiked(true);
        setLikeCount(likeCount + 1);
        if (disliked) {
          setDisliked(false);
          setDislikeCount(dislikeCount - 1);
        }
        toast.success(t('like_added'));
      }
    } catch (error) {
      console.error('Error updating like:', error);
      toast.error(t('like_error'));
    }
  };

  const handleDislike = async () => {
    try {
      if (disliked) {
        await removeFavoriteResource(id);
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
        toast.success(t('dislike_removed'));
      } else {
        await addFavoriteResource(id, false);
        setDisliked(true);
        setDislikeCount(dislikeCount + 1);
        if (liked) {
          setLiked(false);
          setLikeCount(likeCount - 1);
        }
        toast.success(t('dislike_added'));
      }
    } catch (error) {
      console.error('Error updating dislike:', error);
      toast.error(t('dislike_error'));
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <LikeButton
        liked={liked}
        onClick={handleLike}
        count={likeCount}
        likedIcon="/icons/LikeDislike/liked.svg"
        notLikedIcon="/icons/LikeDislike/notliked.svg"
      />
      <DislikeButton
        disliked={disliked}
        onClick={handleDislike}
        count={dislikeCount}
        dislikedIcon="/icons/LikeDislike/disliked.svg"
        notDislikedIcon="/icons/LikeDislike/notdisliked.svg"
      />
    </div>
  );
}

export default LikeDislikeToggle;
