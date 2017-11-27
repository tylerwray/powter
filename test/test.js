const assert = require('assert')
const powter = require('../src/powter')
const methods = require('methods')

let appStub = {}

describe('powter', () => {
  beforeEach(() => {
    methods.forEach(method => {
      appStub[method] = () => {
        appStub.attached = true
      }
    })
  })

  afterEach(() => {
    appStub.attached = false
  })

  it('should export a function', () => {
    assert.equal(typeof powter, 'function')
  })

  it('should throw when no app is provided', () => {
    try {
      powter()
    } catch (err) {
      return assert.ok(err instanceof Error)
    }

    return assert.fail('Success', 'Error', 'powter should have thrown when not given an app object')
  })

  it('should throw when no config file path is given',() => {
    try {
      powter(appStub)
    } catch (err) {
      return assert.ok(err instanceof Error)
    }

    return assert.fail('Success', 'Error', 'powter should have thrown when not given a config file path')
  })

  it('should throw when config file path is not a string',() => {
    try {
      powter(appStub, [1, 2, 3])
    } catch (err) {
      return assert.ok(err instanceof Error)
    }

    return assert.fail('Success', 'Error', 'powter should have thrown when not given a string config file path')
  })

  it('should return false when no paths are declared in configuration object', () => {
    let built = powter(appStub, 'test/fixtures/empty.json')

    assert.equal(built, false)
  })

  it('should return true once it has built the routes', () => {
    let built = powter(appStub, 'test/fixtures/full.json')

    assert.equal(built, true)
  })

  it('should attach a function to each defined method of the app', () => {
    powter(appStub, 'test/fixtures/full.json')

    assert.equal(appStub.attached, true)
  })
})
