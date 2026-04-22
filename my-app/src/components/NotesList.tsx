import React, { Component } from 'react';
import NoteCard from './NoteCard';

interface Note {
  id: number;
  content: string;
}

interface Props {
  notes: Note[];
  onDelete: (id: number) => void;
}

export default class NotesList extends Component<Props> {
  render() {
    const { notes, onDelete } = this.props;
    
    return (
      <div className="notes-list">
        {notes.map(note => (
          <NoteCard 
            key={note.id} 
            id={note.id} 
            content={note.content} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    );
  }
}