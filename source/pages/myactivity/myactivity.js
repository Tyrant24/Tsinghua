// pages/myactivity/myactivity.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type:'A'
    })
  }
  onMyShow() {
    var that = this; 
    var memberApi =new MemberApi();
    var messagenum1=0,messagenum2=0,messagenum3=0;
    memberApi.myactivitylist({member_id:this.Base.getMyData().memberid}, (list) => {
      for(var i=0;i<list.length;i++){
        if (list[i].message_value=='N'&&list[i].activity_activity_status=='A') {
         messagenum1++
        }
        if (list[i].message_value=='N'&&list[i].activity_activity_status=='B') {
          messagenum2++
         }
         if (list[i].message_value=='N'&&list[i].activity_activity_status=='C') {
          messagenum3++
         }
     }
     if (messagenum1>0) {
      this.bindread('A');
     }
      this.Base.setMyData({ list:list,messagenum1,messagenum2,messagenum3 });
    }); 

    
     
  }
  choose(e){
    this.bindread(e.currentTarget.id);
    this.Base.setMyData({
      type:e.currentTarget.id
    })
  }

  bindread(type){
    var memberApi =new MemberApi();
    memberApi.read({memberid:this.Base.getMyData().memberid,type:'A',status:type}, (ret) => {
     
      this.onMyShow();
    }); 
  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;  
body.choose = content.choose; 
body.bindread = content.bindread; 

Page(body)