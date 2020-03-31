/**
 * View table data.
 */

require('../../app-bootstrap')
const _ = require('lodash')
const models = require('../models')
const logger = require('../common/logger')
const helper = require('../common/helper')

const viewData = async (modelName) => {
  const fieldNames = _.keys(models[modelName].$__.table.schema.attributes)
  const records = await helper.scan(modelName)
  console.log(_.map(records, e => _.pick(e, fieldNames)))
}

const modelNames = _.keys(_.omit(models, 'DynamoDB'))

if (process.argv.length === 2) {
  logger.info(`Please provide one of the following table name: [${modelNames}]`)
  process.exit(1)
} else {
  const modelName = process.argv[2]
  if (modelNames.includes(modelName)) {
    viewData(modelName).then(() => {
      logger.info('Done!')
      process.exit()
    }).catch((e) => {
      logger.logFullError(e)
      process.exit(1)
    })
  } else {
    logger.info(`Please provide one of the following table name: [${modelNames}]`)
    process.exit(1)
  }
}
