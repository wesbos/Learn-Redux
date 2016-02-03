import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import comments from '../../client/data/comments';
import posts from '../../client/data/posts';


describe('Photo Component', function () {
  var result;

  it('should',()=>{
    var renderer = ReactTestUtils.createRenderer();
    renderer.render(<Photo post={posts[0]} comments={comments.BAcyDyQwcXX} i={0}/>)
    result = renderer.getRenderOutput();
    console.log(result);
    // expect(1).toEqual(1);
  });
})



