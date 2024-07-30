import $ from 'jquery'
export const validate = (fields,exceptions=[]) => {
    let result={}
    var shouldGo=true;
    if(exceptions.length)
    {
        exceptions.forEach( item => {
            delete fields[item]
        })
    }
    Object.keys(fields).forEach(f =>
    {
        let errorMsg = '';
        let invalid = false;
        let tInputs = [$(`input[name=${f}]`), $(`select[name=${f}]`), $(`textarea[name=${f}]`), $(`.${f}`)]
        if(fields[f]==null || fields[f].length===0)
        {
            result[f]=`Required!`;
            shouldGo=false;
            invalid = true;
        }
        tInputs.forEach( input => {

            let minLength = $(input).attr('min');
            let maxLength = $(input).attr('max');
            let type = $(input).attr('cast');
            if(minLength || maxLength)
            {
                if($(input).val().length < parseInt(minLength))
                { 
                    invalid = true;
                    result[f] = f[0].toUpperCase()+ f.slice(1)+` should be of at least ${minLength} characters!`;
                }
                if($(input).val().length > parseInt(maxLength))
                { 
                    invalid = true;
                    result[f] = f[0].toUpperCase()+ f.slice(1)+` should be equal to ${maxLength} characters!`;
                     
                }
            }
            if(type)
            { 
                if(input.val() && type === 'num')
                {
                    if(isNaN(parseInt($(input).val()))) {
                        errorMsg= f[0].toUpperCase()+ f.slice(1)+` should be in numbers!`;
                        invalid = true;
                        result[f]= errorMsg; 
                    }
                }
            }
            if(invalid || errorMsg)
            {
                $(input).parents('.col-md-12')
                .append('<small class="text-danger offset-4">'+errorMsg+'</small>')
            }
            if(invalid){
                shouldGo = false;
                $(input).addClass('placeholder-error')
                .attr('placeholder',result[f]).css('border','1px solid red');
            } else {
                $(input).removeClass('placeholder-error').attr('placeholder',result[f]).css('border','');
            }
        })
    })
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