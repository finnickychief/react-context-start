// context.js
import React from 'react';
import uuid from 'uuid';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        bookArray: [action.payload, ...state.bookArray]
      };
    // [action.payload, ...state.bookArray]
    /*
        Creates a new array using the []
        The first item will be our payload
        The rest of the items will be the rest of the bookArray, using the spread operator to get them all individually
      */

    case 'DELETE_BOOK': {
      return {
        ...state,
        bookArray: state.bookArray.filter(book => book.id !== action.payload.id)
      };
    }
    case 'CHANGE_ROUTE': {
      return {
        ...state,
        route: action.payload.route,
        currentBook: action.payload.book ? action.payload.book : null
      };
    }
    case 'UPDATE_BOOK': {
      return {
        ...state,
        bookArray: state.bookArray.map(
          book =>
            book.id === action.payload.book.id ? action.payload.book : book
        ),
        route: action.payload.route,
        currentBook: null
      };
    }
    default:
      return state;
  }
};

export class Provider extends React.Component {
  state = {
    bookArray: [
      {
        id: uuid(),
        title: 'Harry Potter',
        description: 'Wizard School stuff',
        author: 'JK Rowling',
        price: '14.99'
      },
      {
        id: uuid(),
        title: 'Name of the Wind',
        description: 'Edgy Wizard school stuff',
        author: 'Patrick Rothfuss',
        price: '12.50'
      },
      {
        id: uuid(),
        title: 'Wheel of Time',
        description: 'A few High fantasy novels',
        author: 'Robert Jordan',
        price: '19.99'
      }
    ],
    currentBook: null,
    route: 'viewBooks',

    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    // On Context.Provider, value is what is made available to all of the children of this component. We use this.state, so everything in this components state will be available to use by the children.
    // Then we place the children within the Provider so that everything will render properly.
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
