import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button
} from "@material-ui/core";
import "./styles.css";
import DeleteIcon from "@material-ui/icons/Delete";

class Input extends Component {
  state = {
    title: "",
    entry: "",
    cards: []
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/", {
      method: "GET"
    })
      .then(r => r.json())
      .then(res => {
        res.map(r => {
          let a = [...this.state.cards];

          // console.log(r);
          a.push([r.title, r.entry]);

          this.setState({
            cards: a
          });
        });

        console.log("Cards", this.state.cards);
      });
  }

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
            entry: ""
          });
        })
        .catch(err => console.log(err));
    } else {
      console.log("Missing input");
    }
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

          <button className="btn" onClick={this.addEntry}>
            Submit
          </button>

          {/* <div className="card"> */}
          <Grid container spacing={3}>
            {this.state.cards.map(res => {
              return (
                <Grid item xs={6}>
                  <div className="card">
                    <div>
                      <div className="Header">
                        <p className="card-title">{res[0]}</p>
                        <DeleteIcon className="delete" />
                      </div>
                      <p className="card-entry">{res[1]}</p>
                    </div>
                  </div>
                </Grid>
              );
            })}
            {/* </div> */}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Input;
