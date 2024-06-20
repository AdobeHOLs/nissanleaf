/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadBlocks,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadForm(formpath) {
  if (formpath) {
     var options = {path:formpath, dataRef:"", themepath:"", CSS_Selector:".customafsection"};
     alert(options.path);
     var loadAdaptiveForm = function(options){
     //alert(options.path);
        if(options.path) {
            // options.path refers to the path of the adaptive form
            // For Example: /content/forms/af/ABC, where ABC is the adaptive form
            // Note: If AEM server is running on a context path, the adaptive form URL must contain the context path
            var path = options.path;
           // path += "/jcr:content/guideContainer.html";
           
           
           /* $.ajax({
                url  : path ,
                type : "GET",
                data : {
                    // Set the wcmmode to be disabled
                    wcmmode : "disabled"
                    // Set the data reference, if any
                   // "dataRef": options.dataRef
                    // Specify a different theme for the form object
                  //  "themeOverride" : options.themepath
                },
                async: false,
                success: function (data) {
                    // If jquery is loaded, set the inner html of the container
                    // If jquery is not loaded, use APIs provided by document to set the inner HTML but these APIs would not evaluate the script tag in HTML as per the HTML5 spec
                    // For example: document.getElementById().innerHTML
                    if(window.$ && options.CSS_Selector){
                        // HTML API of jquery extracts the tags, updates the DOM, and evaluates the code embedded in the script tag.
                        $(options.CSS_Selector).html(data);
                    }
                },
                error: function (data) {
                    // any error handler
                }
            });
*/



            fetch(path, { method: "GET" })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
         // alert(data);
          document.querySelector(options.CSS_Selector).innerHTML = data;
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Handle error
        });




        } else {
            if (typeof(console) !== "undefined") {
                console.log("Path of Adaptive Form not specified to loadAdaptiveForm");
            }
        }
     }(options);
    
  }
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  
  const formdiv = document.createElement('div');
  formdiv.classList.add('customafsection');
  block.append(formdiv);
  
  const form = await loadForm(path);



  /*
  if (form) {
    const formSection = fragment.querySelector(':scope .section');
    if (formSection) {
      block.closest('.section').classList.add(...fragmentSection.classList);
      block.closest('.fragment').replaceWith(...fragment.childNodes);
    }
  }
  */
}
