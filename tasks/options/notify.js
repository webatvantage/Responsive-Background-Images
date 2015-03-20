module.exports = {
    css: {
        options: {
            enabled: true,
            success: true, // whether successful grunt executions should be notified automatically
            duration: 3, // the duration of notification in seconds, for `notify-send only
            title: 'Task Complete', // optional
            message: 'CSS tasks successfully finished', //required
        }
    },
    scripts: {
        options: {
            enabled: true,
            max_jshint_notifications: 5, // maximum number of notifications from jshint output
            success: true, // whether successful grunt executions should be notified automatically
            duration: 3, // the duration of notification in seconds, for `notify-send only
            title: 'Task Complete', // optional
            message: 'Script tasks successfully finished', //required
        }
    },
    images: {
        options: {
            enabled: true,
            success: true, // whether successful grunt executions should be notified automatically
            duration: 3, // the duration of notification in seconds, for `notify-send only
            title: 'Task Complete', // optional
            message: 'Images successfully minified', //required
        }
    }
};
