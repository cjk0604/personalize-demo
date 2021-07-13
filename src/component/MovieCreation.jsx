import React from 'react';
import axios from 'axios';

import { Form, Input, Segment, Modal, Button, Icon } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'

const CATEGORIES = ['Romance', 'Thriller'];

function MovieCreation() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [name, setName] = React.useState();
    const [id, setId] = React.useState();
    const [category, setCategory] = React.useState();
    const [imageUrl, setImageUrl] = React.useState();

    // const headers = {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    //   "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    // };
    
    function handleOpen() {
      handleReset();
      setModalOpen(true);
      setImageUrl("https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/unicorn-funny-gym-viviana-c-olmos.jpg")
    };
  
    function handleReset() {
      setName("Avatar")
      setCategory(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]);
      setImageUrl("https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/unicorn-funny-gym-viviana-c-olmos.jpg")
    }
  
    function handleClose() {
      setModalOpen(false);
    };
  
    async function handleSave(event) {
      event.preventDefault();

      const response = await axios.post(
        "https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/movie",{
          "id": id,
          "name": name,
          "category": category,
          "imageUrl": imageUrl,
        }).then(response => {
            console.log("Success ========>", response);
        })
        .catch(error => {
            console.log("Error ========>", error);
        }
    )
      console.log((response));
      
      handleClose();
    };
  
    // const options = CATEGORIES.map(c => ({ key: c, value: c, text: c}));
  
    return (
      <Modal
        closeIcon
        size='small'
        open={modalOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        trigger={<p><Icon name='plus'/>Create new Movie</p>}>
        <Modal.Header>Create new Movie</Modal.Header>
        <Modal.Content>
          <Form>
              <Form.Field>
                <label>Movie ID</label>
                <Input fluid type='text' placeholder='Set Movie ID' name='id' value={id || ''}
                  onChange={(e) => { setId(e.target.value); } }/>
              </Form.Field>
              <Form.Field>
                <label>Movie Name</label>
                <Input fluid type='text' placeholder='Set Name' name='name' value={name || ''}
                  onChange={(e) => { setName(e.target.value); } }/>
              </Form.Field>
              <Form.Field>
                <label>Image URL</label>
                <Input fluid type='text' placeholder='Set ImageUrl' name='imageurl' value={imageUrl || ''}
                  onChange={(e) => { setImageUrl(e.target.value); } }/>
              </Form.Field>
              <Form.Field>
                <label>Category</label>
                <Input fluid type='text' placeholder='Set Category' name='category' value={category || ''}
                  onChange={(e) => { setCategory(e.target.value); } }/>
              </Form.Field>
              
              {name ? (
                <MovieCardImage centered dealName={name} minHeight={320} fontSize={48} imageUrl={imageUrl}/>
              ) : (
                <Segment style={{minHeight: 320}} secondary/>
              )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content='Cancel' onClick={handleClose}/>
          <Button primary labelPosition='right' content='Reset' icon='refresh' onClick={handleReset}/>
          <Button positive labelPosition='right' icon='checkmark' content='Save' href='/'
            disabled = {!(name && category && imageUrl && id)} 
            onClick={handleSave}
            />
        </Modal.Actions>
      </Modal>
    );
  };

  export default MovieCreation;