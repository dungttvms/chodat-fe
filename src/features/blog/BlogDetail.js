import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "./blogSlice";

function BlogDetail() {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.singleBlog);

  const params = useParams();
  const blogId = params.blogId;

  const [initialRender, setInitialRender] = useState("true");

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
    <div
      className="blog-detail-container"
      style={{
        fontFamily: " 'Montserrat', sans-serif !important",
        textAlign: "center",
        marginBottom: "40px",
      }}
    >
      <Helmet>
        <title>Phong thủy | Chợ đất Gia Lai</title>
      </Helmet>
      <p
        className="blog-detail-title"
        style={{
          width: "60vw",
          fontSize: "36px",
          fontWeight: "bold",
          margin: "40px auto",

          textTransform: "uppercase",
        }}
        dangerouslySetInnerHTML={renderHtmlSafety(blog.title)}
      />
      <p
        className="blog-detail-description"
        style={{
          width: "60vw",
          lineHeight: "1.8",
          margin: "0 auto",
          textAlign: "center",
        }}
        dangerouslySetInnerHTML={renderHtmlSafety(blog.descriptionDetail)}
      />
    </div>
  );
}

export default BlogDetail;
