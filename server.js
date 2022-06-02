const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('listening on Port 3000');
    console.log(__dirname);

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

})



