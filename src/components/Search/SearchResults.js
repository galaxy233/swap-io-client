import React from 'react';
import { Grid, Row, Col, Image, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import zipcodes from 'zipcodes';
import picture from '../../assets/picture.png';
import FontAwesome from 'react-fontawesome';
import { getImageResized } from '../../services/image';


// const SearchItem = ({ item }) => {
//   return (
//     <div className="search-item">
//       <div>
//         <div>
//           <div className="img-container">
//             {/* <Image src={ item.image1 } thumbnail /> */}
//             <Image src={ item.image1 } thumbnail />
//           </div>
//           <Link to={ `/item/${item.id}` }>
//             <h4>{ item.name }</h4>
//           </Link>
//         </div>
//         <div className="hidden-xs">
//           <h5>Salt Lake City, UT ({ item.distance + " miles" })</h5>
//           {/* <h5>{ `Estimated value: $${item.usd_value}` }</h5> */}
//           <h5>{ "Estimated value: $100" }</h5>
//         </div>
//       </div>
//     </div>
//   )
// }

const SearchItem = ({ item }) => {
  return (
    <div className="search-item">
      <div>
        <div className="img-container">
          <Image src={ getImageResized(50,50,item.image1) } thumbnail />
        </div>
        <Link to={ `/item/${item.id}` }>
          <h4>{ item.name }</h4>
        </Link>
      </div>

      <div className="search-item-info hidden-xs">
        <div>
          <FontAwesome name="star"/>
          <FontAwesome name="star"/>
          <FontAwesome name="star"/>
          <FontAwesome name="star"/>
        </div>
        <div>{ `${zipcodes.lookup(item.zipcode).city}, ${zipcodes.lookup(item.zipcode).state}` } ({ item.distance + " miles" })</div>
        <h5>{ `Estimated value: $${item.usd_value}` }</h5>
      </div>
    </div>
  )
}


// const SearchItem = ({ item }) => (
//   <Col lg={3} md={3} sm={4} xs={6} className="search-item">
//     <Thumbnail>
//       <a href="#">
//         <div className="image-container">
//           <img src={ item.image1 }/>
//           <div className="overlay"></div>
//         </div>
//       </a>
//       <div className="search-item-text">
//         <h4>{ item.name }</h4>
//         <p>Salt Lake City, UT ({ item.distance + " miles" })</p>
//       </div>
//     </Thumbnail>
//   </Col>
// )

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {
        results.map(item => <SearchItem item={item}/>)
      }
    </div>
  )
}

export default SearchResults;
