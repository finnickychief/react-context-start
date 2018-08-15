import React from 'react';
import { SET_STATE } from './types';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        default: action.payload
      };

    default:
      return state;
  }
};

export class Provider extends React.Component {
  state = {
    default: 'test',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
