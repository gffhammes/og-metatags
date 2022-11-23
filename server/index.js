const express = require('express');
const path = require('path');
const fs = require("fs"); 

const title = 'MINISTRO XANDÃO'

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/*', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../build', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }

        htmlData = htmlData.replace(
            "<title>__META_TITLE__</title>",
            `<title>${title}</title>`
        )
        .replace('__META_OG_TITLE__', title)
        .replace('__META_OG_DESCRIPTION__', title)
        .replace('__META_DESCRIPTION__', title)
        .replace('__META_OG_IMAGE__', title)

        return res.send(htmlData);
    });
});

app.use(express.static(
    path.resolve(__dirname, '../build')
));

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});