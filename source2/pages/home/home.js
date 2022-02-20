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
    this.Base.setMyData({type:'B'})
  }
  onMyShow() {
    var that = this; 
    this.alllist(); 
  }
  choose(e){
    this.Base.setMyData({type:e.currentTarget.id})
  }
  alllist(e){
    var memberapi = new MemberApi();
    var type=this.Base.getMyData().type;
     
    memberapi.myyuyue({tutor_id:this.Base.getMyData().toturid,yuyue_status:'B,C,D'}, (res) => {
      this.Base.setMyData({ list:res });
    }); 
    memberapi.myyuyue({tutor_id:this.Base.getMyData().toturid,yuyue_status:'A,E'}, (res) => {
      this.Base.setMyData({ list2:res });
    }); 
  }
  quexi(e){
    var id=e.currentTarget.id;
    var memberapi=new MemberApi();

    wx.showModal({
      content:"确认该学生缺席?",
      success:  (res)=> {
        if (res.cancel) {
           //点击取消,默认隐藏弹框
        } else {
          memberapi.quexi({
            id:id
          },(ret)=>{
              this.Base.toast("提交成功!")
              this.alllist();
          })
        }
     }
    })
     
 
  }

  querenyuyue(e){
    var id=e.currentTarget.id;
    var memberapi=new MemberApi();

    wx.showModal({
      content:"确认同意预约?",
      success:  (res)=> {
        if (res.cancel) {
           //点击取消,默认隐藏弹框
        } else {
          memberapi.updateyuyue({
            id:id,
            yuyue_status:'E'
          },(ret)=>{
              this.Base.toast("提交成功!")
              this.alllist();
          })
        }
     }
    })
  }

  

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;  
body.alllist = content.alllist; 
body.choose = content.choose; 
body.quexi = content.quexi; 

body.querenyuyue = content.querenyuyue; 
Page(body)