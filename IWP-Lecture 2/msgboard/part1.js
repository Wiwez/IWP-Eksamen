const msgBoard = {
    nameOfMsgBoard: "IWP Chat",
    msgHistory: [],
    putMessage: function(msg) {
        this.msgHistory.push(msg);
    },
    printMsg: function(){
        console.log(this.msgHistory);
    }
}

msgBoard.putMessage("Hej, dette er en test");
msgBoard.putMessage("Hej IWP");
msgBoard.printMsg();