import ACTION_TYPES from './actions/actionTypes'; 

const initialState = {
    user: null,
    tasks: [],
    isFetching: false,
    error: null
}

const reducer = (state = initialState, action) => {
  console.log(action);
    switch(action.type) {
      case ACTION_TYPES.LOGIN_USER_ERROR:
        case ACTION_TYPES.REGISTER_USER_ERROR:
          case ACTION_TYPES.GET_TASKS_ERROR:
            case ACTION_TYPES.CREATE_TASK_ERROR:
              case ACTION_TYPES.AUTH_USER_ERROR:
                case ACTION_TYPES.DELETE_TASK_ERROR: {
                  const {error} = action;
                  return {
                    ...state,
                    error
                  }
              }

      case ACTION_TYPES.LOGIN_USER_SUCCESS:
        case ACTION_TYPES.AUTH_USER_SUCCESS:
          case ACTION_TYPES.REGISTER_USER_SUCCESS: {
            const {data} = action; // DATA NEED ATTENTION
                  return {
                    ...state,
                    user: data,
                    error: null
                  }
        }

      case ACTION_TYPES.GET_TASKS_SUCCESS: {
        const {data} = action; // DATA NEED ATTENTION
                return {
                  ...state,
                  tasks: data,
                  error: null
                }
      }

      case ACTION_TYPES.CREATE_TASK_SUCCESS: {
        const {data: newTask} = action;
        return {
          ...state,
          tasks: [...state.tasks, newTask],
          error: null
        }
      }

      case ACTION_TYPES.DELETE_TASK_SUCCESS: {
        const {data: deletedTask} = action;
        const tasks = state.tasks.filter(td => td._id !== deletedTask._id);
        return {
          ...state,
          tasks,
          error: null
        }
      }

      case ACTION_TYPES.LOG_OUT_REQUEST: {
        return {
          ...initialState
        }
      }

      default: {
        return state;
      }
    }
  }

  export default reducer;