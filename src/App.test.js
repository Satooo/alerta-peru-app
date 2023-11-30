import { render, screen, fireEvent, queryByAttribute} from '@testing-library/react';
import App from './App';
import Base from './components/Base';
import React from 'react';
import Login from './components/screens/login/Login';
import { mount } from 'enzyme';


test('renders learn react link', () => {
  const getById = queryByAttribute.bind(null, 'id');
  const dom=render(<Base/>);
  const wrapper = mount(<Base/>);
  window.location.assign = jest.fn();
  location.assign('http://localhost:3001/login');
  const linkElement = screen.getByText("Ver más");
  const signUpButton = wrapper.find("#signupbutton");
  fireEvent.click(signUpButton);
  expect(window.location.assign).toBeCalledWith('http://localhost:3001/login');
});
