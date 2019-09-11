(function() {
    var w = window;
    var ic = w.Intercom;
    if (typeof ic === "function") {
        ic('reattach_activator');
        ic('update', intercomSettings);
    } else {
        var d = document;
        var i = function() {
            i.c(arguments)
        };
        i.q = [];
        i.c = function(args) {
            i.q.push(args)
        };
        w.Intercom = i;
        function l() {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/kcvcau9s';
            var x = d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        }

        if (w.attachEvent) {
            w.attachEvent('onload', l);
        } else {
            w.addEventListener('load', l, false);
        }
    }
})();

var getCookie = function(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
};

var cookie = getCookie('intercom');

if (cookie) {
    var parsed = JSON.parse(decodeURIComponent(cookie));

    window.Intercom('boot', parsed.data);
}
