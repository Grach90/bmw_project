import {Link} from 'react-router-dom';
import styles from './autopart.module.css';
import noPhoto from '../../images/template.png';

const API_HOST = process.env.REACT_APP_API_URL;

const Autopart = ({autopart}) => {
  
  let photoUrl; 
  if(autopart.image.length === 0) photoUrl = noPhoto;
  else {
      const photoName = autopart.image[0].slice(8);
      photoUrl = `${API_HOST}/uploads?name=${photoName}&format=jpg&width=115&height=90`;
  }
  return (
      <Link className={styles.link} to={`/autopart/${autopart._id}`}>
        <img src={photoUrl} className={autopart.image.length === 0 ? styles.image : styles.image1} alt=''/>
        <div>
          <div>{autopart.title}</div>
          <div>{autopart.description}</div>
          <div>{autopart.price}</div>
        </div>
      </Link>
  )
}

export default Autopart;