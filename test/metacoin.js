const MetaCoin = artifacts.require("MetaCoin");

contract("MetaCoin", accounts => {
  it("should put 10000 MetaCoin in the first account", async () => {
    const instance = await MetaCoin.deployed();
    const balance = await instance.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });


  it("should send coin correctly", async () => {
    const instance = await MetaCoin.deployed();

    const account1 = accounts[0];
    const account2 = accounts[1];

    // get initial balances
    const initBalance1 = await instance.getBalance.call(account1);
    const initBalance2 = await instance.getBalance.call(account2);

    // send coins from account 1 to 2
    const amount = 10;
    await instance.sendCoin(account2, amount, { from: account1 });

    // get final balances
    const finalBalance1 = await instance.getBalance.call(account1);
    const finalBalance2 = await instance.getBalance.call(account2);

    assert.equal(
      finalBalance1.toNumber(),
      initBalance1.toNumber() - amount,
      "Amount wasn't correctly taken from the sender",
    );
    assert.equal(
      finalBalance2.toNumber(),
      initBalance2.toNumber() + amount,
      "Amount wasn't correctly sent to the receiver",
    );
  });

  it("one cannot spend what he does not have", async () => {
    const instance = await MetaCoin.deployed();

    const account1 = accounts[0];
    const account2 = accounts[1];

    // get initial balances
    const initBalance1 = await instance.getBalance.call(account1);
    const initBalance2 = await instance.getBalance.call(account2);

    // try to send too much coin
    const amount = initBalance1 + 1;
    await instance.sendCoin(account2, amount, { from: account1 });

    // get final balances
    const finalBalance1 = await instance.getBalance.call(account1);
    const finalBalance2 = await instance.getBalance.call(account2);

    assert.equal(
      finalBalance1.toNumber(),
      initBalance1.toNumber(),
      "Amount wasn't taken from the sender",
    );
    assert.equal(
      finalBalance2.toNumber(),
      initBalance2.toNumber(),
      "Amount wasn't sent to the receiver",
    );

  })

  it('should pay transaction charge to the instructor', async () => {
    const instance = await MetaCoin.deployed();

    const account1 = accounts[1];
    const account2 = accounts[2];
    const instructor = await instance.instructor.call()

    // get initial balance of the instructor
    const initBalanceInstructor = await instance.getBalance.call(instructor);

    // send coins from account 1 to 2
    const amount = 1;
    await instance.sendCoin(account2, amount, { from: account1 });

    // get final balance of the instructor
    const finalBalanceInstructor = await instance.getBalance.call(instructor);

    const transactionCharge = (await instance.transactionCharge.call()).toNumber()

    assert.equal(
      finalBalanceInstructor.toNumber(),
      initBalanceInstructor.toNumber() + transactionCharge,
      "Transaction charge has been sent to the instructor",
    );
  });

  it('should be named FoxyFoxyFoxy', async () => {
    const instance = await MetaCoin.deployed();
    const name = await instance.name.call();
    assert.equal(
      name,
      "FoxyFoxyFoxy",
      "Name is correct"
    );
  })

  it('should have symbol FFF', async () => {
    const instance = await MetaCoin.deployed();
    const actual = await instance.symbol.call();
    assert.equal(
      actual,
      "FFF",
      "Symbol is correct"
    );
  })

});
