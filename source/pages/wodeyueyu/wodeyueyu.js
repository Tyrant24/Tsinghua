// pages/wodeyueyu/wodeyueyu.js
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
      type:'A',yuanyin:'A',show:'A'
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    var messagenum1=0,messagenum2=0,messagenum3=0,messagenum4=0;
    // member_id:this.Base.getMyData().memberid
    memberapi.myyuyue({yuyue_status:'A',member_id:this.Base.getMyData().memberid }, (list) => {

      for(var i=0;i<list.length;i++){
        if (list[i].message_value=='N'&&list[i].yuyue_status=='A') {
         messagenum1++
        }
        if (list[i].message_value=='N'&&list[i].yuyue_status=='B') {
          messagenum2++
         }
         if (list[i].message_value=='N'&&list[i].yuyue_status=='C') {
          messagenum3++
         }
         if (list[i].message_value=='N'&&list[i].yuyue_status=='D') {
          messagenum4++
         }
     }
     if (messagenum1>0) {
     this.bindread('A');
     }
     
      this.Base.setMyData({list:list, messagenum1,messagenum2,messagenum3,messagenum4 });
    }); 

    // this.alllist();
  }

  choose(e){
    var type=e.currentTarget.id;
    this.Base.setMyData({
      type:e.currentTarget.id
    })
    var memberApi =new MemberApi();
    memberApi.myyuyue({yuyue_status:type,member_id:this.Base.getMyData().memberid}, (list) => {
      this.Base.setMyData({ list });
      this.bindread(type);
    }); 

   
  


   
  }
  alllist(e){
    var memberapi = new MemberApi();
    var type=this.Base.getMyData().type;
  
    memberapi.myyuyue({yuyue_status:type,member_id:this.Base.getMyData().memberid }, (list) => {
 
      this.Base.setMyData({ list  });
    }); 
  }

  bindcancel(e){
    var memberapi = new MemberApi();
    var id=this.Base.getMyData().quxiaoid; 
    memberapi.cancel({id:id,type:this.Base.getMyData().yuanyin}, (ret) => {
      this.Base.setMyData({
        show:'A'
      });
      this.alllist();
    }); 
  }

  bindupdate(e){
   console.log("修改");
   wx.navigateTo({
     url: '/pages/xiugaiyuyue/xiugaiyuyue?id='+e.currentTarget.id,
   })

  }

  bindchoose(e){ 
    this.Base.setMyData({
      yuanyin:e.currentTarget.id
    })
  }

  bindshow(e){
     this.Base.setMyData({
       show:e.currentTarget.dataset.show,
       quxiaoid:e.currentTarget.id
     })
  }

  bindread(type){
    var memberApi =new MemberApi();
    console.log(type);
    // return;
    memberApi.read({memberid:this.Base.getMyData().memberid,type:'B',status:type}, (ret) => { 
    

      var messagenum1=0,messagenum2=0,messagenum3=0,messagenum4=0;
      // member_id:this.Base.getMyData().memberid
      memberApi.myyuyue({member_id:this.Base.getMyData().memberid }, (list) => {
  
        for(var i=0;i<list.length;i++){
          if (list[i].message_value=='N'&&list[i].yuyue_status=='A') {
           messagenum1++
          }
          if (list[i].message_value=='N'&&list[i].yuyue_status=='B') {
            messagenum2++
           }
           if (list[i].message_value=='N'&&list[i].yuyue_status=='C') {
            messagenum3++
           }
           if (list[i].message_value=='N'&&list[i].yuyue_status=='D') {
            messagenum4++
           }
       }
      
        this.Base.setMyData({  messagenum1,messagenum2,messagenum3,messagenum4 });
      }); 
      

    });
  }
 
 
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 

body.choose = content.choose; 
body.bindcancel = content.bindcancel; 

body.alllist = content.alllist; 
body.bindupdate = content.bindupdate; 

body.bindchoose = content.bindchoose; 
body.bindshow = content.bindshow; 

body.bindread = content.bindread; 

Page(body)