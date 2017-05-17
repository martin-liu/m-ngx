import { Config as baseConfig } from '../config/config.base';
import { Config as envConfig } from '../config/config';
import { routes } from '../config/routes';

export const Config:any = {
  ...baseConfig,
  ...envConfig,
  routes
}
