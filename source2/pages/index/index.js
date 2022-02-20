// const app = getApp()

// Page({
//     data: {
//         markers: [
//             { year: 2021, month: 8, day: 1, type: 'holiday', mark: '愚人节', color: '#2a97ff', bgColor: '#cce6ff' },
//             { year: 2021, month: 8, day: 4, type: 'holiday', mark: '清明', color: '#2a97ff', bgColor: '#cce6ff' },
//             { year: 2021, month: 8, day: 3, type: 'corner', mark: '休', color: '#61b057' },
//             { year: 2021, month: 8, day: 4, type: 'corner', mark: '休', color: '#61b057' },
//             { year: 2021, month: 8, day: 5, type: 'corner', mark: '休', color: '#61b057' },
//             { year: 2021, month: 8, day: 6, type: 'schedule', mark: '属0', color: '#2a97ff', bgColor: '#cce6ff' },
//             { year: 2021, month: 8, day: 6, type: 'holiday', mark: '可约', color: '#2a97ff', bgColor: '#cce6ff' },
//             { year: 2021, month: 8, day: 6, type: 'schedule', mark: '属21111', color: '#2a97ff', bgColor: '#cce6ff' }
//         ]
//     },
//     onLoad() {

//     },
//     handleCalendarLoad({ detail }) {
//         // console.log('calendar-load', detail)
//         this.calendar = this.selectComponent('#calendar')
//             // 新增日期标记
//         let date = new Date
//         // this.calendar.setMarkers([{
//         //     year: date.getFullYear(),
//         //     month: date.getMonth() + 1,
//         //     day: 10,
//         //     type: 'schedule',
//         //     mark: '测试',
//         //     color: '#2a97ff',
//         //     bgColor: '#cce6ff'
//         // }])
//     },
//     handleCalendarDateChange({ detail }) {
//         // console.log('calendar-date-change', detail)
//     },
//     handleCalendarRangeChange({ detail }) {
//         // console.log('calendar-range-change', detail)
//         //以下参考
//         // const { curr, range, view, visual, markerCommit } = detail
//         // const { year, month, day } = curr
//         // setTimeout(() => {
//         //     markerCommit([
//         //         { year, month, day, type: 'holiday', mark: 'TEST', color: '#2a97ff', bgColor: '#cce6ff' }
//         //     ])
//         // }, 500)
//     },
//     handleCalendarPanelViewChange({ detail }) {
//         // console.log('calendar-view-change', detail)
//     }
// })


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
    
    this.Base.setMyData({
      height: 800,
      viewstyle: 1,
      btnstyle:true,
      today: '',
      chosseid: '',
      close: false,
      markers: [
        { year: 2021, month: 8, day: 1, type: 'holiday', mark: '愚人节', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 4, type: 'holiday', mark: '清明', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 3, type: 'corner', mark: '休', color: '#61b057' },
        { year: 2021, month: 8, day: 4, type: 'corner', mark: '休', color: '#61b057' },
        { year: 2021, month: 8, day: 5, type: 'corner', mark: '休', color: '#61b057' },
        { year: 2021, month: 8, day: 6, type: 'holiday', mark: '测试一下', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 6, type: 'holiday', mark: '测试一下哈哈哈', color: '#2a97ff', bgColor: '#0c72d1' },
        { year: 2021, month: 8, day: 6, type: 'holiday', mark: '测试一下哈哈哈', color: '#2a97ff', bgColor: '#0c72d1' }
    ]
    })

  }
  onMyShow() {
    var that = this;

    console.log(this.Base.getMyData().markers)
    // this.handleCalendarDateChange();

  }



  handleCalendarDateChange(e) {
 
  
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

    handleCalendarLoad() {
        // console.log('calendar-load', detail)
        this.calendar = this.selectComponent('#calendar')
            // 新增日期标记
        let date = new Date();
        this.calendar.setMarkers([{
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: 10,
            type: 'holiday',
            mark: '测试',
            color: '#2a97ff',
            bgColor: '#cce6ff'
        },{
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: 13,
          type: 'holiday',
          mark: '虽说是',
          color: '#2a97ff',
          bgColor: '#cce6ff'
      }])
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

Page(body)