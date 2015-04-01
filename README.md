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
<div class="bg-responsive" style="background-image:url(img/xs.jpg);" data-xs="img/xs.jpg" data-sm="img/sm.jpg" data-md="img/md.jpg" data-lg="img/lg.jpg"></div>

```



Add the JS at the end of the body
```javascript
<script src="js/bg-responsive.js"></script>
<script type="text/javascript">
  // Initialize Responsive Background Images
  ResponsiveBackgrounds.init();
</script>

```


##Options


```
envs: ['xs', 'sm', 'md', 'lg'],
selector: '.bg-responsive',
interval: 300
```

_**Note: when changing the default environments, you'll also need to name of your data attributes accordingly**_

_Example_
```
ResponsiveBackgrounds.init({
  envs: ['xs', 'xl']
});
```
Then my data attributes should be as following
```
<div class="bg-responsive" style="background-image:url(img/xs.jpg);" data-xs="img/xs.jpg" data-xl="img/xl.jpg"></div>
```

## Methods

```javascript
// Initialize Responsive Background Images
ResponsiveBackgrounds.init();

// Get current breakpoint
console.log(ResponsiveBackgrounds.currentBreakpoint());

// Watch for breakpoint changes / Return current env on resize
window.addEventListener('resize', function(){ console.log(ResponsiveBackgrounds.currentBreakpoint()); }, false);
```



