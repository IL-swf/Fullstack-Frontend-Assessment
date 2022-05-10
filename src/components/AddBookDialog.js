import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";

const AddBookDialog = ({isOpen, handleClose, fetchBooks}) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const addBook = async () => {
        await axios.post("http://localhost:3001/books", {title, author});
        fetchBooks();
    }

    return (
        <Dialog open={isOpen} onClose={() => handleClose(false)}>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    label={"Title"}
                    variant={"outlined"}
                    onChange={event => setTitle(event.target.value)}
                />
                <TextField
                    required
                    label={"Author"}
                    variant={"outlined"}
                    onChange={event => setAuthor(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)}> Cancel </Button>
                <Button onClick={addBook}> Add Book </Button>
            </DialogActions>

        </Dialog>
    );
};

AddBookDialog.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    fetchBooks: PropTypes.func,
};

export default AddBookDialog;