# generator-scipm

```
npm install -g yo generator-scipm
cd /pathto/myscipm/node_modules
mkdir scipm.ZZZZZ
cd /pathto/myscipm/node_modules/scipm.ZZZZZ
yo scipm
# create scipm.ZZZZZ package
cd /pathto/myscipm
#edit package.json and add local dependencies :
# "scipm.ZZZZZ": "./node_modules/scipm.ZZZZZ"
npm install
scipm build
# restart SciTE
```