/*  Noreen Wu
 *  April 14, 2019
 *  Udacity Project: Testing a Feedreader
 *
 *  This testfile describes and implements several tests on the Feedreader:
 *  1) that the feeds' names and urls are configured properly, 2) that the
 *  menu is hidden by default and behaves appropriately when its
 *  toggle button is clicked, 3) that the loading of the feeds
 *  results in data and finally 4) that the loading of more than
 *  one feed results in changing of content.
 */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('each feed has a non-blank url', function() {
              for (let i=0;i<allFeeds.length;i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
              }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('each feed has a non-blank name', function() {
            for (let i=0;i<allFeeds.length;i++) {
              expect(allFeeds[i].name).toBeDefined();
              expect(allFeeds[i].name).not.toBe("");
            }
         })
    });


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

    describe('The menu', function() {
      it('is hidden by default', function() {
          expect(document.body.classList).toContain("menu-hidden");
          // if the body element contains the class "menu-hidden,"
          //  it will not appear on-screen and will be hidden to the user
      });
    });


    describe('The menu slides in and out', function() {
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        class MenuIcon {  // this helps to manage the clicking on the menu icon
             constructor() {
                this.mi = document.getElementsByClassName("menu-icon-link")[0];
             }

             clickMe = function(times) {
               for (let i=0;i<times;i++) {
                 this.mi.click();
               }
             }
        }

        let menIcon = new MenuIcon();

        beforeEach(function() {
            let b = document.getElementsByTagName("body")[0];

            if (! b.classList.contains("menu-hidden")) {
                b.classList.add("menu-hidden");
                // before each test, start from assumption (and state) that the menu is hidden:
                //   this allows the tests for 2 clicks or 1 click to be performed
                //   in either order
            }
        });

        it('menu is displayed when clicked once', function() {
            menIcon.clickMe(1);
            expect(document.body.classList).not.toContain("menu-hidden");
         });

        it('menu is NOT displayed when clicked TWICE', function() {
             menIcon.clickMe(2);
             expect(document.body.classList).toContain("menu-hidden");
        });
        afterEach(function() {
            let b = document.getElementsByTagName("body")[0];

            if (! b.classList.contains("menu-hidden")) {
                b.classList.add("menu-hidden");
                //clean up: put the menu away after testing
            }
        })

    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    describe('Initial Entries', function() {

      beforeEach(function(done) {
          loadFeed(2, done);
          // by calling this in beforeEach(), done can be signalled
          //  at the end of the load and the it() test will still
          //  be run
      });

      it('loading a feed results in at least one entry', function() {
          let f = document.getElementsByClassName("feed")[0];
          let e = f.getElementsByClassName("entry");
          expect(e.length).toBeGreaterThan(0);
      });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

    describe('New Feed Selection', function() {
      let f = "";          // the feed element
      let e = "";          // the entry element

      class Headline {     // Headline helps to capture values loaded by loadFeed calls
          constructor() {
            this.head = "";
          }
          getHead() {
            return this.head;
          }
          log(str) {
            this.head = str;
          }
      }

      let t = new Headline();
      let t2 = new Headline();

      beforeEach(function (done) {

        loadFeed(1, function() {
           f = document.getElementsByClassName("feed");
           e = f[0].getElementsByClassName("entry");
           t.log(e[0].textContent);

           loadFeed(2, function() {
              f = document.getElementsByClassName("feed");
              e = f[0].getElementsByClassName("entry");
              t2.log(e[0].textContent);
              done();     // placement of done() is key in this test.
           });            // It has to be called last, in the last loadFeed
                          // which needs to be within the beforeEach.
                          // The loadFeed functions need to be nested in order
                          // to get them to run sequentially rather than
                          // randomly or at the same time, so that the content
                          // of each separate load can be captured.
        });
      });

      it('a second feed load results in different content than the first feed load', function() {
           expect(t.getHead()).toBeDefined();
           expect(t2.getHead()).toBeDefined();
           expect(t.getHead()).not.toEqual("");
           expect(t2.getHead()).not.toEqual("");
           expect(t.getHead()).not.toEqual(t2.getHead());
      });
    });
}());
