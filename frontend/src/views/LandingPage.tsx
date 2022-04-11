import React, { ReactElement } from 'react';

import { APPLICATION_TITLE } from '../constants/labels';

const LandingPage: React.FunctionComponent = (): ReactElement => (
  <div className="flex justify-center">
    <h1 className="font-bold text-2xl text-blue-900">{APPLICATION_TITLE}</h1>
    <h1 className="font-bold text-2xl text-blue-900 bg-gray-200 text-red-300">app</h1>
  </div>
);

export default LandingPage;
