import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { withContentRect } from 'react-measure'

import * as Classes from '../../common/classes'
import ResponsiveContext from './ResponsiveContext'

export const BREAKPOINT_MOBILE = 768

const Responsive = (props) => {
  const { children, measureRef, contentRect } = props
  const width = _get(contentRect, 'client.width')
  const height = _get(contentRect, 'client.height')
  const classes = cx(Classes.RESPONSIVE, Classes.getResponsiveClass(width))
  const isMobile = width < BREAKPOINT_MOBILE
  const value = useMemo(() => ({ isMobile, width, height }), [
    isMobile,
    width,
    height,
  ])

  return (
    <ResponsiveContext.Provider value={value}>
      <div ref={measureRef} className={classes}>
        {children}
      </div>
    </ResponsiveContext.Provider>
  )
}

Responsive.propTypes = {
  children: PropTypes.node.isRequired,
  measureRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) }),
  ]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  contentRect: PropTypes.object.isRequired,
}

export default withContentRect('client')(Responsive)
