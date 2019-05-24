import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Typography, Card, CardContent, CardMedia, CardActionArea, Grid } from '@material-ui/core';
import theme from '../../Theme';

import './FrontPage.scss';

const url = 'https://cocktails-backend.herokuapp.com/cocktails';

export class FrontPage extends Component {
  state = {
    loading: true,
    data: {},
    error: false,
  }
  
  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false, error: false });
    } catch (error) {
      console.error('Error fetching data', error);
      this.setState({ error: true, loading: false });
    }
  }

  fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  render() {
    const { data, error, loading } = this.state;

    if (loading) {
      return (<div>Loading...</div>);
    }

    console.log('error: ',error)

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Typography variant='h2' id='web-title'>Cocktail recepies</Typography>
          <section id='cocktails-section' color='primary'>
              <Grid container spacing={24}>
              {!error && data.map(cocktail => (
                <Grid item xs={4}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Card className='card-cocktail'>
                    <CardActionArea href={`/${cocktail.id}/`} cocktail={cocktail} className='card-cocktail' >
                      <CardMedia
                        className='card-image-cocktail'
                        image={cocktail.imageurl}
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          {cocktail.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
              </Grid>
            {error && (<p>error</p>)}
          </section>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default FrontPage;