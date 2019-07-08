const dir = require('../config/app-config').APP.FILES_DIR;

const Promise = require('bluebird');
const _ = require('lodash');
const fs = require('fs');

const code = 400;
const ket_qua_prefix = 'KetQua_';

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, filenames) => {
        if (err) {
          resolve({code: 404, msg: 'Khong co exam nao'});
          return;
        }
        const ketQuaFiles = filenames
          .filter(n => n.includes(ket_qua_prefix))
          .map(n => n.substring(ket_qua_prefix.length));

        const check = (n) => !n.includes(ket_qua_prefix) && !ketQuaFiles.includes(n);

        filenames = filenames
          .filter(check)
          .map(n => n.replace('.json', ''));
        resolve(filenames);
      });
    });
  },

  saveExamResult: (name, data) => {
    return new Promise((resolve, reject) => {
      const file = `${dir}/${ket_qua_prefix}${name}.json`;
      fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) {
          resolve({code: 404, msg: 'Khong luu duoc exam nay'});
          return;
        }
        resolve('ok');
      });
    });
  },

  findByName: (name) => {
    name = name + ".json";
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, filenames) => {
        const msg = `Loi khi tim exam trong danh sach`;
        if (err) {
          resolve({code, msg});
          return;
        }

        if (_.isUndefined(filenames)) {
          resolve({code, msg});
          return;
        }

        const found = filenames.find(n => n === name);
        if (!found) {
          resolve({code, msg: `Khong tim thay exam ${name} `});
        }

        const file = `${dir}/${ket_qua_prefix}${name}`;

        if (fs.existsSync(file)) {
          resolve({code: 404, msg: `${name} da duoc thi roi`});
        }
        fs.readFile(dir + "/" + name, "utf8", (err, data) => {
          if (err) {
            resolve({code, msg: `Loi khi doc exam ${name}`});
            return;
          }
          resolve(JSON.parse(data));
        });
      });
    });
  }
}
