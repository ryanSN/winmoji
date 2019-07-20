module.exports = {
  require: jest.fn(() => value),
  match: jest.fn(() => value),
  app: jest.fn(() => value),
  remote: jest.fn(() => value),
  dialog: jest.fn(() => value),
  ipcRenderer: {on: jest.fn()},
}
