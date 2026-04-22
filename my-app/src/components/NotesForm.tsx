import React, { Component, ChangeEvent, FormEvent } from 'react';

interface Props {
  onAdd: (content: string) => void;
}

interface State {
  content: string;
}

export default class NotesForm extends Component<Props, State> {
  state: State = { content: '' };

  handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.state.content.trim()) {
      this.props.onAdd(this.state.content);
      this.setState({ content: '' }); 
    }
  };

  render() {
    return (
      <form className="notes-form" onSubmit={this.handleSubmit}>
        <label>New Note</label>
        <div className="textarea-wrapper">
          <textarea
            value={this.state.content}
            onChange={this.handleChange}
            required
          />
          <button type="submit" className="submit-btn" title="Добавить">
            ➤
          </button>
        </div>
      </form>
    );
  }
}