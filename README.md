# Project Overview

This project includes Jasmine tests that operate on a web-based feedreader.

Specifically what is tested includes 1) definition of feeds that are configured
and available to the end user, 2) the proper functioning of the sliding menu,
which allows the user to browse the available feeds, 3) that the loading of
a feed pulls in data and finally 4) that the loading of more than one feed
results in different content from the previous load.


## How to Run These Tests

To run these tests, simply open index.html in a browser. The test scripts are in
the file feedreader.js, which is included as a script file at the bottom of
index.html.

The results of the tests will appear at the bottom of the page in the browser,
below the article headlines.

## Required Files

index.html: is the html base for the feedreader, and includes the script files
js/app.js (containing all the feedreader functionality being tested), as well
as jasmine/spec/feedreader.js (contains the feedreader tests).

Also included are css files css/icomoon.css, css/normalize.css and css/style.css,
and the font files fonts/icomoon.eot, fonts/icomoon.svg, fonts/icomoon.ttf, and
fonts/icomoon.woff.


## Contributing

These Jasmine tests (other than the first example one) were written by Noreen Wu for
the Udacity Front-End Developer Project. (April 2019)
