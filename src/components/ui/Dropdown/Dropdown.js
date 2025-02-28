import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState, forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import * as utils from '../../../common/utils'
import DropdownList from './Dropdown.List'

// eslint-disable-next-line prefer-arrow-callback
const Dropdown = forwardRef(function Dropdown(props, ref) {
  const {
    value,
    valueRenderer,
    options,
    optionRenderer,
    id,
    name,
    searchable,
    className,
    style,
    onChange,
    small,
    placeholder,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const content = valueRenderer && valueRenderer(value, options[value])
  const classes = cx(Classes.DROPDOWN, className, {
    [Classes.DROPDOWN + Classes.SIZE_SMALL]: small,
  })

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const buttonElement = (
    <div
      className='dropdown-field'
      onClick={toggle}
      onKeyPress={utils.handleKeyboardEvent('Enter', toggle)}
      role='button'
      id={id}
      name={name}
      data-qa={options[value] || placeholder}
      tabIndex={0}
    >
      {content || (
        <div className={cx('selected-text')}>
          {options[value] || placeholder}
        </div>
      )}
      <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
    </div>
  )

  const handleOnChange = (e) => {
    setIsOpen(false)
    onChange(e)
  }

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      onMouseLeave={() => setIsOpen(false)}
    >

      {buttonElement}

      {
        isOpen && (
          <DropdownList
            options={options}
            value={value}
            searchable={searchable}
            optionRenderer={optionRenderer}
            onChange={handleOnChange}
          />
        )
      }
    </div>
  )
})

Dropdown.propTypes = {
  valueRenderer: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  small: PropTypes.bool,
  placeholder: PropTypes.string,
  ...DropdownList.propTypes,
}
Dropdown.defaultProps = {
  valueRenderer: null,
  id: null,
  name: null,
  className: null,
  style: null,
  small: false,
  placeholder: null,
  ...DropdownList.defaultProps,
}

export default Dropdown
