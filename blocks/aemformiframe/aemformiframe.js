
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
export async function loadForm(formdiv, formpath) {
  if (formpath) {
    
    //Embed iframe approach
    
        formdiv.id = "iframe-container";

        // Create the iframe element
        const iframe = document.createElement("iframe");
        iframe.src = formpath;
        iframe.width = "100%";
        iframe.height = "100vh";
        iframe.style.border = "0"; // No border

        // Append the iframe to the container
        formdiv.appendChild(iframe);

        // Append the container to the body of the document
        //document.body.appendChild(container);


/*    
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
     
    */
  }
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  
  const formdiv = document.createElement('div');
  formdiv.classList.add('customafsection');
  block.append(formdiv);
  
  const form = await loadForm(formdiv,path);



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
