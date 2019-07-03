import React from 'react';

export default function Spots(props) {
  return (
    <div className="container">
      <div id="items">
        <h3>Spots</h3>
        <ul>
          {props.spots.map(spot => {
            return (
              <li
                key={spot.id}
                onClick={() => {
                  props.clickSpot(spot.id);
                }}
              >
                {spot.name} - {spot.category.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
