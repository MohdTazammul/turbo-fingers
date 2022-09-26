import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useEffect, useState } from 'react'
import "./style.scss"
import API from "../../utills/API";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const gold = {
    background: `rgb(219,165,20)`,
    background: `linear-gradient(90deg, rgba(219,165,20,1) 0%, rgba(255,222,0,1) 50%, rgba(219,165,20,1) 96%)`
  }

  const silver = {
    background: `rgb(131,131,131)`,
    background: `linear-gradient(90deg, rgba(131,131,131,1) 0%, rgba(206,206,206,1) 50%, rgba(131,131,131,1) 96%)`,
  }

  const bronze = {
    background: `rgb(162,87,65)`,
    background: `linear-gradient(90deg, rgba(162,87,65,1) 0%, rgba(252,206,187,1) 50%, rgba(162,87,65,1) 96%)`
  }

function Leaderboard() {

    const [data, setData] = useState([]);

    useEffect(()=>{

        fetch(API+"/leaderboard").then(resp=>resp.json())
        .then(resp=>{
            let copyData = [];
            resp.data.map((el,i)=>{
                copyData.push([i+1, el.user.image, el.user.name, el.user.email.split("@")[0], el.bestScore.netSpeed, el.updatedAt]);
            })
            setData(copyData);
        })
    }, [])

    useEffect(()=>{
        console.log(data)
    }, [data])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  

  return (
    <div id='leaderboard'>
        <div id='upper-sction'>
            <h1>Leaderboard</h1>
        </div>
        <div id='rank-secion'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <StyledTableCell align='center' style={{ minWidth: "70px" }}>
                    Rank
                </StyledTableCell>
                <StyledTableCell >
                    Image
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: "100px" }}>
                    Name
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: "100px" }}>
                    Username
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: "100px" }}>
                    Net Speed
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: "100px" }}>
                    Test Taken on
                </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {data
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .map((el)=>{
            return (
                <StyledTableRow style={el[0]==1?gold:el[0]==2?silver:el[0]==3?bronze:""}>
                    <StyledTableCell align='center'>{el[0]%10==1?el[0]+"st":el[0]%10==2?el[0]+"nd":el[0]%10==3?el[0]+"rd":el[0]+"th"}</StyledTableCell>
                    <StyledTableCell><img style={{height:"50px", width:"50px", borderRadius:"50%"}} alt={el[2]} src={el[1]} /></StyledTableCell>
                    <StyledTableCell>{el[2]}</StyledTableCell>
                    <StyledTableCell>{el[3]}</StyledTableCell>
                    <StyledTableCell>{el[4]}</StyledTableCell>
                    <StyledTableCell>{el[5]}</StyledTableCell>
                </StyledTableRow>
            )
           })
           }
            {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  
        </div>
    </div>
  )
}

export default Leaderboard