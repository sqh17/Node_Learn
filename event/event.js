function EventEmitter() {
  this._events = {};
}


/*
* on事件
* param1 事件名
* param2 事件
* param3 是否从头部添加
*/
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type,listener,flag) {
  if (!this._events) this._events = Object.create(null); // 保证存在实例属性
  if (this._events[type]) {
    if (flag) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
  this.emit("newListener", type);
};
EventEmitter.prototype.emit = function(type, ...arg) {
  if (this._events[type]) {
    this._events[type].forEach(item => {
      item.call(this, ...arg);
    });
  }
};
EventEmitter.prototype.once = function(type,listener){
  let _this = this
  function only(){
    listener()
    _this.removeListener(type,only)
  }
  only.origin = listener
  this.on(type,only)
}
EventEmitter.prototype.off = EventEmitter.prototype.removeListener = function(type,listener){
  if(this._events[type]){
    this._events[type] = this._events[type].filter(fn=>{
      return fn !== listener && fn.origin !== listener
    })
  }
}
module.exports = EventEmitter;
