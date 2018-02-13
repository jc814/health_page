export default {
  hourToSecond (target) {
    var date = new Date(target)
    return date.getHours() + ':' + (date.getMinutes()) + ':' + date.getSeconds()
  }
}
