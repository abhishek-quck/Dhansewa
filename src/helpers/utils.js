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