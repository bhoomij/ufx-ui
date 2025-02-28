import _get from 'lodash/get'
import _isString from 'lodash/isString'
import { createSelector } from 'reselect'

import { isDerivativeCcy } from '../../functions/format'
import { book, depthChart } from '../../var/config'
import {
  PAIR_URL_SEPARATOR,
  PAIR_OUTPUT_SEPARATOR,
  LAST_PRICE_REQ,
  IS_MARKET_TRADES,
  BOOK_PREC,
  BOOK_ZOOM,
  DEPTH_CHART_ZOOM,
} from '../constants/UI.constants'
import { getUfxState } from './common'
import { getIsPaperCcy, getCurrencySymbolMemo } from './currencies.selectors'

export const VERIFICATION_LEVEL = {
  NONE: 0,
  BASIC: 1,
  INTERMEDIATE: 2,
  FULL: 3,
}

const EMPTY_OBJ = {}

export const getUI = (state) => _get(getUfxState(state), 'UI', EMPTY_OBJ)

export const getUIIsPaperTrading = (state) => getUI(state).is_ppt || false

export const getUIOrderform = (state) => getUI(state).orderform

export const getUIOrderformPrice = (state) => _get(getUIOrderform(state), LAST_PRICE_REQ)

export const getUIIsMarketTrades = (state) => _get(getUI(state), IS_MARKET_TRADES)

export const getUIBookPrec = (state) => _get(getUI(state), BOOK_PREC, 0)

export const getUIBookZoom = (state) => _get(getUI(state), BOOK_ZOOM, book.DEFAULT_ZOOM)

export const getUIDepthChartZoom = (state) => _get(getUI(state), DEPTH_CHART_ZOOM, depthChart.DEFAULT_ZOOM)

export const getUIAllPairs = (state) => getUI(state).all_pairs || []

export const getUIAllCurrencies = (state) => getUI(state).all_currencies || []

export const getUrlPair = (state) => getUI(state).currentPair

export const getNicePair = createSelector(
  getUrlPair,
  getCurrencySymbolMemo,
  (pair, getCcySymbol) => {
    if (!_isString(pair)) {
      return ''
    }

    const [baseCcy, quoteCcy] = pair.split(PAIR_URL_SEPARATOR)

    return getCcySymbol(baseCcy) + PAIR_OUTPUT_SEPARATOR + getCcySymbol(quoteCcy)
  },
)

export const getUIUserVerified = (state) => getUI(state).verified || false

export const getUIUserVerificationLevel = (state) => (
  getUIUserVerified(state)
    ? Number(getUI(state).verification_level || VERIFICATION_LEVEL.NONE)
    : VERIFICATION_LEVEL.NONE
)
export const isUserVerifiedFull = (state) => (
  getUIUserVerificationLevel(state) >= VERIFICATION_LEVEL.FULL
)
export const isUserVerifiedIntermediate = (state) => (
  getUIUserVerificationLevel(state) >= VERIFICATION_LEVEL.INTERMEDIATE
)
export const isUserVerifiedBasic = (state) => (
  getUIUserVerificationLevel(state) >= VERIFICATION_LEVEL.BASIC
)

const getUICcys = (state) => getUI(state).currencies || []
const getUIFiatCcys = (state) => getUI(state).fiat_currencies || []
const getUITetherCcys = (state) => getUI(state).tether_currencies || []
const getUIDepositCcys = (state) => getUI(state).deposit_currencies || []

const filterCurrenciesByPaperTrading = (isPaperTrading, currencies, isPaperCcy) => {
  if (!isPaperCcy) {
    return currencies
  }
  return currencies.filter((ccy) => (
    (isPaperTrading && isPaperCcy(ccy)) || (!isPaperTrading && !isPaperCcy(ccy))
  ))
}

export const getUICryptoCurrencies = createSelector(
  [getUIIsPaperTrading, getUIDepositCcys, getIsPaperCcy],
  filterCurrenciesByPaperTrading,
)

export const getUITetherCurrencies = createSelector(
  [getUIIsPaperTrading, getUITetherCcys, getIsPaperCcy],
  filterCurrenciesByPaperTrading,
)

export const getUIFiatCurrencies = createSelector(
  [getUIIsPaperTrading, getUIFiatCcys, getIsPaperCcy],
  filterCurrenciesByPaperTrading,
)

export const getUIVerifiedCurrencies = (state) => getUI(state).verified_currencies || []

export const getUIWithdrawalsMaxLnx = (state) => getUI(state).withdrawals_max_lnx || 0.02
export const getUIWithdrawalsMinLnx = (state) => getUI(state).withdrawals_min_lnx || 0.000001

export const getUIWalletNames = (state) => getUI(state).wallet_ui_names || {}

export const getUICurrencies = createSelector(
  [getUIIsPaperTrading, getUICcys, getIsPaperCcy],
  filterCurrenciesByPaperTrading,
)

export const getUITradingCurrencies = createSelector(
  [getUIIsPaperTrading, getUICcys, getIsPaperCcy, getCurrencySymbolMemo],
  (isPaperTrading, currencies, isPaperCcy, getCurrencySymbol) => {
    if (!isPaperCcy) {
      return currencies
    }

    const ccyObject = { }
    currencies.forEach((ccy) => {
      if (
        (isPaperTrading && isPaperCcy(ccy))
        || (!isPaperTrading && !isPaperCcy(ccy) && !isDerivativeCcy(ccy))
      ) {
        ccyObject[ccy] = {
          name: getCurrencySymbol(ccy),
          currency: ccy,
        }
      }
    })

    return ccyObject
  },
)

export default {
  getUI,
  getUIIsPaperTrading,
  getUIOrderformPrice,
  getUIAllPairs,
  getUIAllCurrencies,
  getUrlPair,
  getNicePair,
  getUIIsMarketTrades,
  getUIBookPrec,
  getUIUserVerified,
  getUICryptoCurrencies,
  getUITetherCurrencies,
  getUIFiatCurrencies,
  getUIVerifiedCurrencies,
  getUIWalletNames,
  getUICurrencies,
}
