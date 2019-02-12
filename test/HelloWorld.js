var HelloWorld = artifacts.require("./HelloWorld.sol");

//contract test stored in same folder for this example
contract('HellowWorld', (accounts) => {

    it("Has a default value", async () => {
        let instance = await HelloWorld.deployed()
        let _message = await instance.message()

        assert.equal(_message, "hello world")
    });

    it("Should update the value of message", async () => {
        let instance = await HelloWorld.deployed()
        await instance.updateMessage("new message")
        let _message = await instance.message()
        assert.equal(_message, "new message") 
    });

    it("should allow Owner can update the value of message", async () => {
        let instance = await HelloWorld.deployed()
        await instance.updateMessage("newer message", {from: accounts[0]} );
        let newMessage = await instance.message();
        assert.equal(newMessage, "newer message");
    });
    it("should NOT let the owner update message", async () => {
        let instance = await HelloWorld.deployed();
        try {
          await instance.updateMessage("newest message", {from: accounts[1]} );
          assert.fail();
        }
        catch (err){
          let newMessage = await instance.message();
          assert.equal(newMessage, "newer message");
        }
    });

    // it("should have owner address be the same as deployed, msg.sender", async () => {
    //     let instance = await HelloWorld.deployed()
    //     let _owner = await instance();

    //     let msgSender = accounts[0];

    //     assert.equal(_owner, msgSender)
    // });

    // it("should add correctly with the two values", async () => {
    //     let instance = await HelloWorld.deployed()
    //     let _total = await instance.add(2,3)

    //     assert.equal(_total, 5)
    // });

})