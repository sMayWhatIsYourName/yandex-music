module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: 'Yandex.Music',
                win: {
                    icon: 'src/assets/icons/win/icon.ico'
                },
                mac: {
                    icon: 'src/assets/icons/mac/icon.icns'
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
};
