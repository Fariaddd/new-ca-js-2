const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                signUp: resolve(__dirname, 'sign-up.html'),
                singin: resolve(__dirname, 'sing-in.html'),
                welcome: resolve(__dirname, 'welcome.html'),
                createPost: resolve(__dirname, 'create-post.html'),
                singlePost: resolve(__dirname, 'single-post.html'),
                editpost: resolve(__dirname, 'edit.post.html'),
                mypost: resolve(__dirname, 'my.post.html'),
            },
        },
    },
};
