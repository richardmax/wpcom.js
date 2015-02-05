
/**
 * WPCOM module
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var Post = require('../lib/post');
var assert = require('assert');

/**
 * Testing data
 */

var fixture = require('./fixture');

/**
 * WPCOM instance
 */

describe('wpcom.site.post.comment', function(){
  // Create `wpcom` and `site` global instances
  var wpcom = WPCOM(fixture.site.token);
  var site = wpcom.site(fixture.site.url);
  var testing_post;
  var testing_comment;

  before(function(done){
    site.addPost(fixture.post, function (err, data) {
      if (err) throw err;

      testing_post = site.post(data.ID);

      // Add comment to post
      site
      .post(data.ID)
      .comment()
      .add(fixture.post_comment, function (err, data_comment) {
        if (err) throw err;

        testing_comment = testing_post.comment(data_comment.ID);
        done();
      });
    });
  });

  after(function(done){
    // delete testing_post post
    testing_post.delete(function(err, post) {
      if (err) throw err;

      done();
    });
  });

  describe('wpcom.site.post.comment.add', function(){
    it('should add a post comment', function(done){
      testing_comment.add(fixture.post_comment + '-added', function(err, data){
        if (err) throw err;

        assert.equal('number', typeof data.ID);
        assert.equal('object', typeof data.post);
        assert.ok(data.post instanceof Object);

        done();
      });
    });
  });

  describe('wpcom.site.post.comment.update', function(){
    it('should update a post comment', function(done){
      testing_comment.update(fixture.post_comment + '-updated', function(err, data){
        if (err) throw err;

        assert.equal('number', typeof data.ID);
        assert.equal('object', typeof data.post);
        assert.ok(data.post instanceof Object);
        assert.equal(testing_comment._cid, data.ID);

        done();
      });
    });
  });

  describe('wpcom.site.post.comment.reply', function(){
    it('should add a reply to a post comment', function(done){
      testing_comment.reply(fixture.post_comment + '-replied', function(err, data){
        if (err) throw err;

        assert.equal('number', typeof data.ID);
        assert.equal('object', typeof data.post);
        assert.ok(data.post instanceof Object);
        assert.equal(testing_comment._cid, data.parent.ID);

        done();
      });
    });
  });

  describe('wpcom.site.post.comment.like.add', function(){
    it('should add a comment like', function(done){
      testing_comment
      .like()
      .add(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.equal(1, data.like_count);
        assert.ok(data.i_like);

        done();
      });
    });
  });

  describe('wpcom.site.post.comment.like.mine', function() {
    it('should get the comment like status of mine', function(done){
      testing_comment
      .like()
      .mine(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.equal(1, data.like_count);
        assert.ok(data.i_like);

        done();
      });
    });
  });

  describe('wpcom.site.post.comment.likesList', function(){
    it('should get comment likes list', function(done){
      testing_comment.likesList(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.equal('number', typeof data.found);
        assert.equal('boolean', typeof data.i_like);
        assert.equal('object', typeof data.likes);
        assert.ok(data.likes instanceof Array);

        done();
      });
    });
  });

  describe('wpcom.site.post.comment.like.delete', function(){
    it('should remove your like from the comment', function(done){
      testing_comment
      .like()
      .del(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.ok(data.success);
        assert.equal(0, data.like_count);
        assert.ok(!(data.i_like));

        done();
      });
    });
  });

  describe('wpcom.site.post.comment.delete', function(){
    it('should delete a comment', function(done){
      testing_comment.del(function(err, data){
        if (err) throw err;

        assert.equal('number', typeof data.ID);
        assert.equal('object', typeof data.post);
        assert.ok(data.post instanceof Object);
        assert.equal(testing_comment._cid, data.ID);

        done();
      });
    });
  });

});