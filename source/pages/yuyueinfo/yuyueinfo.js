// pages/yuyueinfo/yuyueinfo.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api";
import { EmailApi } from "../../apis/email.api";

import {
  ApiUtil
} from "../../apis/apiutil.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    // this.Base.needauth = true;
    this.Base.setMyData({
      shifou:[{name:'是',type:'Y'},{ name:'否',type:'N'}], 
      hunyinlist:[{name:'未婚',type:'A'},{ name:'已婚',type:'B'},{ name:'丧偶',type:'C'},{ name:'离异',type:'D'}],
      choosenumber:0,
      gongzuolist:[{name:'有全职工作经验',type:'A'},{ name:'有兼职工作经验',type:'B'},{ name:'无工作经验',type:'C'}],
      nianxianlist:[{name:'1-3年',type:'A'},{ name:'3-5年',type:'B'},{ name:'5-10年',type:'C'},{ name:'10年以上',type:'D'}],
      name:"",
      minzu:"",
      shengyuandi:"",
      zhuanye:"",
      yuanxuexiao:"",
      yuanzhuanye:"",
      email:"",
      mobile:"",
      fuqinzhiye:"",
      muqinzhiye:"", 
      zhiye:"",
      zixunming:"",
      danwei:"",
      qita:"",
      wentimiaoshu:"",
      jingli:"",
      zixunshu:"",
      jinjiren:"",
      jinjidianhua:"",
      fangfa:"",
      fangfaid:"",
      read:false,
      wenti:"",
      overlay:false,
      yuyuedate:this.Base.options.yuyuedate,
      tutor_id:this.Base.options.tutor_id,
      hunyin_text:"",
      qitazixun_text:"",
      gongzuo_text1:"",
      gongzuo_text2:"",
      jiankang_text:"", 
      hunyin_text:"",  
      filename:"",
      file:""
  })
  var instapi = new InstApi(); 
  instapi.fangfalist({}, (fangfalist) => {
    for(var i=0;i<fangfalist.length;i++){
      fangfalist[i].check=false;
    }
    this.Base.setMyData({ fangfalist });
  }); 

  this.bindinfo();
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi(); 
  
    var age=ApiUtil.ages(this.Base.getMyData().memberinfo.birthday);
    console.log(age,'年龄');
    this.Base.setMyData({age})

    instapi.wentilist({}, (wentilist) => {
      for(var i=0;i<wentilist.length;i++){
        wentilist[i].check=false;
      }
      this.Base.setMyData({ wentilist });
    });


    
  }

  bindinfo(){
    var memberapi = new MemberApi(); 
    var yuyueid=this.Base.options.id;
    var tutor_id=this.Base.options.tutor_id;
    if (yuyueid==undefined) {
      this.Base.setMyData({
       tutor_id:tutor_id
      }) 
    }
    memberapi.yuyueinfo({id:yuyueid}, (info) => {

      if (info==null) {
        return;
      }
    
   if (info.fangfaid!="") {
     console.log("走没走里面")
    var fff = (info.fangfaid).split(','); 
      var fangfalist=this.Base.getMyData().fangfalist; 
      for(var i=0;i<fangfalist.length;i++){
        var id=fangfalist[i].id; 
        if (fff.indexOf(id)>-1) {
          fangfalist[i].check=true; 
        }else{
          fangfalist[i].check=false; 
        }
      }

      this.Base.setMyData({
        fangfalist:fangfalist
      })
     
   }
       

       this.Base.setMyData({
        name:info.name,
        minzu:info.minzu,
        hunyin:info.hunyin,
        jiankang:info.jiankang,
        shengyuandi:info.shengyuandi,
        zhuanye:info.zhuanye,
        yuanxuexiao:info.yuanxuexiao,
        yuanzhuanye:info.yuanzhuanye,
        xiongdi:info.xiongdi_value,
        email:info.email,
        mobile:info.mobile,
        fuqinzhiye:info.fuqinzhiye,
        muqinzhiye:info.muqinzhiye, 
        zhiye:info.zhiye,
        zixunming:info.zixunming,
        danwei:info.danwei,
        zhiyezixun:info.zhiyezixun_value,
        xinlizixun:info.xinlizixun_value,
        qitazixun:info.qitazixun_value,
        gongzuo:info.gongzuo,
        qita:info.qita,
        wenti:info.wenti,
        wentimiaoshu:info.wentimiaoshu,
        jingli:info.jingli,
        zixunshu:info.zixunshu,
        jinjiren:info.jinjiren,
        jinjidianhua:info.jinjidianhua,
        // fangfa:info.fangfa,
   
        yuyueno:info.yuyueno,
        hunyin_text:info.hunyin_text,
        qitazixun_text:info.qitazixun_text,
        gongzuo_text1:info.gongzuo_text1,
        gongzuo_text2:info.gongzuo_text2,
        jiankang_text:info.jiankang_text, 
        hunyin_text:info.hunyin_text, 
        info:info,
        file:info.file,
        filename:info.filename,
       
       })
    }); 
  }
 

  choosefangfa(e){
    var fangfalist=this.Base.getMyData().fangfalist; 
    console.log(fangfalist,'有没有');
    // return;
    if(fangfalist[e.currentTarget.id].check==false){
      fangfalist[e.currentTarget.id].check=true;
    }else{ 
      fangfalist[e.currentTarget.id].check=false;
    }
    
    this.Base.setMyData({
      fangfalist
    })
  }
 
  bindread(e){
    this.Base.setMyData({
      read:!this.Base.getMyData().read
    })
  }

  bind(e){
    console.log("虽说是",e);
    var inputtype=e.currentTarget.id;
    var value=e.detail.value;
    if(inputtype=='A'){  this.Base.setMyData({name:value}) }
    if(inputtype=='B'){  this.Base.setMyData({minzu:value}) }
    if(inputtype=='C'){  this.Base.setMyData({shengyuandi:value}) }
    if(inputtype=='D'){  this.Base.setMyData({zhuanye:value}) }
    if(inputtype=='E'){  this.Base.setMyData({yuanxuexiao:value}) }
    if(inputtype=='F'){  this.Base.setMyData({yuanzhuanye:value}) }
    if(inputtype=='G'){  this.Base.setMyData({email:value}) }
    if(inputtype=='H'){  this.Base.setMyData({mobile:value}) }
    if(inputtype=='I'){  this.Base.setMyData({fuqinzhiye:value}) }
    if(inputtype=='J'){  this.Base.setMyData({muqinzhiye:value}) }
    // if(inputtype=='K'){  this.Base.setMyData({name:value}) }
    if(inputtype=='L'){  this.Base.setMyData({zhiye:value}) }
    if(inputtype=='M'){  this.Base.setMyData({zixunming:value}) }
    if(inputtype=='N'){  this.Base.setMyData({danwei:value}) }
    if(inputtype=='O'){  this.Base.setMyData({qita:value}) }
    if(inputtype=='P'){  this.Base.setMyData({wentimiaoshu:value}) }
    if(inputtype=='Q'){  this.Base.setMyData({jingli:value}) }
    if(inputtype=='R'){  this.Base.setMyData({zixunshu:value}) }
    if(inputtype=='S'){  this.Base.setMyData({jinjiren:value}) }
    if(inputtype=='T'){  this.Base.setMyData({jinjidianhua:value}) }
    
    if(inputtype=='U'){  this.Base.setMyData({qitazixun_text:value}) }
    if(inputtype=='V'){  this.Base.setMyData({gongzuo_text1:value}) }
    if(inputtype=='W'){  this.Base.setMyData({gongzuo_text2:value}) }
    if(inputtype=='X'){  this.Base.setMyData({jiankang_text:value}) }
    if(inputtype=='Y'){  this.Base.setMyData({hunyin_text:value}) }
    if(inputtype=='Z'){  this.Base.setMyData({wenti:value}) }

    console.log("虽说是22222",inputtype);

  }

  bindradio(e){
    var type=e.currentTarget.dataset.type;
    var radioid=e.currentTarget.id;
 
    if(radioid=='A'){
      this.Base.setMyData({
        xiongdi:type
      })
    }
    if(radioid=='B'){
      this.Base.setMyData({
        zhiyezixun:type
      })
    }
    if(radioid=='C'){
      this.Base.setMyData({
        xinlizixun:type
      })
    }
    if(radioid=='D'){
      this.Base.setMyData({
        qitazixun:type
      })
    }
    if(radioid=='E'){
      this.Base.setMyData({
        gongzuo:type
      })
    }
    if(radioid=='F'){
      this.Base.setMyData({
        jiankang:type
      })
    }
    if(radioid=='G'){
      this.Base.setMyData({
        hunyin:type
      })
    }

  }

  choosefile(e){
    var that =this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0]; 
        

        that.Base.uploadFile("yuyue",tempFilePaths.path, (ret) => { 
         
         if(ret.indexOf(".pdf")!=-1){
           var filetype='A'; 
         } else if(ret.indexOf(".txt")!=-1){
          var filetype='B'; 
         }else if(ret.indexOf(".xlsx")!=-1){
          var filetype='C'; 
         } else{
          var filetype='D'; 
         }
       
        that.Base.setMyData({
          file: ret,filename:tempFilePaths.name,filetype:filetype
        }); 
        }, undefined);
    
      }
    })
  }

  submit(e){
    var that =this;
    //console.log(this.Base.options.tutor_id,'快快快');
    // return;
    if(this.Base.getMyData().read==false){
      this.Base.toast("请先同意知情同意书!");
      return;
    }


    wx.showLoading({
      title: '正在提交...',
    });

    var zonshu=0;
    var fangfalist=this.Base.getMyData().fangfalist;
    var fangfa=this.Base.getMyData().fangfa;
    var fangfaid=this.Base.getMyData().fangfaid;
    
    // var wentilist=this.Base.getMyData().wentilist;
    // var wenti=this.Base.getMyData().wenti;
   

    for(var i=0;i<fangfalist.length;i++){
      if(fangfalist[i].check==true){
        fangfa += fangfalist[i].name+',';
        fangfaid+=fangfalist[i].id+',';
        zonshu++
      }
   }

 
    var memberinfo=this.Base.getMyData().memberinfo;
    var  name =memberinfo.name;
    var  minzu =this.Base.getMyData().minzu;
    var  shengyuandi =this.Base.getMyData().shengyuandi;
    var  zhuanye =memberinfo.major;
    var  yuanxuexiao =this.Base.getMyData().yuanxuexiao;
    var  yuanzhuanye =this.Base.getMyData().yuanzhuanye;
    var  email =memberinfo.email;
    var  mobile =this.Base.getMyData().mobile;
    var  fuqinzhiye =this.Base.getMyData().fuqinzhiye;
    var  muqinzhiye  =this.Base.getMyData().muqinzhiye;
    var  zhiye =this.Base.getMyData().zhiye;
    var  zixunming =this.Base.getMyData().zixunming;
    // var  danwei =this.Base.getMyData().danwei;
    var  qita =this.Base.getMyData().qita;
    var  wentimiaoshu =this.Base.getMyData().wentimiaoshu;
    var  jingli =this.Base.getMyData().jingli;
    var  zixunshu =this.Base.getMyData().zixunshu;
    var  jinjiren =this.Base.getMyData().jinjiren;
    var  jinjidianhua =this.Base.getMyData().jinjidianhua;
    var  memberid=this.Base.getMyData().memberid;
    var  yuyueshijian=this.Base.getMyData().yuyuedate;
    var  hunyin=this.Base.getMyData().hunyin; 
    var  zhiyezixun=this.Base.getMyData().zhiyezixun;
    var  xinlizixun=this.Base.getMyData().xinlizixun;
    var  qitazixun=this.Base.getMyData().qitazixun; 
    var  gongzuo=this.Base.getMyData().gongzuo;
    // var  nianxian=this.Base.getMyData().nianxian;
    var  wenti=this.Base.getMyData().wenti;
    var file=this.Base.getMyData().file;
    var jiankang=this.Base.getMyData().jiankang;
    var info=this.Base.getMyData().info;
    var xiongdi=this.Base.getMyData().xiongdi;
    var filename=this.Base.getMyData().filename;
    
    
    if(this.Base.getMyData().minzu==""){
      this.Base.toast("请填写民族");
      return;
    }
    if(this.Base.getMyData().shengyuandi==""){
      this.Base.toast("请填写生源地");
      return;
    }
    // if(this.Base.getMyData().zhuanye==""){
    //   this.Base.toast("请填写专业");
    //   return;
    // }
    if(this.Base.getMyData().yuanxuexiao==""){
      this.Base.toast("请填写原就读学校");
      return;
    }
    if(this.Base.getMyData().yuanzhuanye==""){
      this.Base.toast("请填写原专业");
      return;
    }
    if(this.Base.getMyData().mobile==""){
      this.Base.toast("请填写联系电话");
      return;
    }
    if(this.Base.getMyData().hunyin==""){
      this.Base.toast("请选择婚姻状况");
      return;
    }
    if(this.Base.getMyData().jiankang==""){
      this.Base.toast("请选择健康状况");
      return;
    }
    if(this.Base.getMyData().minzu==""){
      this.Base.toast("请填写民族");
      return;
    }
    if(this.Base.getMyData().fuqinzhiye==""){
      this.Base.toast("请填写父亲职业");
      return;
    }
    if(this.Base.getMyData().muqinzhiye==""){
      this.Base.toast("请填写母亲职业");
      return;
    }
    if(this.Base.getMyData().xiongdi==""){
      this.Base.toast("请选择是否有兄弟姐妹");
      return;
    }
    if(this.Base.getMyData().zhiye==""){
      this.Base.toast("请填写职业");
      return;
    }
    if(this.Base.getMyData().zhiyezixun==""){
      this.Base.toast("请选择是否接受过职业咨询");
      return;
    }
    if(this.Base.getMyData().xinlizixun==""){
      this.Base.toast("请选择是否接受过心理咨询");
      return;
    }
    if(this.Base.getMyData().qitazixun==""){
      this.Base.toast("请选择是否正在接受其他咨询");
      return;
    }

    if(this.Base.getMyData().gongzuo==""){
      this.Base.toast("请选择是否有工作年限");
      return;
    }
    if(this.Base.getMyData().zonshu==0){
      this.Base.toast("请选择曾使用的方法");
      return;
    }
    if(this.Base.getMyData().wenti==""){
      this.Base.toast("请填写此次想解决的问题");
      return;
    }
    // if(this.Base.getMyData().qita==""){
    //   this.Base.toast("请填写其他");
    //   return;
    // }
    // if(this.Base.getMyData().wentimiaoshu==""){
    //   this.Base.toast("请填写问题详细描述");
    //   return;
    // }
    if(this.Base.getMyData().jingli==""){
      this.Base.toast("请填写你期望职业生涯咨询帮助达到什么样的效果？");
      return;
    }
    if(this.Base.getMyData().zixunshu==""){
      this.Base.toast("请填写期望的咨询次数");
      return;
    }
    if(this.Base.getMyData().jinjiren==""){
      this.Base.toast("请填写紧急联系人姓名");
      return;
    }
    if(this.Base.getMyData().jinjidianhua==""){
      this.Base.toast("请填写紧急联系人电话");
      return;
    }
    if(this.Base.getMyData().filename==""){
      this.Base.toast("请上传附件");
      return;
    }


    
    if(this.Base.getMyData().qitazixun=='Y'){ 
      var  qitazixun_text=this.Base.getMyData().qitazixun_text;
    }else{ 
      var  qitazixun_text="";
    }

    if(this.Base.getMyData().jiankang=='B'){ 
      var  jiankang_text=this.Base.getMyData().jiankang_text;
    }else{ 
      var  jiankang_text="";
    }

    if(this.Base.getMyData().hunyin=='D'){ 
      var  hunyin_text=this.Base.getMyData().hunyin_text;
    }else{ 
      var  hunyin_text="";
    }

    if(this.Base.getMyData().gongzuo=='A'){ 
      var  gongzuo_text1=this.Base.getMyData().gongzuo_text1;
    }else{ 
      var  gongzuo_text1="";
    }

    if(this.Base.getMyData().gongzuo=='B'){ 
      var  gongzuo_text2=this.Base.getMyData().gongzuo_text2;
    }else{ 
      var  gongzuo_text2="";
    }
    
    var memberapi=new MemberApi();
    
    memberapi.tijiaoyuyue({
      member_id:memberid,
      name :name,
      minzu :minzu,
      shengyuandi :shengyuandi,
      zhuanye :zhuanye,
      yuanxuexiao :yuanxuexiao,
      yuanzhuanye :yuanzhuanye,
      email :email,
      mobile :mobile,
      fuqinzhiye :fuqinzhiye,
      muqinzhiye  :muqinzhiye,
      zhiye :zhiye,
      zixunming :zixunming,
      // danwei :danwei,
      // qita :qita,
      // wentimiaoshu :wentimiaoshu, 
      jingli :jingli,
      zixunshu :zixunshu,
      jinjiren :jinjiren,
      jinjidianhua :jinjidianhua,
      fangfa:fangfa,
      fangfaid:fangfaid,
      wenti:wenti,
      hunyin:hunyin, 
      zhiyezixun:zhiyezixun,
      xinlizixun:xinlizixun,
      xiongdi:xiongdi,
      qitazixun:qitazixun, 
      gongzuo:gongzuo,
      // nianxian:nianxian,
      yuyueshijian:yuyueshijian, 
      hunyin_text:hunyin_text,
      qitazixun_text:qitazixun_text,
      jiankang:jiankang,
      jiankang_text:jiankang_text,
      gongzuo_text1:gongzuo_text1,
      gongzuo_text2:gongzuo_text2,
      file:file,
      status:'A',
      filename:filename,
      yuyue_status:'A',
      // time_frame:this.Base.options.time_frame,
      // yuyueno:info.yuyueno,
      tutor_id:this.Base.getMyData().tutor_id,
    },(ret)=>{
        if(ret.code==0){
        
          var emailApi =new EmailApi();
          emailApi.sendtest({
            tutor_id:this.Base.getMyData().tutor_id,
            yuyueshijian:yuyueshijian,
            zixunren:memberinfo.name,
            mobile:memberinfo.mobile,
          },(ret)=>{
            wx.hideLoading({
              success: (res) => {
                // that.Base.toast("提交成功");
                that.Base.setMyData({overlay:true})
              },
            })
          })
  
        }else{ 
          this.Base.toast("提交失败请重试");
        }
    })
   
  
     
  }

  chakanyuyue(e){
    wx.reLaunch({
      url: '/pages/wodeyueyu/wodeyueyu',
    }) 
  }
 

  open(e){
    wx.showLoading({
      title: '下载中',
    });
    var url=ApiConfig.GetUploadPath()+'yuyue/'+this.Base.getMyData().info.file;
   console.log(url,"走没走",this.Base.getMyData().info.file);
  //  return;
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: url,
      showMenu:true,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功',res)
            
          },
          fail: function (res) {
            console.log('失败',res)
          },complete:function (res) {
            wx.hideLoading({
             
            })
          },
        })
      },
      fail: function (res) {
        console.log('失败',res)
      }
    })
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 

   
body.bind = content.bind; 
body.choosefangfa = content.choosefangfa;  
body.submit = content.submit; 
body.bindread = content.bindread; 

body.chakanyuyue = content.chakanyuyue; 

body.bindinfo = content.bindinfo; 
body.choosefile = content.choosefile;
body.bindradio = content.bindradio; 
body.open = content.open; 

Page(body)