import React from 'react'
import {useSelector} from "react-redux";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import moment from "moment";

import { useEffect, useState } from 'react'
import "./style.scss"
import API from "../../utills/API";
import Footer from '../Footer/Footer';

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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

 
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize:'16px',
    border:"1px solid white"
  },
}));
  const gold = {

    backgroundImage:"url(https://static.vecteezy.com/system/resources/thumbnails/002/011/509/small/gold-metal-texture-background-illustration-vector.jpg)",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat"
  }
  const goldBadge = "https://user-images.githubusercontent.com/90475607/192353043-6a0fe803-8e29-4639-84f8-9ba602bbadc9.png";
  const silver = {
    backgroundImage:"url(https://static.vecteezy.com/system/resources/thumbnails/007/306/898/small/stylish-panoramic-background-silver-steel-metal-texture-vector.jpg)",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat"
  }
  const silverBadge = "https://user-images.githubusercontent.com/90475607/192353115-b5136289-9bf2-4d79-b580-89bc8f18a613.png";
  
  const bronze = {
    background: `rgb(162,87,65)`,
    background: `linear-gradient(90deg, rgba(162,87,65,1) 0%, rgba(252,206,187,1) 50%, rgba(162,87,65,1) 96%)`
  }
  const bronzeBadge = "https://user-images.githubusercontent.com/90475607/192353208-751e8773-5a0d-4620-a4eb-08d10f5db110.png";
  

function Leaderboard() {

  const [data, setData] = useState([]);
  const [userID, setUserID] = useState("");
  const [loader, setLoader] = useState(true);

  const storeData = useSelector((state) => state)
    useEffect(()=>{
        if(storeData.isLogin)
            setUserID(storeData.data._id);
        else
            setUserID("");
    }, [storeData])


    useEffect(()=>{
        fetch(API+`/leaderboard`).then(resp=>resp.json())
        .then(resp=>{
            let filteredData = [];
            resp.data.map((el,i)=>{
                let time = new Date(el.updatedAt);
                filteredData.push([i+1, el.user.image, el.user.name, el.user.email.split("@")[0], (+el.bestScore.netSpeed).toFixed(2), el.updatedAt, el.user._id, (time).toLocaleString()]);
            })
            setData(filteredData);
            setLoader(false)
        })
    }, [])

   

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
   <>
    <div id='leaderboard'>
        <div id='upper-section'>
            <h1>Leaderboard</h1>
        </div>
        <div id='rank-section'>
       {
        loader?
        <div className='leaderboard-loader'></div>
        :
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="Leaderboard" size='small' >
            <TableHead>
              <TableRow>
                  <StyledTableCell align='center' style={{ minWidth: "40px"}}>
                      Rank
                  </StyledTableCell>
                  <StyledTableCell>
                      Avatar
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: "100px" }}>
                      Name
                  </StyledTableCell>
                  <StyledTableCell className='desktop-cols' style={{ minWidth: "100px" }}>
                      Username
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: "50px" }}>
                      Net Speed
                  </StyledTableCell>
                  <StyledTableCell className='desktop-cols' style={{ minWidth: "70px" }}>
                      Test Taken on
                  </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {data
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((el, i)=>{
              return (
                  <StyledTableRow key={i} style={el[0]==1?gold:el[0]==2?silver:el[0]==3?bronze:{}}>
                      <StyledTableCell align='center'> {el[0] == 1? <img src={goldBadge} height={"40px"} /> : el[0]==2?<img src={silverBadge} height={"40px"} />: el[0]==3 ? <img src={bronzeBadge} height={"40px"} /> : (el[0]%10)==1 ? el[0]+"st" : (el[0]%10)==2 ? el[0]+"nd" : (el[0]%10) == 3 ? el[0]+"rd" : el[0]+"th"}</StyledTableCell>
                      <StyledTableCell><img style={{height:"40px", borderRadius:"50%"}} alt={el[2]} src={el[1]} /></StyledTableCell>
                      <StyledTableCell>{userID&&userID==el[6]?<StarRoundedIcon color='primary' style={{marginBottom:"-5px"}} />:""} {el[2]}</StyledTableCell>
                      <StyledTableCell className='desktop-cols'>{el[3]}</StyledTableCell>
                      <StyledTableCell>{el[4]}</StyledTableCell>
                      <StyledTableCell className='desktop-cols'><CustomTooltip title={el[7]} placement='top' arrow><span style={{cursor:"pointer"}}>{moment(el[5]).fromNow()}</span></CustomTooltip></StyledTableCell>
                  </StyledTableRow>
              )
             })
             }
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
       }
        </div>
    </div>
   <Footer />
   </>
   
  )
}

export default Leaderboard