const path = require("path");

module.exports = {
    entry: "./background-script/src/background.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "background.js",
        path: path.resolve(__dirname, "dist")
    },
    //mode: "development"
    mode: "production",
    target: "web"
};
