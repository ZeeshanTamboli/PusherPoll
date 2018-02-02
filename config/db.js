const mongoose = require('mongoose');

//Mongoose Connect
mongoose
  .connect('mongodb://zeeshan:zeeshan@ds059888.mlab.com:59888/pusherpoll')
  .then(() => console.log('MongoDB Connected...'))
  .catch(() => console.log(err));
