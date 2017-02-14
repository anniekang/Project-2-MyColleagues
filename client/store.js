const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

const currentView = (state = [], action) => {
  switch(action.type) {
    case 'RENDER_RESULTS':
      return 'org-search-employee';
    case 'EMPLOYEE_SAVED':
    case 'ID_FOUND':
    case 'EDIT_SAVED':
      return 'profile';
    case 'EDIT_FORM':
    case 'EMPLOYEE_DELETED':
      return 'edit-profile';
    case 'RENDER_PEERS':
      return 'org-chart';
    default:
      return state;
  }
};

const searchResults = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_SUBMITTED':
      return Object.assign({}, state, {
        searchSubmitted: true,
        search: action.search
      });
    case 'RENDER_RESULTS':
      return Object.assign({}, state, {
        results: action.results,
        employeeType: 'search-result',
        searchSubmitted: false
      });
    default:
      return state;
  }
};

const currentUser = (state = {}, action) => {
  switch(action.type) {
    case 'IT':
      return Object.assign({}, state, {
        IT: true
      });
    default:
      return state;
  }
}

const viewEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'ID_SEARCH':
      return Object.assign({}, state, {
        idSubmitted: true,
        employeeId: action.employeeId
      });
    case 'ID_NOT_FOUND':
    case 'EMPLOYEE_SAVED':
      return Object.assign({}, state, {
        idSubmitted: false
      });
    case 'ID_FOUND':
    case 'EDIT_SAVED':
      return Object.assign({}, state, {
        idSubmitted: false,
        employee: action.response
      });
    default:
      return state;
  }
};

const newEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'EMPLOYEE_SUBMITTED':
      return Object.assign({}, state, {
        employeeSubmitted: true
      });
    case 'EMPLOYEE_SAVED':
    case 'EMPLOYEE_FAILURE':
      return Object.assign({}, state, {
        employeeSubmitted: false
      });
    default:
      return state;
  }
};


const editEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_REQUEST':
      return Object.assign({}, state, {
        editRequest: true
      });
    case 'EDIT_FORM':
      return Object.assign({}, state, {
        employee: action.response,
        editReady: true,
        editRequest: false
      });
    case 'EDIT_SUBMITTED':
      return Object.assign({}, state, {
        editSubmitted: true
      });
    case 'EDIT_SAVED':
      return Object.assign({}, state, {
        editReady: false,
        editSubmitted: false,
        employee: {}
      });
    default:
      return state;
  }
};


const deleteEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_EMPLOYEE':
      return Object.assign({}, state, {
        deleteSubmitted: true
      });
    case 'DELETE_CONFIRMED':
      return Object.assign({}, state, {
        deleteConfirmed: true
      });
    case 'DELETE_ERROR':
    case 'EMPLOYEE_DELETED':
      return Object.assign({}, state, {
        deleteSubmitted: false,
        deleteConfirmed: false
      });
    default:
      return state;
  }
};

const viewOrg = (state = [], action) => {
  switch (action.type) {
    case 'ORG_SUBMITTED':
      return Object.assign({}, state, {
        orgSubmitted: true
      });
    case 'ORG_DATA_RECEIVED':
      return Object.assign({}, state, {
        orgSubmitted: false
      });
    case 'RENDER_MANAGER':
      return Object.assign({}, state, {
        employeeType: 'org-manager',
        manager: action.response
      });
    case 'RENDER_EMPLOYEE':
      return Object.assign({}, state, {
        employee: action.response
      });
    case 'RENDER_PEERS':
      return Object.assign({}, state, {
        peers: action.response
      });
    case 'RENDER_REPORTS':
      return Object.assign({}, state, {
        reports: action.response
      });
    default:
      return state;
  }
}

const initialState = {
  currentView: 'edit-profile',
  searchResults: {
    searchSubmitted: false,
    search: '',
    employeeType: '',
    results: []
  },
  viewEmployee: {
    idSubmitted: false,
    employeeId: '',
    employee: {}
  },
  newEmployee: {
    employeeSubmitted: false
  },
  editEmployee: {
    editRequest: false,
    editReady: false,
    editSubmitted: false,
    employee: {}
  },
  deleteEmployee: {
    deleteSubmitted: false,
    deleteConfirmed: false
  },
  viewOrg: {
    orgSubmitted: false,
    employeeType: '',
    manager: {},
    employee: [],
    peers: [],
    reports: []
  }
};

const reducer = combineReducers({ currentView, searchResults, currentUser, viewEmployee, newEmployee, editEmployee, deleteEmployee, viewOrg });
const store = createStore(reducer, initialState, applyMiddleware(thunk));

module.exports = store;
