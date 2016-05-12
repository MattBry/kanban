import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx'
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {
	render() {
		const {lane, ...props} = this.props;
		return(
			<div {...props}>
				<div className="lane-header" onClick={this.activateLaneEdit}>
					<Editable className="lane-name" editing={lane.editing}
						value={lane.name} onEdit={this.editName} />
					<div className="lane-delete">
						<button onClick={this.deleteLane}>+</button>
					</div>
				</div>
				<AltContainer
					stores={[NoteStore]}
					inject={{
						notes: () => NoteStore.getNotesByIds(lane.notes)
					}}
				>
					<Notes 
						onEdit={this.editNote} 
						onDelete={this.deleteNote} 
						onValueClick={this.activateNoteEdit}
						/>
				</AltContainer>
			</div>
			)
	}
	editNote(id, task) {
		if(! task.trim()) {
			NoteActions.update({id, editing: false});
			return;
		}
		Noteactions.update({id, task, editing: false});
	}
	addNote = (e) => {
		const laneId = this.props.lane.id;
		const note = NoteActions.create({task: 'Watch transit of Mercury'});
		LaneActions.attachToLane({
			noteId: note.id,
			laneId
		});
	};
	deleteNote = (noteId, e) => {
		e.stopPropagation();

		const laneId = this.props.lane.id;

		LaneActions.detachFromLane({laneId, noteId});
		NoteActions.delete(noteId);
	};
	editName = (name) => {
		const laneId = this.props.laneId;
		if(!name.trim()) {
			LaneActions.update({id: laneId, editing: false});
			return;
		}
		LaneActions.update({id: laneId, name, editing: false});
	}
	deleteLane = () => {
		const laneId = this.props.lane.id;
		LaneActions.delete(laneId);
	}
	activateLaneEdit = () => {
		const laneId = this.props.lane.id;
		LaneActions.update({id: laneId, editing: true});
	}
	activateNoteEdit = () => {
		NoteActions.update({id, editing: true});
	}
}