const app = require('./app');
const port = process.env.PORT || 3060;

const db = require('./db.js');

db.connect((err)=>{
    if(err) throw err;
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
