import React, { useState } from "react";
import { TableCell, Typography, Pagination } from "@mui/material";

function UserFavoritePosts({ user }) {
  const itemsPerPage = 3; // Số bài yêu thích hiển thị trên mỗi trang
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
      <ul>
        {favoritePostsToDisplay.map((favoritePost, index) => (
          <li key={index}>
            <Typography>{favoritePost}</Typography>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Typography variant="body2" color="primary">
          Trang {page} / {totalPages}
        </Typography>
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
