let exec = require('child_process').exec;

function execPromise(cmd, cwd) {
    return new Promise(function (resolve, reject) {
        exec(cmd, {cwd: cwd,maxBuffer:1024*1024*10}, function (err, stdout) {
            console.log(cwd);
            if (err) {
                return reject(err)
            }

            resolve(stdout);
        });
    });
}

module.exports = execPromise;