// TSDX does not currently support multiple entry files out of the box,
// so we need to overwrite the Rollup config
// Ref: https://github.com/formium/tsdx/issues/175#issuecomment-564814325

module.exports = {
  rollup(config) {
    const outputDir = process.cwd() + '/dist/';
    const extension = config.output.file.match(/.+(\..+\..+)$/)[1];
    const filename = config.input.match(/^src\/(.+)\..+$/)[1]; // remove `src/` and extension

    config.output.file = outputDir + filename + extension;
    // replace / with __ for UMD names
    config.output.name = filename.replace('/', '__');
    return config;
  },
};
