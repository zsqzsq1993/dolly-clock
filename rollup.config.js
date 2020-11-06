const pkg = require('./package.json')

export default {
    input: 'src/Clock.js',

    output: [
        {file: pkg.main, format: 'umd'},
        {file: pkg.module, format: 'es'}
    ]
}
