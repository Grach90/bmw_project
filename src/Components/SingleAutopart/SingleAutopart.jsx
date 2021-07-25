import {useEffect} from 'react';
import Spiner from '../Spiner/Spiner';
import {connect} from 'react-redux';
import {Carousel} from 'react-bootstrap';
import styles from './singleautopart.module.css';
import noPhoto from '../../images/template.png';

const API_HOST = process.env.REACT_APP_API_URL;

const SingleAutopart = ({setSingleAutopart, singleAutopart, history}) => {

  useEffect(() => {
    fetch(`${API_HOST + history.location.pathname}`)
    .then(res => res.json()).then(singleAutopart => setSingleAutopart(singleAutopart));
  }, [])

  if(!singleAutopart) return <Spiner />

  const images = singleAutopart.image.map((photo, index) => {
    const name = photo.slice(8);
    const url = `${API_HOST}/uploads?name=${name}&format=jpg&width=415&height=190`;
    return (
      <Carousel.Item key={index} >
        <img src={url} alt="" />
      </Carousel.Item>
    )
  })
  

  return (
    <div>
      <Carousel interval={null} style={{top: '48px'}}>
        {(singleAutopart.image.length === 0) && <img src={noPhoto} alt='' className={styles.nophoto} />}
        {images}
      </Carousel>
      <div className={styles.title}> {singleAutopart.title}</div>
      <div className={styles.description}> {singleAutopart.description}</div>
      <div className={styles.price}> {singleAutopart.price} Драм</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.singleAutopart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSingleAutopart: (singleAutopart) => dispatch({type: 'SET_SINGLE_AUTOPART', singleAutopart})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAutopart);