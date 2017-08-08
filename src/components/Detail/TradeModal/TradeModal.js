import React, {Component} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { initiateTrade } from '../../../services/trade';
import { fetchItems } from '../../../services/item';
import items from './items.json';

class TradeModal extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      items: [],
      selectedItemID: null,
      note: '',
      editNote: false,
      initiated: false
    }
    this.updateNote = this.updateNote.bind(this)
    this.toggleEditNote = this.toggleEditNote.bind(this)
    this.updateSelectedItemID = this.updateSelectedItemID.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateSelectedItemID(id) {
    this.setState({selectedItemID:id})
  }

  updateNote(val) {
    this.setState({note: val})
  }

  componentDidMount() {
    fetchItems().then(items => {
      this.setState({items})
    })
  }

  handleSubmit() {
    initiateTrade(this.state.selectedItemID, this.props.item_id)
    .then(data => {
      if (data.id) {
        this.setState({initiated: true})
      }
    });
  }

  toggleEditNote() {
    this.setState({
      editNote: !this.state.editNote
    })
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        { !this.state.initiated &&
          <Modal.Header closeButton>
            <Modal.Title>Please select the item you would like to trade...</Modal.Title>
          </Modal.Header>
        }
        <Modal.Body>
          {
            this.state.initiated ?
              <TradeInitiated/>
            :
            this.state.editNote ?
              <NoteForm note={this.state.note} updateNote={this.updateNote} toggleEditNote={this.toggleEditNote}/>
            :
            <Inventory items={this.state.items} toggleEditNote={this.toggleEditNote} updateSelectedItemID={this.updateSelectedItemID}/>

          }
        </Modal.Body>
        { !this.state.initiated &&
          <Modal.Footer>
            <Button onClick={ this.toggleEditNote }>{ this.state.editNote ? "Save Note" : "Edit Note" }</Button>
            <Button>Cancel</Button>
            <Button onClick={ this.handleSubmit }>Submit</Button>
          </Modal.Footer>
        }
      </Modal>
    )
  }

}

const Inventory = (props) => {
  const items = props.items.map(item => <InventoryItem name={item.name} id={item.id} updateSelectedItemID={props.updateSelectedItemID}/>)
  return (
    <div>
      <div className="trade-modal-list">
        {items}
      </div>
    </div>
  )
}

const InventoryItem = ({ name, id, updateSelectedItemID }) => {
  return (
    <div onClick={ () => updateSelectedItemID(id) } className="trade-modal-item">
      {name}
    </div>
  )
}

const NoteForm = ({note, updateNote, toggleEditNote}) => {
  return (
    <FormGroup>
      <ControlLabel>Add Note</ControlLabel>
      <FormControl componentClass="textarea" value={note} onChange={(e) => updateNote(e.target.value)}/>
    </FormGroup>
  )
}

const TradeInitiated = () => {
  return (
    <div className="trade-initiated">
      <h1>Trade Initiated!</h1>
      <p>Seller will be notified and you should hear back from them shortly.</p>
    </div>
  )
}

export default TradeModal;
