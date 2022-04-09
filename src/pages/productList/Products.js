import styles from './style.module.css';
import { useContext, useEffect,useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Products(){
  const {getAll} = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{
    getAll()
    .then((res)=>{
      setProducts(res.data)
    })
  },[])

  const formik = useFormik({
    onSubmit: async () => {
    },
  });

   return (
    <TableContainer component={Paper} sx={{width:"60%", marginTop:'100px', marginLeft: '100px'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên sản phẩm</StyledTableCell>
            <StyledTableCell align="left">Số lượng</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell align="left">{item.name}</StyledTableCell>
              <StyledTableCell align="left">{item.inStock}</StyledTableCell>
              <StyledTableCell align="left">
                <Link to={item._id} style={{paddingRight: '10px'}}>Sửa</Link>
                <form onSubmit={formik.handleSubmit} style={{display: "inline"}}>
                  <Link to={item._id}>Xóa</Link>
                </form>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Products;