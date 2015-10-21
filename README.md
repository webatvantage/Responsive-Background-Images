# Responsive Background Images
_Lightweight (only 2kb minified) vanilla JS plugin for loading dynamic background images. Useful for cases when the background source is set dynamically by back-end integration (e.g. CMS, Ajax calls, ...). Works out of the box with Bootstrap 3.x+._

##Demo

_Coming soon_

##Usage



Add the CSS somewhere in the head

_The CSS is not required if you're using Bootstrap 3.x+_
```css
<link rel="stylesheet" href="css/main.css">

```



Add the element with dynamic background images

_**The class and data attributes are required**_
```html
<!-- 
  The inline style element is not required but recommended as fallback
  This (usually) should be the image with the lowest filesize
-->
<div 
  class="bg-responsive" 
  style="background-image:url(img/xs.jpg);" 
  data-xs="img/xs.jpg" 
  data-sm="img/sm.jpg" 
  data-md="img/md.jpg" 
  data-lg="img/lg.jpg">
</div>

```



Add the JS at the end of the body
The script initializes automatically on load and adds a resize handler that sets the corresponding src on breakpoint change
```javascript
<script src="js/bg-responsive.js"></script>
```


##Options


```
envs: ['xs', 'sm', 'md', 'lg'],
selector: '.bg-responsive',
interval: 250
```

_**Note: when changing the default environments, you'll also need to change the name of your data attributes accordingly**_

_Example_
```
ResponsiveBackgrounds.init({
  envs: ['xs', 'xl']
});
```
Then the data attributes should be as following
```
<div class="bg-responsive" style="background-image:url(img/xs.jpg);" data-xs="img/xs.jpg" data-xl="img/xl.jpg"></div>
```

## Methods

```javascript
/*
* Manually initialize Responsive Background Images
* (!Note the script intializes automatically when loaded, use this when you need manual initialization)
*/
ResponsiveBackgrounds.init();

/*
* Manually add a resize handler that sets the corresponding src on breakpoint change
* (!This is executed on intialization, use this only when you need manual initialization)
*/
ResponsiveBackgrounds.addResizeEvent();

// Remove existing resize handler
ResponsiveBackgrounds.removeResizeEvent();

// Get current breakpoint
console.log(ResponsiveBackgrounds.currentBreakpoint());

// Watch for breakpoint changes / Return current env on resize
window.addEventListener('resize', function(){ console.log(ResponsiveBackgrounds.currentBreakpoint()); }, false);
```



