/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { mount } from 'enzyme'
import React from 'react'

import * as Classes from '../../../../common/classes'
import { StoreProvider } from '../../../../store'
import Component from '../Dropdown'

const data = {
  options: {
    btc: 'Bitcoin',
    eth: 'Ethereum',
  },
  value: 'btc',
}

const tests = describe.only('Dropdown', () => {
  it('Should call onChange prop when dropdown value is changed', () => {
    const onChange = jest.fn()
    const id = 'test-dropdown'
    const story = (
      <StoreProvider>
        <Component
          id={id}
          onChange={onChange}
          {...data}
        />
      </StoreProvider>
    )
    let value = 'eth'
    const wrapper = mount(story)

    // click to open dropdown list
    wrapper.find(`.${Classes.DROPDOWN} .dropdown-field#${id}`).simulate('click')
    expect(wrapper.exists('.list')).toEqual(true)

    // verify using click
    wrapper.find(`.list-item[value="${value}"]`).simulate('click')
    expect(onChange).toHaveBeenCalledWith(value)

    // verify using keypress
    value = 'btc'
    wrapper.find(`.${Classes.DROPDOWN} .dropdown-field#${id}`).simulate('click')
    wrapper.find(`.list-item[value="${value}"]`).simulate('keypress', { code: 'Enter' })
    expect(onChange).toHaveBeenCalledWith(value)

    // close dropdown list
    wrapper.find(`.${Classes.DROPDOWN}`).simulate('mouseleave')
    expect(wrapper.exists('.list')).toEqual(false)

    wrapper.unmount()
  })
})

export default tests
