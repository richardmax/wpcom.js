


/**
 * WPCOM module
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var util = require('./util');

/**
 * Testing data
 */

var test = require('./data');

/**
 * Create a `Site` instance
 */

describe('Events', function(){

  describe('Site', function(){

    it('should listen `site-post-add` event', function(done){
      var site = util.private_site();
      var wpcom = site.wpcom;
      var post = site.addPost(test.new_post_data);

      // listen event
      wpcom.on('site-post-add', function(post){
        post
          .should.be.an.instanceOf(Object);

        post.site_ID
          .should.be.eql(test.site.private.id);

        done();
      });

    });
  });

});
