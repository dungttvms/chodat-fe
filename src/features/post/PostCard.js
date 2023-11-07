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
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import SellIcon from "@mui/icons-material/Sell";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fToNow } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";
import { FACEBOOK_URL } from "../../app/config";

const PostCard = ({ post }) => {
  const postId = post._id;
  const navigate = useNavigate();
  const { user, addPostToFavoriteList, removePostFromFavoriteList } = useAuth();

  const [isSharing, setSharing] = React.useState(false); // State để kiểm soát trạng thái của nút chia sẻ

  const isHeart = user?.favoritePostList?.includes(postId);

  const handleHeartClick = () => {
    if (!isHeart) {
      addPostToFavoriteList({ postId });
    } else {
      removePostFromFavoriteList({ postId });
    }
  };

  const shareUrl = `${window.location.origin}/posts/${postId}`;

  const shareFacebook = () => {
    const facebookShareUrl = `${FACEBOOK_URL}${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl, "_blank");
  };

  const truncatedTitle = React.useMemo(
    () => post.title.slice(0, 25).toUpperCase(),
    [post.title]
  );
  const formattedPrice = React.useMemo(() => `${post.price}`, [post.price]);
  const formattedAcreage = React.useMemo(() => `${post.acreage} m²`, [
    post.acreage,
  ]);
  const formattedProvince = React.useMemo(() => post.province, [post.province]);
  const formattedStatus = React.useMemo(() => post.status, [post.status]);
  const formattedCreatedTime = React.useMemo(() => fToNow(post.createdAt), [
    post.createdAt,
  ]);

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
            cursor: "pointer",
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
              cursor: "pointer",
            },
          }}
          onClick={() => navigate(`/posts/${postId}`)}
        >
          {truncatedTitle}...
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
              <AttachMoneyIcon /> {formattedPrice}
            </Typography>
            <Typography
              sx={{ ml: 2, mr: 2 }}
              variant="subtitle2"
              display="flex"
              alignItems="center"
            >
              <AspectRatioIcon sx={{ mr: 1 }} /> {formattedAcreage}
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
              <PlaceIcon sx={{ mr: 1 }} /> {formattedProvince}
            </Typography>
            <Typography
              sx={{ ml: 2, mr: 2 }}
              variant="subtitle2"
              display="flex"
              alignItems="center"
            >
              <SellIcon sx={{ mr: 1 }} /> {formattedStatus}
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

          <IconButton
            sx={{
              fontSize: "24px",
              padding: "8px",
              color: isSharing ? "primary.main" : "inherit",
            }}
            aria-label="share on Facebook"
            onClick={shareFacebook}
            onMouseEnter={() => setSharing(true)}
            onMouseLeave={() => setSharing(false)}
          >
            <ShareIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="caption"
            fontStyle="italic"
            sx={{ display: "block" }}
          >
            {formattedCreatedTime}
          </Typography>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default PostCard;
