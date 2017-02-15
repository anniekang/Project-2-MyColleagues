const React = require('react');
const { connect } = require('react-redux');
const { saveEmployee, saveUpdate } = require('./actions');

const EditEmployee = ( { newEmployee, editEmployee, handleSubmitNew, handleSubmitEdit } ) => {
  let handle = '';
  if (newEmployee.newProfile){
    handle = handleSubmitNew
  }
  else if (editEmployee.editReady) {
    handle = handleSubmitEdit
  }

  return (
    <div id="edit-profile" className="ui grid container">
      { newEmployee.fixMissing
        ? <ul>
          { newEmployee.missingFields.map((key, i) => {
          return <li key={ i } className="missing-field">'{ key }' field required.</li>
          })}
          </ul>
        : null
      }
      <form id="employee" className="ui ten wide centered column fluid form" onSubmit={ handle }>
        <div className="field">
          <label>Employee Profile</label>
        </div>
        <div className="required field">
          <label>ID</label>
          <input id="employee-id" type="text" name="id" defaultValue={ editEmployee.employee.id } placeholder="ID"/>
        </div>
        <div className="required field">
          <label>First Name</label>
          <input id="employee-first" type="text" name="first-name" defaultValue={ editEmployee.employee.first_name } placeholder="First Name"/>
        </div>
        <div className="required field">
          <label>Last Name</label>
          <input id="employee-last" type="text" name="last-name" defaultValue={ editEmployee.employee.last_name } placeholder="Last Name"/>
        </div>
        <div className="field">
          <label>Photo</label>
          <input id="employee-photo" type="text" name="photo" defaultValue={ editEmployee.employee.photo } placeholder="Photo URL"/>
        </div>
        <div className="required field">
          <label>Job Title</label>
          <input id="employee-title" type="text" name="job-title" defaultValue={ editEmployee.employee.job_title } placeholder="Job Title"/>
        </div>
        <div id="description" className="field">
          <label>Job Description</label>
          <textarea id="employee-description" rows="2" name="job-description" defaultValue={ editEmployee.employee.job_description } placeholder="Job Description"></textarea>
        </div>
        <div className="required field">
          <label>Email</label>
          <input id="employee-email" type="text" name="email" defaultValue={ editEmployee.employee.email } placeholder="Email Address"/>
        </div>
        <div className="required field">
          <label>Manager ID</label>
          <input id="employee-manager" type="text" name="manager-id" defaultValue={ editEmployee.employee.manager_id } placeholder="Manager ID"/>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui one column centered grid">
          <button className="ui button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

const mapStatetoProps = ({ newEmployee, editEmployee }) => ({ newEmployee, editEmployee })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmitNew: event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id').trim().toUpperCase(),
        first: employeeData.get('first-name').trim().toUpperCase(),
        last: employeeData.get('last-name').trim().toUpperCase(),
        photo: employeeData.get('photo').trim(),
        title: employeeData.get('job-title').trim().toUpperCase(),
        description: employeeData.get('job-description').trim(),
        email: employeeData.get('email').trim().toUpperCase(),
        managerId: employeeData.get('manager-id').trim().toUpperCase(),
      };

      dispatch(saveEmployee(employee));
    },
    handleSubmitEdit: event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id').trim().toUpperCase(),
        first: employeeData.get('first-name').trim().toUpperCase(),
        last: employeeData.get('last-name').trim().toUpperCase(),
        photo: employeeData.get('photo').trim(),
        title: employeeData.get('job-title').trim().toUpperCase(),
        description: employeeData.get('job-description').trim(),
        email: employeeData.get('email').trim().toUpperCase(),
        managerId: employeeData.get('manager-id').trim().toUpperCase(),
      };

      dispatch(saveUpdate(employee));
    }
  }
};

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(EditEmployee);