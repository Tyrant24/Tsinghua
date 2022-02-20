// pages/yuyue/yuyue.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  ApiUtil
} from "../../apis/apiutil.js";
import { MemberApi } from "../../apis/member.api";
 

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.showLoading({
      title: '加载中',
    })
    this.Base.setMyData({
      height:800,viewstyle:1,today:'',chosseid:''
    })
  
  }
  onMyShow() {
    var that = this;
    
   
  // this.handleCalendarDateChange();
      
  }
  


  handleCalendarDateChange(e){
    wx.showLoading({
      title: '加载中...',
    })
    console.log("交换空间",e);
    setTimeout(()=>{
      var date=e.detail.date; 
      var year=date.year;
      var month=date.month<10?'0'+date.month:date.month;
      var day=date.day<10?'0'+date.day:date.day;
      
       var today=year+'-'+month+'-'+day;
        
      this.Base.setMyData({today});
 
      this.tutor();
     
    },1000)
    
  }

  handleCalendarPanelViewChange(e){
    console.log("什么时候出发",e);
    if(e.detail.view=='week'){
      this.Base.setMyData({ 
        height:400
      })
    }else{
      this.Base.setMyData({ 
        height:800
      })
    }
  }

  handleCalendarRangeChange(e){
    console.log("这个呢",e);
   
  }

  onReachBottom(){
    console.log("触发");
    
  }

  tutor(){
    var memberapi=new MemberApi();
    memberapi.worktimelist({workdate:this.Base.getMyData().today},(list)=>{
      this.Base.setMyData({
        list
      })
      wx.hideLoading()
  })
  }

  choosetime(e){
      var chooseid=e.currentTarget.id;
      var tutorid=e.currentTarget.dataset.tutorid;
      var time=e.currentTarget.dataset.time;
      // console.log("点了没",chooseid,tutorid);

      this.Base.setMyData({chosseid:tutorid+'_'+chooseid,time:time})

  }

  bindyuyue(e){
    var tutor_id=e.currentTarget.dataset.tutor_id;
    var choosedate=e.currentTarget.dataset.date;
    var time=this.Base.getMyData().time;

     console.log(tutor_id,choosedate,time);
     wx.navigateTo({
       url: '/pages/yuyueinfo/yuyueinfo?tutor_id='+tutor_id+'&yuyuedate='+choosedate+' '+time,
     })
  }
 
  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 

body.handleCalendarDateChange = content.handleCalendarDateChange; 
body.handleCalendarPanelViewChange = content.handleCalendarPanelViewChange; 
body.handleCalendarRangeChange = content.handleCalendarRangeChange; 

body.choosetime = content.choosetime; 
body.tutor = content.tutor; 

body.bindyuyue = content.bindyuyue; 

Page(body)