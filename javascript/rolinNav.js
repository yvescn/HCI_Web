
window.onload = function () { rolinNav("navigation"); }
function rolinNav(elemId) {
        var navRoot = document.getElementById(elemId)
        var children = getChildrenByTagName(navRoot, "li");
        navRoot.openNav = null;
        for (var i = 0; i < children.length; i++)
                rolinSubNav(children[i]);
}

function rolinSubNav(nav) {
        nav.subNav = getChildrenByTagName(nav, "ul")[0];

        nav.subNav.rate     = 5;
        nav.subNav.minDiff  = 5;
        nav.subNav.toOpen   = false;
        nav.subNav.baseH    = nav.subNav.offsetHeight;
        nav.subNav.interval = 0;
        nav.subNav.style.overflow = "hidden";
        nav.subNav.style.height   = "0px";
        nav.subNav.style.display  = "block";
        
        nav.subNav.toHidden = function() {
                clearInterval(this.interval);
                rolinElem(-1, this);
        }       
        nav.subNav.toShow = function() {
                var openNav= this.parentNode.parentNode.openNav;
                if (openNav!= null && openNav != this)
                        openNav.toHidden();
                clearInterval(this.interval);
                rolinElem(1, this);
        }
        
        nav.onmouseover = function() { this.subNav.toShow(); }
        nav.onmouseout  = function() { this.subNav.toHidden(); }
        
}

function rolinElem(dir, obj){
        if (dir == 1){
                obj.toOpen= true;
                obj.parentNode.parentNode.openNav = obj;
        }
        else{
                obj.toOpen= false;
                obj.parentNode.parentNode.openNav = null;
        }
        var finalH = (dir == 1)? obj.baseH : 0;
        obj.interval = setInterval(rolinV, 10);
        function rolinV(){
                var height = Number(obj.style.height.replace("px", ""));
                var delt = (finalH - height > 0)? 1  : -1; 
				delt *= obj.rate;
                
                obj.style.height = height + delt + "px";
                if (Math.abs(finalH - height) < obj.minDiff){
                        obj.style.height = finalH + "px"
                        clearInterval(obj.interval);
                }
        }
}

function getChildrenByTagName(parent, tag){
        var allChildren = parent.childNodes;
        var childrenWithTagName = new Array();
        var tagName = tag.toLowerCase();
        for (var i = 0; i < allChildren.length ; ++i){
                var iTagName = allChildren[i].nodeName.toLowerCase();
                if (iTagName == tagName)
                        childrenWithTagName.push(allChildren[i]);
        }
        return childrenWithTagName;
}
String.prototype.pxToNum = function() {return Number(this.replace("px",""))}