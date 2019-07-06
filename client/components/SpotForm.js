import React from 'react';

export const SpotForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="taskName">
        Spot Name:{' '}
        {!props.taskName.length ? (
          <span className="warning">Field Required</span>
        ) : (
          <span />
        )}
      </label>
      <input
        name="taskName"
        type="text"
        value={props.taskName}
        onChange={props.handleChange}
      />
      <label htmlFor="assignee">
        Category:
        {!props.assignee.length ? (
          <span className="warning">Field Required</span>
        ) : (
          <span />
        )}
      </label>
      <input
        name="assignee"
        type="text"
        value={props.assignee}
        onChange={props.handleChange}
      />
      <button
        type="submit"
        disabled={
          !props.assignee.length || !props.taskName.length ? true : false
        }
      >
        Submit
      </button>
      {props.errorMessage ? <div className="error">Yikes!</div> : ''}
    </form>
  );
};
