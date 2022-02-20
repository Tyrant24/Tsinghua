// pages/mine/mine.js
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
    this.Base.setMyData({
      messagenum:0, messagenum2:0
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    }); 

    var memberapi = new MemberApi();

    memberapi.myyuyue({member_id:this.Base.getMyData().memberid}, (list) => {
      this.Base.setMyData({ list });
    }); 
    var messagenum=0;
    var messagenum2=0;
    memberapi.myactivitylist({member_id:this.Base.getMyData().memberid}, (list) => {
      for(var i=0;i<list.length;i++){
         if (list[i].message_value=='N') {
          messagenum++
         }
      }
      this.Base.setMyData({messagenum})
    }); 

    memberapi.zulinlist({member_id:this.Base.getMyData().memberid}, (list) => {
      for(var i=0;i<list.length;i++){
        if (list[i].message_value=='N') {
         messagenum2++
        }
     }
     this.Base.setMyData({messagenum2})
    }); 



  }

  tuichu(){
    wx.showModal({
      title: '提示',
      // showCancel: false,
      content: '确认退出登录？',
      success(res) {
        if (res.confirm) {
      wx.reLaunch({
        url: '/pages/login/login',
      })

        } else if (res.cancel) {
          
        }
      }
    })
  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.tuichu = content.tuichu; 
body.onMyShow = content.onMyShow; 


Page(body)