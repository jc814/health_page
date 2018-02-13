export default {
  commasRemove (target) {
    var result
    if (target.substr(0, 1) === ',') {
      result = target.substr(1)
    }
    if (result.substr(-1, 1) === ',') {
      result = result.substr(0, result.length - 1)
    }
    return result
  }
}
