const MetaCoin = artifacts.require("MetaCoin")
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));



contract("MetaCoin", accounts => {
  const buildingOwner = accounts[1];

  it('sets building owner', async() => {
    const instance = await MetaCoin.deployed();

    // set
    await instance.setBuidlingOwner(buildingOwner, { from: accounts[0] })

    // check
    assert.equal(await instance.buildingOwner(), buildingOwner)
  })

  it('pay a charge to building owner and service provider', async() => {
    const instance = await MetaCoin.deployed();

    // get initial balances

    // make payment
    const txResult = await instance.payCharge({from: accounts[2], value: web3.utils.toWei('2', 'ether')})
    console.log(txResult)

    // get final balances

  })
})
