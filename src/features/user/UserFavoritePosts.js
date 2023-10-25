import React, { useState } from "react";
import { Pagination, TableCell } from "@mui/material";

function UserFavoritePosts({ user }) {
  const itemsPerPage = 2;
  const [page, setPage] = useState(1);

  const totalFavoritePosts = user.favoritePostList.length;
  const totalPages = Math.ceil(totalFavoritePosts / itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const favoritePostsToDisplay = user.favoritePostList.slice(
    startIndex,
    endIndex
  );

  return (
    <TableCell>
      {favoritePostsToDisplay.map((favoritePost, index) => (
        <a
          key={index}
          href={`/posts/${favoritePost}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>{favoritePost}</h4>
        </a>
      ))}
      {totalPages > 1 && (
        <h6 variant="body2" color="primary">
          Trang {page} / {totalPages}
        </h6>
      )}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </TableCell>
  );
}

export default UserFavoritePosts;
