import axios from "axios" 
let userToken = localStorage.getItem('auth-token') ?? null

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
    myInfo:null,
	theme:'Light',
    userToken,
    error: null,
    success: false, 
    companyID: localStorage.getItem('companyID'),  
    companyName: localStorage.getItem('companyName'),  
	search:'',
    enrollTerm:null,
    enrollBranch:'',
    GRTs:{},
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

        case 'UPDATE_GRT':
			return {
				...state, 
                GRTs:{
                    ...state.GRTs,
                    [action.payload.id]:action.payload
                }
			}
        
        default : return state
    }
}
export {authReducer, getUserDetails}