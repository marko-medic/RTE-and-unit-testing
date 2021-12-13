import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  appName: "playground",
};

const actions = {
  updateAppName: (store: any, newVersion: any) => {
    const newAppName = store.state.appName + " - " + newVersion;
    store.setState({ appName: newAppName });
  },
};

export const useGlobalHook = globalHook(React, initialState, actions);
