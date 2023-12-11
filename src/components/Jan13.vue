<template>
  <div>
    <v-row justify="center">
      <v-col cols="6">
        <h2>JANコード(JAN-13)作成ツール</h2>
        <v-card>
          <v-card-text>
            <div>
              <v-text-field label="12桁のコードを入力(チェックデジットは自動計算)" outlined v-model="barcodeValue"></v-text-field>

              <!-- 入力値が12桁の場合 -->
              <div v-show="this.barcodeValue.length == 12">
                <barcode hidden v-bind:value="barcodeValue" format="EAN13" :width="width" :height="height">
                  入力値が正しくありません
                </barcode>
                <img src="" id="converted-image">
                <v-btn @click="copytoclp">クリップボードにコピー(png)</v-btn>
              </div>

              <!-- 入力値が12桁以外の場合 -->
              <div v-show="this.barcodeValue.length != 12">
                <h3>入力値が不正です</h3>
              </div>

              <div>
                <v-subheader>幅 {{ width }}</v-subheader>
                <v-slider hide-details max="5" min="1" v-model="width"></v-slider>
                <v-subheader>高さ {{ height }}</v-subheader>
                <v-slider hide-details max="200" min="25" v-model="height"></v-slider>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VueBarcode from 'vue-barcode';

export default {
  name: "Jan13",
  components: {
    'barcode': VueBarcode
  },
  data() {
    return {
      barcodeValue: '4997613',
      width: 2,
      height: 100,
    }
  },
  methods: {
    dosvg2img() {
      this.svg2imageData(document.getElementsByClassName('vue-barcode-element')[0], function (data) {
        console.log(data);
        document.getElementById('converted-image').src = data;
      }, function (error) {
        console.log(error);
        alert('failed to convert');
      });
    },
    svg2imageData(svgElement, successCallback, errorCallback) {
      console.log(svgElement)
      var canvas = document.createElement('canvas');
      canvas.width = svgElement.width.baseVal.value;
      canvas.height = svgElement.height.baseVal.value;
      var ctx = canvas.getContext('2d');
      var image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        successCallback(canvas.toDataURL());
      };
      image.onerror = (e) => {
        errorCallback(e);
      };
      var svgData = new XMLSerializer().serializeToString(svgElement);
      image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svgData);
    },
    async copytoclp() {
      const img = document.getElementById("converted-image");
      const responsePromise = await fetch(img.src);
      const blob = responsePromise.blob();
      const data = [new ClipboardItem({ "image/png": blob })];

      navigator.clipboard.write(data).then(
        () => { console.log("success"); },
        (msg) => { console.log(`fail: ${msg}`); }
      );
    }
  },
  mounted() {
  },
  watch: {
    barcodeValue: function () {
      setTimeout(() => {
        this.dosvg2img()
      }, 50);
    },
    width: function () {
      setTimeout(() => {
        this.dosvg2img()
      }, 50);
    },
    height: function () {
      setTimeout(() => {
        this.dosvg2img()
      }, 50);
    }
  }
}
</script>