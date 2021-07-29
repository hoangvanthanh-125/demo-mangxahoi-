import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStyles from "./style";
import {
  Avatar,
} from "@material-ui/core";
import { useEffect } from "react";
import axios from "axios";
import { USER } from "../../interfaces/userInterface";
import { useHistory } from "react-router-dom";

function Search() {
  const [listUser, setListUser] = useState<USER[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTextSearch(e.target.value);
  };
  useEffect(() => {
    if (textSearch) {
      var timeout = setTimeout(() => {
        axios
          .get(
            `https://601014b66c21e1001704fe27.mockapi.io/api/users?search=${textSearch}`
          )
          .then((res) => {
            setListUser(res.data);
          });
      }, 300);
    } else {
      setListUser([]);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [textSearch]);
  return (
    <div className={classes.form}>
      <Autocomplete
        className={classes.input}
        id="user-select"
     
        options={listUser}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option.displayName}
        renderOption={(option) => (
          <div onClick={() => history.push(`/user/${option.uid}`)} className={classes.user}>
            <Avatar src={option.photoURL} />
            <span>{option.displayName}</span>
          </div>
        )}
        renderInput={(params) => (
          <TextField
            value={textSearch}
            onChange={handleOnChange}
            {...params}
            label="Tìm kiếm"
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
export default Search;