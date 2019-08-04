import React, { Component } from "react";

class Input extends Component {
  state = {
    title: "",
    entry: ""
  };

  addEntry = () => {
    const journal = { title: this.state.title, entry: this.state.entry };

    if (journal.title && journal.entry.length > 0) {
      fetch("/api/journal", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: journal
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

  handleChange = event => {
    const target = event.target;
    const title = target.name === "title" ? target.value : null;
    const entry = target.name === "entry" ? target.value : null;

    this.setState({
      title: title,
      entry: entry
    });

    console.log("Title and Entry: ", this.state.title, this.state.entry);
  };

  render() {
    return (
      <form onSubmit={this.handleChange}>
        <label>
          Title:
          <input name="title" type="text" />
        </label>
        <br />
        <label>
          Journal Entry:
          <input name="entry" type="text" />
        </label>
        <button>Submit</button>
        {console.log("Title and Entry: ", this.state.title, this.state.entry)}
      </form>
    );
  }
}

export default Input;
