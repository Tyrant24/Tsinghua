// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = true;
    this.Base.setMyData({
      tempFilePath:''
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    // instapi.indexbanner({}, (indexbanner) => {
    //   this.Base.setMyData({ indexbanner });
    // }); 
  }
  click(e){
    var that =this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0];
   
        that.Base.setMyData({
          tempFilePaths
        })
      }
    })
  }
  // 3974bea706fff95c8e3e417cfb909281_210813164737_1500588324.pdf
  open(e){
    console.log("走没走",'https://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/tsinghua/yuyue/'+this.Base.getMyData().path);
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'https://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/tsinghua/yuyue/'+this.Base.getMyData().path,
      showMenu:true,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功',res)
          },
          fail: function (res) {
            console.log('失败',res)
          }
        })
      },
      fail: function (res) {
        console.log('失败',res)
      }
    })
  }

  upload(e){
    var that =this;
    this.Base.uploadFile("yuyue",this.Base.getMyData().tempFilePaths.path, (ret) => { 
      that.Base.setMyData({
        path: ret
      }); 
    }, undefined);
  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 

body.click = content.click; 
body.open = content.open; 
body.upload = content.upload; 


Page(body)

