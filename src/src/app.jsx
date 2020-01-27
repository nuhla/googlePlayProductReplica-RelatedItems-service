//-------------------------------------------------------------------//
//----- definde my compnent calss for the related items -------------//
//-------------------------------------------------------------------//

//----------------------------------------------------------//
//------ import all needed librsries to our code -----------//
//----------------------------------------------------------//
import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box, BorderBox, Avatar } from '@primer/components';
import StarRatings from 'react-star-ratings';

//-----------------------------------------------------------------//
//-- create a style for an anchors using styled component sheet ---//
//-----------------------------------------------------------------//
const A = styled.a`
  font-size: 1.2em;
  margin: 0.5em;
  color: black;
  padding: 0.25em 1em;
  font-weight: bold;
  border: 1px solid #f8f5ff;
  border-radius: 10px;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
`;

//-------------------------------------------------------------------//
//-- create a style for an paragraph using styled component sheet ---//
//-------------------------------------------------------------------//
const Parg = styled.p`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 1px solid #f8f5ff;
  border-radius: 10px;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
`;

//---------------------------------------------------------------//
//-- create a style for an Div's using styled component sheet ---//
//---------------------------------------------------------------//
const Div = styled.div`
  font-size: 0.8em;
  margin: 0.5em;
  padding: 0.25em 1em;
   display: inline
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
`;

//------------------------------//
//-- Related Class Contents  ---//
//------------------------------//
class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: [],
      rating: []
    };
  }

  handelClick(e) {
    //----------------------------------------------------------------------------//
    //----- taking the id of the item form the the link of the containing page ---//
    //----------------------------------------------------------------------------//
    var id = parseInt($(e.target).attr('id'));
    window.top.location.href =
      'https://google-play-replica.herokuapp.com/?itemid=' + id;
  }
  componentDidMount() {
    var itemId = 1;
    var windowurl = window.location.href;
    if (windowurl.indexOf('itemid') > 0) {
      itemId = windowurl.substring(
        windowurl.indexOf('itemid') + 'itemid'.length + 1,
        windowurl.length
      );
    }

    /// ajax to get information from the basic info API
    var allRats = [];

    var that = this;
    var storage = [];
    $.ajax({
      url: 'https://basic-info-proxy.herokuapp.com/products',
      type: 'GET',
      datatype: 'apllication/json',
      success: function(response) {
        var n = 3;
        var rand = 0;
        var randStorge = [];
        console.log(rand);

        storage = response.slice(1, 5);
        for (var i = 0; i < storage.length; i++) {
          var innerTht = that;
          $.ajax({
            url:
              'https://protected-plains-93575.herokuapp.com/reviewsApi/getRate/' +
              i,
            dataType: 'json',
            data: { id: itemId },
            success: function(data) {},
            error: function(err) {
              console.log('err', err);
            }
          }).then(data => {
            allRats.push(data.rate);
            innerTht.setState({
              rating: allRats
            });
          });
        }
      },
      error: function(error) {
        // alert(error);
      }
    }).then(() => {
      that.setState({
        storage: storage
      });
    });
  }
  render() {
    // console.log(">>>", this.state.storage);
    var that = this;
    var d = this.state.rating;
    return (
      <div style={{ backgroundColor: '#eeeeee' }}>
        {!this.state.storage.length &&
        this.state.rating.length === this.state.storage.length ? (
          <div>
            <Parg> Loading ... </Parg>
          </div>
        ) : (
          that.state.storage.map((item, index) => {
            // console.log(index, this.state.rating);
            return (
              <BorderBox
                style={{ backgroundColor: '#ffffff' }}
                p={3}
                mt={3}
                key={index + 'a'}
              >
                {/* {console.log(d)} */}
                <Flex key={index + 'b'}>
                  <Box key={index + 'c'}>
                    <div key={index + 'f'}>
                      <Avatar
                        id={item.id}
                        onClick={this.handelClick.bind(this)}
                        key={index + 'g'}
                        size={100}
                        src={
                          item.mainImage ||
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                        }
                      ></Avatar>
                    </div>
                    <div key={index + 'd'}>
                      <StarRatings
                        rating={this.state.rating[index] || 0}
                        starRatedColor="orange"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                        starDimension="10px"
                        starSpacing="3px"
                      />
                    </div>
                  </Box>
                  <Div key={index + 'r'}>
                    <A
                      id={item.id}
                      target={'_top'}
                      // onClick={this.handelClick.bind(this)}
                      key={index + 'y'}
                      href={`https://google-play-replica.herokuapp.com/?itemid=${item.id}`}
                    >
                      {item.title || 'No info avaliable '}
                    </A>

                    <Parg key={index}>
                      {item.breif || ' No info Avaliable'}
                    </Parg>
                  </Div>
                </Flex>
              </BorderBox>
            );
          })
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <RelatedItems></RelatedItems>,
  document.getElementById('RelatedItems')
);
