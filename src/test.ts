// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;
const tags = __karma__.config.args[0];

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// then we find all the tests.
const filterRegExp = (tags) ? new RegExp(tags, 'g') : /\.spec\.ts$/,
    context = require.context('./', true, /\.spec\.ts$/),
    specFiles = context.keys().filter(path => filterRegExp.test(path));
// and load the modules.
specFiles.map(context);
// finally, start Karma to run the tests.
__karma__.start();
