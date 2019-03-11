import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const cocktails = [
    { 
      id: 1,
      title: 'Moscow Mule',
      img: '../images/moscowMule.jpg',
      ingredients: [
        {
          id: 1,
          ingredient: 'Vodka',
          quantity: '2 oz.',
        },
        {
          id: 2,
          ingredient: 'Lime juice',
          quantity: '1/2 oz.',
        },
        {
          id: 3,
          ingredient: 'Ginger beer',
          quantity: '5 oz.',
        },
        {
          id: 4,
          ingredient: 'Lime wedge for garnish',
          quantity: '1 wedge',
        }
      ],
      instruction: [
        {
          number: '1.',
          text: 'Pour vodka and squeeze lime juice into your glass/mug',
        },
        {
          number: '2.',
          text: 'Add ice cubes and then fill your glass/mug with ginger beer',
        },
        {
          number: '3.',
          text: 'Garnish with a lime wedge, and enjoy!',
        },
      ],
      equipments: [
        {
          type: 'Glass or mug',
          quantity: 1
        },
        {
          type: 'Ice',
          quantity: 1
        },
        {
          type: 'Jigger',
          quantity: 1
        },
        {
          type: 'Lime squeezer',
          quantity: 1
        },
        {
          type: 'Knife',
          quantity: 1
        },
        {
          type: 'Chopping board',
          quantity: 1
        }
      ]
    },
    { 
        id: 2,
        title: 'Gimlet',
        image: '../images/teaDrink.jpg',
        ingredients: [
          {
            id: 1,
            ingredient: 'Gin',
            quantity: '1 1/2 oz.',
          },
          {
            id: 2,
            ingredient: 'Lime juice',
            quantity: '1 oz.',
          },
          {
            id: 3,
            ingredient: 'Simple syrup',
            quantity: '1 tsp',
          },
        ],
        instruction: [
          {
            number: '1.',
            text: 'Combine gin, lime juice, and simple syrup in a cocktail shaker.',
          },
          {
            number: '2.',
            text: 'Add ice and shake until chilled.',
          },
          {
            number: '3.',
            text: 'Strain into a chilled cocktail glass.',
          },
          {
            number: '4.',
            text: 'Garnish with a lime wheel.',
          },
        ],
        equipments: [
          {
            type: 'Martini glass',
            quantity: 1
          },
          {
            type: 'Knife',
            quantity: 1
          },
          {
            type: 'Jigger',
            quantity: 1
          },
          {
            type: 'Ice',
            quantity: 1
          },
          {
            type: 'Shaker',
            quantity: 1
          },
          {
            type: 'Strainer',
            quantity: 1
          }
        ]
    },
    { 
        id: 3,
        title: 'Martini',
        image: '../images/teaDrink.jpg',
        ingredients: [
          {
            id: 1,
            ingredient: 'Gin',
            quantity: '2 1/2 oz.',
          },
          {
            id: 2,
            ingredient: 'Dry Vermouth',
            quantity: '1/2 oz.',
          },
          {
            id: 3,
            ingredient: 'Olives or a lemon twist',
            quantity: '1-3',
          },
        ],
        instruction: [
          {
            number: '1.',
            text: 'Fill a cocktail shaker with ice cubes',
          },
          {
            number: '2.',
            text: 'Add gin and dry vermouth to the shaker',
          },
          {
            number: '3.',
            text: 'Stir until cold.',
          },
          {
            number: '4.',
            text: 'Strain into a martini glass.',
          },
          {
            number: '5.',
            text: 'Strain into a martini glass.',
          },
          {
            number: '6.',
            text: 'Garnish with olives or a lemon twist',
          },
        ],
        equipments: [
          {
            type: 'Martini glass',
            quantity: 1
          },
          {
            type: 'Jigger',
            quantity: 1
          },
          {
            type: 'Ice',
            quantity: 1
          },
          {
            type: 'Shaker',
            quantity: 1
          },
          {
            type: 'Strainer',
            quantity: 1
          }
        ],
    }
]

export async function fetchAllData() {
  const data = cocktails;
  return data;
}

export class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        cocktails: [],
        error: false,
    }
  }

  async componentDidMount() {
    // sækja frá ws / db seinna
    try {
      const cocktails = await fetchAllData();
      this.setState({ loading: false, cocktails, error: false});
    } catch (error) {
      console.error('Error fetching stats', error);
      this.setState({ error: true, loading: false });
    }
  }

  render() {

    console.log('state: '+this.state );
    const { cocktails, loading } = this.state;

    if (loading ) {
      return (<div>Hleð inn gögnum...</div>);
    }

    return (
      <div>
        <h1>HOME PAGE</h1>
        {cocktails.map(cocktail => (
          <section>
            <h2><Link to={`/cocktails/${cocktail.id}/`} cocktail={cocktail} >{cocktail.title}</Link></h2>
          </section>
        ))}
      </div>
    )
  }
}