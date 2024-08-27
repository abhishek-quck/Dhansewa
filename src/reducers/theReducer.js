import axios from "axios" 
let userToken = localStorage.getItem('auth-token') ?? null
const menus = JSON.parse(localStorage.getItem('menus'))??[];
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))??false;
const permMap = JSON.parse(localStorage.getItem('permMap'))??{}
const myInfo = JSON.parse(localStorage.getItem('auth-user'))??{}
async function getUserDetails ()
{
  try
  {
    return axios.get('user').then(resp=>resp.data)  
  }catch(er)
  {
    console.log(er.message)
    return {}
  }
}

const initialState = {
    loading:false,
    myInfo,
	theme:localStorage.getItem('theme')??'Light',
    userToken,
    error: null,
    success: false, 
    companyID: localStorage.getItem('companyID'),  
    companyName: localStorage.getItem('companyName'),  
	search:'',
    enrollTerm:null,
    enrollBranch:'',
    GRTs:{},
    menus,
    isAdmin,
    permMap
}

const authReducer = (state=initialState,action) => {
    switch(action.type){
       
        case 'SET_TOKEN':  
            return {
                ...state,
                loading:false,
                userToken:action.payload
            }
        case 'SET_AUTH':
            return {
                ...state,
                loading:false,
                myInfo:action.payload
            }
        case 'LOGOUT':
            axios.post('/logout').then(({data})=>{
                console.log(data)
                if(data)
                {
                    localStorage.removeItem('auth-token')
                    localStorage.removeItem('companyID')
                }
            })
            return {
                ...state,
                myInfo:null,
                userToken:null,
                loading:false,
                companyID:null
            }
            
        case 'LOADING': 
            return {
                ...state,
                loading:true
            } 
        case 'SET_COMPANY': 
            axios.post('/set-company',{id:action.payload.id, name:action.payload.name}).then(resp=>{
                if(resp.status===200)
                {  
                   localStorage.setItem(`companyID`, action.payload.id)
                   localStorage.setItem(`companyName`, action.payload.name)
                }
            })
            return {
                ...state,
                companyID:action.payload.id,
                companyName:action.payload.name
            }

        case 'STOP_LOADING':  
            return {
                ...state,
                loading:false
            } 
		case 'THEME' :
            localStorage.setItem('theme', action.payload)
			return {
				...state,
				theme: action.payload
			}
		case 'SEARCH':
			return {
				...state,
				search:action.payload
			}
            
		case 'SEARCH_ENROLLED':
			return {
				...state,
				enrollTerm:action.payload.term,
				enrollBranch:action.payload.branch
			}
        
		case 'PUT_GRTs':
			return {
				...state,
				GRTs:action.payload
			}
        case 'ERROR':{
            return {
                ...state,
                error:action.payload.error
            }
        }
        case 'UPDATE_GRT':
			return {
				...state, 
                GRTs:{
                    ...state.GRTs,
                    [action.payload.id]:action.payload
                }
			}
        case 'SET_DASHBOARD_MENU':
			return {
				...state, 
                menus:action.payload
			}
        case 'SET_ADMIN_STATUS':
            return {
                ...state,
                isAdmin:action.payload
            }
        case 'PERM_MAP':
            return {
                ...state,
                permMap:action.payload
            }
        default : return state
    }
}
export {authReducer, getUserDetails}