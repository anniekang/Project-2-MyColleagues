const React = require('react');
const { connect } = require('react-redux');

const ViewEmployee = ({ viewEmployee, dispatch }) => {
  return (
    <div id='view-profile' className='ui equal width grid container'>
      <div className='ui hidden divider'></div>
      <div className='row'>
        <div className='twelve wide column'>
          <div className='row'>
            <span id='profile-first'>{ viewEmployee.first_name }</span>
            <span id='profile-last'> { viewEmployee.last_name }</span>
          </div>
          <div className='ui row grid'>
            <div className='four wide column'>
              <img id='profile-photo' className='ui small image' alt='Profile Photo' src={ viewEmployee.photo }/>
            </div>
            <div className='twelve wide column'>
              <div className='row'>ID:
                <span id='profile-id'> { viewEmployee.id }</span>
              </div>
              <div className='row'>Job Title:
                <span id='profile-title'> { viewEmployee.job_title }</span>
              </div>
              <div className='row'>Job Description:
                <span id='profile-description'> { viewEmployee.job_description }</span>
              </div>
              <div className='row'>Email:
                <span id='profile-email'> { viewEmployee.email }</span>
              </div>
              <div className='row'>Manager ID:
                <span id='profile-manager'> { viewEmployee.manager_id }</span>
              </div>
              <div className='row'>Manager Name:
                <span id='profile-manager-name'> { viewEmployee.manager_first_name } { viewEmployee.manager_last_name }</span>
              </div>
            </div>
          </div>
        </div>
        <div className='four wide column'>
          <div className='ui one column centered grid'>
            <div className='row'>
              <button id='edit-button' className='ui button' type='submit'>Edit Profile</button>
            </div>
            <div className='row'>
              <button className='ui button org-button' type='submit'>Org Chart</button>
            </div>
            <div className='row'>
              <button id='delete-button' className='ui button' type='submit'>Delete Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MapStatetoProps = ({ viewEmployee }) => ({ viewEmployee })

module.exports = connect(MapStatetoProps)(ViewEmployee)