import React, { forwardRef } from 'react'

import { ResponsiveState } from '../components/Responsive'

/**
 * MobileLayoutWrapper
 *
 * HOC that passes the prop isMobileLayout to the child component
 * Takes isMobileLayout if it’s passed as prop, or else checks if the
 * components width is smaller than the breakpoint.
 *
 * Note: Requires to be wrapped inside a withResponsive HOC
 *
 * @param {Number} breakpoint
 * @returns {ReactNode} Component
 */
// disabled arrow-callback rule to have display name in devtools instead of Anonymous
// eslint-disable-next-line prefer-arrow-callback
const MobileLayoutWrapper = (breakpoint = 576) => (Component) => forwardRef(function MobileLayoutWrapperComp(props, ref) {
  const { width } = ResponsiveState()
  const isMobileLayout = props.isMobileLayout !== undefined
    ? !!props.isMobileLayout
    : width < breakpoint

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component ref={ref} {...props} isMobileLayout={isMobileLayout} />
  )
})

export default MobileLayoutWrapper
