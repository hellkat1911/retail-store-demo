## Retail Store Webapp

A working mock-up for a hypothetical regional retail business (JC Miller & Sons)

### Stack

- MERN (Mongoose, Express, React, Node.js)

### Deployment

At this stage, it's assumed the app will only run locally. With very few modifications, it could be deployed to a production environment.

The app consists of a Node API for making database requests (```/api```) and the React front end (```/src```).

Images are hosted on my personal AWS account to keep the app size down.

To make things as simple as possible, instead of including the database and related overhead, I created a MongoDB instance on [mlab.com](https://mlab.com).

**System requirements:**

1. MongoDB must be installed globally ([how to install](https://docs.mongodb.com/manual/installation/))

1. Node.js must be installed globally, along with npm (version 12 minimum)

1. The run scripts use ```yarn``` by default, but can be subsituted for regular ```npm``` commands if you prefer

**Setup:**

1. Change to the project root directory and run ```yarn install```

1. Locate the file ```.env.example``` and copy it. Change the name of the new file to just ```.env```

1. Copy and paste the environment variables into the ```.env``` file

1. Running ```yarn start``` will spin up the front end and back end together for development.

1. As a convenience, you can run just the Node server with ```yarn back```, or just the React app with ```yarn front```

## Development Notes & Features

- The app features a home page, a search results page, and a product detail view page

- The search bar does not currently return specific results, but instead returns all results (there are currently 7 products, but more can be added via the API at any time). These results can be filtered by category.

- Each product has its own product page with displays information about the product, including the Product Centers where a walk-in customer could purchase it, and the contact information for the representative at that center, including an email link

- The 'Purchase' button on each product page doesn't do anything; making it functional would have required a cart, which sort of necessitates login and authorization

- The API has routes to create Products, Product Centers, and Contacts, as well as for GET requests for all products or a single product, and a PUT route to update Products

- Styles and layout are basic, using Material UI and its defaults.

## Functionality Notes

Since this is a demo, the basics are there without lavishing attention on any one feature. To build it out, one could add:

- custom images and custom styling
- a complete API for interacting with the dataset
- a much larger set of Product data
- a custom search function based on product attributes
- user accounts / authentication / shopping cart
- an "admin" part of the site where authorized users can interact with and update the data set using a friendly interface
