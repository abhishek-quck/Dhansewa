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
	search:''
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
            localStorage.removeItem('auth-token')
            localStorage.removeItem('companyID')
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
                   localStorage.setItem(`companyID`, resp.data['companyID'])
                   localStorage.setItem(`companyName`, resp.data['companyName'])
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
        default : return state
    }
}
export {authReducer, getUserDetails}