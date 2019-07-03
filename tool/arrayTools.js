;
const ArrayTools = {
  isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  },
  clone(arr) {
    return JSON.parse(JSON.stringify(arr)) 
  },
  filterTree(arr, val) {
    let node = []
    arr.map(item => {
      if (item.text.indexOf(val) >= 0) {
        node.push(item)
        return
      }
      if (item.children && item.children.length > 0) {
        let child = this.filterTree(item.children, val)
        if (child.length > 0) {
          item.children = child
          node.push(item)
        }
        return
      }
      return
    })
    return node
  },
  mergeRemoveSame() {
    var arr = Array.prototype.slice.apply(arguments)
    arr = arr.reduce(function (x, y) {
      return x.concat(y)
    })
    arr = arr.filter(function (ele, index, self) {
      return self.indexOf(ele) === index
    })
    return arr
  },
  mergeGetOnly() {
    var arr = Array.prototype.slice.apply(arguments)
    arr = arr.reduce(function (x, y) {
      return x.concat(y)
    })

    arr = arr.filter(function (ele, index, self) {
      var canReturn = self.includes(ele, index + 1) || self.indexOf(ele) !== index
      return !canReturn
    })
    return arr
  },
  sort(arr, type) {
    if (type === undefined) {
      return arr.sort()
    }
    if (type === 'number') {
      return arr.sort((x, y) => {
        return x - y
      })
    }
    if (type === 'ignoreCase') {
      arr = arr.map(item => item.toLowerCase())
      return arr.sort()
    }
    
  }


}
