import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

const BASE_URL = 'https://reqres.in/api/products/';

export default function App() {

  const [prod, setProd] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getProduct = async () => {
    const res = await fetch(BASE_URL);
    const json = await res.json();
    setProd(json.data);
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
        <TextField id="outlined-basic" label="Filter by id" variant="outlined" type="number" size="small" />
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {prod.length &&
            prod.map((item) => {
              return (
                <ListItem key={item.id} >
                  <ListItemButton >
                    <ListItemText primary={item.id} />
                    <ListItemText primary={item.name} />
                    <ListItemText primary={item.year} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
        <TablePagination
          component="div"
          count={12}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
}
