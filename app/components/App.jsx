import uuid from 'node-uuid';
import React from 'react';

import Note from './Note.jsx';
import Notes from './Notes.jsx';

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			notes: [
				{
					id: uuid.v4(),
					task: "interview with Spring"
				},
				{
					id: uuid.v4(),
					task: "interview with NYT"
				},
				{
					id: uuid.v4(),
					task: "interview with Etrade"
				}
			]
		};
	}
	render() {
		const notes = this.state.notes;
		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<Notes notes={notes} 
					onEdit={this.editNote}
					onDelete={this.deleteNote} />
			</div>
		)
	}
	addNote = () => {
		this.setState({
			notes: this.state.notes.concat([{
				id: uuid.v4(),
				task: 'New task'
			}])
		});
	};
	editNote = (id, task) => {
		if(!task.trim()) {
			return;
		}

		const notes = this.state.notes.map(note => {
			if(note.id === id && task) {
				note.task = task;
			}

			return note;
		});
		this.setState({notes});
	};
	deleteNote = (id, e) => {
		e.stopPropagation();
		this.setState({
			notes: this.state.notes.filter(note => note.id !== id)
		});
	}
}