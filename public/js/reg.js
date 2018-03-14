//表单验证对象，每个key表示文本框的id，值表示此文本框是否验证通过
let regObj = {
    phone: false,    
    psw: false,
 

}

window.onload = () => {
    initEvt();
}


//初始化事件
function initEvt() {
    phone.addEventListener('change', checkText);
    psw.addEventListener('change', checkText);  
    reg_form.onsubmit = checkForm;
}


//文本框验证
function checkText() {
    //获取当前事件源对象
    let element = event.target;
    let reg;
    let errorInfo;  //错误提示

    switch (element.id) {

        // 手机号
        case 'phone':        
            reg = /^\d{11}$/;
            errorInfo = ' × 手机号只能输入11位数字';
            if( element.nextSibling.innerHTML = ' √'){
                $.post('/redPhone', {'phone':phone.value},function(data) {  
                   if(data.length != 0){
                    regObj[element.id] = false;              
                    element.nextSibling.style.color = 'red';
                    element.nextSibling.innerHTML = '您的手机号已注册';
                   }
                  });
            }           
            break;



        // 密码
        case 'psw':
            reg = /^\w{6,16}$/;
            errorInfo = ' × 密码只能输入6位数字字母或下划线';
            break;

       
        }



    //匹配成功
    if (reg.test(element.value)) {
        regObj[element.id] = true;
        element.nextSibling.innerHTML = ' √';
        element.nextSibling.style.color = 'green';
    } else {
        regObj[element.id] = false;
        element.nextSibling.innerHTML = errorInfo;
        element.nextSibling.style.color = 'red';
    }
}


//检查表单
function checkForm() {

    //循环对象进行验证判断
    for (let key in regObj) {
        if (!regObj[key])
            return false;
    }

    return true;
}