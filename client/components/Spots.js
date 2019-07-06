import React from 'react';
import AddSpot from './AddSpot';

export default function Spots(props) {
  return (
    <div className="container">
      <div id="items">
        <h3>Spots</h3>

        {props.spots.map(spot => {
          return (
            <div
              key={spot.id}
              // onClick={() => {
              //   props.getSpot(spot.id);
              // }}
            >
              <input
                type="checkbox"
                id={spot.id}
                name="spot"
                onClick={() => {
                  props.completeSpot(spot);
                }}
              />
              <label>{spot.name}</label>
              {/* - {(spot.category.name = null)} */}
            </div>
          );
        })}

        <AddSpot spots={props.spots} addSpot={props.addSpot} />
      </div>
    </div>
  );
}
