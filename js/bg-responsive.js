/**
 *
 * Get Bootstrap Breakpoint
 *
 * By Robert Nurijanyan
 * http://www.webatvantage.be/nl/home
 *
 * Copyright (C) 2015 Webatvantage
 * Based on https://gist.github.com/cferdinandi/ece94569aefcffa5f7fa
 *
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.ResponsiveBackgrounds = factory(root);
    }
})(this, function(root) {

    'use strict';

    //
    // Variables
    //

    var ResponsiveBackgrounds = {}; // Object for public APIs
    var supports = !!document.querySelector && !!root.addEventListener; // Feature test
    var settings; // Plugin settings

    // Default settings
    var defaults = {
        envs: ['xs', 'sm', 'md', 'lg'],
        selector: '.bg-responsive',
        interval: 300
    };


    //
    // Methods
    //

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    var forEach = function(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };

    /**
     * Merge defaults with user options
     * @private
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
     */
    var extend = function(defaults, options) {
        var extended = {};
        forEach(defaults, function(value, prop) {
            extended[prop] = defaults[prop];
        });
        forEach(options, function(value, prop) {
            extended[prop] = options[prop];
        });
        return extended;
    };

    // A (possibly faster) way to get the current timestamp as an integer.
    var now = Date.now || function() {
        return new Date().getTime();
    };

    /**
     * Returns a function, that, as long as it continues to be invoked, will not be triggered
     * @private
     * @param {Function} The function that will be called after it stops being called for N milliseconds
     * @param {Number} Interval in milliseconds
     * @param {Boolean} trigger the function on the leading edge, instead of the trailing
     * @returns {Function}
     * @usage - http://underscorejs.org/#debounce
     */
    var debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    /**
     * Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.
     * @private
     * @param {Function} The function to be called
     * @returns {Function}
     * @usage - http://underscorejs.org/#once
     */
    var once = function(func) {
        var ran = false,
            memo;
        return function() {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };

    /**
     * Return the current breakpoint
     * @private
     * @returns {String}
     */
    var determineBreakpoint = function() {
        // Define local variables
        var doc = window.document,
            temp = doc.createElement("div"),
            env;

        // Append test node
        doc.body.appendChild(temp);

        // Loop through breakpoints
        for (var i = defaults.envs.length - 1; i >= 0; i--) {
            env = defaults.envs[i];

            // Add classes
            temp.className = "hidden-" + env;

            // Found breakpoint
            if (temp.offsetParent === null) {

                // Remove our test node
                doc.body.removeChild(temp);

                // Return current breakpoint
                return env;
            }
        }
        // Breakpoint not found
        return 'Unknown breakpoint';
    };

    //
    // Public APIs
    //

    /**
     * Sets background image based on breakpoint
     * @public
     */
    ResponsiveBackgrounds.init = function(options) {

        defaults = extend(defaults, options || {}); // Merge user options with defaults

        var backgrounds = document.querySelectorAll(defaults.selector),
            el, elData, currentBreakpoint = determineBreakpoint();

        for (var i = 0, len = backgrounds.length; i < len; i++) {

            el = backgrounds[i];
            elData = el.getAttribute('data-' + currentBreakpoint);

            if (elData !== null) {
                el.style.backgroundImage = "url(" + elData + ")";
            } else {
                if (typeof console == "object") {
                    console.warn('Data attribute: data-' + currentBreakpoint + ' not found on element:\n\n' + el.outerHTML + '\n\n\n');
                }
            }
        }

    };

    /**
     * Return current breakpoint
     * @public
     */
    ResponsiveBackgrounds.currentBreakpoint = function(options) {
        defaults = extend(defaults, options || {}); // Merge user options with defaults
        return determineBreakpoint();
    };

    /**
     * Sets the breakpoint on resize
     * @public
     */
    ResponsiveBackgrounds.update = function(options) {
        defaults = extend(defaults, options || {}); // Merge user options with defaults
        once(window.addEventListener('resize', debounce(function() {
            ResponsiveBackgrounds.init();
        }), defaults.interval, false));
    };

    return ResponsiveBackgrounds;

});

/**
 * TODO
 * If an image of a larger breakpoint has already been loaded, don't send a request for a smaller one
 */