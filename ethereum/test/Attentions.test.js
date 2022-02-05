const Attentions = artifacts.require('Attentions');


contract('Attentions', (accounts) => {
  let contract;
  beforeEach(async () => {
    contract = await Attentions.deployed();
  });

  it('should set the owner to the address who called the contract', async () => {
    const owner = await contract.owner();
    assert.equal(owner, accounts[0], 'Owner should be the Address who deployed the Contract');
  });

  it('should add a UserText to the Contract', async () => {
    const userTextValue = 'Test Message';
    await contract.addTextToAddress(userTextValue);
    const userTextMessage = await contract.UserEntries(accounts[0]);

    assert.equal(userTextValue, userTextMessage.value, 'the value did not get added');
  });
});

contract('Attentions', () => {
  let contract;
  beforeEach(async () => {
    contract = await Attentions.deployed();
  });

  it('should set firstText to false', async () => {
    const userTextValue = 'Test Message';
    await contract.addTextToAddress(userTextValue);
    const firstText = await contract.firstText();

    assert.equal(firstText, false, 'the value did not get added');
  });
});

contract('Attentions', (accounts) => {
  let contract
  beforeEach(async () => {
    contract = await Attentions.deployed();
  });

  it('should add an upvote to a text', async () => {
    const userTextValue = 'Test Message';
    await contract.addTextToAddress(userTextValue, { from: accounts[0] });
    await contract.upvote(accounts[0]);
    const user = await contract.UserEntries(accounts[0]);

    assert.equal(user.upvotes, 1, 'did not add an upvote');
  });

  it('should add an downvote to a text', async () => {
    await contract.downvote(accounts[0]);
    const user = await contract.UserEntries(accounts[0]);

    assert.equal(user.downvotes, 1, 'did not add an upvote');
  });

  it('should add the current winner to the pastWinners list', async () => {
    await contract.endMatch();
    const winner = await contract.pastWinners(0);

    assert.equal(winner, accounts[0], 'wrong winner');
  });

});

contract('Attentions', (accounts) => {
  let contract;
  beforeEach(async () => {
    contract = await Attentions.deployed();
  });

  it('should reset the state', async () => {
    const userTextValue = 'Test Message';
    const userTextValue2 = 'Test Message';

    await contract.addTextToAddress(userTextValue);
    await contract.addTextToAddress(userTextValue2, { from: accounts[1] });

    await contract.endMatch();
    const userTextMessage = await contract.UserEntries(accounts[0]);

    assert.equal(userTextMessage.value, "");
  });
});