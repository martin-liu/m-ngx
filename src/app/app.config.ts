import { Config as baseConfig } from '../config/config.base';
import { Config as envConfig } from '../config/config';
import { routes } from '../config/routes';
import { Constant } from '../config/constants';
import { intros } from '../config/intro';

export const Config:any = {
  ...baseConfig,
  ...envConfig,
  routes,
  Constant,
  intros
}
