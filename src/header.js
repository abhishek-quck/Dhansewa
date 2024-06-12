export function headers (){
    return { 
        "Accept": "application/json",
        "Content-Type": "application/json", 
        "Authorization":"Bearer "+ localStorage.getItem('auth-token')
    }
}
