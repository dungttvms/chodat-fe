import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Container,
} from "@mui/material";

function Review(clientName, province, phoneNumber) {
  return (
    <Container maxWidth="md">
      <h3>Summary</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Tên
              </TableCell>
              <TableCell>{clientName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Tỉnh
              </TableCell>
              <TableCell>{province}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Số điện thoại
              </TableCell>
              <TableCell>{phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

Review.propTypes = {
  clientName: PropTypes.string,
  province: PropTypes.string,
  phoneNumber: PropTypes.string,
};

export default Review();
