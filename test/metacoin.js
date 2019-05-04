const MetaCoin = artifacts.require("MetaCoin")

contract("MetaCoin", accounts => {
  it('sets building owner', async() => {
    const instance = await MetaCoin.deployed();

    // set
    const buildingOwner = accounts[1];
    await instance.setBuidlingOwner(buildingOwner, { from: accounts[0] })

    // check
    assert.equal(await instance.buildingOwner(), buildingOwner)
  })
})
