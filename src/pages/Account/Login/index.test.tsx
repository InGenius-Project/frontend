import { render } from '@/tests/utils/renderWrapper';
import Login from '.';
import { mount } from 'vitest';

describe('Button Component', () => {
  test('onClick navigates to /Account/Register', () => {
    const navigateMock = jest.fn();

    const wrapper = mount(Button, {
      propsData: {
        variant: 'outlined',
        onClick: () => navigateMock('/Account/Register'),
      },
    });

    // Simulate a click event on the button
    wrapper.find('button').trigger('click');

    // Ensure that navigate function is called with the correct argument
    expect(navigateMock).toHaveBeenCalledWith('/Account/Register');
  });
});
