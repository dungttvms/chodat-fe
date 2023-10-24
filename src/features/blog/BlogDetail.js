import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "./blogSlice";
import "./BlogDetail.css";
import { Container, Typography } from "@mui/material";

function BlogDetail() {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.singleBlog);

  const params = useParams();
  const blogId = params.blogId;

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
    dispatch(getSingleBlog({ blogId }));
  }, [dispatch, blogId, initialRender]);

  const renderHtmlSafety = React.useCallback(
    (htmlString) => ({ __html: htmlString }),
    []
  );

  return (
    <Container className="blog-detail-container">
      <Helmet>
        <title>{`Chợ đất Tây Nguyên | ${blog.type}`}</title>
      </Helmet>
      <div
        className="blog-detail-title"
        dangerouslySetInnerHTML={renderHtmlSafety(blog.title)}
      />
      <Typography
        variant="caption"
        display="flex"
        textAlign="right"
        marginTop={8}
      >
        Lượt đọc: {blog.readCount}
      </Typography>
      <div
        className="blog-detail-description"
        dangerouslySetInnerHTML={renderHtmlSafety(blog.descriptionDetail)}
      />{" "}
    </Container>
  );
}

export default BlogDetail;
