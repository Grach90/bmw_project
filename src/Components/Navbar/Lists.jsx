import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import bmwpng from '../../images/bmw.png';
import { useHistory } from "react-router-dom";

const API_HOST = process.env.REACT_APP_API_URL;

export default function Lists({anchor, toggleDrawer, classes, setAutoparts}) {
  const history = useHistory();

  const searchCotegory = (text) => {
    console.log(text);
    fetch(`${API_HOST}/cotegory?cotegory=${text}`)
    .then(res => res.json())
    .then(autoparts => {
      setAutoparts(autoparts, history)
    })
      
  }
  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button >
          <Link to='/'>
            <img src={bmwpng} alt=''/>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Двигатель', 'АКПП', 'Кузов', 'Ходовая', 'Салон', 'Газабалонное оборудование', 'Электроника'].map(text => (
          <ListItem button key={text}>
              <ListItemText primary={text} onClick={() => searchCotegory(text)}/>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Link to='/add'>
          <ListItemText primary='Добавить запчасть' />
        </Link>
      </List>
    </div>
)};