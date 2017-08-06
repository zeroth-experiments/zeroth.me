const {Nasher} = require('nasher');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
let nasher = new Nasher('./config.json');

nasher.plugin(function navigationCreator(config, meta, files) {
    meta['navigation'] = {}
    generateNavigation(config.navigations_config, 'main');
    function generateNavigation(obj, level) {
        const parent = [];
        if (obj.link && obj.text) {
            parent.push(obj);
        }
        Object.keys(obj).forEach(function (key) {
            if (obj[key].link && obj[key].text) {
                meta['navigation'][level] = meta['navigation'][level] || parent;
                meta['navigation'][level].push(obj[key]);
                generateNavigation(obj[key], key);
            }
        })
    }
});

nasher.theme(function theme(config, engine) {
    // for now consider we are sticking to handlebars
    let theme_dir = config.theme_dir;
    let theme_main_files = glob.sync(path.join(theme_dir, '!(partials|scripts|css)'));
    let theme_partials_files = glob.sync(path.join(theme_dir, 'partials', '*'));
    let theme_helpers_files = glob.sync(path.join(theme_dir, 'scripts', '*.js'));
    
    let theme_partials = theme_partials_files.reduce(function (acc, val) {
        let content = fs.readFileSync(val);
        let partial_name = path.basename(val, '.hbs');
        acc[partial_name] = content.toString();
        return acc;
    }, {});

    let theme_helpers = theme_helpers_files.reduce(function (acc, val) {
        let content = require(path.join(process.cwd(), val));
        let partial_name = path.basename(val, '.js');
        acc[partial_name] = content;
        return acc;
    }, {});


    Object.keys(theme_helpers).forEach(function (key) {
        // info(`Registering helper ${key}`);
        engine.registerHelper(key, theme_helpers[key]);
    });

    Object.keys(theme_partials).forEach(function (key) {
        engine.registerPartial(key, theme_partials[key]);
    });

    return theme_main_files.reduce(function (acc, val) {
        let content = fs.readFileSync(val).toString();
        let template_name = path.basename(val, '.hbs');
        acc[template_name] = engine.compile(content);
        return acc;
    }, {});
});

nasher.build();
