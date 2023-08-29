import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "./blogSlice";
import "./BlogDetail.css";

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
    <div className="blog-detail-container">
      <Helmet>
        <title>Phong thủy | Chợ đất Gia Lai</title>
      </Helmet>
      <div
        className="blog-detail-title"
        dangerouslySetInnerHTML={renderHtmlSafety(blog.title)}
      />
      <div
        className="blog-detail-description"
        dangerouslySetInnerHTML={renderHtmlSafety(blog.descriptionDetail)}
      />
    </div>
  );
}

export default BlogDetail;
