const MetaCoin = artifacts.require("MetaCoin")
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

contract("MetaCoin", accounts => {
  const serviceProvider = accounts[0]
  const buildingOwner = accounts[1]
  const client = accounts[2]
  const percentmille = 2000

  it('sets building owner', async() => {
    const instance = await MetaCoin.deployed();

    // set
    await instance.setBuidlingOwner(buildingOwner)

    // check
    assert.equal(await instance.buildingOwner(), buildingOwner)
  })

  it('pay a charge to building owner and service provider', async() => {
    const instance = await MetaCoin.deployed();

    // get initial balances
    const ib = {
      serviceProvider: +(await web3.eth.getBalance(serviceProvider)),
      buildingOwner: +(await web3.eth.getBalance(buildingOwner)),
      client: +(await web3.eth.getBalance(client))
    }


    // payment data
    const charge = web3.utils.toWei('2', 'ether')
    const serviceCharge = charge * (percentmille / 100000)
    const buildingCharge = charge - serviceCharge

    // make payment
    const txResult = await instance.payCharge({from: client, value: charge})

    // calculate gas costs
    const gasPrice = txResult.logs[0].args.gasprice
    const gasUsed = txResult.receipt.gasUsed
    const gasCharged = gasPrice * gasUsed

    // get final balances
    const fb = {
      serviceProvider: +(await web3.eth.getBalance(serviceProvider)),
      buildingOwner: +(await web3.eth.getBalance(buildingOwner)),
      client: +(await web3.eth.getBalance(client))
    }

    // assert
    assert.equal(fb.client, ib.client - charge - gasCharged)
    assert.equal(fb.buildingOwner, ib.buildingOwner + buildingCharge)
    assert.equal(fb.serviceProvider, ib.serviceProvider + serviceCharge)

  })
})
