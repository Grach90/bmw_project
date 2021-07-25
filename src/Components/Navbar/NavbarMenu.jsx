import styles from './navbar.module.css';
import {useState} from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Lists from './Lists';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

const API_HOST = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 414,
    borderRadius: 0,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const NavbarMenu = ({setAutoparts}) => {
  const history = useHistory();
  const [searchState, setSearchState] = useState({value:''});

  const searchAutopart = () => {
    fetch(`${API_HOST}/search?search=${searchState.value}`)
    .then(res => res.json()).then(autoparts => setAutoparts(autoparts, history));
  }

  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
      <div className={styles.input}>
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu" onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            <Lists anchor={'left'} toggleDrawer={toggleDrawer} classes={classes} setAutoparts={setAutoparts}/>
          </Drawer>
          <InputBase
            className={classes.input}
            placeholder="Поиск запчасти"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e) => setSearchState({value: e.target.value})}
          />
          <IconButton className={classes.iconButton}  aria-label="search" onClick={searchAutopart} >
            <SearchIcon />
          </IconButton>
          {/* <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions">
            <DirectionsIcon />
          </IconButton> */}
        </Paper>
      </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAutoparts: (autoparts, history) =>  {
      dispatch({type: 'SET_AUTOPARTS', autoparts});
      history.push('/');
      }
  }
}

export default connect(null, mapDispatchToProps)(NavbarMenu);