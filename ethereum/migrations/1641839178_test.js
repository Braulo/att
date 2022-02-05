const Attentions = artifacts.require('Attentions');

module.exports = async function (_deployer, accounts) {
  // Use deployer to state migration tasks.
  await _deployer.deploy(Attentions);
};
