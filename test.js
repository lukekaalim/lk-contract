// @flow strict
const { createContract, createMockServer, createRequest, createResponse } = require('./');
const { expectTrue, expectAll, expectEventually, colorReporter } = require('@lukekaalim/test');

const mockServerTest = expectEventually(async () => {
  const contract = createContract('testContract', createRequest('/users'), createResponse(JSON.stringify([])));
  const mockServer = createMockServer(contract);

  const { address, port } = await mockServer.open();

  const expectation = expectAll('createMockServer()', [
    expectTrue('The server should return an address', typeof address === 'string'),
    expectTrue('The server should return an port', typeof port === 'number')
  ]);

  mockServer.close();

  return expectation;
});

const runTests = async () => {
  console.log(colorReporter(await mockServerTest.test()))
};

runTests();