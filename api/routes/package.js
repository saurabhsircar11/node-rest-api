//i execPromise from "../../generatorFiles/execPromise";

const express = require('express');
const router = express.Router();
const execPromise = require("../../generatorFiles/execPromise");
let path = require('path');
let fileGeneration = require('../../generatorFiles/fileGeneration')
let fs = require('fs');
let fse = require('fs-extra');
let config = require('../../config.json');

router.post('/createPackage', (req, res, next) => {
    let packageName = req.body.packageName;
    let parentDir = path.resolve(process.cwd());
    let command='';
    let cmdPath='';
    if(fs.existsSync(parentDir+'/skeleton-proj'))
    {
        command ='git pull origin master'
        cmdPath=parentDir+'/skeleton-proj'
    }
    else {
        command='git clone https://github.com/saurabhsircar11/skeleton-proj.git'
        cmdPath=parentDir
    }
    execPromise(command, cmdPath).then((stdout) => {
        try {

            fse.copySync(parentDir + '/skeleton-proj', parentDir + '/generatedPackage/' + packageName);
            fileGeneration.fileGenerationEnvironments(parentDir + '/generatedPackage', packageName);
            let packageJson = fileGeneration.writingPackageJson(parentDir + '/generatedPackage', packageName, req.body.additionalPackages);
            fs.writeFileSync(parentDir + '/generatedPackage' + '/' + packageName + '/package.json', JSON.stringify(packageJson));
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e})
            return
        }
        execPromise(`zip -r ${packageName}.zip ${packageName}`, parentDir + '/generatedPackage').then((stdout) => {
            fse.remove(parentDir + '/generatedPackage/' + packageName, err => {
                if (err) return console.error(err)

                console.log('success!')
            });
            res.status(200).json({
                message: "created"
            })
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error
            })
        })

    }).catch((error) => {
        res.status(500).json({
            message: error
        })
    })

});


router.get('/download/:packageName', (req, res) => {
    try {
        let packageName = req.params.packageName;
        console.log(packageName);
        let parentDir = path.resolve(process.cwd());
        let folder = parentDir + '/generatedPackage/' + packageName + '.zip';
        console.log(folder);
        res.download(folder);
    } catch (e) {
        res.status(404).json(
            {message: e}
        )

    }
});

router.get('/additionalPackages', (req, res) => {
    let dependecyArray = Object.keys(config.additionalDependencies);
    dependecyArray = dependecyArray.map((items) => {
        return {
            dependencyName: items,
            isChecked: false
        }
    })
    res.status(200).json({
        additionalPackages: dependecyArray,
    })
})

module.exports = router;