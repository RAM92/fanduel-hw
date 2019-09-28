import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls fetch with correct url', () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  const wrapper = shallow(<App />);
  
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/Player.json');

  global.fetch.mockClear();
});
