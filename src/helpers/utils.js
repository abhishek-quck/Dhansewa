import $ from 'jquery'
import toast from 'react-hot-toast';
export const validate = (fields,rules=[]) => {
    let result={}
    let shouldGo=true
    for(let f in fields)
    {
        let errorMsg = '';
        let invalid = false;
        let tInput = $(`input[name=${f}]`) || $(`select[name=${f}]`) || $(`textarea[name=${f}]`) || $(`.${f}`)
        if(fields[f]==null || fields[f].length===0)
        {
            result[f]=`Required!`;
            shouldGo=false;
            invalid = true;
        } else {
            invalid = false;
        }
        let minLength = $(tInput).attr('min')
        let type = $(tInput).attr('cast')
        if(minLength)
        {
            if($(tInput).val().length < parseInt(minLength))
            { 
                invalid = true;
                result[f]= f[0].toUpperCase()+ f.slice(1)+` should be of at least ${minLength} characters!`;
            }
        }
        if(type)
        { 
            if(tInput.val() && type === 'num')
            {
                if(isNaN(parseInt($(tInput).val()))) {
                    errorMsg= f[0].toUpperCase()+ f.slice(1)+` should be in numbers!`;
                    invalid = true;
                    result[f]= errorMsg; 
                    toast.error(errorMsg)
                }
            }
        }
        if(invalid){
            $(tInput).addClass('placeholder-error').attr('placeholder',result[f]).css('border','1px solid red');
        } else {
            $(tInput).removeClass('placeholder-error').attr('placeholder',result[f]).css('border','');
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