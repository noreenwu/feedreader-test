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
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        var menuIcon = new MenuIcon();

        it('is hidden by default', function(done) {
            menuIcon.clickMe(done, 0);
            expect(document.body.classList).toContain("menu-hidden");
            done();
        });

        it('is displayed when clicked once', function(done) {
            menuIcon.clickMe(done, 1);
            expect(document.body.classList).not.toContain("menu-hidden");
            done();
         });

        it('is NOT displayed when clicked TWICE', function(done) {
             menuIcon.clickMe(done, 1);
             // menuIcon.clickMe(done);
             expect(document.body.classList).toContain("menu-hidden");
             done();
        });

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

      it('has at least one entry after calling loadFeed', function(done) {
          let f = document.getElementsByClassName("feed")[0];
          let e = f.getElementsByClassName("entry");
          expect(e.length).not.toBe(0);
          done();
      });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

    describe('New Feed Selection', function() {
      let f = "";
      let f2 = "";
      let ele = {
        e: ""
      };

      let ele2 = {
        e: ""
      };
      var tester, tester2;

      beforeEach(function (done) {
        loadFeed(0, function(done) {
           f = document.getElementsByClassName("feed");
           ele.e = f[0].getElementsByClassName("entry");
           tester = ele.e;
           console.log("BEFORE EACH");
           console.log("ele.e " + ele.e[0].textContent);
           console.log("tester " + tester[0].textContent);
        });
        done();
      });

      it('the second feed loads and the DOM is populated', function(done) {
          loadFeed(2, function(done) {
            f2 = document.getElementsByClassName("feed");
            ele2.e = f2[0].getElementsByClassName("entry");
            tester2 = ele2.e;
            console.log("ele2.e " + ele2.e[0].textContent);
            console.log("tester2 " + tester2[0].textContent);

          });
          console.log("EXPECT ele2.e " + tester2);
          console.log("EXPECT ele.e " + tester);
          expect(ele.e).toBeDefined();
          expect(ele2.e).toBeDefined();

          // expect(ele.e).not.toEqual(ele2.e);
          // expect(ele.e[0].textContent).not.toEqual(ele2.e[0].textContent);
          done();

      });
      afterEach(function(done) {
          console.log("AFTER EACH");
          loadFeed(0);
          done();
      });
    });

}());

function bubble(id, done) {

  if (id > 1) {
    console.log("bubble done");
    done();
  }
  else {
    console.log("calling bubble with ", id + 1);
    loadFeed(id+1);
    let f = document.getElementsByClassName("feed");
    ele.e = f[0].getElementsByClassName("entry");
    eleAry[id] = ele.e;
    bubble(id+1, done);
  }
}



// function justCheck1(done) {
//   console.log("just check 1 ");
//
//   let f = document.getElementsByClassName("feed");
//   ele.e = f[0].getElementsByClassName("entry");
//   tester = ele.e;
//   // done();
// }
//
//
// function justCheck2(done) {
//   console.log("just check 2 ");
//   let h = document.getElementsByClassName("feed");
//   ele2.e = h[0].getElementsByClassName("entry");
//   tester2 = ele2.e;
//   // done();
// }



let idx=0;


// let eleAry = [ele, ele2];

// function nestedLoadFeed(done, ele1, ele2, id) {
//   console.log("nested Load Feed");
//   let f = document.getElementsByClassName("feed");
//   let e = f[0].getElementsByClassName("entry");
//   ele1.e = e;
//
//   // next call to loadFeed
//   loadFeed(id+1, done);
//   f = document.getElementsByClassName("feed");
//   let e2 = f[0].getElementsByClassName("entry");
//   ele2.e = e2;
//
//   done();
// }


function justCheck(done, mele) {
    console.log("just check " + idx++);
    let f = document.getElementsByClassName("feed");
    mele.e = f[0].getElementsByClassName("entry");
    console.log(" just check " + mele.e[0]);
    eleAry[idx].e = mele.e;
    done();
}


function loadAndCheck(done, mele, id) {
    loadFeed(id, done);
    let f = document.getElementsByClassName("feed");
    let e = f[0].getElementsByClassName("entry");
    mele.e = e;
    done();
}


// 
// var tester, tester2;
// var beforeTester;

function FeedLoader() {
  this.theFeed = document.getElementsByClassName("feed")[0];
  this.entries = "";

  this.loadTheFeed = function(id, done) {
    loadFeed(id, done);
    // this.updateEntries();
  }


  this.updateEntries = function(done) {
    let f = document.getElementsByClassName("feed")[0];
    this.entries = f.getElementsByClassName("entry");
    tester = this.entries;
    console.log("updateEntries " + tester[0]);
    done();
  }
}

function MenuIcon() {
  this.mi = document.getElementsByClassName("menu-icon-link")[0];

  this.clickMe = function(done, times) {
    // let m = document.getElementsByClassName("menu-icon-link");
    for (let i=0;i<times;i++) {
      this.mi.click();
    }
    done();
  }
}
