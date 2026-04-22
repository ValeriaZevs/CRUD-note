import React, { Component } from 'react';

interface Props {
  id: number;
  content: string;
  onDelete: (id: number) => void;
}

export default class NoteCard extends Component<Props> {
  render() {
    const { id, content, onDelete } = this.props;
    
    return (
      <div className="note-card">
        <button 
          className="delete-btn" 
          onClick={() => onDelete(id)}
        >
          ❌
        </button>
        <p className="note-content">{content}</p>
      </div>
    );
  }
}