export let ws = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');    
ws.onopen = function() {
  ws.send('your request to server');
};  