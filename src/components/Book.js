import PropTypes from 'prop-types';
import {IconButton, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";

const Book = ({book, fetchBooks}) => {

    const handleToggleFavorite = async () => {
        await axios.patch("http://localhost:3001/books/" + book.id, {"favorite":!book.favorite} );
        fetchBooks();
    }

    const handleDeleteBook = async () => {
        await axios.delete("http://localhost:3001/books/" + book.id);
        fetchBooks();
    }

    return (
        <ListItem>
            <Tooltip title={book.favorite ? "Un-Favorite Book" : "Favorite Book"}>
                <IconButton onClick={handleToggleFavorite}><FavoriteIcon color={book.favorite ? "error" : "disabled"}/></IconButton>
            </Tooltip>
            <ListItemText
                primary={<Typography variant={"h5"} sx={{fontWeight:(book.favorite) ? "bold" : "normal"}}>
                    {book.title}
                </Typography>}
                secondary={"Author: " + book.author}
            />
            <Tooltip title={"Remove Book"}>
                <IconButton onClick={handleDeleteBook}><DeleteIcon/></IconButton>
            </Tooltip>
        </ListItem>
    );
};

Book.propTypes = {
    book: PropTypes.object,
    fetchBooks: PropTypes.func,
};

export default Book;