module.exports = {
  checkKey: (keys, object) => {
    for (let key of keys) {
      if (!object[key]) {
        return key;
      }
    }
    return;
  },
};
