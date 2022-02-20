// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
//import { InstApi } from "../../apis/inst.api.js";
import { BoybabyApi } from "../../apis/boybaby.api.js";
import { GirlbabyApi } from "../../apis/girlbaby.api.js";
import { BarApi } from "../../apis/bar.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    setTimeout(()=>{
      this.Base.setMyData({show:1})
    },1500)

    this.Base.setMyData({ asd: true})
 
  }
  onMyShow() {
    var that = this;
    //var instapi = new InstApi();
    var boybaby = new BoybabyApi();
    var girlbaby = new GirlbabyApi();
    var bar =new BarApi();

    // instapi.indexbanner({}, (indexbanner) => {
    //   this.Base.setMyData({ indexbanner });
    //  });
    boybaby.boybabylist({}, (boybabylist) => {
      this.Base.setMyData({ boybabylist });
    });

    girlbaby.girlbabylist({}, (girlbabylist) => {
      this.Base.setMyData({ girlbabylist });
    });

    bar.barlist({}, (bairlist) => {
      this.Base.setMyData({ bairlist });
    });

  }
  onCon() {
  
    var sex = this.Base.options.sex;
    var arr;
    if (sex == 'nan') {
      console.log("男的");
      arr = this.Base.getMyData().boybabylist;
    }
    else {
      console.log("女的");
      arr = this.Base.getMyData().girlbabylist;
    }

    console.log(arr);
    this.Base.setMyData({ name: arr[Math.floor((Math.random() * arr.length))], asd: false})

    
    
  }
  
  onDon() {
    wx.reLaunch({
      url: '/pages/index/index'
    })

  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.onCon = content.onCon;
body.onDon=content.onDon;
Page(body)

