const path = require('path');
const express = require('express');
const app = express();
const server = app.listen(8000, ()=>{
    console.log('listening');
});
public = path.join(__dirname, 'public');
app.use(express.static(public));