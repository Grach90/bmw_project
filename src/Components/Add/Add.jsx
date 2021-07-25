import {Form, Container, Button} from 'react-bootstrap';
import {useState} from 'react';
import photo from '../../images/thumb2.jpg';
import './add.css';

const API_HOST = process.env.REACT_APP_API_URL;

const initialState = {
  autopart: {
    title:'',
    description:'',
    amount:'',
    price:'',
    cotegory:'',
    file: {}
  }
}

const Add = () => {

  const [state, setState] = useState(initialState);

  const handleChange = ({target: {value, name, files}}) => {
    const {autopart} = state;
    if(name === 'file') {
        autopart.file = files;
    }
    else autopart[name] = value;
    setState({
      ...state,
      autopart
    })
  }

  const addAutopart = () => {
    let formData = new FormData();
    const {autopart} = state;

    for(let file of autopart.file){
      formData.append('file', file);
    }
    for(let data in autopart){
      if(data === 'file') continue;
      formData.append(data, autopart[data])
    }

    fetch(`${API_HOST}/addfiles`, {
              method: 'POST',
              body: formData
            }).then(res => res.json).then(data => console.log(data));

    setState(initialState);
  }

  return (
    <>
        <img src={photo} alt="" style={{width: '415px'}}/>
        <h3>Добавить Запчасть</h3>
      <Container className='mt-5'>
        <Form.Group className='add-formgroup'>
          <Form.Control name='title' type='text' placeholder='Название запчасти' value={state.autopart.title}
            onChange={(e) => handleChange(e)}/>
          <Form.Control name='description' type='text' placeholder='Описание' value={state.autopart.description} 
            onChange={(e) => handleChange(e)}/>
          <Form.Control name='amount' type='text' placeholder='Количество' value={state.autopart.amount}
            onChange={(e) => handleChange(e)}/>
          <Form.Control name='price' type='text' placeholder='Цена' value={state.autopart.price}
            onChange={(e) => handleChange(e)}/>
          <Form.Control name='cotegory' as='select'value={state.autopart.cotegory} onChange={(e) => handleChange(e)}>
            <option >Категория</option>
            <option >Двигатель</option>
            <option >АКПП</option>
            <option >Ходовая</option>
            <option >Салон</option>
            <option >Газабалонное оборудование</option>
            <option >Электроника</option>
          </Form.Control>
          <Form.Control name='file' type="file" multiple onChange={(e) => handleChange(e)} /> 
          <Button className='mt-5' onClick={addAutopart}>Добавить</Button>
        </Form.Group>
      </Container>
    </>
  )
}

export default Add;