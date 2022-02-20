// pages/yuyue/yuyue.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  ApiUtil
} from "../../apis/apiutil.js";
import {
  MemberApi
} from "../../apis/member.api";


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
      height: 800,
      viewstyle: 1,
      btnstyle:true,
      today: '',
      chosseid: '',
      yuyuetime:'',
      close: false,
      markers: [
        { year: 2021, month: 8, day: 1, type: 'holiday', mark: '愚人节', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 4, type: 'holiday', mark: '清明', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 3, type: 'corner', mark: '休', color: '#61b057' },
        { year: 2021, month: 8, day: 4, type: 'corner', mark: '休', color: '#61b057' },
        { year: 2021, month: 8, day: 5, type: 'corner', mark: '休', color: '#61b057' },
        { year: 2021, month: 8, day: 6, type: 'schedule', mark: '测试一下', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 6, type: 'schedule', mark: '测试一下哈哈哈', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 6, type: 'schedule', mark: '测试一下哈哈哈', color: '#2a97ff', bgColor: '#0c72d1' }
    ]
    })

  }
  onMyShow() {
    var that = this;

    console.log(this.Base.getMyData().markers)
    // this.handleCalendarDateChange();

  }



  handleCalendarDateChange(e) {
    wx.showLoading({
      title: '加载中...',
    })
    this.Base.setMyData({
      btnstyle:true,chosseid:""
     })
    console.log("交换空间", e);
    setTimeout(() => {
      var date = e.detail.date;
      var year = date.year;
      var month = date.month < 10 ? '0' + date.month : date.month;
      var day = date.day < 10 ? '0' + date.day : date.day;

      var today = year + '-' + month + '-' + day;
      var today2 = year + '-' + date.month + '-' + date.day;
      console.log(today, '点击的');

      this.Base.setMyData({
        today,
        today2
      });
      console.log("什么时候开始2222");
      this.tutor();

    }, 300)

  }

  handleCalendarPanelViewChange(e) {
    console.log("什么时候出发", e);
    if (e.detail.view == 'week') {
      this.Base.setMyData({
        height: 400
      })
    } else {
      this.Base.setMyData({
        height: 800
      })
    }
  }

  handleCalendarRangeChange(e) {
    console.log("这个呢", e);

  }

  onReachBottom() {
    console.log("触发");

  }

  tutor() {
    var memberapi = new MemberApi();
    memberapi.worktimelist({
      workdate: this.Base.getMyData().today
    }, (list) => {
 
      var today2 = this.Base.getMyData().today2;

      var date = new Date(today2);
      var time1 = date.getTime();

      var nowdate = (new Date()).toLocaleDateString();
      var date2 = new Date(nowdate);
      var time2 = date2.getTime();

      if (time1 < time2) {
        this.Base.setMyData({
          close: true
        })
      } else {
        this.Base.setMyData({
          close: false
        })
      }


      this.Base.setMyData({
        list
      })
      wx.hideLoading()
    })
  }

  choosetime(e) {
    var chooseid = e.currentTarget.id;
    var tutorid = e.currentTarget.dataset.tutorid;
    var tutor_id = e.currentTarget.dataset.tutor_id;
    
    var yuyuetime = e.currentTarget.dataset.time;


    var choosedate = this.Base.getMyData().today;
    var choosetime = choosedate + " " + yuyuetime;
    console.log("点了没11111",yuyuetime);

    var memberapi = new MemberApi();

    
    memberapi.jianchayuyue({ 
      yuyueshijian: choosetime
      }, (ret) => {
   
        if(ret.code==0){
          
          memberapi.chayuyue({
            memberid: this.Base.getMyData().memberid,
            choosetime: choosetime,
            tutor_id: tutor_id
            }, (ret) => {
              console.log(ret.code,'是多少')
              if(ret.code==0){
                 this.Base.setMyData({
                  btnstyle:true
                 })
              }else{
                this.Base.setMyData({
                  btnstyle:false
                 })
              }
          })
      
          this.Base.setMyData({
            chosseid: tutorid + '_' + chooseid,
            nowtutorid:tutor_id,
            yuyuetime: yuyuetime
          })
          
        }else{
        
          this.Base.toast("该时段已被预约");
        }
    })

    // memberid:this.Base.getMyData().memberid


  }

  bindyuyue(e) {

    var memberapi = new MemberApi();


   
    // memberid:this.Base.getMyData().memberid 
    // memberapi.chaquexi({
    //   memberid: this.Base.getMyData().memberid
    // }, (ret) => {
      if(this.Base.getMyData().memberinfo.quexi>=2){
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '您已经缺席两次，无法预约!',
          success(res) { 
          }
        })
        // return;
      }else{

        if (this.Base.getMyData().close == true) {
          return;
        }
        var tutor_id = e.currentTarget.dataset.tutor_id;
        var choosedate = e.currentTarget.dataset.date;
        
        var yuyuetime = this.Base.getMyData().yuyuetime;
        console.log(choosedate,'预约时间');
    
        var newdate= ApiUtil.GetDateStr(2);
        console.log(newdate);
        if (choosedate!=newdate) {
       
          this.Base.toast("请至少提前两天预约");
          return;
        }
      
        if (yuyuetime=='') {
          this.Base.toast("请选择预约时间");
          return;
        }
    // return;
        memberapi.chazuijin({
          memberid: this.Base.getMyData().memberid
        }, (ret) => {
          if (ret.code == 0) { 
            wx.navigateTo({
              url: '/pages/yuyueinfo/yuyueinfo?tutor_id=' + tutor_id + '&yuyuedate=' + choosedate + ' ' + yuyuetime + '&id='+ret.return
            }) 
            // time_frame='+yuyuetime
          }else{
            wx.navigateTo({
              url: '/pages/yuyueinfo/yuyueinfo?tutor_id=' + tutor_id + '&yuyuedate=' + choosedate + ' ' + yuyuetime  
            }) 
          }
        })


      }
    // })





   
  }

  handleCalendarLoad() {
    // console.log('calendar-load', detail)
    var riqi=ApiUtil.nianyueri("2021-08-18");
    
     console.log('日期',riqi.year,riqi.month,riqi.day);

    var memberapi = new MemberApi();
    this.calendar = this.selectComponent('#calendar');
    var list=[];
    memberapi.worktimelist({ 
      type:'A'
    }, (ret) => {
      
      for(var i=0;i<ret.length;i++){

       var year= ApiUtil.nianyueri(ret[i].workdate).year;
       var month= ApiUtil.nianyueri(ret[i].workdate).month;
       var day= ApiUtil.nianyueri(ret[i].workdate).day;
 
      list.push({
        year: year,
        month:month,
        day: day,
        type: 'holiday',
        mark: '可预约',
        color: '#c50101',
        bgColor: '#c50101'
      }) 
      }
      console.log(list,"来看看这个");

      this.calendar.setMarkers(list);
      
    })
        // 新增日期标记
  //   let date = new Date();
  //   console.log("什么时候开始1111")
  //   this.calendar.setMarkers([{
  //       year: date.getFullYear(),
  //       month: date.getMonth() + 1,
  //       day: 10,
  //       type: 'holiday',
  //       mark: '咨询',
  //       color: '#2a97ff',
  //       bgColor: '#cce6ff'
  //   },{
  //     year: date.getFullYear(),
  //     month: date.getMonth() + 1,
  //     day: 13,
  //     type: 'holiday',
  //     mark: '咨询',
  //     color: '#2a97ff',
  //     bgColor: '#cce6ff'
  // }])
  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.handleCalendarDateChange = content.handleCalendarDateChange;
body.handleCalendarPanelViewChange = content.handleCalendarPanelViewChange;
body.handleCalendarRangeChange = content.handleCalendarRangeChange;


body.handleCalendarLoad = content.handleCalendarLoad;

body.choosetime = content.choosetime;
body.tutor = content.tutor;

body.bindyuyue = content.bindyuyue;

Page(body)