import config from 'app-config'; //eslint-disable-line

export default {
  BuildEnvironment: process.env.NODE_ENV,
  ...config,
};

export const getAppVersion = () => process.env.APP_VERSION;

export const getResource = name => config.Resources[name];

export const getDefaultResourceName = () => {
  if (!config.Resources || !Object.keys(config.Resources).length) {
    return null;
  }

  let defaultResource = Object.keys(config.Resources)
    .find(key => config.Resources[key].isDefault);
  if (!defaultResource) {
    defaultResource = Object.keys(config.Resources)[0];
  }
  return defaultResource;
};

export const getDefaultResource = () => {
  const defaultResource = getDefaultResourceName();
  return defaultResource ? config.Resources[defaultResource] : null;
};
