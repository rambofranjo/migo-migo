/*
 * Helma License Notice
 *
 * The contents of this file are subject to the Helma License
 * Version 2.0 (the "License"). You may not use this file except in
 * compliance with the License. A copy of the License is available at
 * http://adele.helma.org/download/helma/license.txt
 *
 * Copyright 1998-2005 Helma Software. All Rights Reserved.
 *
 * $RCSfile: Global.js,v $
 * $Author: zumbrunn $
 * $Revision: 9437 $
 * $Date: 2008-12-16 14:23:33 +0100 (Die, 16. Dez 2008) $
 */

/**
 * @fileoverview Adds useful global macros.
 * <br /><br />
 * To use this optional module, its repository needs to be added to the 
 * application, for example by calling app.addRepository('modules/core/Global.js')
 */

app.addRepository("modules/core/String.js");


/**
 * write out a property contained in app.properties
 * @param Object containing the name of the property
 */
function property_macro(param, name) {
    res.write(getProperty(name || param.name) || String.NULL);
    return;
}


/**
 * wrapper to output a string from within a skin
 * just to be able to use different encodings
 * @param Object containing the string as text property
 */
function write_macro(param, text) {
    res.write(param.text || text || String.NULL);
    return;
}


/**
 * renders the current datetime
 * @param Object containing a formatting string as format property
 */
function now_macro(param) {
    var d = new Date();
    if (param.format) {
        try {
            res.write(d.format(param.format));
        } catch (e) {
            res.write('<span title="' + e + '">[Invalid date format]</span>');
        }
    } else if (param.as == "timestamp") {
        res.write(d.getTime());
    } else {
        res.write(d);
    }
    return;
}


/**
 * renders a global skin
 */
var skin_macro = function(param, name) {
    var skinName = name || param.name;
    if (skinName) {
        renderSkin(skinName, param);
    }
    return;
}

