import React from 'react';
import Root from '../../../app/containers/Root';

import renderer from 'react-test-renderer';

describe('app', () => {
  it('should render the base app', () => {
    const componet = renderer.create(<Root />);
    const json = componet.toJSON();
    expect(json).toMatchSnapshot();
  });
});
