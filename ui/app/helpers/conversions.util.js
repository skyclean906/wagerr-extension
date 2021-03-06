import { conversionUtil } from '../conversion-util'
import { WGR, GWEI, WEI, SAT } from '../constants/common'

export function hexToDecimal (hexValue) {
  return conversionUtil(hexValue, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
  })
}

export function getEthConversionFromWeiHex ({
  value,
  conversionRate,
  numberOfDecimals = 6,
}) {
  const denominations = [WGR, GWEI, WEI]

  let nonZeroDenomination

  for (let i = 0; i < denominations.length; i++) {
    const convertedValue = getValueFromWeiHex({
      value,
      conversionRate,
      toCurrency: WGR,
      numberOfDecimals,
      toDenomination: denominations[i],
    })

    if (convertedValue !== '0' || i === denominations.length - 1) {
      nonZeroDenomination = `${convertedValue} ${denominations[i]}`
      break
    }
  }

  return nonZeroDenomination
}

export function getValueFromWeiHex ({
  value,
  toCurrency,
  conversionRate,
  numberOfDecimals,
  toDenomination,
}) {
  return conversionUtil(value, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromCurrency: WGR,
    toCurrency,
    numberOfDecimals,
    fromDenomination: WEI,
    toDenomination,
    conversionRate,
  })
}

export function getValueFromSatoshis ({
  value,
  toCurrency,
  conversionRate,
  numberOfDecimals,
  toDenomination,
}) {
  return conversionUtil(value, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromCurrency: WGR,
    toCurrency,
    numberOfDecimals,
    fromDenomination: SAT,
    toDenomination,
    conversionRate,
  })
}
