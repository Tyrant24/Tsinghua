// pages/xingxiang/xingxiang.js 
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api";
import { EmailApi } from "../../apis/email.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      gender:'A',
      overlay:false,
      mashulist:[{type:'A',name:'S'},{type:'B',name:'M'},{type:'C',name:'L'},{type:'D',name:'XL'}],
   })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    instapi.xingxiangtu({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    }); 
    instapi.xingxiang({}, (info) => {
      this.Base.setMyData({ info });
    }); 
  }
  bindgender(e){
    var type=e.currentTarget.id;
    this.Base.setMyData({
       gender:type
    })
  }

  bindmashu(e){
    var mashulist=this.Base.getMyData().mashulist;
    this.Base.setMyData({
      mashu_name:mashulist[e.detail.value].name,
      mashu:mashulist[e.detail.value].type
    })
  }
  bindstartDateChange(e){
    this.Base.setMyData({
      start_date:e.detail.value
    })
  }
  bindendDateChange(e){
    this.Base.setMyData({
      end_date:e.detail.value
    })
  }
  mobileinput(e){
    this.Base.setMyData({
      mobile:e.detail.value
    })
  }
  

  submit(e){
    var that =this;
    var memberapi=new MemberApi();
    var emailApi = new EmailApi();
    wx.showLoading({
      title: '正在提交...',
    });
    var  gender =this.Base.getMyData().gender;
    var  mashu =this.Base.getMyData().mashu;
    var  start_date =this.Base.getMyData().start_date;
    var  end_date =this.Base.getMyData().end_date;
    var  mobile =this.Base.getMyData().mobile;
    
    memberapi.zulin({
      member_id:this.Base.getMyData().memberid,
      gender:gender,
      size:mashu,
      mobile:mobile,
      start_date:start_date,
      end_date:end_date
    },(ret)=>{
      if(ret.code==0){

        emailApi.fuzhuang({
          chujie_time:start_date,
          member_name:this.Base.getMyData().memberinfo.name,
          gender:gender=='A'?'男':'女',
          size:this.Base.getMyData().mashu_name,
          mobile:this.Base.getMyData().memberinfo.mobile
         }, (ret) => {
          wx.hideLoading({
            success: (res) => {  
              that.Base.setMyData({overlay:true})
            },
          })
 
         })
 
      }
    })

  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.bindgender = content.bindgender; 
body.bindmashu = content.bindmashu; 
body.bindstartDateChange = content.bindstartDateChange; 
body.bindendDateChange = content.bindendDateChange; 
body.submit = content.submit; 
body.mobileinput = content.mobileinput; 

Page(body)

