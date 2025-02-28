/* eslint-disable import/prefer-default-export */
import { TICKER_KEYS } from '../../components'
import { formatVolume } from '../../functions/number'

export const getDataMapping = (baseCcy, quoteCcy) => ({
  [TICKER_KEYS.BASE_CCY]: {
    format: () => baseCcy,
  },
  [TICKER_KEYS.QUOTE_CCY]: {
    format: () => quoteCcy,
  },
  [TICKER_KEYS.VOLUME]: {
    format: (_, __, data = {}) => formatVolume(data.volume * data.lastPrice),
  },
})
