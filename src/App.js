import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const BASE_URL = 'https://reqres.in/api/products/';

export default function App() {

  const [idValue, setIdValue] = useState('');
  const [prod, setProd] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getProduct = async () => {
    const res = await fetch(BASE_URL);
    const json = await res.json();
    setProd(json.data);
  };

  const indexLast = (page + 1) * rowsPerPage;
  const indexFirst = indexLast - rowsPerPage;
  const activeProd = prod.slice(indexFirst, indexLast);

  const handleChange = (event) => {
    setIdValue(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  useEffect(() => { getProduct(); }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 2, height: '100vh' }}>
        <TextField
          id="outlined-basic"
          label="Filter by id"
          variant="outlined"
          type="number"
          size="small"
          value={idValue}
          onChange={handleChange} />
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prod.length ? activeProd.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: item.color }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name.toUpperCase()}</TableCell>
                  <TableCell align="right">{item.year}</TableCell>
                </TableRow>
              )) : <TableRow><TableCell align="center">Nothing found!</TableCell></TableRow> }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={prod.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[2, 5]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
}
