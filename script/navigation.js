let spanElement = $('#pagination-num')
let scrollHeight = $(window).height();
window.addEventListener("scroll", function(){
  let scrollTop = $(window).scrollTop();
  for(i=0; i<4; i++){
    if(Math.round(scrollTop)>=((scrollHeight*i)-200)){
      spanElement.text(`${i+1} — 4`);
    }
 }
});
