let config = require('../config.json');
let fs = require('fs');
let _ = require('lodash')

function fileGenerationEnvironments(path, projectName) {
    fs.writeFile(path + '/' + projectName + '/' + '.env.development', '', ((err) => {
        if (err) throw err;
        else {
            console.log('.env.development created');
        }

    }));

    fs.writeFile(path + '/' + projectName + '/' + '.env.demo', '', ((err, stdout) => {
        if (err) throw err;
        else {
            console.log('.env.demo created')
        }

    }));

    fs.writeFile(path + '/' + projectName + '/' + '.env.qa', '', ((err, stdout) => {
        if (err) throw err;
        else {
            console.log('.env.qa created')
        }

    }));


    fs.writeFile(path + '/' + projectName + '/' + '.env.production', '', ((err, stdout) => {
        if (err) throw err;
        else {
            console.log('.env.production created')

        }
    }));
}


function writingPackageJson(path, projectName, packageList) {
    let rawData = fs.readFileSync(path + '/' + projectName + '/' + 'package.json');
    let packageJsonData = JSON.parse(rawData);
    let requiredDependencies = config.defaultDependencies;
    packageJsonData.name = projectName;
    packageJsonData.scripts.qaDebug = "env-cmd .env.qa react-scripts start";
    packageJsonData.scripts.qaBuild = "env-cmd .env.qa react-scripts build";
    packageJsonData.scripts.demoDebug = "env-cmd .env.demo react-scripts start";
    packageJsonData.scripts.demoBuild = "env-cmd .env.demo react-scripts build";
    packageJsonData.dependencies = Object.assign(packageJsonData.dependencies, requiredDependencies);
    addPromiseMiddleWare(packageJsonData, packageList);
   // addSass(packageJsonData, packageList);
    addRedux(packageJsonData, packageList);
    addRxJs(packageJsonData, packageList);
    addSaga(packageJsonData, packageList);
    addObservable(packageJsonData, packageList);
    addReduxThunk(packageJsonData, packageList);
    addFirebase(packageJsonData, packageList);
    return packageJsonData

}

function getSearchedLib(packageList, libName) {
    return packageList.filter((items) => {
        return items.dependencyName === libName
    })
}

function addSass(packageJson, packageList) {
    let sass = config.additionalDependencies.sass;
    if (_.first(getSearchedLib(packageList, 'sass')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, sass)
    }
}

function addFirebase(packageJson, packageList) {
    let firebase = config.additionalDependencies.firebase;
    if (_.first(getSearchedLib(packageList, 'firebase')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, firebase)
    }

}

function addRedux(packageJson, packageList) {
    let redux = config.additionalDependencies.redux
    if (_.first(getSearchedLib(packageList, 'redux')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, redux)
    }
}

function addReduxThunk(packageJson, packageList) {
    let reduxThunk = config.additionalDependencies.reduxThunk;
    if (_.first(getSearchedLib(packageList, 'reduxThunk')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, reduxThunk)
    }
}

function addObservable(packageJson, packageList) {
    let reduxObservable = config.additionalDependencies.reduxObservable;
    if (_.first(getSearchedLib(packageList, 'reduxObservable')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, reduxObservable)
    }
}


function addSaga(packageJson, packageList) {
    let reduxSaga = config.additionalDependencies.reduxSaga;
    if (_.first(getSearchedLib(packageList, 'reduxSaga')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, reduxSaga)
    }
}


function addPromiseMiddleWare(packageJson, packageList) {
    let reduxPromiseMiddleware = config.additionalDependencies.reduxPromiseMiddleware;
    if (_.first(getSearchedLib(packageList, 'reduxPromiseMiddleware')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, reduxPromiseMiddleware)
    }
}

function addRxJs(packageJson, packageList) {
    let rxJs = config.additionalDependencies.rxJs;
    if (_.first(getSearchedLib(packageList, 'rxJs')).isChecked) {
        packageJson.dependencies = Object.assign(packageJson.dependencies, rxJs);
    }
}

module.exports = {fileGenerationEnvironments, writingPackageJson}