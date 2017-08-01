import React from 'react';
import ScaleLoader from 'halogen/ScaleLoader';
import './DashboardList.css';

const DashboardListItem = ({ name, id }) => {
  return (
    <div className="dashboard-list-item">
      { name }
    </div>
  )
}

const DashboardList = ({ items, children, isFetching }) => {
  const listItems = items.map(item => <DashboardListItem name={ item.name } id={ item.id }/>)
  return (
    <div className="dashboard-list">
      { children }
      {
        isFetching
          ?
            <ScaleLoader color="black"/>
          :
        listItems
      }
    </div>
  )
}

export default DashboardList;
