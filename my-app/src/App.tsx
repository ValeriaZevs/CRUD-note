import React, { Component } from 'react';
import NotesList from './components/NotesList';
import NotesForm from './components/NotesForm';
import './App.css';

interface Note {
  id: number;
  content: string;
}

interface AppState {
  notes: Note[];
  loading: boolean;
}

export default class App extends Component<{}, AppState> {
  state: AppState = { 
    notes: [], 
    loading: false 
  };

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch('http://localhost:7070/notes');
      if (response.ok) {
        const notes = await response.json();
        this.setState({ notes, loading: false });
      }
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
      this.setState({ loading: false });
    }
  };

  handleAddNote = async (content: string) => {
    try {
      await fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 0, content })
      });
      this.fetchNotes(); 
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  handleDeleteNote = async (id: number) => {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, {
        method: 'DELETE'
      });
      this.fetchNotes(); 
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  render() {
    return (
      <div className="crud-app">
        <header className="app-header">
          <h1>Notes</h1>
          <button className="refresh-btn" onClick={this.fetchNotes} title="Обновить">
            <span className="icon-refresh">♻️</span>
          </button>
        </header>

        {this.state.loading && <p>Загрузка...</p>}

        <NotesList 
          notes={this.state.notes} 
          onDelete={this.handleDeleteNote} 
        />
        
        <NotesForm onAdd={this.handleAddNote} />
      </div>
    );
  }
}