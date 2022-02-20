// pages/pinggu/pinggu.js
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
      wentilist: [{
        type: 'A',
        name: '很少'
      }, {
        type: 'B',
        name: '有时'
      }, {
        type: 'C',
        name: '经常'
      }, {
        type: 'D',
        name: '很频繁'
      }, {
        type: 'E',
        name: '总是'
      }],
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",
      question7: "",
      score:""
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();

    memberapi.yuyueinfo({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      });
    });
  }
  bindDateChange(e) {
    this.Base.setMyData({
      date: e.detail.value
    })
  }

  choosewenti(e) {
    var type = e.currentTarget.dataset.type;
    // var wentilist=this.Base.getMyData().wentilist;
    if (type == 'A') {
      this.Base.setMyData({
        question1: e.currentTarget.id,
      })
    }
    if (type == 'B') {
      this.Base.setMyData({
        question2: e.currentTarget.id,
      })
    }
    if (type == 'C') {
      this.Base.setMyData({
        question3: e.currentTarget.id,
      })
    }
    if (type == 'D') {
      this.Base.setMyData({
        question4: e.currentTarget.id,
      })
    }
    if (type == 'E') {
      this.Base.setMyData({
        question5: e.currentTarget.id,
      })
    }
    if (type == 'F') {
      this.Base.setMyData({
        question6: e.currentTarget.id,
      })
    }
    if (type == 'G') {
      this.Base.setMyData({
        question7: e.currentTarget.id,
      })
    }
  }


  bind(e) {
    console.log("虽说是", e);
    var inputtype = e.currentTarget.id;
    var value = e.detail.value;
    if (inputtype == 'A') {
      this.Base.setMyData({
        score: value
      })
    }
    // if (inputtype == 'B') {
    //   this.Base.setMyData({
    //     cishu: value
    //   })
    // }
    // if (inputtype == 'C') {
    //   this.Base.setMyData({
    //     yinxiang: value
    //   })
    // }
    // if (inputtype == 'D') {
    //   this.Base.setMyData({
    //     bangzhu: value
    //   })
    // }
    // if (inputtype == 'E') {
    //   this.Base.setMyData({
    //     yuqi: value
    //   })
    // }
  }

  submit(e) {
    var that = this;
    var memberapi = new MemberApi();
    wx.showLoading({
      title: '正在提交...',
    });
    // var name = this.Base.getMyData().name;
    // var cishu = this.Base.getMyData().cishu;
    // var yinxiang = this.Base.getMyData().yinxiang;
    // var bangzhu = this.Base.getMyData().bangzhu;
    // var yuqi = this.Base.getMyData().yuqi;
    // var date = this.Base.getMyData().date;

    var question1 = this.Base.getMyData().question1; 
    var question2 = this.Base.getMyData().question2;
    var question3 = this.Base.getMyData().question3;
    var question4 = this.Base.getMyData().question4;
    var question5 = this.Base.getMyData().question5;
    var question6 = this.Base.getMyData().question6;
    var question7 = this.Base.getMyData().question7;
    var score = this.Base.getMyData().score;
    if (question1=="") {
      this.Base.toast("请确认所有选项都已选择")
      return;
    }
    if (question2=="") {
      this.Base.toast("请确认所有选项都已选择")
      return;
    }
    if (question3=="") {
      this.Base.toast("请确认所有选项都已选择")
      return;
    }
    if (question4=="") {
      this.Base.toast("请确认所有选项都已选择")
      return;
    }
    if (question5=="") {
      this.Base.toast("请确认所有选项都已选择")
      return;
    }
    if (question6=="") {
      this.Base.toast("请确认所有选项都已选择")
      return;
    }
    if (question7=="") {
      this.Base.toast("请确认所有选项都已选择")
      return;
    }
    if (score=="") {
      this.Base.toast("请填写分数")
      return;
    }


    memberapi.pinggu({
      yuyue_id: this.Base.options.id,
      question1: question1,
      question2: question2,
      question3: question3,
      question4: question4,
      question5: question5,
      question6: question6,
      question7: question7,
      score:score
    }, (ret) => {
      console.log(ret);
      if (ret.code == 0) {
        wx.hideLoading({
          success: (res) => {
            this.Base.toast("提交成功");
            wx.navigateBack({
              delta: 0,
            })
          }
        })
      }
    })

  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.choosewenti = content.choosewenti;
body.choosewenti2 = content.choosewenti2;
body.bind = content.bind;
body.submit = content.submit;
body.bindDateChange = content.bindDateChange;
Page(body)