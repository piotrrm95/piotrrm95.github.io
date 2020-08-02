window.onload = function(){
    let wrapper = document.getElementById('wrapper');
    let clientHeight = wrapper.offsetHeight;
    onmousemove = function(e){console.log("mouse location:", clientHeight, e.clientY)};
    wrapper.style.opacity=1;
    onmouseup = function(){
        for(i=0; i<clientHeight;i++){
            
        }
    }

}