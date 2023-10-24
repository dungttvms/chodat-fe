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
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import SellIcon from "@mui/icons-material/Sell";
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
        style={{
          height: "200px",
          width: "300px",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
        image={post.images[0]}
        alt="Image Land"
        onClick={() => navigate(`/posts/${postId}`)}
      />
      <Stack>
        <Typography
          variant="subtitle1"
          align="left"
          sx={{
            pt: 2,
            pr: 1,
            pl: 1,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={() => navigate(`/posts/${postId}`)}
        >
          {post.title.slice(0, 25).toUpperCase()}...
        </Typography>
        <Stack
          display="flex"
          direction="column"
          spacing={1}
          alignItems="left"
          justifyContent="left"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{ ml: 2, mr: 2 }}
              variant="subtitle2"
              display="flex"
              alignItems="center"
            >
              <AttachMoneyIcon /> {post.price}
            </Typography>
            <Typography
              sx={{ ml: 2, mr: 2 }}
              variant="subtitle2"
              display="flex"
              alignItems="center"
            >
              <AspectRatioIcon sx={{ mr: 1 }} /> {post.acreage} m²
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{ ml: 2, mr: 2 }}
              variant="subtitle2"
              display="flex"
              alignItems="center"
            >
              <PlaceIcon sx={{ mr: 1 }} /> {post.province}
            </Typography>
            <Typography
              sx={{ ml: 2, mr: 2 }}
              variant="subtitle2"
              display="flex"
              alignItems="center"
            >
              <SellIcon sx={{ mr: 1 }} /> {post.status}
            </Typography>
          </Box>
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
      </Stack>
    </Card>
  );
};

export default PostCard;
