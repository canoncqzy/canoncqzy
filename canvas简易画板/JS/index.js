let drawingBoard = {
  cavs: document.getElementById('cavs'),
  colorChoose: document.getElementById('colorChoose'),
  lineRuler: document.getElementById('lineRuler'),

  ctx: this.cavs.getContext("2d"),
  clock: false,
  imgHome: [],
  init: function() {
    this.ctx.lineCap = "round"//线条的起始的样式
    this.ctx.lineJoin = "round"//线条的转弯处圆滑一些
    this.drawing() //绘画画板
    this.btnAll() //按钮方法
  },
  drawing: function() {
    const _this = this
    const cavs = this.cavs
    const c_left = cavs.offsetLeft
    const c_top = cavs.offsetTop
    cavs.onmousedown = function (e) {
      _this.clock = true
      _this.ctx.beginPath()
      _this.ctx.moveTo(e.pageX - c_left, e.pageY- c_top)
      const imgData = _this.ctx.getImageData(0,0,_this.cavs.offsetWidth,_this.cavs.offsetHeight)
      _this.imgHome.push(imgData)
      this.onmousemove = function(e) {
        if(_this.clock) {
          _this.ctx.lineTo(e.pageX - c_left, e.pageY- c_top)
          _this.ctx.stroke()
        }
      }
      this.onmouseup = function (e) {
        _this.ctx.closePath()
        this.onmousemove = null
        _this.clock = false
      }
      this.onmouseleave = function () {
        _this.ctx.closePath()
        this.onmousemove = null
        _this.clock = false
      }
    }
  },
  btnAll: function () {
    const _this = this
    this.colorChoose.onchange = function () {
      _this.ctx.strokeStyle = this.value
    }
    this.lineRuler.onchange = function () {
      _this.ctx.lineWidth = this.value
    }
    const btnUlNode = document.getElementsByTagName('ul')[0]
    btnUlNode.onclick = function (e) {
      switch (e.target.id) {
        case "cleanBoard":
          _this.ctx.clearRect(0,0,_this.cavs.offsetWidth,_this.cavs.offsetHeight)
          break;
        case "eraser":
          _this.ctx.strokeStyle = "#fff"
          break;
        case "rescind":
          if(_this.imgHome.length) {
            _this.ctx.putImageData(_this.imgHome.pop(),0,0)
          }
          break;
      }
    }
  }
}
drawingBoard.init();