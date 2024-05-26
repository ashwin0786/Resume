const path = require('path');

const express = require('express');

const resumeRouter = require('./routers/resume');

const app = express();

const port = process.env.PORT || 3001
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(publicDirectoryPath));

app.use(resumeRouter);

app.get('*', (req, res) => {
    res.send('Page not found!');
});

app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});