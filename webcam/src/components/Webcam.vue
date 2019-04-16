<template>
  <div>
    <video ref="video" id="video" autoplay muted="muted" style="max-height: 500px;"></video>
    <canvas ref="canvas" id="canvas"></canvas>
    <img ref="img" id="img">
    <button type="button" @click="capture">Capture</button>
    <button type="button" @click="searchTerm">Axios</button>
  </div>
</template>

<script>
export default {
  name: 'webcam',
  data () {
    return {
      // video element
      video: {},
      // canvas element
      canvas: {},
      // 2d context
      canvasCtx: {},
      captures: [],
      active: false
    }
  },
  mounted () {
    console.log('webcam2 mounted')
    this.canvas = this.$refs.canvas
    this.canvasCtx = this.canvas.getContext('2d')
    // this.canvasCtx.scale(1.5, 1.5)
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('navigator.mediaDevices.getUserMedia is available')
      // var useBackCamera = true
      // const facingMode = useBackCamera ? { exact: 'environment' } : 'user'
      const handleSuccess = stream => {
        if (this.$refs.video.srcObject !== undefined) {
          this.$refs.video.srcObject = stream
        } else if (this.$refs.video.mozSrcObject !== undefined) {
          this.$refs.video.mozSrcObject = stream
        } else if (window.URL.createObjectURL) {
          this.$refs.video.src = window.URL.createObjectURL(stream)
        } else if (window.webkitURL) {
          this.$refs.video.src = window.webkitURL.createObjectURL(stream)
        } else {
          this.$refs.video.src = stream
        }
        this.active = true
        // iOS play inline
        this.$refs.video.playsInline = true
        const playPromise = this.$refs.video.play()
        playPromise.catch(() => {})
        playPromise.then()
      }
      // this.decoded = facingMode
      const constraints = {
        facingMode: { ideal: 'environment' }
      }
      navigator.mediaDevices
        .getUserMedia({ video: constraints })
        .then(handleSuccess)
        .catch(() => {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(handleSuccess)
        })
    }
    this.canvans.width = this.video.width
    this.canvas.height = this.video.height
  },
  beforeDestroy () {
    this.active = false
    if (this.$refs.video && this.$refs.video.srcObject) {
      this.$refs.video.srcObject.getTracks().forEach(t => t.stop())
      console.log('stopped')
    }
  },
  methods: {
    capture () {
      this.canvasCtx.drawImage(
        this.video,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      )
      this.$refs.img.src = this.canvas.toDataURL('image/jpeg', 1)
      var inputString = this.canvas.toDataURL('image/jpeg', 1)
      var ind = inputString.indexOf(',')
      inputString = inputString.substring(ind + 1)
      var payload = {'instances': [{'b64': inputString}]}

      console.log(JSON.stringify(payload))

      // const url = 'https://127.0.0.1:8888/v1/models/adgds/versions/1:predict'
      const url = 'https://192.168.0.8:8888/v1/models/adgds/versions/1:predict'
      this.$http.post(url, JSON.stringify(payload))
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      // this.$http.post(url, {
      //   headers: {
      //     'accept': 'application/json'
      //   },
      //   body: JSON.stringify(payload)
      // })
      //   .then(function (response) {
      //     console.log(response)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    },
    searchTerm: function () {
      // using JSONPlaceholder
      const baseURI = 'https://jsonplaceholder.typicode.com'
      this.$http.get(`${baseURI}/posts`)
        .then((result) => {
          console.log(result)
          this.posts = result.data
        })
    }
  }
}
</script>

<style>
    #video {
        background-color: #000000;
        width: 100% !important;
        height: auto !important;
    }
    li {
        display: inline;
        padding: 5px;
    }
</style>
