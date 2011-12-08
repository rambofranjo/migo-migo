function href_macro(param) { 
   var action = param.action ? param.action : ""; 
   res.write(this.href(action)); 
   return; 
} 
 
function skin_macro(param) { 
   this.renderSkin(param.name); 
   return; 
}