var events = require("./event");

var emitter = new events();

emitter.on("someEvent", function(arg1, arg2) {
  console.log("listener1", arg1, arg2);
});

emitter.on("someEvent1", function(arg1, arg2) {
  console.log("listener2", arg1, arg2);
});

emitter.emit("someEvent", "arg1 参数", "arg2 参数");
