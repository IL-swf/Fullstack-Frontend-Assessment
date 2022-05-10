import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

const AddBookDialog = ({isOpen, handleClose, fetchBooks}) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (title.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false)
        }
    }, [title]);


    const addBook = async () => {
        if (author.length > 0) {
            await axios.post("http://localhost:3001/books", {title, author});
        } else {
            await axios.post("http://localhost:3001/books", {title, "author": "Anonymous"});
        }
        handleClose(false);
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
                    helperText={isValid ? "" : "Enter a book title."}
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
                <Button disabled={!isValid} onClick={addBook}> Add Book </Button>
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