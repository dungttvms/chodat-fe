import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FacebookShareButton } from "react-share";

import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fToNow } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";

const PostCard = ({ post }) => {
  const postId = post._id;
  const shareUrl = `${window.location.origin}/posts/${postId}`;
  const navigate = useNavigate();

  const { user, addPostToFavoriteList, removePostFromFavoriteList } = useAuth();

  const isHeart = user?.favoritePostList?.includes(postId);

  const handleHeartClick = () => {
    if (!isHeart) {
      addPostToFavoriteList({ postId });
    } else {
      removePostFromFavoriteList({ postId });
    }
  };
  return (
    <Card xs={12} md={4} sx={{ m: 2 }}>
      <CardMedia
        component="img"
        style={{ height: "200px", width: "300px" }}
        image={post.image[0]}
        alt="Image Land"
        onClick={() => navigate(`/posts/${postId}`)}
      />
      <Typography variant="subtitle1" align="left">
        {post.title.slice(0, 30).toUpperCase()}...
      </Typography>
      <Stack
        display="flex"
        direction="column"
        spacing={1}
        alignItems="left"
        justifyContent="left"
      >
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <Typography variant="subtitle2" display="flex" alignItems="center">
            <AttachMoneyIcon /> {post.price}
          </Typography>
          <Typography variant="subtitle2">{post.acreage} m²</Typography>
        </Box>

        <Typography variant="subtitle2" display="flex" alignItems="center">
          <PlaceIcon /> {post.address}
        </Typography>
      </Stack>
      <CardActions disableSpacing>
        <IconButton
          sx={{
            fontSize: "24px",
            padding: "8px",
          }}
          aria-label="add to favorites"
          onClick={handleHeartClick}
        >
          {isHeart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton aria-label="share">
          <FacebookShareButton
            sx={{
              height: "24px",
              width: "24px",
              padding: "8px",
            }}
            url={shareUrl}
          >
            <ShareIcon />
          </FacebookShareButton>
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          variant="caption"
          fontStyle="italic"
          sx={{ display: "block" }}
        >
          {fToNow(post.createdAt)}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
