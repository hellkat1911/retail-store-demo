import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import Loader from '../components/Loader';
import Page from '../components/Page';
import Content from '../components/Content';

const useStyles = makeStyles(theme => ({
  productOuter: {
    cursor: 'pointer'
  },
  productInner: {
    border: '2px solid #ccc',
    display: 'flex',
    marginBottom: 20,
    maxWidth: 'calc(100% - 20px)',
    padding: 10
  },
  thumb: {
    marginRight: 15,
    maxHeight: 50
  },
  formControl: {
    maxWith: '100%',
    width: 500
  },
  selectLabel: {
    color: '#fff !important'
  },
  input: {
    color: '#fff'
  }
}));

const SearchResults = props => {
  const classes = useStyles();
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:7777/api/products')
      .then(({ data }) => {
        const set = data.map(item => {
          return ({
            id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            locations: item.locations,
            sock: item.stock,
            image: item.image
          });
        });
        setProducts(set);
      });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleItemClick = itemID => {
    let url = `/product/${itemID}`;
    props.history.push(url);
  };

  const ResultsView = () => {
    if (products !== null) {
      return (
        <Page>
          <Content>
            <Grid className={classes.container} container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="h5" style={{ marginBottom: 20 }}>
                  <strong>Your results:</strong>
                </Typography>
                <Grid container spacing={0}>
                  {products.map(prod => {
                    if (filter === prod.category || !filter) {
                      return (
                        <Grid key={prod.id} className={classes.productOuter} item xs={6} onClick={() => handleItemClick(prod.id)}>
                          <div className={classes.productInner}>
                            <img className={classes.thumb} src={prod.image} alt={prod.name} title={prod.name} />
                            <h4>{prod.name}</h4>
                          </div>
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                   
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="filter-label" className={classes.selectLabel}>Filter your results</InputLabel>
                  <Select
                    labelId="filter-label"
                    id="filter-dropdown"
                    value={filter}
                    inputProps={{
                      className: classes.input
                    }}
                    onChange={handleFilter}
                  >
                    <MenuItem value={''}>All</MenuItem>
                    <MenuItem value={'books'}>Books</MenuItem>
                    <MenuItem value={'electronics'}>Electronics</MenuItem>
                    <MenuItem value={'kitchen appliances'}>Kitchen Appliances</MenuItem>
                    <MenuItem value={'home decor'}>Home Decor</MenuItem>
                    <MenuItem value={'automotive'}>Automotive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Content>
        </Page>
      );
    } else {
      return <Loader />;
    }
  };

  return <ResultsView />;
};

export default withRouter(SearchResults);
