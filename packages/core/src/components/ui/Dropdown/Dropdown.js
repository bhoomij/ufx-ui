import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState, forwardRef, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

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
    searchModifier,
    className,
    onChange,
    small,
    placeholder,
    closeOnMouseLeave,
    isOpen: isOpenProp,
    ...rest
  } = props

  const [isOpen, setIsOpen] = useState(isOpenProp)
  const content = valueRenderer && valueRenderer(value, options[value])
  const classes = cx(Classes.DROPDOWN, className, {
    [Classes.DROPDOWN + Classes.SIZE_SMALL]: small,
    'is-open': isOpen,
  })

  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])

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
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div
        ref={ref}
        className={classes}
        onMouseLeave={closeOnMouseLeave ? () => setIsOpen(false) : undefined}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {buttonElement}

        {isOpen && (
          <DropdownList
            options={options}
            value={value}
            searchable={searchable}
            searchModifier={searchModifier}
            optionRenderer={optionRenderer}
            onChange={handleOnChange}
          />
        )}
      </div>
    </OutsideClickHandler>
  )
})

Dropdown.propTypes = {
  /**
   * The value renderer function of the Dropdown.
   */
  valueRenderer: PropTypes.func,
  /**
   * The ID of the Dropdown.
   */
  id: PropTypes.string,
  /**
   * The name of the Dropdown.
   */
  name: PropTypes.string,
  /**
   * The className of the Dropdown.
   */
  className: PropTypes.string,
  /**
   * If true, shows the Button in a small style.
   */
  small: PropTypes.bool,
  /**
   * The placeholder of the Dropdown.
   */
  placeholder: PropTypes.string,
  /**
   * If true, closes the dropdown on mouse leave.
   */
  closeOnMouseLeave: PropTypes.bool,
  /**
   * If true, renders the dropdown in an open initial state.
   */
  isOpen: PropTypes.bool,
  /**
   * If true, renders the dropdown with a search input.
   */
  searchable: PropTypes.bool,
  /**
   * The search input modifier function
   */
  searchModifier: PropTypes.func,
  ...DropdownList.propTypes,
}

Dropdown.defaultProps = {
  valueRenderer: null,
  id: null,
  name: null,
  className: null,
  small: false,
  placeholder: null,
  closeOnMouseLeave: false,
  isOpen: false,
  searchable: false,
  searchModifier: null,
  ...DropdownList.defaultProps,
}

export default Dropdown
