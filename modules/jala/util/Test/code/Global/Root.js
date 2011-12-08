//
// Jala Project [http://opensvn.csie.org/traccgi/jala]
//
// Copyright 2004 ORF Online und Teletext GmbH
//
// Licensed under the Apache License, Version 2.0 (the ``License'');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an ``AS IS'' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// $Revision: 200 $
// $LastChangedBy: robert $
// $LastChangedDate: 2007-04-27 10:16:32 +0200 (Fre, 27. Apr 2007) $
// $HeadURL: http://dev.orf.at/source/jala/tags/release-1.3/util/Test/code/Global/Root.js $
//


/**
 * Module dependencies
 */
app.addRepository("modules/core/HopObject.js");
app.addRepository("modules/core/Array.js");
app.addRepository("modules/helma/File.js");

/**
 * Test runner
 */
Root.prototype.jala_test_action = function() {
   res.handlers.test = new jala.Test();
   if (req.isGet() && req.data.test) {
      res.handlers.test.execute(req.data.test);
   } else if (req.isPost() && (req.data.test_array || req.data.test)) {
      res.handlers.test.execute(req.data.test_array || req.data.test);
   }
   renderSkin("jala.Test");
   return;
};

/**
 * External stylesheet for test runner
 */
Root.prototype.jala_test_css_action = function() {
   res.contentType = "text/css";
   renderSkin("jala.Test#stylesheet");
   return;
};
