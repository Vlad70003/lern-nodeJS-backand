
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./mobx-state-router.cjs.production.min.js')
} else {
  module.exports = require('./mobx-state-router.cjs.development.js')
}
