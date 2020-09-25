var mdlUpdateLogs = [
    {
        v: 'beta 0.8.6',
        log: [
            '+ Added full log-printing support for library and any attached file.',
            '+ Added full log-loading support for library and any attached file.',
            ': Edited logs colors.',
            ': Edited log printing for more readability.'
        ]
    },
    {
        v: 'beta 0.9.0',
        log: [
            '!+ New log system.',
            ['->', 'Custom Log:',
                '+ Prior to any log printing you will now need to call logs.setup([optional custom color set]) to ensure a good highlighting.',
                '+ Added logs.colorSet.add ',
                '+ Added logs.load for loading an update log.',
                '+ Added logs.csl for log printing. We do not recommend its direct usage for log printing as you shoud use logs.load for this.',
                '+ Added color sets to enable color customisation.',
                '+ Color sets are able to set default colors, and sublevels forms.',
                '+ Full sublevels support.',
                ': Maintained total retrocompatibility.'
            ],
            ': Technical changes done to tiled.EditChunk.',
            '- Old update log system now obsolete and removed.',
            '- Old lod printing system now obsolete and removed.',
            '- Removed the color set add function as it had no use.'
        ]
    },
    {
        v: 'beta 0.9.2',
        log: [
            '!: Changed the system for adding new color sets:',
            ['->', 'Color sets edition:',
                '+ Put the color set add function back on as it have an use now.',
                'You now need to add a set prior to its enabling.',
                '+ Added logs.disable to disable sets.',
                '+ Added logs.enable to enable sets.',
                'logs.enable should be used as a replacement for the deprecated logs.setup.'
            ],
            ': Various bugfixes.',
            '- No support for total highlighting yet due to technical limitations.'
        ]
    },
    {
        v: 'beta 0.10.0',
        log: [
            '!+ New 2D game handler:',
            ['->', '2D Tiled Games:',
                '+ Call World to generate a full world.',
                '+ Region types supported, you can have multiple regions of the same type.',
                '+ Able to fill, edit and create chunks',
            ],
            ': Fixed a bug where generating random arrays over and over would expand them more and more.',
            ': Increased pain and entropy.'
        ]
    },
    {
        v: 'beta 0.11.0',
        log: [
            '!+ New 2D platformer game handler:',
            ['->', '2D Platformer:',
                '+ You can build squares and circles.',
                '+ You can link your display canvas to the module so it handles most of the work.',
                '+ Collison checking and solving is a thing.',
                '+ Added the player item to help diffetiate.',
                '!+ Two modes of display:',
                ['->', 'Display modes:',
                    '? Partial: Edit the items that are affected by the changes.',
                    '? Complete/Full: Display the whole map each time.',
                    'You can use full mode anyways by calling the display function.',
                    '? In full display mode the items will be displayed by their index which can be edited.'
                ],
            ],
            '+ Added max, min, and copy to array prototypes.',
            '+ Baked some more potatoes.',
            ': Fixed a bug where javascript would do a mess with this. Or this.this. I honestly don\'t know.',
        ]
    },
    {
        v: 'beta 0.11.3',
        log: [
            '!+ New sentence analysis system:',
            '? You can learn about persona, item (though not working yet), type and action.',
            ': Yes.'
        ]
    },
];
var logs = {
    colorSet: {
        list: [],
        add: function (name, set) {
            logs.colorSet[name] = set;
        },
        current: {},
        default: {
            start: [["", "color:grey", "   ->  "], ["+", "color:#4CAF50"], ["?", "color:#D81B60"], ["!+", "color:#4CAF50; font-weight:bold; font-size:13px;"], [":", "color:#FF9822"], ["!:", "color:#FF9822; font-weight:bold; font-size:13px;"], ["-", "color:#B71C1C"], [";", "color:#9C27B0"]],
            in: [["[", "color:#FF9822", "]"], ["<", "color:#9C27B0", ">"], ['"', "color:grey", '"']],
            arr: [["", "color:black", "   ->  "], ["->"]]
        }
    },
    disable: function (name) {
        var a = logs.colorSet.list.indexOf(name);
        if (a != -1) {
            logs.colorSet.list.splice(a);
        }
        logs.colorSet.current = {};
        for (let i = 0; i < logs.colorSet.list.length; i++) {
            logs.colorSet.current = { ...logs.colorSet.current, ...logs.colorSet[logs.colorSet.list[i]] };
        }
        return a
    },
    enable: function (name = 'default') {
        logs.colorSet.list.push(name);
        logs.colorSet.current = { ...logs.colorSet.current, ...logs.colorSet[name] };
        return logs.colorSet.list.length - 1
    },
    setup: function (colorSet = logs.colorSet.default) {
        //deprecated. use logs.enable instead. 
        logs.colorSet.current = { ...logs.colorSet.current, ...logs.colorSet.default, ...colorSet };
    },
    csl: function (arr, type = 'List', open = false, color = 'default') {
        if (open) console.group(type);
        else console.groupCollapsed(type);
        for (let i = 0; i < arr.length; i++) {
            if (typeof (arr[i]) != "object") {
                /*for (let j = 0; j < logs.colorSet.current.in.length; j++) {
                    if (arr[i].indexOf(logs.colorSet.current.in[j][0])) {

                    }
                }*/
                for (let j = logs.colorSet.current.start.length - 1; j >= 0; j--) {
                    if (logs.colorSet.current.start[j][0] == "") {
                        if (logs.colorSet.current.start[j][2]) console.log('%c' + logs.colorSet.current.start[j][2] + arr[i], (color == 'default' ? logs.colorSet.current.start[j][1] : color));
                        else console.log('%c' + arr[i], (color == 'default' ? logs.colorSet.current.start[j][1] : color));
                        j = -1;
                    }
                    else if (arr[i].substring(0, logs.colorSet.current.start[j][0].length) == logs.colorSet.current.start[j][0]) {
                        if (logs.colorSet.current.start[j][2]) console.log('%c' + logs.colorSet.current.start[j][2] + arr[i], (color == 'default' ? logs.colorSet.current.start[j][1] : color));
                        else console.log('%c' + arr[i], (color == 'default' ? logs.colorSet.current.start[j][1] : color));
                        j = -1;
                    }
                }
            } else {
                for (let j = logs.colorSet.current.arr.length - 1; j >= 0; j--) {
                    if (logs.colorSet.current.arr[j][0] == "") {
                        if (logs.colorSet.current.arr[j][2]) console.log('%c' + logs.colorSet.current.arr[j][2] + arr[i], logs.colorSet.current.arr[j][1]);
                        else console.log('%c' + arr[i], logs.colorSet.current.arr[j][1])
                        j = -1;
                    }
                    else if (arr[i][0] == logs.colorSet.current.arr[j][0]) {
                        logs.csl(arr[i].slice(2, arr[i].length), arr[i][1], false, (logs.colorSet.current.arr[j][1] ? logs.colorSet.current.arr[j][1] : 'default'));
                        j = -1
                    }
                }
            }
        }
        console.groupEnd();
    },
    load: function (target, version, open = false) {
        var v = -1;
        for (let i = 0; i < target.length; i++) {
            if (target[i].v == version) v = i, i = target.length;
        }
        if (v >= 0) logs.csl(target[v].log, 'Update logs for ' + version, open);
        else return 'No logs for this version.'
    }
}
logs.enable();
console.info("madlib.js up and running, version " + mdlUpdateLogs[mdlUpdateLogs.length - 1].v);
logs.load(mdlUpdateLogs, mdlUpdateLogs[mdlUpdateLogs.length - 1].v);
var pi = Math.PI; var goldenRatio = (Math.sqrt(5) + 1) / 2; var rad = pi; var rev = 0.5; var deg = 180;
radToDeg = (a) => a * (180 / pi);
radToRev = (a) => a * (.5 / pi);
degToRad = (a) => a * (pi / 180);
degToRev = (a) => a * (.5 / 180);
revToDeg = (a) => a * (180 / .5);
revToRad = (a) => a * (pi / .5);
convertAngle = (a, from, to) => a * (to / from);
toogle = (a) => a == false;
mix = (a, b, d) => (1 - d) * a + d * b;
getMix = (a, b, c) => (c - a) / (b - a);
norm = (x, y) => Math.sqrt(x ** 2 + y ** 2);
knuth = (a, b, c) => b < 2 || c < 1 ? a ** c : knuth(a, b - 1, knuth(a, b, c - 1));
sortgrow = (array) => array.sort(function (a, b) { return a - b; });
delta = (a, b = 0, c = 0) => b ** 2 - 4 * a * c;
isMultipleOf = (i, a) => i / a == Math.abs(i / a);
oval = (a, b) => 2 * pi * Math.sqrt((a ** 2 + b ** 2) / 2);
factorial = (a) => a <= 1 ? a : a * factorial(--a);
Number.prototype.restrict = function (min, max) { if (min > this) return min; else if (max < this) return max; return this };
Array.prototype.flatten = function () { return this.reduce(function (flat, toFlatten) { return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten); }, []); }
Array.prototype.max = function () { return Math.max.apply(null, this); }
Array.prototype.min = function () { return Math.min.apply(null, this); }
Array.prototype.copy = function () { return JSON.parse(JSON.stringify(this)); }
Array.prototype.avg = function () { return (total(this) / this.length); }
// Array.prototype.contains = function () 
function randomAdress(len) {
    var str = "";
    var chars = ["1","2","3","4","5","6","7","8","9","0","a","z","e","r","t","y","u","i","o","p","q","s","d","f","g","h","j","k","l","m","w","x","c","v","b","n","A","Z","E","R","T","Y","U","I","O","P","Q","S","D","F","G","H","J","K","L","M","W","X","C","V","B","N"]
    for (let i = 0; i < len; i++) {
        str += char[Math.floor(Math.random() * char.length)];
    }
    return str;
}
function hyperBilinInterp(array, power) {
    var result = array.copy();
    for (let gy = 1; gy < result.length - 1; gy++) {
        var res = [];
        for (let gx = 1; gx < result[gy].length - 1; gx++) {
            var arr = [];
            for (let y = 0; y < result[gy][gx].length; y++) {
                var a = [];
                for (let x = 0; x < result[gy][gx][y].length; x++) {
                    //derivative of perlin ?
                    //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    //dist to border ?

                    // New thingy: blur
                    /*size = Math.floor(mix(0, array[gy][gx].length, power)/2);
                    var item = [];
                    for (let dy = -size; dy <= size; dy++) {
                        var itm = [];
                        ay = 0;
                        if (dy + y < 0) ay = array[gy][gx].length, sy = -1;
                        if (dy + y >= array[gy][gx].length) ay = -array[gy][gx].length, sy = 1;
                        for (let dx = -size; dx <= size; dx++) {
                            ax = 0;
                            if (dx + x < 0) ax = array[gy][gx].length, sx = -1;
                            if (dx + x >= array[gy][gx].length) ax = -array[gy][gx].length, sx = 1;
                            if (ay + dy + y < 0 || ay + dy + y >= array[gy][gx].length) console.log(ay, dy, y);
                            itm.push(array[gy + sy][gx + sx][ay + dy + y][ax + dx + x]);
                        }
                        item.push(itm);
                    }
                    value = rand.blur(item);*/
                    size = 1;
                    var item = [];
                    for (let dy = -size; dy <= size; dy++) {
                        var itm = [];
                        ay = 0;
                        if (dy + y < 0) ay = result[gy][gx].length, sy = -1;
                        if (dy + y >= result[gy][gx].length) ay = -result[gy][gx].length, sy = 1;
                        for (let dx = -size; dx <= size; dx++) {
                            ax = 0;
                            if (dx + x < 0) ax = result[gy][gx].length, sx = -1;
                            if (dx + x >= result[gy][gx].length) ax = -result[gy][gx].length, sx = 1;
                            if (ay + dy + y < 0 || ay + dy + y >= result[gy][gx].length) console.log(ay, dy, y);
                            itm.push(result[gy + sy][gx + sx][ay + dy + y][ax + dx + x]);
                        }
                        item.push(itm);
                    }
                    value = rand.blur(item);
                    //value = 0.5;
                    /*// cx/cy distance to center
                    var cx, cy;
                    if (x <= array[gy][gx][y].length / 2) cx = getMix(array[gy][gx][y].length / 2, 0, x); 
                    else cx = getMix(array[gy][gx][y].length / 2, array[gy][gx][y].length, x);
                    if (y <= array[gy][gx].length / 2) cy = getMix(array[gy][gx].length / 2, 0, y); 
                    else cy = getMix(array[gy][gx].length / 2, array[gy][gx].length, y); 
                    // dx/dy distance to nearest border (I hope)
                    var dx = getMix(array[gy][gx - 1][y].length, array[gy][gx][y].length + array[gy][gx - 1][y].length, x + array[gy][gx - 1][y].length);
                    var dy = getMix(array[gy][gx - 1].length, array[gy][gx].length + array[gy][gx - 1].length, y + array[gy][gx - 1].length);
                    // set nearest border
                    var sx = 1, sy = 1;
                    if (dx > 0.5) dx = 1-dx, sx = -sx;
                    if (dy > 0.5) dy = 1-dy, sy = -sy;
                    dx = 2*dx, dy = 2*dy;
                    var cxy = norm(cx, cy);
                    var dxy = norm(dx, dy)/Math.sqrt(2);
                    var adxy = [1-dx, 1-dy];
                    axy = adxy.max();
                    cxy = (cxy+(axy))/2;
                    var r = Math.abs(x - y);
                    var ax = 0, ay = 0, rx = 0, ry = 0;
                    // set rx ry ax ay; a = wall; r = diff.
                    if (cx > cy) ax = -sx, ry = Math.floor(mix(0, array[gy + ax][gx + ax][y].length / 2, dy - sy*(cy/cx)*dx)); // W/E WALL
                    if (cx < cy) ay = -sy, rx = Math.floor(mix(0, array[gy + ay][gx + ax].length / 2, dx - sx*(cx/cy)*dy)); // N/S WALL
                    if (ax < 0) rx = array[gy][gx][y].length - 1;
                    if (ay < 0) ry = array[gy][gx].length - 1;
                    //if (dx == 0.5) ry = y;
                    //if (dy == 0.5) rx = x;
                    //console.log(x, y, dx, dy, cx, cy, rx, ry, ax, ay)
                    //if (sx > 0 && dx <= dy) ax = -1, rx = array[gy][gx][y].length - 1, ry = y; //WEST
                    //else if (sx < 0 && dx <= dy) ax = 1, ry = y; //EAST
                    //if (sy > 0 && dx >= dy) ay = -1, ry = array[gy][gx].length - 1, rx = x; //NORTH
                    //else if (sy < 0 && dx >= dy) ay = 1, rx = x; //SOUTH
                    //var value = mix(array[gy][gx][y][x], array[gy + ay][gx + ax][ry][rx], 1);
                    var value = mix(array[gy][gx][y][x], array[gy + ay][gx + ax][ry][rx], 1);*/
                    result[gy][gx][y][x] = value;
                    //a.push(value);
                }
                //arr.push(a);
            }
            //res.push(arr);
        }
        //result.push(res);
    }
    return result
}
function clrTransition(med, eq, a) {
    //Blue to red for now
    return [Math.round(255 * getMix(med - eq, med + eq, a)), 0, Math.round(255 * getMix(med + eq, med - eq, a))];
}
function toTimeFormat(a) {
    var r = "";
    var powers = [365.25 * 24 * 60 * 60000, 24 * 60 * 60000, 60 * 60000, 60000, 1000, 1]
    var suffix = ['years', 'days', 'hours', 'minutes', 'seconds', 'miliseconds']
    for (let i = 0; i < powers.length; i++) {
        if (Math.floor(a / powers[i])) r += Math.floor(a / powers[i]) + " " + suffix[i] + ", ", a -= Math.floor(a / powers[i]) * powers[i];
    }
    return r
}
function getAllProperties(o) {
    var names = Object.getOwnPropertyNames(o);
    var prop = [];
    for (let i = 0; i < names.length; i++) {
        prop[i] = o[names[i]];
    }
    return [names, prop]
    /*var objectToInspect;
    var result = [];
    for(objectToInspect = o;
        objectToInspect !== null;
        objectToInspect = Object.getPrototypeOf(objectToInspect)){  
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
    }
    return result; */
}
function periodicBrute(generator, range, acc = 0, len = 1, inc = 1) {
    var max = 0; var min = 1;
    if (len > 1) {
        var t = []; var c = 0;
        for (let i = 0; i < len; i += inc) { t[i] = generator(); }

        for (let i = 0; i < range; i += inc) {
            var a = generator();
            if (max < a) max = a;
            else if (min > a) min = a;
            if (acc != 0) { if (Math.round(acc * t[c]) == Math.round(acc * a)) if (c++, c == len) return [i, min, max] }
            else { if (t[c] == a) if (c++, c == len) return [i, min, max] }
        }
    } else {
        var t = generator();
        for (let i = 0; i < range; i += inc) {
            var a = generator();
            if (max < a) max = a;
            else if (min > a) min = a;
            if (acc != 0) { if (Math.round(acc * t) == Math.round(acc * a)) return [i, min, max] }
            else { if (t == a) return [i, min, max] }
        }
    }
    return ['No periodicity found for current range and accuracy.', min, max]
}
function total(array) {
    array = array.flat(Infinity);
    var t = 0;
    for (let i = 0; i < array.length; i++) t += array[i];
    return t
}
function ncdf(x, mean, std) {
    var x = (x - mean) / std;
    var t = 1 / (1 + .2315419 * Math.abs(x));
    var d = .3989423 * Math.exp(-x * x / 2);
    var prob = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) prob = 1 - prob
    return prob
}
function angle(a, b) {
    if (a == 0) return Math.PI / 2 * Math.floor(b / Math.abs(b))
    else if (a > 0) return Math.atan(b / a)
    else return Math.atan(b / a) + Math.PI
}
var stats = {
    arr: [],
    create: function () { stats.arr[stats.arr.length] = { li: [] }; return stats.arr.length - 1; },
    sigma: function (array, moy) {
        var t = 0;
        for (let i = 0; i < array.length; i++) t += (array[i] - moy) ** 2;
        return t / array.length
    },
    distr: function (array) {
        array = sortgrow(array);
        var g = 0;
        var s = 1;
        for (let i = 0; i < array.length - 1; i++) {
            var t = Math.abs(array[i] - array[i + 1]);
            if (t > g) g = t; else if (t < s) s = t;
        }
        return [g, s]
    },
    get: function (n) {
        stats.arr[n].xMax = stats.arr[n].li.reduce(function (a, b) { return Math.max(a, b); });
        stats.arr[n].xMin = stats.arr[n].li.reduce(function (a, b) { return Math.min(a, b); });
        (stats.arr[n].li.length / 2 != Math.round(stats.arr[n].li.length / 2) ? stats.arr[n].med = mix(stats.arr[n].li[stats.arr[n].li.length / 2 - 0.5], stats.arr[n].li[stats.arr[n].li.length / 2 + 0.5], 0.5) : stats.arr[n].med = stats.arr[n].li[stats.arr[n].li.length / 2]);
        stats.arr[n].q1 = stats.arr[n].li[Math.round(stats.arr[n].li.length / 4)];
        stats.arr[n].q3 = stats.arr[n].li[Math.round(3 * stats.arr[n].li.length / 4)];
        stats.arr[n].moy = stats.arr[n].li.avg();
        stats.arr[n].standEq = stats.sigma(stats.arr[n].li, stats.arr[n].moy);
        stats.arr[n].standErr = stats.arr[n].standEq / Math.sqrt(stats.arr[n].li.length);
        stats.arr[n].var = stats.arr[n].standEq ** 2;
        stats.arr[n].distr = stats.distr(stats.arr[n].li)
        return stats.arr[n]
    },
    freq: function (n, len) {
        stats.arr[n].frq = [];
        for (let i = 0; i < len; i++) stats.arr[n].frq[i] = 0;
        for (let i = 0; i < stats.arr[n].li.length; i++) stats.arr[n].frq[Math.floor(len * getMix(stats.arr[n].xMin, stats.arr[n].xMax, stats.arr[n].li[i]))] += 1, console.log(Math.floor(len * getMix(stats.arr[n].xMin, stats.arr[n].xMax, stats.arr[n].li[i])));
        for (let i = 0; i < stats.arr[n].frq.length; i++) stats.arr[n].frq[i] = stats.arr[n].frq[i] / stats.arr[n].li.length;
        return stats.arr[n].frq
    },
    dispFrq: function (n, disp, l, txtBox) {
        disp.width = stats.arr[n].frq.length;
        disp.height = l;
        var dat = disp.getContext("2d").createImageData(stats.arr[n].frq.length, l);
        var med = 1 / stats.arr[n].frq.length;
        stats.arr[n].medFrq = med;
        var max = stats.arr[n].frq.max();
        stats.arr[n].maxFrq = max;
        var min = stats.arr[n].frq.min();
        stats.arr[n].minFrq = min;
        var eq = [Math.abs(max - med), Math.abs(min - med)].max();
        stats.arr[n].eqFrq = eq;
        var array = [];
        for (let i = 0; i < stats.arr[n].frq.length; i++) {
            array[i] = clrTransition(med, eq, stats.arr[n].frq[i]);
        }
        for (let y = 0; y < l; y++) {
            for (let x = 0; x < stats.arr[n].frq.length; x++) {
                dat.data[4 * x + stats.arr[n].frq.length * 4 * y + 0] = array[x][0];
                dat.data[4 * x + stats.arr[n].frq.length * 4 * y + 1] = array[x][1];
                dat.data[4 * x + stats.arr[n].frq.length * 4 * y + 2] = array[x][2];
                dat.data[4 * x + stats.arr[n].frq.length * 4 * y + 3] = 255;
            }
        }
        disp.getContext("2d").putImageData(dat, 0, 0);
        cursor.enable = true;
        stats.hoverFrq(n, disp, txtBox);
        return dat
    },
    hoverFrq: function (n, disp, txtBox) {
        if (cursor.x <= disp.width && cursor.y <= disp.height) {
            txtBox.style.left = (cursor.x) + "px";
            txtBox.style.top = (cursor.y - 18) + "px";
            if (stats.arr[n].frq[cursor.x] >= stats.arr[n].medFrq) {
                txtBox.innerHTML = "+" + (Math.round(getMix(stats.arr[n].medFrq, stats.arr[n].medFrq + stats.arr[n].eqFrq, stats.arr[n].frq[cursor.x]) * 1000) / 10) + "%";
            } else {
                txtBox.innerHTML = "-" + (Math.round(getMix(stats.arr[n].medFrq - stats.arr[n].eqFrq, stats.arr[n].medFrq, stats.arr[n].frq[cursor.x]) * 1000) / 10) + "%";
            }
        }
        setTimeout(stats.hoverFrq, 10, n, disp, txtBox);
    }
};
var rand = {
    seed: 0,
    setup: function (x = rand.seed) {
        rand.seed = x;
        rand.mod = 1 / Math.sqrt(x);
        rand.mult = Math.sqrt(rand.mod * goldenRatio);
        rand.step = 1 / (rand.mult ** 2);
        rand.xlc = Math.sqrt(rand.mult + rand.mod + rand.step);
    },
    permutation: [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180],
    step: .05,
    len: 20,
    xlc: 0,
    mult: 1.0932,
    mod: 1.1,
    grdMap: [],
    sourceLcg: [],
    map: {
        x: 0,
        y: 0,
        elem: [],
        smoothed: []
    },
    grdRand: function (ax, ay) {
        //Loads gradient vectors for a given table size
        var arr = [];
        for (y = 0; y < ay + 1; y++) {
            var a = [];
            for (x = 0; x < ax + 1; x++) {
                //r = [rand.int(-1,1), rand.int(-1,1)];
                r = [2 * rand.lcg() - 1, 2 * rand.lcg() - 1];
                a.push(r);
            }
            arr.push(a);
        }
        rand.grdMap = arr;
        return arr
    },
    polygen2D: function (ax, ay, sx, sy) {
        //Okay i'll try full perlin
        /*var p = [];
        for(x=0;x<512;x++) {
            p[x] = rand.permutation[x%256];
        }*/

        //maybe not

        //retrieve gradient vectors 
        function fade(t) {
            //stolen from perlin
            return t * t * t * (t * (t * 6 - 15) + 10)
        }
        var arr = [];
        var v = [];
        v[0] = rand.grdMap[ay][ax]; v[1] = rand.grdMap[ay][ax + 1];
        v[2] = rand.grdMap[ay + 1][ax]; v[3] = rand.grdMap[ay + 1][ax + 1];
        //PLEASE use contants for sx and sy.
        for (y = 0; y < sy; y++) {
            var a = [];
            for (x = 0; x < sx; x++) {
                //Distance of point to each border
                var dx = getMix(0, sx, x);
                var dy = getMix(0, sy, y);
                var dxy = [];
                dxy[0] = [dy, dx]; dxy[1] = [dy, 1 - dx];
                dxy[2] = [1 - dy, dx]; dxy[3] = [1 - dy, 1 - dx];
                //uuuuh... "dot product" ?
                //////AAAH FUCK I NEED THE COORDINATES OR WHAT FUCK
                var res = [];
                for (let i = 0; i < dxy.length; i++) {
                    res[i] = v[i][0] * dxy[i][0] + v[i][1] * dxy[i][1];
                }
                dx = fade(dx); dy = fade(dy);
                var x1 = mix(res[0], res[1], dx);
                var x2 = mix(res[2], res[3], dx);
                var r = mix(x1, x2, dy);
                a.push(r);
            }
            arr.push(a);
        }
        return arr
    },
    preGenLCG: function (n) {
        for (let i = 0; i < n; i++) {
            rand.xlc = (rand.mult * rand.xlc + rand.step) % rand.mod;
            rand.sourceLcg[n] = rand.xlc;
        }
    },
    rlcg: function (n) {
        //If this is the only usage you are making of this random ranged function, you should not be using that. 
        //It is in that case stongly advised to use the (slower) rand.noise, or pregenerate a table (good for small values).
        for (let i = 0; i < n; i++) rand.xlc = (rand.mult * rand.xlc + rand.step) % rand.mod;
        var xlc = rand.xlc;
        rand.setup();
        return xlc / rand.mod
    },
    lcg: function () {
        rand.xlc = (rand.mult * rand.xlc + rand.step) % rand.mod;
        return rand.xlc / rand.mod
    },
    xlcg: function (n) {
        for (let i = 0; i < n; i++) rand.xlc = (rand.mult * rand.xlc + rand.step) % rand.mod;
        return rand.xlc / rand.mod
    },
    noise: function (x = Math.random) {
        //Note : deprecated, use rand.lcg() for classic uses instead. 
        var t = 0;
        for (let i = -Math.ceil(rand.len / 2); i < Math.floor(rand.len / 2); i++) t += (1 / (i + 1 + Math.ceil(rand.len / 2))) ** (1 / 3) * Math.sin(i ** 2 * x * rand.step + rand.seed * (i + 1));
        return .5 * Math.cos(64 * pi * t) + .5
    },
    sign: (x = Math.random()) => (x > 0.5 ? 1 : -1),
    int: (a, b, x = Math.random()) => Math.round(a + rand.lcg() * (b - a)),
    real: function (a, b, acc = -1, x = Math.random()) {
        return (acc >= 0 ? Math.round((a + Math.random() * (b - a)) * (10 ** acc)) / (10 ** acc) : a + Math.random() * (b - a))
    },
    gen2D: function (a, b, turb = true, trubLvl = 64, lcg = true) {
        rand.map.x = a; rand.map.y = b; rand.map.smoothed = []; rand.map.elem = [];
        if (lcg) {
            for (let y = 0; y < b; y++) {
                var r = [];
                for (let x = 0; x < a; x++) r.push(rand.lcg());
                rand.map.elem.push(r);
            }
            if (turb) {
                for (let y = 0; y < b; y++) {
                    var r = [];
                    for (let x = 0; x < a; x++) r.push(rand.turbulence(x, y, trubLvl));
                    rand.map.smoothed.push(r);
                }
                return rand.map.smoothed
            } else {
                for (let y = 0; y < b; y++) {
                    var r = [];
                    for (let x = 0; x < a; x++) r.push(0);
                    rand.map.smoothed.push(r);
                }
                return rand.map.elem
            }
        } else {
            for (let y = 0; y < b; y++) {
                var r = [];
                for (let x = 0; x < a; x++) r.push(rand.noise(x + a * y));
                rand.map.elem.push(r);
            }
            if (turb) {
                for (let y = 0; y < b; y++) {
                    var r = [];
                    for (let x = 0; x < a; x++) r.push(rand.turbulence(x, y, trubLvl));
                    rand.map.smoothed.push(r);
                }
                return rand.map.smoothed
            } else {
                for (let y = 0; y < b; y++) {
                    var r = [];
                    for (let x = 0; x < a; x++) r.push(0);
                    rand.map.smoothed.push(r);
                }
                return rand.map.elem
            }
        }
    },
    marble: function (xPeriod = 5, yPeriod = 10, turbPower = 10, turbSize = 64) {
        if (rand.map.elem[1] != undefined) {
            for (y = 0; y < rand.map.y; y++) {
                for (x = 0; x < rand.map.x; x++) {
                    var xyValue = x * xPeriod / rand.map.x + y * yPeriod / rand.map.y + turbPower * rand.turbulence(x, y, turbSize);
                    var sineValue = Math.abs(Math.sin(xyValue * pi));
                    rand.map.smoothed[y][x] = sineValue;
                }
            }
            return rand.map.smoothed
        } else { return 'Error: No map found' }
    },
    marbleDeep: function (xPeriod = 5, yPeriod = 10, turbPower = 10, turbSize = 64) {
        //WARNING: The deep system should not be used for animation. Use 3D alternative instead.
        if (rand.map.elem[1] != undefined) {
            for (z = 0; z < rand.map.z; z++) {
                for (y = 0; y < rand.map.y; y++) {
                    for (x = 0; x < rand.map.x; x++) {
                        var xyzValue = x * xPeriod / rand.map.x + y * yPeriod / rand.map.y + turbPower * rand.turbDeep(x, y, z, turbSize);
                        var sineValue = Math.abs(Math.sin(xyzValue * pi));
                        rand.map.smoothed[z][y][x] = sineValue;
                    }
                }
            }
            return rand.map.smoothed
        } else { return 'Error: No map found' }
    },
    marble3D: function (xPeriod = 5, yPeriod = 10, zPeriod = 5, turbPower = 10, turbSize = 64) {
        if (rand.map.elem[1] != undefined) {
            for (z = 0; z < rand.map.z; z++) {
                for (y = 0; y < rand.map.y; y++) {
                    for (x = 0; x < rand.map.x; x++) {
                        var xyzValue = x * xPeriod / rand.map.x + y * yPeriod / rand.map.y + z * zPeriod / rand.map.z + turbPower * rand.turb3D(x, y, z, turbSize);
                        var sineValue = Math.abs(Math.sin(xyzValue * pi));
                        rand.map.smoothed[z][y][x] = sineValue;
                    }
                }
            }
            return rand.map.smoothed
        } else { return 'Error: No map found' }
    },
    degrad: function (x, y) {
        var fractX = x - Math.round(x);
        var fractY = y - Math.round(y);
        var x1 = (Math.round(x) + rand.map.x) % rand.map.x;
        var y1 = (Math.round(y) + rand.map.y) % rand.map.y;
        var x2 = (x1 + rand.map.x - 1) % rand.map.x;
        var y2 = (y1 + rand.map.y - 1) % rand.map.y;
        var value = fractX * fractY * rand.map.elem[y1][x1];
        value += (1 - fractX) * fractY * rand.map.elem[y1][x2];
        value += fractX * (1 - fractY) * rand.map.elem[y2][x1];
        value += (1 - fractX) * (1 - fractY) * rand.map.elem[y2][x2];
        return value;
    },
    smooth: function (x, y) {
        var fractX = x - Math.floor(x);
        var fractY = y - Math.floor(y);
        var x1 = (Math.floor(x) + rand.map.x) % rand.map.x;
        var y1 = (Math.floor(y) + rand.map.y) % rand.map.y;
        var x2 = (x1 + rand.map.x - 1) % rand.map.x;
        var y2 = (y1 + rand.map.y - 1) % rand.map.y;
        var value = fractX * fractY * rand.map.elem[y1][x1];
        value += (1 - fractX) * fractY * rand.map.elem[y1][x2];
        value += fractX * (1 - fractY) * rand.map.elem[y2][x1];
        value += (1 - fractX) * (1 - fractY) * rand.map.elem[y2][x2];
        return value
    },
    smoothDeep: function (x, y, z) {
        //WARNING: The deep system should not be used for animation. Use 3D alternative instead.
        var fractX = x - Math.floor(x);
        var fractY = y - Math.floor(y);
        var x1 = (Math.floor(x) + rand.map.x) % rand.map.x;
        var y1 = (Math.floor(y) + rand.map.y) % rand.map.y;
        var x2 = (x1 + rand.map.x - 1) % rand.map.x;
        var y2 = (y1 + rand.map.y - 1) % rand.map.y;
        var value = fractX * fractY * rand.map.elem[z][y1][x1];
        value += (1 - fractX) * fractY * rand.map.elem[z][y1][x2];
        value += fractX * (1 - fractY) * rand.map.elem[z][y2][x1];
        value += (1 - fractX) * (1 - fractY) * rand.map.elem[z][y2][x2];
        return value
    },
    smooth3D: function (x, y, z) {
        var fractX = x - Math.floor(x);
        var fractY = y - Math.floor(y);
        var fractZ = z - Math.floor(z);
        var x1 = (Math.floor(x) + rand.map.x) % rand.map.x;
        var y1 = (Math.floor(y) + rand.map.y) % rand.map.y;
        var z1 = (Math.floor(z) + rand.map.z) % rand.map.z;
        var x2 = (x1 + rand.map.x - 1) % rand.map.x;
        var y2 = (y1 + rand.map.y - 1) % rand.map.y;
        var z2 = (z1 + rand.map.z - 1) % rand.map.z;
        var value = fractX * fractY * fractZ * rand.map.elem[z1][y1][x1];
        value += (1 - fractX) * fractY * fractZ * rand.map.elem[z1][y1][x2];
        value += fractX * (1 - fractY) * fractZ * rand.map.elem[z1][y2][x1];
        value += (1 - fractX) * (1 - fractY) * fractZ * rand.map.elem[z1][y2][x2];
        value += fractX * fractY * (1 - fractZ) * rand.map.elem[z2][y1][x1];
        value += (1 - fractX) * fractY * (1 - fractZ) * rand.map.elem[z2][y1][x2];
        value += fractX * (1 - fractY) * (1 - fractZ) * rand.map.elem[z2][y2][x1];
        value += (1 - fractX) * (1 - fractY) * (1 - fractZ) * rand.map.elem[z2][y2][x2];
        return value
    },
    turbDeep: function (x, y, z, size) {
        //WARNING: The deep system should not be used for animation. Use 3D alternative instead.
        var value = 0, initialSize = size;
        while (size >= 1) value += rand.smoothDeep(x / size, y / size, z) * size, size /= 2;
        return (0.5 * value / initialSize);
    },
    turbulence: function (x, y, size) {
        var value = 0, initialSize = size;
        while (size >= 1) value += rand.smooth(x / size, y / size) * size, size /= 2;
        return (0.5 * value / initialSize);
    },
    turb3D: function (x, y, z, size) {
        var value = 0, initialSize = size;
        while (size >= 1) value += rand.smooth3D(x / size, y / size, z / size) * size, size /= 2;
        return (0.5 * value / initialSize);
    },
    level: function (power = .75, turbSize = 64) {
        for (y = 0; y < rand.map.y; y++) {
            for (x = 0; x < rand.map.x; x++) rand.map.smoothed[y][x] = mix(rand.map.smoothed[y][x], rand.turbulence(x, y, turbSize), power);
        }
        return rand.map.smoothed
    },
    levelDeep: function (power = .75, turbSize = 64) {
        //WARNING: The deep system should not be used for animation. Use 3D alternative instead.
        for (z = 0; z < rand.map.z; z++) {
            for (y = 0; y < rand.map.y; y++) {
                for (x = 0; x < rand.map.x; x++) rand.map.smoothed[z][y][x] = mix(rand.map.smoothed[z][y][x], rand.turbDeep(x, y, z, turbSize), power);
            }
        }
        return rand.map.smoothed
    },
    wood: function (xyPeriod = 7, turbPower = .1, turbSize = 32) {
        for (y = 0; y < rand.map.y; y++) {
            for (x = 0; x < rand.map.x; x++) {
                var xValue = (x - rand.map.x / 2) / rand.map.x;
                var yValue = (y - rand.map.y / 2) / rand.map.y;
                var distValue = norm(xValue, yValue) + turbPower * rand.turbulence(x, y, turbSize);
                var sineValue = Math.abs(Math.sin(2 * xyPeriod * distValue * pi));
                rand.map.smoothed[y][x] = sineValue;
            }
        }
        return rand.map.smoothed
    },
    blur: function () {
        //TODO: Make it work (broken for now)
        for (y = 0; y < rand.map.y; y++) {
            for (x = 0; x < rand.map.x; x++) {
                rand.map.smoothed[y][x] = this.smooth(x, y);
            }
        }
        return rand.map.smoothed
    },
    grain: function (strengh, key = 0, lcg = true) {
        //TODO: Repair + check grammar
        if (!lcg) {
            for (y = 0; y < rand.map.y; y++) {
                for (x = 0; x < rand.map.x; x++) rand.map.smoothed[y][x] = mix(rand.map.smoothed[y][x], rand.noise(x + rand.map.x), strengh);
            }
        } else {
            for (y = 0; y < rand.map.y; y++) {
                for (x = 0; x < rand.map.x; x++) rand.map.smoothed[y][x] = mix(rand.map.smoothed[y][x], rand.lcg(), strengh);
            }
        }
        return rand.map.smoothed
    },
    alevel: function (power = .75, turbSize = 64) {
        //TODO: make it better. NOW.
        for (y = 0; y < rand.map.y; y++) {
            for (x = 0; x < rand.map.x; x++) rand.map.smoothed[y][x] = getMix(rand.map.smoothed[y][x], rand.turbulence(x, y, turbSize), power);
        }
        return rand.map.smoothed
    },
    fog: function (force = 1, level = 0) {
        //TODO: fix.
        for (y = 0; y < rand.map.y; y++) {
            for (x = 0; x < rand.map.x; x++) rand.map.smoothed[y][x] = ncdf(rand.map.smoothed[y][x] / 256, -level, force);
        }
        return rand.map.smoothed
    },
    level3D: function (power = .75, turbSize = 64) {
        for (z = 0; z < rand.map.z; z++) {
            for (y = 0; y < rand.map.y; y++) {
                for (x = 0; x < rand.map.x; x++) rand.map.smoothed[z][y][x] = mix(rand.map.smoothed[z][y][x], rand.turb3D(x, y, z, turbSize), power);
            }
        }
        return rand.map.smoothed
    },
    quadr: function (xPeriod = 4, yPeriod = 4, turbPower = .2, turbSize = 64) {
        for (y = 0; y < rand.map.y; y++) {
            for (x = 0; x < rand.map.x; x++) {
                var xValue = (x - rand.map.x / 2) / rand.map.x + turbPower * rand.turbulence(x, y, turbSize);
                var yValue = (y - rand.map.y / 2) / rand.map.y + turbPower * rand.turbulence(rand.map.y - y, rand.map.x - x, turbSize);
                var sineValue = 0.5 * Math.abs(Math.sin(xPeriod * xValue * pi) + Math.sin(yPeriod * yValue * pi));
                rand.map.smoothed[y][x] = sineValue;
            }
        }
        return rand.map.smoothed
    },
    quadrDeep: function (xPeriod = 4, yPeriod = 4, turbPower = .2, turbSize = 64) {
        //WARNING: The deep system should not be used for animation. Use 3D alternative instead.
        //TODO: yeah that's the Deep system. Again. Repair needed.
        for (z = 0; z < rand.map.z; z++) {
            for (y = 0; y < rand.map.y; y++) {
                for (x = 0; x < rand.map.x; x++) {
                    var xValue = (x - rand.map.x / 2) / rand.map.x + turbPower * rand.turbDeep(x, y, z, turbSize);
                    var yValue = (y - rand.map.y / 2) / rand.map.y + turbPower * rand.turbDeep(rand.map.y - y, rand.map.x - x, z, turbSize);
                    var sineValue = 0.5 * Math.abs(Math.sin(xPeriod * xValue * pi) + Math.sin(yPeriod * yValue * pi));
                    rand.map.smoothed[z][y][x] = sineValue;
                }
            }
        }
        return rand.map.smoothed
    },
    quadr3D: function (xPeriod = 4, yPeriod = 4, zPeriod = 4, turbPower = .2, turbSize = 64) {
        //TODO: verify the maths
        for (z = 0; z < rand.map.z; z++) {
            for (y = 0; y < rand.map.y; y++) {
                for (x = 0; x < rand.map.x; x++) {
                    var xValue = (x - rand.map.x / 2) / rand.map.x + turbPower * rand.turb3D(x, y, z, turbSize);
                    var yValue = (y - rand.map.y / 2) / rand.map.y + turbPower * rand.turb3D(rand.map.y - y, rand.map.x - x, rand.map.z - z, turbSize);
                    var zValue = (z - rand.map.z / 2) / rand.map.z + turbPower * rand.turb3D(x, y, z, turbSize);
                    var sineValue = 0.5 * Math.abs(Math.sin(xPeriod * xValue * pi) + Math.sin(yPeriod * yValue * pi) + Math.sin(zPeriod * zValue * pi));
                    rand.map.smoothed[z][y][x] = sineValue;
                }
            }
        }
        return rand.map.smoothed
    },
    gen3D: function (a, b, c, turb = true, lcg = true) {
        rand.map.x = a; rand.map.y = b; rand.map.z = c; rand.map.smoothed = []; rand.map.elem = [];
        if (lcg) {
            for (let z = 0; z < c; z++) {
                var r = [];
                for (let y = 0; y < b; y++) {
                    var pre = [];
                    for (let x = 0; x < a; x++) pre.push(rand.lcg());
                    r.push(pre);
                }
                rand.map.elem.push(r);
            }
            if (turb) {
                for (let z = 0; z < c; z++) {
                    var r = [];
                    for (let y = 0; y < b; y++) {
                        var pre = [];
                        for (let x = 0; x < a; x++) pre.push(rand.turb3D(x, y, z, 64));
                        r.push(pre);
                    }
                    rand.map.smoothed.push(r);
                }
                return rand.map.smoothed
            } else {
                for (let z = 0; z < c; z++) {
                    var r = [];
                    for (let y = 0; y < b; y++) {
                        var pre = [];
                        for (let x = 0; x < a; x++) pre.push(0);
                        r.push(pre);
                    }
                    rand.map.smoothed.push(r);
                }
                return rand.map.elem
            }
        } else {
            for (let z = 0; z < c; z++) {
                var r = [];
                for (let y = 0; y < b; y++) {
                    var pre = [];
                    for (let x = 0; x < a; x++) pre.push(rand.noise(x + a * y + a * b * z * 20));
                    r.push(pre);
                }
                rand.map.elem.push(r);
            }
            if (turb) {
                for (let z = 0; z < c; z++) {
                    var r = [];
                    for (let y = 0; y < b; y++) {
                        var pre = [];
                        for (let x = 0; x < a; x++) pre.push(rand.turb3D(x, y, z, 64));
                        r.push(pre);
                    }
                    rand.map.smoothed.push(r);
                }
                return rand.map.smoothed
            } else {
                for (let z = 0; z < c; z++) {
                    var r = [];
                    for (let y = 0; y < b; y++) {
                        var pre = [];
                        for (let x = 0; x < a; x++) pre.push(0);
                        r.push(pre);
                    }
                    rand.map.smoothed.push(r);
                }
                return rand.map.elem
            }
        }
    },
    smartBlur: function (array) {
        //console.log(array);
        var value = 0, size = Math.floor(array.length / 2), initialSize = size;
        while (size >= 1) {
            var a = 0;
            for (let y = -Math.floor(size); y <= Math.ceil(size); y++) {
                for (let x = -Math.floor(size); x <= Math.floor(size); x++) {
                    //console.log(y, x, initialSize);
                    a += array[y + initialSize][x + initialSize];
                    //console.log(a);
                }
            }
            value += (a / ((size * 2) ** 2)) * size, size /= 2;
        }
        return (0.5 * value / initialSize);
    },
    blur: function (array) {
        var a = 0;
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array.length; x++) {
                //console.log(y, x, initialSize);
                a += array[y][x];
                //console.log(a);
            }
        }
        return (a / array.length ** 2);
    }
};
var sound = {
    //No idea how this even works, DO NOT TOUCH.
    bank: {},
    sources: {},
    init: function () {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext; context = new AudioContext();
        } catch (e) { alert('Web Audio API is not supported in this browser'); }
    },
    load: function (url, bufferName, vol = 1) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext; context = new AudioContext();
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            context.decodeAudioData(request.response, function (buffer) {
                sound.bank[bufferName] = buffer;
            }/*, onError*/);
        }
        sound.sources[bufferName] = sound.createSource(sound.bank[bufferName]);
        sound.sources[bufferName].gainNode.gain.value = vol * vol;
        request.send();
    },
    toogleLoop: function (buffer) { toogle(sound.sources[buffer].source.loop); },
    gain: function (bufferName, vol) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext; context = new AudioContext();
        var source = context.createBufferSource();
        source.connect(context.destination);
        var gainNode = context.createGain();
        source.connect(gainNode);
        gainNode.connect(context.destination);
        gainNode.gain.value = vol;
    },
    play: function (buffer, vol = 1, loop = false) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext; context = new AudioContext();
        var source = context.createBufferSource();
        sound.sources[buffer] = sound.createSource(sound.bank[buffer]);
        sound.sources[buffer].source.loop = loop;
        sound.sources[buffer].gainNode.gain.value = vol * vol;
        sound.sources[buffer].source.start(0);
    },
    pause: function (buffer) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext; context = new AudioContext();
        var source = context.createBufferSource();
        sound.sources[buffer].source.stop(0);
    },
    createSource: function (buffer) {
        var source = context.createBufferSource();
        var gainNode = context.createGain ? context.createGain() : context.createGainNode();
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(context.destination);
        return { source: source, gainNode: gainNode };
    }
};
window.addEventListener('load', sound.init, false);
var linkedTiles = {
    map: [],
    links: [],

};
var sentence = {
    current: {},
    data: {
        auctions: [[['be', 'am', 'are', 'is', 'are', 'are', 'are'], 'assert'], ['ran', 'ran']],
        items: [{ name: 'gender', poss: ['boy', 'girl', 'nonbinary'] }, { name: 'city', poss: ['paris', 'london'], prot: { size: ['number', 'km'], habitants: ['number'] } }],
        personas: [['i', 'the user'], ['you', 'the system']],
        types: [['?', 'interrogation'], ['.', 'affirmation'], ['!', 'exclamation']],
    },
    isVowel: function (t) {
        var v = ['a', 'e', 'i', 'o', 'u'];
        for (let i = 0; i < v.length; i++) {
            if (t.substring(0, 1).toLowerCase() == v[i]) return true
        } return false
    },
    findNum: function (sc, d = 0) {
        var n = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        var t = Infinity;
        for (let i = 0; i < n.length; i++) {
            a = sc.indexOf(n[i], d);
            if (a != -1 && t > a) t = a;
        }
        var e = true;
        var z = t;
        while (z < sc.length && e) {
            e = false;
            z++;
            for (let i = 0; i < n.length; i++) {
                if (sc[z] == n[i]) e = true;
            }
        }
        return [t, z, sc.substring(t, z)]
    },
    isWord: function (w, sc, d = 0) {
        var sc = sc.toLowerCase();
        var l = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var a = 0;
        var b = 0;
        while (a != -1) {
            a = b;
            a = sc.indexOf(w, a + d);
            b = a + w.length;
            var r = true;
            if (b < sc.length - 1) {
                for (let i = 0; i < l.length; i++) {
                    if (sc[b + 2] == l[i]) r = false, i = Infinity;
                }
            }
            if (a > 0) {
                for (let i = 0; i < l.length; i++) {
                    if (sc[a - 1] == l[i]) r = false, i = Infinity;
                }
            }
            if (r) return r;
        }
        return false
    },
    getAuction: function (sc) {
        var j, a;
        sc = sc.toLowerCase();
        for (let i = 0; i < sentence.data.auctions.length; i++) {
            if (typeof (sentence.data.auctions[i][0]) == "object") {
                var arr = sentence.data.auctions[i][0];
                for (let z = 0; z < arr.length; z++) {
                    if (sentence.isWord(arr[z], sc)) j = i, i = Infinity, z = Infinity;
                }
            } else {
                if (sentence.isWord(sentence.data.auctions[i][0], sc)) j = i, i = Infinity;
            }
        }
        sentence.current.act = sentence.data.auctions[j];
    },
    getPersona: function (sc) {
        var j, a;
        sc = sc.toLowerCase();
        for (let i = 0; i < sentence.data.personas.length; i++) {
            if (sentence.isWord(sentence.data.personas[i][0], sc)) j = i, i = Infinity;
        }
        sentence.current.pers = sentence.data.personas[j];
    },
    getSentenceType: function (sc) {
        var j, a;
        sc = sc.toLowerCase();
        for (let i = 0; i < sentence.data.types.length; i++) {
            a = sc.indexOf(sentence.data.types[i][0]);
            if (a != -1) j = i, i = Infinity;
        }
        sentence.current.type = sentence.data.types[j];
    },
    getItem: function (sc) {
        var j, a;
        sc = sc.toLowerCase();
        for (let i = 0; i < sentence.data.items.length; i++) {
            if (typeof (sentence.data.items[i].poss) == "object") {
                var arr = sentence.data.items[i];
                for (let z = 0; z < arr.poss.length; z++) {
                    if (sentence.isWord(arr.poss[z], sc)) j = i, i = Infinity, z = Infinity;
                }
                if (sentence.data.items[j].prot) {
                    var r = Object.getOwnPropertyNames(sentence.data.items[j].prot);
                    for (let i = 0; i < r.length; i++) {
                        var p = 0; var e = true;
                        while (p < sc.length && e) {
                            if (sentence.data.items[j].prot[i][0] == 'number') {
                                var q = sentence.findNum(sc, p);
                                if (sc.indexOf(sc, q[1]) == q[1]);
                                else p = q[1];
                            }
                        }
                    }
                }
            } else {
                if (sentence.isWord(sentence.data.items[i][0], sc)) j = i, i = Infinity;
            }
        }
        sentence.current.item = sentence.data.items[j];
    },
    Analyse: function (sc) {
        sentence.getPersona(sc);
        sentence.getAuction(sc);
        sentence.getSentenceType(sc);
        sentence.getItem(sc);
        return 'Sentence analysis done. This sentence is a' + (sentence.current.type ? (sentence.isVowel(sentence.current.type[1]) ? 'n ' : '') + sentence.current.type[1] : 'n ' + 'undefined (You should consider defining it)')
            + ', speaking about ' + (sentence.current.pers ? sentence.current.pers[1] : 'unkown (You should consider defining it)')
            + ', it is a' + (sentence.current.act ? (sentence.isVowel(sentence.current.act[1]) ? 'n ' : '') + sentence.current.act[1] : 'n ' + 'undefined action (You should consider defining it)')
            + ' where the user speaks about ' + (sentence.current.item ? sentence.current.item.name : 'something unkown (You should consider defining it)') + ', '
    },
    answer: function (sc) {
        sentence.Analyse(sc);
        if (sentence.current.type[0] == '?') {

        }
    },
};
var gol_SERVER = {
    data: {},
    tickData: [],
    toSend: {
        physicalChanges: [], //Triggered directly by getNextState, must be identical on both sides
        updateTriggered: [], //From updateNear, must too be identical bor both (if not somone spawned a structure);
    },
    getNextState: function (xc, yc) {
        var upt = this.data[yc][xc].alive;
        var v = 0 - Number(this.data[yc][xc].alive);
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (this.data[y + yc][x + xc].alive) v++; // is cell near alive?
            }
        }
        if (v == 3) this.prepSpawn(xc, yc, owner);
        else if (v != 2 && this.data[yc][xc].alive) this.prepKill(xc, yc);
        return (upt != this.data[yc][xc].alive)
    },
    prepSpawn: function (xc, yc, owner) {
        this.toSend.physicalChanges.push([yc, xc, owner]);
    },
    prepKill: function (xc, yc) {
        this.toSend.physicalChanges.push([yc, xc]);
    },
    prepSpawnU: function (xc, yc, owner) {
        this.toSend.updateTriggered.push([yc, xc, owner]);
    },
    updateNear: function (xc, yc) {
        var owner = this.data[yc][xc].owner;
        var array = [];
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (this.data[y + yc][x + xc].pending[owner]) this.data[y + yc][x + xc].pending[owner] = false, this.data[y + yc][x + xc].alive = true, this.data[y + yc][x + xc].alive = true; // is there a pending cell of the same team near me?
            }
        }
        return array;
    },
    kill: function (xc, yc) {
        delete this.data[yc][xc];
    },
    spawn: function (xc, yc, owner) {
        if (!this.data[yc]) this.data[yc] = {};
        if (!this.data[yc][xc]) this.data[yc][xc] = {};
        if (!this.data[yc][xc].alive) {
            if (!this.data[yc][xc].pending) this.data[yc][xc].pending = [];
            else this.data[yc][xc].pending[owner] = false;
            this.data[yc][xc].owner = owner;
            this.data[yc][xc].alive = true;
            return this.data[yc][xc];
        } return false;
    },
    append: function (xc, yc, owner) {
        if (!this.data[yc]) this.data[yc] = {};
        if (!this.data[yc][xc]) this.data[yc][xc] = {};
        if (!this.data[yc][xc].pending) this.data[yc][xc].pending = [];
        this.data[yc][xc].pending[owner] = true;
        return this.data[yc][xc];
    },
    makePre: function (xc, yc) {
        if (this.data[yc] && this.data[yc][xc]) this.data[yc][xc].pre = true;
    },
    removePre: function (xc, yc) {
        if (this.data[yc] && this.data[yc][xc]) delete this.data[yc][xc].pre;
    },
    tick: function () {
        var a = new Date();
        this.data.forEach(y => {
            this.data[y].forEach(x => {
                if (this.getNextState(x, y)) { 
                    this.toSend.physicalChanges.push([y, x]);
                    this.updateNear(x, y) 
                };
            });
        });
        this.data = {...this.data, ...this.upt};
        var b = new Date();
        stats.arr[1].li.push(b - a);
    },
};
var gol = {
    //Changed mind, all server-side :)
    
    retrievedData: {
        physicalChanges: [], //Triggered directly by getNextState, must be identical on both sides
        updateTriggered: [], //From updateNear, must too be identical bor both (if not somone spawned a structure);
    },
    toSend: { 
        appended: [], //Will be send to the other players !!!MUST BE SERVER-SIDE CAPPED!!! (if array too big, scraps the whole thing, too bad for the cheater);
        // This method should prevent all one-way cheat (triggers if at least one player seems to have a different board), still some cheats way occur (limited autobuild, able to see other's appends)
    },
    blocks: [],
    data: {},
    //upt: {},

};
var material = {
    materialsList: [],
    /*Block: function () {
        arguments = arguments.flatten();
        for (let i = 0; i < arguments.length; i+= 2) {
            for (let z = 0; z < material.materialsList.length; z++) {
                if (material.materialsList[z] == arguments[i]) {}
                
            }
        }
    },*/
    Material: function (name) {
        //this.name = name;
        this.herit = undefined;
        this.solidity = 1; // water, air (0) or stone (near 1), also helps with deformability (eg. iron would be at 0.95 so can be deformed I guess but diamond at 0.999 nop);
        this.adherence = 0; // [a > 0 : sticky] [a < 0 : icyish], just cool behavior;
        this.hardeness = 1; // general hardness, uuh yeh
        this.fibrism = 0; // % of fibers
        this.bucketPower = 0; // Boulder size
        this.fusionTemp = 0;
        this.meltTemp = 0;
        material.materialsList.push(this);
    },
    Crafter: function () {

    },
    Anvil: function (type) {
        //if (type == "")
    },
    Smelter: function (inputs, outputs) {
        this.start = function () {  }
        this.innerTemp = 0;
        this.started = -1;
        /*if (typeof (arguments[0]) == "string") {
            if (arguments[0] == "smelt") {
                this.fuel = ["", 0];
            }
            if (arguments[0] == "craft") {

            }
        } else if (typeof (arguments[0]) == "object") {
            arguments[0].forEach(element => {
                if (element == "smelt") {
                    this.fuel = ["", 0];
                }
            });
        }*/
    },
    Item: function () {
        // Implement all dat shit better
        this.temp = 0;
        this.flexibilty = 0.5; // Breaks or shifts shape
        this.sharpness = 1; // the lower the higher the sharpness, the higher the moar roundish it is;
        this.mass = 0; // Straightforward i gwess NNEEED UNIT
        this.hitbox = 1; // Hitbox lengh  NNEEED UNIT
        this.structuralDeterioration = 0; // Helps to know how much something is fucked up and about to break
        this.materials = []; // top to bottom
    },
};
//material.Bench.prototype.action = undefined;
material.Material.prototype.herit = undefined;
var particle = {
    /*data: [],
    settings: {
        rangeEffectArea: 100,
        generalBehavior: 0,
        generalRangeEffect: 0,
        restricted: false,
        restrictions: { xMin: 0, xMax: 1, yMin: 0, yMax: 1 }
    },*/
    System: function () {
        this.settings = {
            rangeEffectArea: 100,
            generalBehavior: 0,
            generalRangeEffect: 0,
            restricted: { north: false, south: false, east: false, weast: false },
            restrictions: { xMin: 0, xMax: 1, yMin: 0, yMax: 1 },
        };
        this.data = [];
        this.exec = particle.tick;
        this.restrict = particle.restrict;
    },
    /*restrict: {
        north: function (a) { this.parentEl re}
        south:
        east:
        west: //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHH
        },*/
    create: function (x, y, speed = 5, rs = .1, angle = 0) {
        this.data.push({ angle: angle, x: x, y: y, rspeed: rs, speed: speed });
        return this.data[this.data.length - 1]
    },
    delete: function (i) {
        var a = this.data.slice(i + 1);
        var b = this.data.slice(0, i);
        var d = this.data[i];
        this.data = b.concat(a);
        return d
    },
    tick: function (i, x, y, t, behavior = this.settings.generalBehavior, rangeEffect = this.settings.generalRangeEffect, homing = false) {
        //TODO: boundaries somehow not working. Fix it.
        var dx = x - this.data[i].x;
        var dy = y - this.data[i].y;
        var cAngle = Math.atan2(dy, dx);
        var norme = norm(dx, dy);
        if (behavior != 0) {
            if (behavior == -1) { behavior = 0; }
            if (homing == true) {
                var diff = cAngle - this.data[i].angle;
                var rs = this.data[i].rspeed * t;
                if (diff > pi) diff += pi * 2;
                else if (diff < -pi) diff += pi * 2;
                if (diff > rs) this.data[i].angle += rs + pi + pi * behavior;
                else if (diff < -rs) this.data[i].angle -= rs + pi + pi * behavior;
                else this.data[i].angle = cAngle + pi + pi * behavior;
            } else this.data[i].angle = cAngle + pi + pi * behavior;
        }
        if (this.data[i].angle > pi) this.data[i].angle -= 2 * pi;
        if (this.data[i].angle < -pi) this.data[i].angle += 2 * pi;
        x = this.data[i].x; y = this.data[i].y;
        x += Math.cos(mix(this.data[i].angle, cAngle, (1 / norme * this.settings.rangeEffectArea * .1) * rangeEffect)) * t * (this.data[i].speed + rangeEffect * (1 / ((1 / this.settings.rangeEffectArea) * norme ** 2 + 1)));
        y += Math.sin(mix(this.data[i].angle, cAngle, (1 / norme * this.settings.rangeEffectArea * .1) * rangeEffect)) * t * (this.data[i].speed + rangeEffect * (1 / ((1 / this.settings.rangeEffectArea) * norme ** 2 + 1)));
        if (this.settings.restricted) {
            /*
            if (this.settings.restrictions.xMin >= x || this.settings.restrictions.xMax <= x) { this.data[i].angle = pi - this.data[i].angle; }
            // else if () { this.data[i].angle = pi - this.data[i].angle; }
            if (this.settings.restrictions.yMin >= y || this.settings.restrictions.yMax <= y) { this.data[i].angle = -this.data[i].angle; }
            // else if () { this.data[i].angle = 2 * pi - this.data[i].angle; }
            x = this.data[i].x; y = this.data[i].y;
            x += Math.cos(mix(this.data[i].angle, cAngle, (1 / norme * this.settings.rangeEffectArea * .1) * rangeEffect)) * t * (this.data[i].speed + rangeEffect * (1 / ((1 / this.settings.rangeEffectArea) * norme + 10)));
            y += Math.sin(mix(this.data[i].angle, cAngle, (1 / norme * this.settings.rangeEffectArea * .1) * rangeEffect)) * t * (this.data[i].speed + rangeEffect * (1 / ((1 / this.settings.rangeEffectArea) * norme + 10)));
            */
        }
        this.data[i].x = x; this.data[i].y = y;
        return this.data[i]
    },
    edit: function (i, x, y, speed = 5, rs = .1, angle = 0) { this.data[i] = { angle: angle, x: x, y: y, rspeed: rs, speed: speed }; }
};
var platformer = {
    map: [],
    display: undefined,
    bgc: undefined,
    player: {},
    settings: { g: -9.8 },
    respawn: function (x, y, w, h, jumpHeight, accTime, decelTime, maxSpd, isTransparent = false, isVisible = false, color = '', index = -1) {
        platformer.player = { pos: [x, y], size: [w, h], isTransparent: isTransparent, isVisible: isVisible, color: color, index: index, speed: [0, 0], jumpHeight: jumpHeight, spdTime: [accTime, decelTime], maxMotionSpd: maxSpd }
    },
    plJump: function () {
        if (!platformer.isPlayerFalling()) {
            platformer.player.speed[1] = platformer.player.jumpHeight;
            return platformer.player.jumpHeight;
        } return 0
    },
    plDisp: function (show) {
        if (show) platformer.display.getContext("2d").fillStyle = platformer.player.color;
        else platformer.display.getContext("2d").fillStyle = platformer.bgc;
        platformer.display.getContext("2d").fillRect(platformer.player.pos[0], platformer.player.pos[1], platformer.player.size[0], platformer.player.size[1]);
    },
    plMove: function (dir) {
        platformer.plDisp(false);
        platformer.player.speed[0] = platformer.player.maxMotionSpd * (dir == 'right' ? 1 : -1);
        platformer.player.pos[0] = Math.floor(platformer.player.pos[0] + platformer.player.speed[0]);
        for (let i = 0; i < platformer.map.length; i++) {
            var c = platformer.solve(platformer.collison('player', i), 'player', i);
        }
        platformer.plDisp(true);
        return platformer.player.pos[0];
    },
    isPlayerFalling: function () {
        platformer.player.pos[1] -= 1
        var f = 0;
        for (let i = 0; i < platformer.map.length; i++) {
            var a = platformer.collison('player', i);
            if (a[1] < 0 && a[3] < 0) f++;
        }
        return !(f)
    },
    plFall: function (t) {
        var r = platformer.isPlayerFalling();
        if (r) {
            platformer.plDisp(false);
            platformer.player.speed[1] += platformer.settings.g;
            platformer.player.pos[1] = Math.floor(platformer.player.pos[1] + platformer.player.speed[1]);
            for (let i = 0; i < platformer.map.length; i++) platformer.solve(platformer.collison('player', i), 'player', i);
            platformer.plDisp(true);
            return platformer.player.pos[1]
        } return platformer.player.pos[1]
    },
    getLowestIndex: function (start = -1) {
        var arr = [];
        for (let i = 0; i < platformer.map.length; i++) {
            arr[i] = platformer.map[i].index;
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < start) arr.splice(i, 1);
        }
        if (platformer.player.index >= start && platformer.player.index < arr.min()) return platformer.player.index;
        else return arr.min;
    },
    displayAll: function () {
        platformer.display.getContext("2d").fillStyle = platformer.bgc;
        platformer.display.getContext("2d").fillRect(0, 0, platformer.display.width, platformer.display.height);
        platformer.display.getContext("2d").fillStyle = platformer.player.color;
        platformer.display.getContext("2d").fillRect(platformer.player.pos[0], platformer.player.pos[1], platformer.player.size[0], platformer.player.size[1]);
        for (let i = 0; i < platformer.map.length; i++) {
            platformer.getLowestIndex(i);
            if (platformer.map[i].color) platformer.display.getContext("2d").fillStyle = platformer.map[i].color;
            if (platformer.map[i].type = 'square') {
                if (platformer.map[i].isVisible) platformer.display.getContext("2d").fillRect(platformer.map[i].pos[0], platformer.map[i].pos[1], platformer.map[i].size[0], platformer.map[i].size[1]);
            } else if (platformer.map[i].type = 'circle') {
                if (platformer.map[i].isVisible) platformer.display.getContext("2d").fillRect(platformer.map[i].pos[0], platformer.map[i].pos[1], platformer.map[i].radius, 0, 2 * pi);
            }
        }
    },
    setDisplay: function (canvas, bgc, displayMode = 'partial') {
        platformer.display = canvas;
        platformer.bgc = bgc;
        platformer.displayMode = displayMode;
    },
    collison: function (i1, i2) {
        if (i1 == 'player') obj1 = platformer.player;
        else obj1 = platformer.map[i1];
        if (!obj1.isTransparent && !platformer.map[i2].isTransparent) {
            var x1 = obj1.pos[0] - (platformer.map[i2].pos[0] + platformer.map[i2].size[0]);
            var x2 = platformer.map[i2].pos[0] - (obj1.pos[0] + obj1.size[0]);
            var y1 = obj1.pos[1] - (platformer.map[i2].pos[1] + platformer.map[i2].size[1]);
            var y2 = platformer.map[i2].pos[1] - (obj1.pos[1] + obj1.size[1]);
            return [x1, y1, x2, y2]
        }
    },
    solve: function (coords, i1, i2 = undefined) {
        if (coords.max() < 0) {
            if (i1 == 'player') obj1 = platformer.player;
            else obj1 = platformer.map[i1];
            var m = coords.max();
            if (platformer.display && platformer.displayMode == 'partial') {
                if (obj1.isVisible) {
                    platformer.display.getContext("2d").fillStyle = platformer.bgc;
                    platformer.display.getContext("2d").fillRect(obj1.pos[0], obj1.pos[1], obj1.size[0], obj1.size[1]);
                }
                if (i2 && platformer.map[i2].isVisible) {
                    platformer.display.getContext("2d").fillStyle = platformer.bgc;
                    platformer.display.getContext("2d").fillRect(platformer.map[i2].pos[0], platformer.map[i2].pos[1], platformer.map[i2].size[0], platformer.map[i2].size[1]);
                }
            }
            if (isMultipleOf(coords.indexOf(m), 2)) obj1.pos[1] += (isMultipleOf(coords.indexOf(m), 4) ? -coords[1] : -coords[3]);
            else obj1.pos[0] += (isMultipleOf(coords.indexOf(m), 3) ? -coords[0] : -coords[2]);
            if (platformer.display && platformer.displayMode == 'partial') {
                if (obj1.color) platformer.display.getContext("2d").fillStyle = obj1.color;
                if (obj1.isVisible) platformer.display.getContext("2d").fillRect(obj1.pos[0], obj1.pos[1], obj1.size[0], obj1.size[1]);
                if (platformer.map[i2].color) platformer.display.getContext("2d").fillStyle = platformer.map[i2].color;
                if (platformer.map[i2].isVisible) platformer.display.getContext("2d").fillRect(platformer.map[i2].pos[0], platformer.map[i2].pos[1], platformer.map[i2].size[0], platformer.map[i2].size[1]);

            }
        }
        return obj1.pos
    },
    buildSquare: function (x, y, w, h, isTransparent = false, isVisible = false, isDeadly = false, color = '', index = platformer.map.length) {
        platformer.map[platformer.map.length] = { type: 'square', pos: [x, y], size: [w, h], isTransparent: isTransparent, isVisible: isVisible, isDeadly: isDeadly, color: color, index: index };
        if (platformer.display && platformer.displayMode == 'partial') {
            if (color) platformer.display.getContext("2d").fillStyle = color;
            if (isVisible) platformer.display.getContext("2d").fillRect(x, y, w, h);
        }
        return platformer.map[platformer.map.length - 1];
    },
    buildCircle: function (x, y, r, isTransparent = false, isVisible = false, isDeadly = false, color = '', index = platformer.map.length) {
        platformer.map[platformer.map.length] = { type: 'circle', pos: [x, y], radius: r, isTransparent: isTransparent, isVisible: isVisible, isDeadly: isDeadly, color: color, index: index };
        if (platformer.display && platformer.displayMode == 'partial') {
            if (color) platformer.display.getContext("2d").fillStyle = color;
            if (isVisible) platformer.display.getContext("2d").arc(x, y, r, 0, 2 * Math.PI), platformer.display.getContext("2d").stroke();
        }
        return platformer.map[platformer.map.length - 1];
    },
    prepBroad: function () {

    }
};
//2D block game handler
var tiled = {
    texture: { size: 8, pos: (x, y) => [texture.size * x, texture.size * y], },//outdated
    blocks: [],
    map: [],
    loaded: [],
    settings: {},
    render: { distance: 0, tool: undefined },
    metadata: { region: [] },
    getBlockId: function (block) {
        var t = -1;
        for (let i = 0; i < tiled.blocks.length; i++) {
            if (block == tiled.blocks[i].name) {
                t = i;
                i = tiled.blocks.length;
            }
        }
        return t
    },
    getChunkId: function (coordinates) {
        var c = -1;
        for (let i = 0; i < tiled.map.length; i++) {
            if (tiled.map[i].pos == coordinates.toString()) c = i, i = tiled.map.length;
        }
        return c
    },
    entityCollide: function (coords, size, layer) {
        for (let y = Math.floor(coords[0] - size / 2); y < Math.ceil(coords[0] + size / 2); y++) {
            for (let x = Math.floor(coords[0] - size / 2); x < Math.ceil(coords[0] + size / 2); x++) {

            }
        }
    },
    Setup: function (subLevels, layers, chkSize, blockSize, pxlSize, dataDef, type = []) {
        tiled.settings.subLevels = subLevels;
        tiled.settings.layers = layers;
        tiled.settings.dataDef = dataDef;
        tiled.settings.typeData = type;
        tiled.settings.chunkSize = chkSize;
        tiled.settings.blockSize = blockSize;
        tiled.settings.pixelSize = pxlSize;
        var s = Object.getOwnPropertyNames(tiled.metadata);
        for (let i = 0; i < s.length; i++) {
            for (let j = 0; j < type.length; j++) {
                if (s[i] == type[j]) tiled.metadata[type[j]][tiled.metadata[type[j]].length] = dataDef[j];
            }
        }
    },
    Region: function (r) {
        tiled.metadata.region.push(r);
    },
    BuildChunk: function (coordinates, data = undefined) {
        var c = tiled.getChunkId(coordinates);
        var t = tiled.map.length;
        if (c == -1) {
            tiled.map[t] = {
                data: [], pos: coordinates, meta: [], raw: []
            };
            for (let i = 0; i < tiled.settings.layers; i++) tiled.map[t].data[i] = [], tiled.map[t].raw[i] = [];
            if (data != undefined) { var a = tiled.EditChunk(coordinates, data); return [tiled.map[t], a]; }
            else return tiled.map[t]
        } else return c
    },
    EditChunk: function (coordinates, data) {
        var t = tiled.getChunkId(coordinates);
        if (t != -1) {
            tiled.map[t].meta[tiled.map[t].meta.length] = data;
            return data
        } return coordinates
    },
    loadChunk: function (disp, coordinates, layer, isRaw = false) {
        console.log(coordinates);
        var c = tiled.getChunkId(coordinates);
        if (c != -1) {
            var s = tiled.settings.chunkSize; var b = tiled.settings.blockSize; var p = tiled.settings.pixelSize; var chkData;
            if (isRaw) {
                chkData = tiled.map[c].raw[layer];
            } else {
                //console.log(c);
                chkData = tiled.map[c].data[layer];
            }
            var dat = disp.getContext("2d").createImageData(s * b * p, s * b * p);
            for (let subL = 0; subL < chkData.length; subL++) {
                for (let y = 0; y < chkData[subL].length; y++) {
                    for (let x = 0; x < chkData[subL][y].length; x++) {
                        if (typeof (tiled.blocks[0]) == "object") {
                            if (!tiled.blocks[chkData[subL][y][x]].random) {
                                var t = tiled.blocks[chkData[subL][y][x]].texture;
                                if (typeof (t[1]) == 'object') {
                                    var seed = rand.seed;
                                    rand.setup(1 / t[0]);
                                    for (let my = 0; my < b; my++) {
                                        for (let mx = 0; mx < b; mx++) {
                                            var clr = t[1];
                                            var a = rand.lcg();
                                            var sum = a;
                                            var r = [];
                                            for (let i = 2; i < t.length; i++) {
                                                if (sum >= 1 - t[i][1]) {
                                                    clr = t[i][0];
                                                    i = t.length;
                                                } else {
                                                    sum += a;
                                                }
                                            }
                                            //scale up
                                            for (let dy = 0; dy < p; dy++) {
                                                for (let dx = 0; dx < p; dx++) {
                                                    dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 0] = clr[0];
                                                    dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 1] = clr[1];
                                                    dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 2] = clr[2];
                                                    dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 3] = clr[3];
                                                }
                                            }
                                        }
                                    }
                                    rand.setup(seed);
                                } else {
                                    //var t = texture.pos(t[0], t[1]);
                                    //disp.getContext("2d").drawImage(image, t[0], t[1], texture.size, texture.size, 8 * x, 8 * y, 8, 8);
                                }

                            } else {
                                var t = tile.blocks[coords.medium[y][x]].texture;
                                var img = ctx.createImageData(32, 32);
                                var ttr = [];
                                for (let my = 0; my < 8; my++) {
                                    for (let mx = 0; mx < 8; mx++) {
                                        var clr = t[0];
                                        var a = rand.lcg();
                                        var sum = a;
                                        var r = [];
                                        for (let i = 1; i < t.length; i++) {
                                            if (sum >= 1 - t[i][1]) {
                                                clr = t[i][0];
                                                i = t.length;
                                            } else {
                                                sum += a;
                                            }
                                        }
                                        //scale up
                                        for (let dy = 0; dy < 4; dy++) {
                                            for (let dx = 0; dx < 4; dx++) {
                                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy] = clr[0];
                                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 1] = clr[1];
                                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 2] = clr[2];
                                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 3] = clr[3];
                                            }
                                        }
                                        r.push(clr);
                                    }
                                    ttr.push(r);
                                }
                                disp.getContext("2d").putImageData(img, 32 * x, 32 * y);
                            }
                        } else {
                            var clr = Math.round(256 * chkData[subL][y][x]);
                            for (let my = 0; my < b; my++) {
                                for (let mx = 0; mx < b; mx++) {
                                    for (let dy = 0; dy < p; dy++) {
                                        for (let dx = 0; dx < p; dx++) {
                                            dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 0] = clr;
                                            dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 1] = clr;
                                            dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 2] = clr;
                                            dat.data[s * (b ** 2) * (p ** 2) * 4 * y + s * b * (p ** 2) * 4 * my + s * b * p * 4 * dy + b * p * 4 * x + p * 4 * mx + 4 * dx + 3] = 255;
                                        }
                                    }
                                }
                            }

                        }

                    }
                }
            }
            tiled.loaded.push({ pos: coordinates, img: dat });
            return { pos: coordinates, img: dat }
        } return 0
    },
    render: function (disp, dist) {
        disp.width = 50 * 32 * (2 * dist + 1);
        disp.height = 50 * 32 * (2 * dist + 1);
        var ctx = disp.getContext("2d");
    },
    smoothen: function (cords, layer, subLevel) {
        var a = []; var i = 0;
        for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
                a[i] = tiled.getChunkId([cords[0] + y, cords[1] + x]);
                i++;
            }
        }
        if (a.min() != -1) {
            var arr = [[[], [], []], [[], [], []], [[], [], []]];
            var i = 0;
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    arr[x][y] = tiled.map[a[i]].raw[layer][subLevel];
                    i++;
                }
            }
            arr = hyperBilinInterp(arr, 0.2);
            return arr;
        }
    },
    Fill: function (coordinates, layer, subLevel, data, partial = false) {
        var c = tiled.getChunkId(coordinates);
        if (c != -1) {
            var p = 256; var t = -1; var from = -1;
            if (tiled.metadata.region.length > 0) {
                for (let i = 0; i < tiled.metadata.region.length; i++) {
                    if (tiled.metadata.region[i].name == tiled.map[c].meta[i].from) from = i, i = tiled.metadata.region.length;
                }
                for (let i = 0; i < tiled.map[c].meta.length; i++) {
                    if (tiled.metadata.region[from].type == 'generative' && tiled.metadata.region[from].priority < p) p = tiled.metadata.region[from].priority, t = i;
                }
                var arr = [];
                if (!partial) {
                    for (let y = 0; y < data.length; y++) {
                        var a = [];
                        for (let x = 0; x < data[y].length; x++) {
                            for (let i = 0; i < tiled.map[c].meta[t].depth[layer][subLevel].length; i++) {
                                if (tiled.map[c].meta[t].depth[layer][subLevel][i][0] >= data[y][x]) a.push(tiled.getBlockId(tiled.map[c].meta[t].depth[layer][subLevel][i][1])), i = Infinity;
                            }
                        }
                        arr.push(a);
                    }
                    tiled.map[c].data[layer][subLevel] = arr;
                    return tiled.map[c].data[layer][subLevel]
                } else {
                    tiled.map[c].raw[layer][subLevel] = data;
                    return tiled.map[c].raw[layer][subLevel]
                }
            } else {
                if (!partial) {
                    tiled.map[c].data[layer][subLevel] = data;
                    return tiled.map[c].data[layer][subLevel]
                } else {
                    tiled.map[c].raw[layer][subLevel] = data;
                    return tiled.map[c].raw[layer][subLevel]
                }
            }
        } else return coordinates
    },
    Filter: function (chunk, array) {
        var a = 1;
        var p = Object.getOwnPropertyNames(chunk.meta);
        var c = -1;
        for (let i = 0; i < p.length; i++) {
            if (chunk.meta[p[i]]) return c = i;
        };
        if (chunk.meta[p])
            for (let y = 0; y < 50; y++) {
                var r = [];
                for (let x = 0; x < 50; x++) {
                    var a = Math.floor(mix(0, blocks.length, rand.map.smoothed[y][x]));
                    r.push(a);
                }
                coords.medium.push(r);
            }
    },
    /*genRegFill: function (data, regDat, l, s) {
        for (let y = 0; y < data.length; y++) {
            for (let x = 0; x < data[x].length; x++) {
                for (let i = 0; i < regDat[l][s].length; i++) {
                    if (regDat[l][s][i][0] >= data[x][y]) data[x][y] = tiled.getBlockId(regDat[l][s][i][1]);
                }
            }
        }
    },*/
    World: function (size, generator = rand.gen2D) {
        //important: c
        rand.grdRand(2 * size + 3, 2 * size + 3);
        console.info('Hold on.. generating world..');
        console.time('Done!');
        //Preload and raw fill chunks for radius = n+1
        for (let y = -size - 1; y < size + 2; y++) {
            for (let x = -size - 1; x < size + 2; x++) {
                this.BuildChunk([y, x]);
            }
        }
        for (let i = 0; i < tiled.metadata.region.length; i++) {
            var arrey = generator(2 * size + 3, 2 * size + 3, true, 16);
            var arr = [];
            var b = rand.int(0, tiled.metadata.region.length + 1);
            for (let j = 0; j < arrey.length; j++) {
                arr.push(arrey[j].map(function (x) { if (x > tiled.metadata.region[i].size) b = rand.int(0, tiled.metadata.region.length + 1); return b }));
            }
            console.log(arr);
            for (let y = -size - 1; y < size + 2; y++) {
                for (let x = -size - 1; x < size + 2; x++) {
                    tiled.EditChunk([y, x], tiled.metadata.region[i].data[arr[y + size + 1][x + size + 1]]);
                }
            }
        }
        //Prepare array for fill.
        for (let y = -size - 1; y < size + 2; y++) {
            for (let x = -size - 1; x < size + 2; x++) {
                for (let l = 0; l < tiled.settings.layers; l++) {
                    for (let s = 0; s < tiled.settings.subLevels; s++) {
                        //var arr = rand.polygen2D(x + size + 1, y + size + 1, tiled.settings.chunkSize, tiled.settings.chunkSize);
                        var arr = generator(tiled.settings.chunkSize, tiled.settings.chunkSize);
                        tiled.Fill([y, x], l, s, arr, true);
                    }
                }
            }
        }
        for (let y = -size; y < size + 1; y++) {
            for (let x = -size; x < size + 1; x++) {
                for (let l = 0; l < tiled.settings.layers; l++) {
                    for (let s = 0; s < tiled.settings.subLevels; s++) {
                        var arr = tiled.smoothen([y, x], l, s); arr = arr[1][1];
                        //var arr = tiled.map[tiled.getChunkId([y, x])].raw[l][s];
                        tiled.Fill([y, x], l, s, arr);
                    }
                }
            }
        }
        //Smooth and complete fill for radius = n
        console.timeEnd('Done!');
    }
};
//Interactive typing
var text = {
    lps: 15,
    to: "undefined",
    letter: function (ltr) { this.to += ltr; },
    pointer: 0,
    string: [],
    startSay: function (str) { this.to = ''; text.pointer = 0; text.string = str.split(''); text.say(); },
    say: function () { if (text.string.length > text.pointer) text.letter(text.string[text.pointer]); effect(); text.pointer++; setTimeout(text.say, 1000 / text.lps); }
};
//(cursor) motions
var cursor = {
    enable: false,
    x: 1,
    y: 1
};
//keyboard
var key = {
    spd: 5,
    enable: false,
    restrict: false,
    addKey: function (key, action, param = void ("")) {
        this.setKeyVal(key);
        this.setKeyAct(key, action);
        this.setKeyPar(key, param)
    },
    setKeyVal: function (k) { key.state[key.state.length] = k; key.val[k] = false; },
    setKeyAct: function (k, act) { key.act[k] = act; },
    setKeyPar: function (k, par) { key.par[k] = par },
    restrictions: function (x1, x2, y1, y2) {
        key.border.xMin = x1; key.border.xMax = x2; key.border.yMin = y1; key.border.yMax = y2; key.restrict = true;
    },
    border: { xMin: 0, xMax: 1, yMin: 0, yMax: 1 },
    pos: { x: 0, y: 0 },
    state: [],
    val: {},
    act: {},
    par: {},
    action: function () {
        var t = 0;
        if (key.enable) {
            for (let t = 0; t < key.state.length; t++) {
                i = key.val[key.state[t]];
                if (i == true) { key.act[key.state[t]](key.par[key.state[t]]); }
            }
            if (key.restrict) {
                if (key.border.xMin >= key.pos.x) key.pos.x = key.border.xMin;
                else if (key.border.xMax <= key.pos.x) key.pos.x = key.border.xMax;
                if (key.border.yMin >= key.pos.y) key.pos.y = key.border.yMin;
                else if (key.border.yMax <= key.pos.y) key.pos.y = key.border.yMax;
            }
        }
    }
};
document.addEventListener("keydown", function (e) {
    e = e || event; // to deal with IE
    key.val[e.code] = e.type == 'keydown';
});
document.addEventListener("keyup", function (e) {
    e = e || event; // to deal with IE
    key.val[e.code] = e.type == 'keydown'
    if (event.code == "Escape") { pause() }
});
function load() { if (key.enable) keymotion(); }
document.addEventListener("mousemove", function (e) {
    if (cursor.enable) { }
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    if (cursor.enable) { }
});