const PAGARME_ENCRYPTION_KEY =
  process && process.env.REACT_APP_PAGARME_ENVIRONMENT === 'live'
    ? process.env.REACT_APP_PAGARME_ENCRYPTION_KEY_PRD
    : 'ek_test_8Tevcd9yfp9BORb0l5WhVdnK3OTCOL'

const PAGARME_POSTBACK_URL =
  process && process.env.REACT_APP_PAGARME_ENVIRONMENT === 'live'
    ? process.env.REACT_PAGARME_POSTBACK_URL
    : 'http://jls-prd.herokuapp.com'

export { PAGARME_ENCRYPTION_KEY, PAGARME_POSTBACK_URL }
