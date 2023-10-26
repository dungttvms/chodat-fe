import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Stack } from "@mui/material";
import { FacebookShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-scroll";
import { FACEBOOK_URL } from "../../app/config";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const blogId = blog._id;
  const shareUrl = `${window.location.origin}/blogs/${blogId}`;

  const handleCardClick = () => {
    navigate(`/blogs/${blogId}`);
  };

  const [isSharing, setSharing] = React.useState(false);

  const shareFacebook = () => {
    const facebookShareUrl = `${FACEBOOK_URL}${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl, "_blank");
  };

  return (
    <Card sx={{ m: 2, display: "flex" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "50%",
            minHeight: "200px",
          }}
          image={blog.imageCover}
          alt="image-cover"
        />

        <CardContent sx={{ flex: "1" }}>
          <Stack
            sx={{
              display: "relative",
              flexDirection: "column",
            }}
          >
            <Link to="title-blog-detail" smooth={true} duration={500}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="title-blog-detail"
              >
                {blog.title}
              </Typography>
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 3, mb: 5 }}
            >
              {blog.descriptionTitle}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around ",
              }}
            >
              <FacebookShareButton
                sx={{
                  height: "24px",
                  width: "24px",
                  padding: "8px",
                  color: isSharing ? "primary.main" : "inherit",
                }}
                url={shareUrl}
                quote={blog.title}
                hashtag="Chợ đất Tây Nguyên"
                onClick={shareFacebook}
                onMouseEnter={() => setSharing(true)}
                onMouseLeave={() => setSharing(false)}
              >
                <ShareIcon />
              </FacebookShareButton>

              <Typography variant="caption" sx={{ display: "block" }}>
                {fDate(blog.createdAt)}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  cursor: "pointer",
                }}
                onClick={handleCardClick}
              >
                Đọc tiếp
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
