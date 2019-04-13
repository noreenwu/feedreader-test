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

         it('has a non-blank url', function() {
              for (let i=0;i<allFeeds.length;i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
              }
         });



        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('has a non-blank name', function() {
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
      });
    });


    describe('The menu slides in and out', function() {
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        class MenuIcon {
             constructor() {
                this.mi = document.getElementsByClassName("menu-icon-link")[0];
             }

             clickMe = function (times) {
               for (let i=0;i<times;i++) {
                 this.mi.click();
               }
             }
        }

        let menIcon = new MenuIcon();

        beforeEach(function() {
            let b = document.getElementsByTagName("body")[0];

            console.log("b.classList " + b.classList);
            if (! b.classList.contains("menu-hidden")) {
                b.classList.add("menu-hidden");
                // start from assumption that the menu is hidden
            }
        });

        it('is displayed when clicked once', function() {
            menIcon.clickMe(1);
            expect(document.body.classList).not.toContain("menu-hidden");
         });

        it('is NOT displayed when clicked TWICE', function() {
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
      });

      it('has at least one entry after calling loadFeed', function() {
          let f = document.getElementsByClassName("feed")[0];
          let e = f.getElementsByClassName("entry");
          expect(e.length).not.toBe(0);
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

      class Headline {
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
              done();
           });

        });
      });

      it('the second feed loads and the feeds are not alike', function() {
           console.log("!!!OUTSIDE loadfeed tester " + t.head);
           console.log("!!!OUTSIDE loadfeed tester2 " + t2.head);
           expect(t.head).not.toEqual(t2.head);
           expect(t.head).toBeDefined();
           expect(t2.head).toBeDefined();
           expect(t.head).not.toEqual("");
           expect(t2.head).not.toEqual("");

      });
    });
}());



 //
 //
 // function MenuIcon() {
 //   this.mi = document.getElementsByClassName("menu-icon-link")[0];
 //
 //   this.clickMe = function(times) {
 //     for (let i=0;i<times;i++) {
 //       this.mi.click();
 //     }
 //   }
 // }
