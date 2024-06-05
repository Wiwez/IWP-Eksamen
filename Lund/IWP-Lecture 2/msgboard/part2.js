let msgBoard = {
    nameOfMsgBoard: "IWP Chat",
    msgHistory: [],
    callBacks: [],
    putMessage: function(msg) {
        this.msgHistory.push(msg);
    },
    printMsg: function(){
        console.log(this.msgHistory);
    },
    register : function(f){
        this.callBacks.push(f);
    },
    sendAndNotify: function(msg){
      this.putMessage(msg);
      this.callBacks.forEach(f=>f(this.nameOfMsgBoard,msg));
    }

}

function briansHandler(boardName,message){
    console.log(`Brian! A message from ${boardName}: ${message}`);
 }

/* 
msgBoard.register(briansHandler);
msgBoard.register((boardName,message)=>console.log(`Board ${boardName} says to Michele: ${message}`));
msgBoard.sendAndNotify("URGENT: Opgaveregning nu!")
*/

function MessageBoard(name){
    this.nameOfMsgBoard = name;
    this.msgHistory = [];
    this.callBacks = [];
    this.putMessage = function(msg) {
        this.msgHistory.push(msg);
    }
    this.printMsg = function(){
        console.log(this.msgHistory);
    }
    this.register = function(f){
        this.callBacks.push(f);
    }
    this.sendAndNotify = function(msg){
      this.putMessage(msg);
      this.callBacks.forEach(f=>f(this.nameOfMsgBoard,msg));
    }
}

let board2= new MessageBoard("Opgave Regning"); 
board2.putMessage("Hej, dette er en test");
board2.register(briansHandler);
board2.sendAndNotify("URGENT: Opgaveregning nu!")
