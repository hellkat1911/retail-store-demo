import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Page from '../components/Page';
import Content from '../components/Content';

const useStyles = makeStyles(theme => ({
  input: {
    background: '#fff',
    borderRadius: 5,
  },
  inputLabel: {
    color: '#000'
  },
  inputLabelFocused: {
    background: '#fff !important',
    borderRadius: '2px !important',
    color: '#3f51b5 !important',
    padding: '5px !important'
  },
  button: {
    background: '#fff',
    color: '#000',

    '&:hover': {
      background: '#f50057',
      color: '#fff'
    },

    '@media (min-width: 600px)': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    '@media (max-width: 599px)': {
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  },
  header: {
    paddingTop: 20
  },
  subheader: {
    paddingBottom: 70
  },
  icon: {
    marginLeft: 5,
    verticalAlign: 'middle'
  },
  previewBox: {
    background: '#fff',
    color: '#000',
    cursor: 'pointer',
    maxWidth: 'calc(50% - 20px)',
    padding: 20,

    '& img': {
      maxWidth: '100%'
    }
  }
}));

const Home = props => {
  const classes = useStyles();

  const [products, setProducts] = useState(null);
  const [refLeft, setRefLeft] = useState(null);
  const [refRight, setRefRight] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:7777/api/products')
      .then(({ data }) => {
        const set = data.map(item => ({ id: item._id, name: item.name, image: item.image }));
        setProducts(set);
        return set;
      })
      .then(products => {
        setRefLeft(products[0].id);
        setRefRight(products[1].id);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleItemClick = (side) => {
    let url;
    if (side === 'left') {
      url = `/product/${refLeft}`;
    } else {
      url = `/product/${refRight}`;
    }
    props.history.push(url);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter'){
      props.history.push('/search');
    }
  };

  const handleSearchClick = () => {
    props.history.push('/search');
  };

  return (
    <Page>
      <Content>
        <Grid container spacing={0}>
          <Grid item sm={10} xs={12}>
            <TextField
              id="search"
              type="text"
              variant="outlined"
              label="Search for an item"
              fullWidth
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                className: classes.inputLabel,
                classes: {
                  focused: classes.inputLabelFocused
                }
              }}
              onKeyPress={handleSearchKeyPress}
            />
          </Grid>
          <Grid item sm={2} xs={12} style={{ position: 'relative' }}>
            <Button className={classes.button} variant="outlined" onClick={handleSearchClick}>
              Search
              <SearchIcon className={classes.icon} fontSize="small" />
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.header}>
              Find what you need at <strong>JC Yarbrough & Sons</strong>
            </Typography>
            <Typography variant="body1" className={classes.subheader}>
              Shop online or visit one of our local Product Centers for all the hottest items!
            </Typography>
            <Typography variant="h6">You may like...</Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between" spacing={0}>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.previewBox}
            onClick={() => handleItemClick('left')}
          >
            {
              products ?
                (
                  <div>
                    <Typography variant="h6">{products[0].name}</Typography>
                    <img src={products[0].image} alt={products[0].name} title={products[0].name} />
                  </div>
                ) :
                null
            }
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.previewBox}
            onClick={() => handleItemClick('right')}
          >
            {
              products ?
                (
                  <div>
                    <Typography variant="h6">{products[1].name}</Typography>
                    <img src={products[1].image} alt={products[1].name} title={products[1].name} />
                  </div>
                ) :
                null
            }
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

export default withRouter(Home);
