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
 * $RCSfile: HopObject.js,v $
 * $Author: hannes $
 * $Revision: 9840 $
 * $Date: 2009-07-06 14:32:09 +0200 (Mon, 06. Jul 2009) $
 */

/**
 * @fileoverview Adds useful methods to Helma's built-in HopObject prototype.
 * <br /><br />
 * To use this optional module, its repository needs to be added to the 
 * application, for example by calling app.addRepository('modules/core/HopObject.js')
 */

app.addRepository("modules/core/Number.js");
app.addRepository("modules/core/String.js");


/**
 * Iterates over each child node of the HopObject.
 * @param {Function} callback The callback function to be
 * called for each child node. On every call the first
 * argument of this function is set to the current value
 * of the counter variable <code>i</code>.
 */
HopObject.prototype.forEach = function(callback) {
   if (!callback || callback instanceof Function == false) {
      return;
   }
   for (var i=0; i<this.size(); i+=1) {
      callback.call(this.get(i), i);
   }
   return;
};


/**
 * macro returns the id of a HopObject
 */
HopObject.prototype.id_macro = function() {
    res.write(this._id);
    return;
};


/**
 * macro returns the url for any hopobject
 */
HopObject.prototype.href_macro = function(param, action) {
    res.write(this.href(action || param.action || String.NULLSTR));
    return;
};


/**
 * macro rendering a skin or displaying
 * its source (param.as == "source")
 */
HopObject.prototype.skin_macro = function(param, name) {
    var skinName = name || param.name;
    if (skinName) {
        if (param.as == "source") {
            var str = app.skinfiles[this._prototype][skinName];
            if (str && param.unwrap == "true") {
                str = str.unwrap();
            }
        } else {
            var str = this.renderSkinAsString(skinName, param);
        }
        res.write(str);
    }
    return;
};


/**
 * this macro renders a text depending on
 * the value of a given property
 */
HopObject.prototype.switch_macro = function(param) {
    if (param.name) {
        res.write(this[param.name] ? param.on : param.off);
    }
    return;
};


/**
 * generic macro that loops over the childobjects
 * and renders a specified skin for each of them
 * @param Object providing the following properties:
 *        skin: the skin to render for each item (required)
 *        collection: the collection containing the items
 *        limit: max. number of items per page
 *              (req.data.page determines the page number)
 *        sort: property name to use for sorting
 *        order: sort order (either "asc" or "desc")
 *        itemPrefix: text to prepend to each items skin render
 *        itemSuffix: text to append to each items skin render
 */
HopObject.prototype.loop_macro = function(param, collection) {
    if (!param.skin) {
        return;
    }
    if (!collection) {
       collection = param.collection;
    }
    var items = collection ? this[collection] : this;
    if (!items || !items.size || items.size() < 1) {
        return;
    }
    // set default values
    var min = 0, max = items.size();
    var pagesize = max;
    if (param.limit) {
        var n = parseInt(param.limit, 10);
        if (!isNaN(n)) {
            pagesize = n;
        }
        var pagenr = parseInt(req.data.page, 10);
        if (isNaN(pagenr)) {
            pagenr = 0;
        }
        min = Math.min(max, pagenr * pagesize);
        max = Math.min(max, min + pagesize);
    }
    if (param.sort) {
        var allitems = items.list();
        var test = allitems[0][param.sort];
        if (test == null || isNaN(test)) {
            var Sorter = String.Sorter;
        } else {
            var Sorter = Number.Sorter;
        }
        allitems.sort(new Sorter(param.sort, Sorter[param.order.toUpperCase()]));
        var itemlist = allitems.slice(min, max);
    } else {
        var itemlist = items.list(min, max);
    }
    var skinParam = {};
    var itemPrefix = param.itemPrefix || "";
    var itemSuffix = param.itemSuffix || "";
    for (var i=0; i<itemlist.length; i+=1) {
        skinParam.index = pagenr * pagesize + i + 1;
        res.write(itemPrefix);
        itemlist[i].renderSkin(param.skin, skinParam);
        res.write(itemSuffix);
    }
    return;
};


/**
 * Render the number of child nodes of the HopObject. 
 * Three cases are distinguished which can be customized
 * by setting param.verbose to "true" and defining the
 * corresponding field of the <code>param</code>
 * argument:
 * <ol>
 * <li>param.none - not a single child node</li>
 * <li>param.one - exactly one child node</li>
 * <li>param.many - more than one child node</li>
 * </ol>
 * @param {Object} param The default macro parameter
 * @param {String} name The default name for a child node
 */
HopObject.prototype.size_macro = function(param, name) {
   var EMPTYSTR = "";
   var n = this.size();
   if (name) {
      var text;
      var plural = name.endsWith("s") ? "es" : "s";
      if (n > 0) {
         if (n > 1) {
            text = n + " " + name + plural;
         } else {
            text = (param.one !== null) ? param.one : "one " + name;
         }
      } else {
         text = (param.none !== null) ? param.none : "no " + name + plural;
      }
      res.write(text);
   } else {
      res.write(n);
   }
   return;
};
