import {AppBar, Button, Container, List, ListItem, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import Book from "./components/Book";
import AddIcon from "@mui/icons-material/Add"
import AddBookDialog from "./components/AddBookDialog";


function App() {
    const [books, setBooks] = useState([]);
    const [displayAddBookDialog, setDisplayAddBookDialog] = useState(false);

    useEffect(() => {
        fetchBooks().then();
    }, []);

    const fetchBooks = async () => {
        const results = await axios.get("http://localhost:3001/books");
        setBooks(results.data);
    }

    return (
        <Container>
            <AppBar >
                <Typography variant={"h2"} textAlign={"center"}> Galvanize Library</Typography>
            </AppBar>
            <List dense={true} sx={{marginTop:10}}>
                <ListItem>
                    <Button className={"add-book-button"} variant={"contained"} startIcon={<AddIcon/>} onClick={() => {setDisplayAddBookDialog(!displayAddBookDialog)}}> Add New Book </Button>
                    <AddBookDialog isOpen={displayAddBookDialog} handleClose={setDisplayAddBookDialog} fetchBooks={fetchBooks}/>
                </ListItem>
                {books.map(book => {
                    return <Book key={book.id} book={book} fetchBooks={fetchBooks}/>
                })}
            </List>

        </Container>
    );
}

export default App;
