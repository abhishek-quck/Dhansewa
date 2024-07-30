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
        let shout = '';
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
            if($(input).val()?.length && (minLength || maxLength))
            {
                if($(input).val().length < parseInt(minLength))
                { 
                    invalid = true;
                    shout = `Should be of at least ${minLength} characters!`
                    result[f] = shout;
                }
                if($(input).val().length > parseInt(maxLength))
                { 
                    invalid = true;
                    shout = `Should be equal to ${maxLength} characters!`;
                    result[f] = shout;
                }
            }
            if(type)
            { 
                if(input.val() && type === 'num')
                {
                    if(parseInt($(input).val().length )!== $(input).val().length) {
                        shout= `Should be in numbers!`;
                        invalid = true;
                        result[f]= shout; 
                    }
                }
            }
            if(shout)
            {
                if($(input).parents('.col-md-12').find('small.text-danger').length)
                {
                    $(input).parents('.col-md-12').find('small.text-danger').text(shout)
                } else {
                    $(input).parents('.col-md-12')
                    .append('<small class="text-danger offset-4">'+shout+'</small>')
                }
            } else {
                $(input).parents('.col-md-12').find('small.text-danger').remove()
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