import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import { Link } from "react-scroll";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardActionArea
        sx={{ display: "flex", flexDirection: "row" }}
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          height="200px"
          width="250px"
          image={blog.imageCover}
          alt="green iguana"
        />

        <CardContent>
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
          <Typography variant="caption" sx={{ display: "block" }}>
            {fDate(blog.createdAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
