var OwnerAccount = artifacts.require("./OwnerAccount.sol");

module.exports = function(deployer) {
  deployer.deploy(OwnerAccount, "hello world", 10); // arguements in constructor
};
