import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Loader from '../components/Loader';
import Page from '../components/Page';
import Content from '../components/Content';

const useStyles = makeStyles(theme => ({
  container: {
    '& p, & li': {
      fontSize: 20
    },
    '& ul': {
      paddingLeft: 20
    }
  },
  gridItem: {
    maxWidth: 'calc(100% - 20px)',
    padding: 20
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20
  },
  description: {
    marginBottom: 20
  },
  image: {
    maxWidth: '100%'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  centersContainer: {
    marginTop: 30,

    '& p': {
      margin: 0,

      '& a': {
        color: '#fff'
      }
    }
  },
  centerItem: {
    marginBottom: 10
  },
  smallText: {
    fontSize: '15px !important'
  },
  button: {
    background: '#fff',
    color: '#000',
    marginTop: 10,

    '&:hover': {
      background: '#f50057',
      color: '#fff'
    }
  },
  backContainer: {
    marginTop: 30,

    '& a': {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textDecoration: 'none'
    }
  },
  icon: {
    marginRight: 5,
    marginTop: -2,
    verticalAlign: 'middle'
  }
}));

const ProductPage = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [placeholderURL] = useState('https://retail-webapp-assets.s3.us-east-2.amazonaws.com/placeholder.jpg');

  useEffect(() => {
    axios.get(`http://localhost:7777/api/product/${id}`)
      .then(({ data }) => {
        const format = {
          id: data._id,
          name: data.name,
          description: data.description,
          category: data.category,
          stock: data.stock,
          locations: data.locations,
          image: data.image || placeholderURL
        };
        setProduct(format);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id, placeholderURL]);

  const ProductView = () => {
    if (product !== null) {
      console.log(product.locations);
      return (
        <Page>
          <Content>
            <Grid className={classes.container} container spacing={0}>
              <Grid item xs={12}>
                <Typography className={classes.header} variant="h4">
                  {product.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid justify="space-between" className={classes.container} container spacing={0}>
              <Grid item xs={12} sm={6} className={classes.gridItem}>
                <img className={classes.image} src={product.image} alt={product.name} title={product.name} />
                <div className={classes.backContainer}>
                  <Link to="/search"><ArrowBackIcon className={classes.icon} fontSize="small" />Back</Link>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.gridItem}>
                <Typography className={classes.description} variant="body1">
                  {product.description}
                </Typography>
                <Typography variant="body1">
                  <strong>Category:</strong>
                  <span className={classes.uppercase}>&nbsp;{product.category}</span>
                </Typography>
                <Typography variant="body1">
                  <strong>Stock remaining:</strong>
                  <span className={classes.uppercase}>&nbsp;{product.stock}</span>
                </Typography>
                <Button className={classes.button} title="This doesn't do anything" variant="outlined">Purchase</Button>
                <div className={classes.centersContainer}>
                  <Typography variant="body1">
                    <strong>Also available at our product centers:</strong>
                  </Typography>
                  {product.locations.map((loc, index) => {
                    return (
                      <div className={classes.centerItem} key={index}>
                        <p>{loc.location.city}, {loc.location.state}</p>
                        <p className={classes.smallText}><strong>Phone:</strong>&nbsp;{loc.contact.phone}</p>
                        <p className={classes.smallText}><strong>Email:</strong>&nbsp;
                          <a href={`mailto:${loc.contact.email}`} title={`Product representative for ${loc.location.city}: ${loc.contact.name}`}>
                            {loc.contact.name}
                          </a>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </Content>
        </Page>
      );
    } else {
      return <Loader />;
    }
  };

  return <ProductView />;
};

export default ProductPage;
