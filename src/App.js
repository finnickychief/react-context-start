import React, { Component } from 'react';
import { Provider, Consumer } from './context';
import { SET_STATE } from './types';

export default class App extends Component {
  setStore = (dispatch, value) => {
    dispatch({
      type: SET_STATE,
      payload: value
    });
  };

  render() {
    return (
      <Provider>
        <Consumer>
          {store => {
            return (
              <div>
                {store.default}
                <button
                  onClick={this.setStore.bind(this, store.dispatch, 'changed')}
                >
                  change state
                </button>
                <button
                  onClick={this.setStore.bind(this, store.dispatch, 'test')}
                >
                  restore state
                </button>
              </div>
            );
          }}
        </Consumer>
      </Provider>
    );
  }
}
