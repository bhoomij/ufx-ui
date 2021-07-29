import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _get from 'lodash/get'
import React from 'react'

import { getColors } from '../../common/classes'
import { Button } from '../ui'
import { KEYS, STYLES } from './TickerList.constants'
import { Favorite, Volume } from './TickerList.Header'

const getFormattedValue = getDisplayValue => ({ dataKey, rowData }) => {
  const formattedValue = getDisplayValue(rowData)(dataKey, true)
  return formattedValue
}

// label: column header
// dataKey: represents data in table cell
// headerStyle : style for table header-cell
// style : style for table row-cell
// headerRenderer: renderer for table header-cell
// renderer: renderer for table row-cell
const getColumns = ({
  t, getDisplayValue, favs, toggleFav,
  showOnlyFavs, setShowOnlyFavs,
  showVolumeUnit, volumeUnit, setVolumeUnit, volumeUnitList,
} = {}) => [
  {
    headerRenderer: () => (
      <Favorite showOnlyFavs={showOnlyFavs} setShowOnlyFavs={setShowOnlyFavs} />
    ),
    dataKey: KEYS.ID,
    headerStyle: STYLES.favorite,
    style: STYLES.favorite,
    disableSort: true,
    renderer: ({ dataKey, rowData }) => {
      const id = _get(rowData, dataKey)
      const isFav = !!favs[id]

      const handleFavIconClick = (e) => {
        e.stopPropagation()
        toggleFav(id)
      }

      return (
        <div className='fav-col'>
          <Button
            minimal
            onClick={handleFavIconClick}
          >
            <FontAwesomeIcon
              icon={isFav ? faStar : faStarEmpty}
              className='fav-icon'
            />
          </Button>
        </div>
      )
    },
  }, {
    label: t('tickerlist:pair'),
    dataKey: KEYS.BASE_CCY,
    headerStyle: STYLES.pair,
    style: STYLES.pair,
    renderer: ({ rowData }) => {
      const baseCcy = getDisplayValue(rowData)(KEYS.BASE_CCY)
      const quoteCcy = getDisplayValue(rowData)(KEYS.QUOTE_CCY)

      return (
        <>
          <span>
            {baseCcy}
            <span className='price-unit'>/{quoteCcy}</span>
          </span>
        </>
      )
    },
  }, {
    label: t('tickerlist:last_price'),
    dataKey: KEYS.LAST_PRICE,
    headerStyle: STYLES.lastPrice,
    style: STYLES.lastPrice,
    renderer: getFormattedValue(getDisplayValue),
  },
  {
    label: t('tickerlist:24h_change'),
    dataKey: KEYS.CHANGE_PERC,
    headerStyle: STYLES.changePerc,
    style: STYLES.changePerc,
    renderer: ({ dataKey, rowData }) => {
      const formattedValue = getDisplayValue(rowData)(dataKey)
      const value = getDisplayValue(rowData)(dataKey, false)

      return (
        <span className={getColors(value, { strike: 0, includeStrike: true })}>
          {formattedValue}
        </span>
      )
    },
  }, {
    label: <Volume
      showVolumeUnit={showVolumeUnit}
      volumeUnit={volumeUnit}
      setVolumeUnit={setVolumeUnit}
      volumeUnitList={volumeUnitList}
    />,
    dataKey: KEYS.VOLUME,
    headerStyle: STYLES.volume,
    style: STYLES.volume,
    renderer: getFormattedValue(getDisplayValue),
  },
]

export default getColumns
