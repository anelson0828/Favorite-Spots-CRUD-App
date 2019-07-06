import React from 'react';

export default function Stats(props) {
  return (
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total Completed</p>
          <p className="title" id="total-minutes">
            {props.totalCompleted}
          </p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total Remaining</p>
          <p className="title">{props.totalRemaining}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Percent Complete</p>
          <p className="title" id="percentage-completed">
            {props.percentCompleted}
          </p>
        </div>
      </div>
    </nav>
  );
}
