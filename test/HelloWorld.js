var HelloWorld = artifacts.require("./HelloWorld.sol");

let instance;

contract('HellowWorld', (accounts) => {

    before(async function(){
        instance = await HelloWorld.deployed();
    });

    describe('Constructor testing', function(){ 
        
        it("Has a default message", async () => {
            let _message = await instance.message()

            assert.equal(_message, "hello world")
        });
        it("Has a default value", async () => {
            let _value = await instance.value()

            assert.equal(_value, 10)
        });    
    });

    describe('Update Message and Value testing', function(){ 
        
        it("Should update the message", async () => {
            await instance.updateMessage("new message")
            let _message = await instance.message()

            assert.equal(_message, "new message") 
        });
        it("Should update the value", async () => {
            await instance.updateValue(412456)
            let _value = await instance.value()

            assert.equal(_value, 412456) 
        });
        
        describe('addition function', function(){
            
            it("should add correctly with the two values", async () => {
                await instance.add(2,3);
                const _total = await instance.sum();
    
                assert.equal(_total, 5);
            });

            it("should update the value of constuctor with the new sum", async () => {        
                await instance.add(6,10);
                const _total = await instance.sum();

                await instance.updateValue(_total);
                let _sum = await instance.value();
    
                assert.equal(_sum, 16);
            });
        });
    });

    describe('onlyOwner modifier testing', function(){ 
        
        describe('Update Message', function(){ 

            it("should allow Owner to update the message", async () => {
                await instance.updateMessage("newer message", {from: accounts[0]} );
                let newMessage = await instance.message();
                assert.equal(newMessage, "newer message");
            });
            it("should NOT let the owner update message", async () => {
                try {
                    await instance.updateMessage("newest message", {from: accounts[1]} );
                    assert.fail();
                }
                catch (err){
                    let newMessage = await instance.message();
                    assert.equal(newMessage, "newer message");
                }
            });
        });

        describe('Update Value', function(){ 

            it("should allow Owner to update the value", async () => {
                await instance.updateValue ( 150 , {from: accounts[0]} );
                let newValue = await instance.value();
                assert.equal(newValue, 150 );
            });
            it("should NOT let the owner update value", async () => {
                try {
                    await instance.updatevalue( 35 , {from: accounts[3]} );
                    assert.fail();
                }
                catch (err){
                    let newValue = await instance.value();
                    assert.equal(newValue, 150 );
                }
            });
        });
    });

    // describe('Owner Address testing', function(){
    //     it("Should set owner correctly.", async () => {
    //         //let instance = await HelloWorld.deployed();
            
    //         let _owner = await instance.owner();
    //         assert.equal(_owner, accounts[0]);
    //     });

        // it("should transfer owner address", async () => {
        //     let currentOwner = accounts[0]
        //     let newOwner = accounts[2];

        //     await instance.transferOwner(newOwner, { from: currentOwner } );
        //     let _owner = await instance.owner();

        //     assert.equal(_owner, accounts[2])
        // });

    // });
});    