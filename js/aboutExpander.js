var $ = function(id){return document.getElementById(id);}
function toggle() {
   var h2 = this;
   if(h2.getAttribute("class") == "plus") {
      h2.setAttribute("class", "minus"); }
   else {h2.setAttribute("class", "plus");}
   if(h2.nextElementSibling.getAttribute("class")=="closed"){
      h2.nextElementSibling.setAttribute("class", "open");}
    else{h2.nextElementSibling.setAttribute("class", "closed");}
    }
window.onload = function() {
   var h2Elements =$("faqs").getElementsByTagName("h2");
   for(i=0; i<h2Elements.length;i++) {
       h2Elements[i].onclick = toggle;
   }
}
