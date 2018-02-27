export default {
  commasRemove (target) {
    if (target.substr(0, 1) === ',') {
      target = target.substr(1)
    }
    if (target.substr(-1, 1) === ',') {
      target = target.substr(0, target.length - 1)
    }
    return target
  }
}
