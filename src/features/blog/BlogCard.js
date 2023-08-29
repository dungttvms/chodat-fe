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
import IconButton from "@mui/material/IconButton";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const blogId = blog._id;
  const shareUrl = `${window.location.origin}/blogs/${blogId}`;
  const handleCardClick = () => {
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100vh",
          height: "auto",
        }}
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          sx={{
            height: "100%",
            width: "50%",
            // objectFit: "cover",
          }}
          image={blog.imageCover}
          alt="green iguana"
        />

        <CardContent>
          <Stack sx={{ display: "flex", justifyItems: "space-around" }}>
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
            <Typography variant="body2" color="text.secondary">
              {blog.descriptionTitle}
            </Typography>
            <Box flexWrap={1} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
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
              <Typography variant="caption" sx={{ display: "block" }}>
                {fDate(blog.createdAt)}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
