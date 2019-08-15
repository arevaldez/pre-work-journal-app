import React, { Component } from "react";
import {
  Grid,
  // Card,
  // CardContent,
  // Typography,
  Container
  // Button
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import DeleteIcon from "@material-ui/icons/Delete";

// const useStyles = makeStyles({
//   card: {
//     maxWidth: 345,
//     maxHeight: 200,
//     overflowY: "scroll"
//   }
// });

class Input extends Component {
  state = {
    title: "",
    entry: "",
    cards: []
  };

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    fetch("http://localhost:5000/api/", {
      method: "GET"
    })
      .then(r => r.json())
      .then(res => {
        res.map(r => {
          let a = [...this.state.cards];

          a.push([r._id, r.title, r.entry]);

          this.setState({
            cards: a
          });
        });

        console.log("Cards", this.state.cards);
      });
  };

  addEntry = () => {
    let journal = { title: this.state.title, entry: this.state.entry };

    let payload = JSON.stringify(journal);

    // alert(journal);

    // alert(journal.title);
    if (journal.title && journal.entry.length > 0) {
      console.log("in fetch");
      fetch("http://localhost:5000/api/add", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: payload
      })
        .then(response => response.json())
        .then(r => {
          console.log(r);
          this.setState({
            title: "",
            entry: "",
            cards: []
          });
        })
        .then(() => {
          this.getCards();
        })
        .catch(err => console.log(err));
    } else {
      console.log("Missing input");
    }
  };

  deleteJournal = id => {
    fetch(`http://localhost:5000/api/delete/${id}`)
      .then(r => r.json())
      .then(resp => console.log(resp));
  };

  handleChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  };

  render() {
    const { title, entry } = this.state;
    return (
      <div className="container">
        <p className="Title">Journal</p>
        <p className="Description">Write something inspirational today!</p>
        <div className="form">
          <h2>Title</h2>
          <input
            className="input"
            border="none"
            value={title}
            name="title"
            type="text"
            onChange={e => this.handleChange("title", e)}
          />
          <h2>Entry</h2>
          <textarea
            className="entry"
            onChange={e => this.handleChange("entry", e)}
            value={entry}
          />

          <button className="btn" onClick={() => this.addEntry()}>
            Submit
          </button>
          <Grid container spacing={9}>
            {this.state.cards.map(res => {
              return (
                <Grid item xs={6}>
                  <div className="card">
                    <div className="card-inner">
                      <div className="card-header">{res[1]}</div>
                      <div className="card-body">{res[2]}</div>
                      <div className="card-footer">
                        <DeleteIcon
                          onClick={() => this.deleteJournal(res[0])}
                          className="delete"
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Input;
