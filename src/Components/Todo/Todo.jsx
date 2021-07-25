import { useEffect } from "react";
import {Container, Row} from 'react-bootstrap';
import Autopart from '../Autopart/Autopart';
import Spiner from '../Spiner/Spiner';
import {connect} from 'react-redux';
import photo from '../../images/thumb2.jpg';
import styles from './todo.module.css';

const API_HOST = process.env.REACT_APP_API_URL;

const Todo = ({setAutoparts, autoparts}) => {


  useEffect(() => {
    fetch(`${API_HOST}`)
    .then(res => res.json())
    .then(autoparts => {
      setAutoparts(autoparts);
    })
  },[]);
    
    if (!autoparts) return <Spiner />
    console.log(autoparts);
  
  const autopartsJSX = autoparts.map(autopart => {
    return (
      <Row key={autopart._id}>
        <Autopart autopart={autopart}/>
      </Row>
    )
  })
 

  return (
    <>
    <img src={photo} className={styles.image} alt=''/>
    <Container>
      {(autoparts.length === 0) && <h5>Ничего не найдено</h5>}
      {autopartsJSX}
    </Container>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.autoparts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAutoparts: (autoparts) => dispatch({type: 'SET_AUTOPARTS', autoparts}) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);