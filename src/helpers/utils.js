import $ from 'jquery'
export const validate = (fields,rules=[]) => {
    let result={}
    let shouldGo=true
    for(let field in fields)
    {
        if(fields[field]==null || fields[field].length===0)
        {
            result[field]=`Required!`
            shouldGo=false
        }
    }
    for (const el in fields) {
        if (result[el]) {
            $(`input[name=${el}], select[name=${el}], textarea[name=${el}], .${el}`).addClass('placeholder-error').attr('placeholder', result[el] ).css('border','1px solid red');
        } else {
            $(`input[name=${el}], select[name=${el}], textarea[name=${el}]`).removeClass('placeholder-error').attr('placeholder',result[el]).css('border','');
            // no border on valid inputs
        }
    }
    return {result, shouldGo};
}

export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const toBase64 = blob => {

}

export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}