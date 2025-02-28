import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import { MovementList } from '../../../components'
import useInterval from '../../../hooks/useInterval'
import { requestMovements } from '../../../redux/actions/movements.actions'
import { MOVEMENTS_REDUCER_SAGA_KEY } from '../../../redux/constants/movements.constants'
import movementsSaga from '../../../redux/sagas/movements.saga'
import { getMovements } from '../../../redux/selectors/movements.selectors'
import { MAPPING } from './MovementList.constants'

const POLL_FOR_NEW_MOVEMENTS_INTERVAL = 1000 * 60 // 60s

const MovementsListContainer = () => {
  useInjectSaga({ key: MOVEMENTS_REDUCER_SAGA_KEY, saga: movementsSaga })

  const dispatch = useDispatch()
  // TODO: fetch max/all movements on view all page
  useInterval(() => dispatch(requestMovements()), POLL_FOR_NEW_MOVEMENTS_INTERVAL)

  return (
    <MovementList
      movements={useSelector(getMovements)}
      rowMapping={MAPPING}
    />
  )
}

export default memo(MovementsListContainer)
