import React, { useState, useMemo, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { FacebookShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-scroll";
import { FACEBOOK_URL } from "../../app/config";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const blogId = blog._id;
  const shareUrl = useMemo(() => `${window.location.origin}/blogs/${blogId}`, [
    blogId,
  ]);

  const handleCardClick = useCallback(() => {
    navigate(`/blogs/${blogId}`);
  }, [navigate, blogId]);

  const [isSharing, setSharing] = useState(false);

  const shareFacebook = useCallback(() => {
    const facebookShareUrl = `${FACEBOOK_URL}${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl, "_blank");
  }, [shareUrl]);

  return (
    <Card sx={{ m: 2, display: "flex" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100vh",
          height: "auto",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "39vh",
            minHeight: "200px",
            cursor: "pointer",
          }}
          onClick={handleCardClick}
          image={blog.imageCover}
          alt="image-cover"
        />

        <CardContent sx={{ flex: "1" }}>
          <Stack
            sx={{
              display: "relative",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Link to="title-blog-detail" smooth={true} duration={500}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="title-blog-detail"
                onClick={handleCardClick}
                sx={{ cursor: "pointer" }}
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
            <Stack />

            <Stack>
              <Box flexGrow={1} />
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
          </Stack>
        </CardContent>
      </Card>
    </Card>
  );
};

export default BlogCard;
