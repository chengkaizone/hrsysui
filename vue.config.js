let proxyObj = {};
const CompressionPlugin = require("compression-webpack-plugin");

proxyObj['/ws'] = {
	ws: true,
	target: "ws://localhost:8080"
};

proxyObj['/'] = {
	ws: false,
	//target: 'http://106.14.35.118:8081',
	target: 'http://localhost:8080',
	changeOrigin: true,
	pathRewrite: {
		'^/': ''
	}
}

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/hrsys/',

	devServer: {
		host: 'localhost',
		port: 8081,
		proxy: proxyObj
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new CompressionPlugin({
						test: /\.js$|\.html$|\.css/,
						threshold: 1024,
						deleteOriginalAssets: false
					})
				]
			}
		}
	}
}