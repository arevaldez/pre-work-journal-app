import React, { Component } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

class Input extends Component {
  state = {
    title: "",
    entry: "",
    cards: []
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/journal", {
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
      fetch("http://localhost:5000/api/journal", {
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
      <div>
        <div
          style={{
            // textAlign: "center",
            paddingTop: "50px",
            display: "flex",
            flexDirection: "column",
            width: "400px"
            // justifyContent: "center",
            // alignItems: "center"
          }}
        >
          <input
            value={title}
            name="title"
            type="text"
            onChange={e => this.handleChange("title", e)}
            placeholder="Journal Entry Title"
          />
          <textarea
            onChange={e => this.handleChange("entry", e)}
            placeholder="Journal Entry"
            value={entry}
          />
          <button onClick={this.addEntry}>Submit</button>
        </div>
        <div>
          {this.state.cards.map(res => {
            return (
              <Card>
                <CardContent>
                  <Typography>{res[0]}</Typography>
                  <Typography>{res[1]}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Input;
