// pages/myinformation/myinformation.js
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
    this.Base.setMyData({name:'',headimg:'',genderlist:[{
      name:'男',
      sex:'A'
    },{name:'女',sex:'B'}],sex:'A',sex_name:'男'})

    var that =this;
    wx.getStorage({
      key:'memberid',
      success:function(res){ 
     
       var memberapi =new MemberApi();
         memberapi.info({id:res.data}, (info) => { 
         
          var memberinfo = info;
          that.Base.setMyData({ 
            name:memberinfo.name,
            sex:memberinfo.gender,
            sex_name:memberinfo.gender_name,
            major:memberinfo.major,
            mobile:memberinfo.mobile,
            email:memberinfo.email,
            class:memberinfo.class,
            studentid:memberinfo.studentid,
            headimg:memberinfo.headimg
           });
         });
 
        
      }, 
    })
   
   
  }
  onMyShow() {
    var that = this;
    
  }


  bindname(e){
   this.Base.setMyData({name:e.detail.value})
  }
  bindsex(e){
    var genderlist=this.Base.getMyData().genderlist;
    this.Base.setMyData({
      sex_name:genderlist[e.detail.value].name,
      sex:genderlist[e.detail.value].sex
    })

    // this.Base.setMyData({sex:e.detail.value})
  }
  // bindstudentid(e){
  //   this.Base.setMyData({studentid:e.detail.value})
  // }
  bindmajor(e){
    this.Base.setMyData({major:e.detail.value})
  }
  bindmobile(e){
    this.Base.setMyData({mobile:e.detail.value})
  }
  bindemail(e){
    this.Base.setMyData({email:e.detail.value})
  }
  bindclass(e){
    this.Base.setMyData({class:e.detail.value})
  }
  
  uploadimg(){
    var that =this;
    this.Base.uploadOneImage("member", (ret) => { 
     that.Base.setMyData({
       headimg: ret
     }); 
   }, undefined);
 }

  submit(e){
    var memberApi =new MemberApi();
    
    memberApi.update({
      id:this.Base.getMyData().memberid,
      // name:this.Base.getMyData().name,
      // gender:this.Base.getMyData().sex,
     class:this.Base.getMyData().class, 
      mobile:this.Base.getMyData().mobile,
      email:this.Base.getMyData().email,
      // major:this.Base.getMyData().major,
      headimg:this.Base.getMyData().headimg
    }, (ret) => {
      this.Base.toast("提交成功");
      wx.reLaunch({
        url: '/pages/home/home',
      });
      console.log(ret);
    }); 
  }
 
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.submit = content.submit; 

body.bindname =content.bindname;
body.bindsex=content.bindsex;
body.bindstudentid=content.bindstudentid;

body.bindclass=content.bindclass;

body.bindmajor=content.bindmajor;
body.bindmobile=content.bindmobile;
body.bindemail=content.bindemail;

body.uploadimg=content.uploadimg;




Page(body)