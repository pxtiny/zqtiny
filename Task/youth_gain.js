/*
更新时间: 2021-02-25 00:30
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异

中青看点浏览赚任务，手动完成任务，获取请求体，支持boxjs及Github Actions，多请求用"&"分开，点击任务，支持自动获取请求

https:\/\/ios\.baertt\.com\/v5\/task\/browse_start\.json url script-request-body youth_gain.js

https:\/\/ios\.baertt\.com\/v5\/Nameless\/adlickstart\.json url script-request-body youth_gain.js


多个请求体时用'&'号或者换行隔开"，本脚本可自动删除失效请求，请须知 ‼️

*/


const $ = new Env("中青看点浏览赚&看看赚")
//const notify = $.isNode() ? require('./sendNotify') : '';
let startArr = [], lookArr=[];
let gainscore = 0, lookscore = 0;
let StartBody = [],LookBody = [];
let startbodys = $.getdata('youth_start');
let lookbodys = $.getdata('youth_look')

if (isGetCookie = typeof $request !==`undefined`) {
   GetCookie();
   $.done()
} 
if (!$.isNode() && !startbodys&&!lookbodys) {
  $.msg($.name, "您未获取任何请求，请先获取");
  return
} else if (!$.isNode() && !startbodys.indexOf("&") == -1) {
  startArr.push(startbodys)
} 
if (!$.isNode() && !lookbodys.indexOf("&") == -1) {
  lookArr.push(lookbodys)
} else {
  if (!$.isNode() && !startbodys.indexOf("&") > -1) {
    StartBody = startbodys.split('&');
  }
  if (!$.isNode() && !lookbodys.indexOf("&") > -1) {
    LookBody = lookbodys.split('&');
  }
  if ($.isNode()) {
    if (process.env.YOUTH_START && process.env.YOUTH_START.indexOf('&') > -1) {
      StartBody = process.env.YOUTH_START.split('&');
    } 
    if (process.env.YOUTH_LOOK && process.env.YOUTH_LOOK.indexOf('&') > -1) {
      LookBody = process.env.YOUTH_LOOK.split('&');
    } else {
      LookBody = [process.env.YOUTH_LOOK]
    }
  }
  Object.keys(StartBody).forEach((item) =>{
    if (StartBody[item]) {
      startArr.push(StartBody[item])
    }
  });
 Object.keys(LookBody).forEach((item) =>{
    if (LookBody[item]) {
      lookArr.push(LookBody[item])
    }
  })
}
lookArr=['p=HUJybc31G2V0%3DUiVImOW0Nxha4Y1qB-PCfe2zXBUROz8uZjZaDv3iOUGlgzzih9LKa478lWc5nbbcJ1qC3tIb4d0mlQ_vcghc8Lh3RN3ITjjUTAX7WyU9t3pigir2E-PUlQU_nXmAFucctU7fWaIp3vEUyNJwiefxM3uCXlFdE4r2fPtLdEJMkGsI-Q_nUZDXE5XSfPU1hmRM1KzMuYxaK_jkQOkYDa_I_OWglXnzngUomkRR1JSvZw8oDJhJrf97iGdtJ6Xr6klZNSs-Wx9rHcpaUAxUfONd1pL0C3gxyNmL-XkxxpYkW-MModAyHWHHzwT_ZrZEfeusFDVZ6OUsCn76ajAQtXRmvJv5jCFOj5epRnPjARLaucekWFqAKqoeyiIT4ebTs3Ww6qqFHafXGMTw6AOn4z8PxyQZpzu7xuPBf3BmMlMTCqKunkJ-yQVSzVvla4Ok6RnhXaPoDwCV0Fvj-xLMjGYfrNR6CSxSZh4n_0oIHI5cLXroz9uC0i9wGPX0XOob3wpO0yv5rgBUvEGEsaQaNXUbM7rXCVXU8Y4QEC7fBS3HnaiCzUCONxOi8B_htIkdNFJunmQVDNVfEY2V2s7Zf5h_OcWrCG9AORnIa-eHv2SuqGvjMCl9aQIdhJh5h96dsZja0boP_0OyXm6xB5igDoCiYs1jXoO3dGApFBKUhE4XKQIBUCwaXn3AIXq0cOXl6E1m9wz0wmga011ooPuRS-46kqdtoQTrRZKa_8ehsTT97uhVIkkCZTpAUWrHc1EThuFVuoUmA4l1pvluBdAtnYnXVopcKXkhSOCbMPW_qoRdkdaSFlDkmISPq-Ns-7uNNAZu3-YNxKIWfgwh-iwl8PcX26xVSD4Up9C660MRi-eQWEwTg50pQmr_-l_PJL2NMx2FCQuzgrIGJhx1-HelE3NePHkrhvSenGdMgyL6VCo4zj-gbmm47KDMbne6FlrH6xxiwnHgKWlW1eqDNhWjvSwtyADHhnOGNT8fCzmAwyxyqqDmXila4HB7WaN0Y6e1g7NuG5tNKqtb4fW1F0F1YINfRei9cbPfn4z8fL2HXfUBiu3qsErjT4ttimc7HBrcyRswq4CNzmMOvmjCR64h4fcG8saGApGtqWGk2ejPWZQ-v4-A7gUGlSBtAYoFE_ZIAk75G2rEefnUfKPO3O8V5XUIkRevBJU8wlJn1Vje6nD0r9NtScW1bPYHfGjQWHWxUPgbrqhupe4GzEOe4N0KZnyvZtxUmiIESuOeuRPQ518nbs45R1yOR-9OrqyBiLdAYQVxdL4rtJQnGsha3MPCnm62_o0rvndVhn1UDo1N8MFc1tAwcDGNRCnuY3JBKLVU9Br2FBGDkKtACPtzBmFnicL4bJie1tS-DtB2aomkuIU4sH80UdgO4v5BKKFwu7JxEe84mQoVgtAeQMuKgGmpVfIWAA5oJF3i1q2RPHsSzXQIoOAhEbjeVJ5vMyd4PCIeu8uG9sEtGvTfuvnzXZt8pHsAre3HLWxjFisqCy',
         'p=5XPkPrW1Kghg%3DEfRWZwWkN8guRsb3NgQhKYSFmWUhTVl3rC-YIy3QD7flGvcBXZINVjnLApKLJJ_YCPJVAS_yxPdoYyYAJzHwEQUmimY34q_tcFKCoYZ8jQudvnrW1Y9JaUMtABN3G0DaCUQxniDCbZDYq-DBkqdYONQdUnqB5JASDO-t74UCBIKgme6b6rKvYyialvbYawDuzLADrX0Y2tou535jNbAmHa3zNa2o5VtV7nU1ng_qC8EzHEY6Btl_9xbfn8AwhiDHB7ahM7aPiWslQGiJZvsBmtHsITvgsWdT7x_W4ClUn5O5G9CQcKtOh-IHWgqK5rxBBLEYPYj1Z0rbPd7afIGpgiHqOYEbB0FzJwSgVsOKBeUkZG3-iGMdAPtz8cg4GpjXc9pWA_Mzv54z59QlkqJualxpJf0Xy1OUbM0U9qM3ZP4EqgVBY3n7vAbeQ8dEi6w4myYsBCtcSMWG-RQVksmDZxLcO5s1LxHN5mCblHy08m_6r_mLbFVhcoZtvTP2XdamQG3unWEyW51lnFu48rfhf2Oj8j3aHYXERjiGAtMJDbma-imFnR6XOaElftdN8kHkW8tNnMSUNvo7MLwskMQzpLcUFzGVvnxE4sSZEUSoUm_SX1kLOROC0b598DEZCpHOXGWN3_26OcdA466vey8pyNuUfCvoxRUgZzKmKxLBv6cBQL-QStjLZy2gN7eCuDRdCedGmYePEcAKydOwUuLqKcTAADrFUmtQJDodUb-RB8Pc8WvpHgB64z3zXyoyi0GBm5c32jGpgeEqDCRcQr6mzblGvNqlndXgbVEB2wYvNcO3wezFXjr72uKPATKhwCpiuc2E2dqOqiTOSkMFjiBIqRDF3Ovt6H8CPokqhA2tPmo5HoMvLwnZvLtj6vqxEo9tGVsElN8yFBv578ARn6FzdNSSLdB5_p_OwXfK3UmoOW4DTJS6VIU9_C8Kqe73nWIXhdDalK6rDI_9vcT7XpFvp_f5_zV52XLFZBKo_W3nyjWIjOVxesl9wytvd5pqRNmSg1BCzYZy0vUfXI68LDxV1MUF3sstjW29J6jvLwC3fT5oAjyArLjReDqaF0A9H7yEO7GgFbEL3z1jeUdg5jXkoOHKjss3pq0KYYa_T1D3wlFlfi1fmEZn9LfXymvfL0jYa2GB2-tYQdq4JOOIqFyCdaM4hSnkd47dG2FNRwYEs6D5HznenBj5B8exW_RmieIYh4LHRgmLUBTCkDZEcnEJJKHng2nsKo6zshJ_rJ5E8wFBeh5TzvVdVzIO35QjyXPVY2MRU_ZlLwYgI5BCYwSOmvU3Q02fJcK5dcqP_QxqwRSZNdvdzgdzqa43spB6K5Zmk-YToJUD9W82jb2Vi2bK1tlmMUjdefl1_lqOCI3j4nR6qvf6ocHf9F2_NrdFu5HG5t5kZZn-hydj7mBJuXqEHU2_Pu6t7uSQr9v1UQQzXN5JnLI2WyPVbiuMmKMQqN6UoUFDtiJ54XUeXPjJBdOljtS--ngCRv1-',
         
        ]
    timeZone =  new Date().getTimezoneOffset() / 60;
    timestamp = Date.now()+ (8+timeZone) * 60 * 60 * 1000;
    bjTime = new Date(timestamp).toLocaleString('zh',{hour12:false,timeZoneName: 'long'});
    console.log(`\n === 脚本执行 ${bjTime} ===\n`);
!(async () => {
  $.log(`您共提供${startArr.length}次浏览赚任务`)
  for (let i = 0; i < startArr.length; i++) {
    if (startArr[i]) {
      gainbody = startArr[i];
      $.index = i + 1;
      $.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
    }
      await GainStart();
 }
   console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${gainscore}个青豆，浏览赚任务全部结束`);
   //$.msg("中青看点浏览赚", `共完成${$.index}次任务`+`  共计获得${gainscore}个青豆`);
   
   $.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n您共提供${lookArr.length}次看看赚任务\n`)
  for (let k = 0; k < lookArr.length; k++) {
    if (lookArr[k]) {
      lookbody = lookArr[k];
      $.index = k + 1;
      $.log(`-------------------------\n\n开始中青看点看看赚第${$.index}次任务`)
    }
      await lookStart();
 }
   console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${lookscore}个青豆，看看赚任务全部结束`);
   $.msg("中青看点看看赚", '共完成'+(lookArr.length+startArr.length)+'次任务，共计获得'+parseInt(lookscore+gainscore)+'个青豆');
   
   if ($.isNode()){
     //await notify.sendNotify($.name，`共完成${$.index}次任务，\n共计获得${gainscore}个青豆`
}
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

function GainStart() {
  return new Promise((resolve, reject) =>{
    $.post(gainHost('task/browse_start.json',gainbody), async(error, resp, data) =>{
      let startres = JSON.parse(data);
      if (startres.success == false) {
        smbody = $.getdata('youth_start').replace(gainbody+"&","");
        $.setdata(smbody,'youth_start');
        $.log(startres.message+"已自动删除")
      } else {
         comstate = startres.items.comtele_state;
      if (comstate == 0) {
        $.log("任务开始，" + startres.items.banner_id + startres.message);
        await $.wait(10000);
        await GainEnd()
      } else if (comstate == 1) {
        $.log("任务:" + startres.items.banner_id + "已完成，本次跳过");
       }
      }
      resolve()
    })
  })
}

function lookStart() {
  return new Promise((resolve, reject) =>{
    $.post(gainHost('Nameless/adlickstart.json',lookbody), async(error, resp, data) =>{
       startlk = JSON.parse(data);
      if (startlk.success == false) {
        smbody = $.getdata('youth_start').replace(lookbody+"&","");
        $.setdata(smbody,'youth_start');
        $.log(startlk.message+"已自动删除")
      } else {
         comstate = startlk.items.comtele_state;
      if (comstate == 0) {
        $.log("任务开始，" + startlk.items.banner_id + startlk.message);
       for ( let j = 0;j< startlk.items.see_num -startlk.items.read_num;j++ ){
       $.log("任务执行第"+ parseInt(j+1)+"次")
        await $.wait(8000);
        await lookstatus()
       }
        await $.wait(10000);
        await lookEnd()
      } else if (comstate == 1) {
        $.log("任务:" + startlk.items.banner_id + "已完成，本次跳过");
       }
      }
      resolve()
    })
  })
}
  
function GainEnd() {
  return new Promise((resolve, reject) =>{
    $.post(gainHost('task/browse_end.json',gainbody), (error, resp, data) =>{
      let endres = JSON.parse(data);
      if (endres.success == true) {
        $.log("任务" + endres.items.banner_id + endres.message + "，恭喜获得" + endres.items.score + "个青豆");
        gainscore += parseInt(endres.items.score)
      } else {
        $.log(endres.message)
      }
      resolve()
    })
  })
}

function lookstatus() {
  return new Promise((resolve, reject) =>{
    $.post(gainHost('Nameless/bannerstatus.json',lookbody), (error, resp, data) =>{
      let endres = JSON.parse(data);
      if (endres.success == true) {
        $.log("任务" + endres.items.banner_id +endres.message);
      } else {
        $.log(endres.message)
      }
      resolve()
    })
  })
}
function lookEnd() {
  return new Promise((resolve, reject) =>{
    $.post(gainHost('Nameless/adlickend.json',lookbody), (error, resp, data) =>{
      let endres = JSON.parse(data);
      if (endres.success == true) {
        $.log("任务" + endres.items.banner_id +endres.message+ "，" +endres.items.desc)
        lookscore += parseInt(endres.items.score)
      } else {
        $.log(endres.message)
      }
      resolve()
    })
  })
}
function gainHost(api,body) {
  return {
    url: 'https://kandian.youth.cn/v5/'+api,
  headers: {
             'access':'WIFI',
            'os-api': '26',
            'device-platform': 'android',
            'openudid': '83bcb1d7cab0195e',
            'app-version': '2.4.3',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': '1549',
            'Host': 'kandian.youth.cn',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.2'
            },
   body: body
  }
}


function GetCookie() {
  if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/browse_start\.json/)) {
     startbodyVal = $request.body;
    if (startbodys) {
      if (startbodys.indexOf(startbodyVal) > -1) {
        $.msg($.name, '阅读请求重复，本次跳过');
        return
      } else if (startbodys.indexOf(startbodyVal) == -1) {
        startbodys += "&" + startbodyVal
      }
    } else {
      startbodys = $request.body
    }
    $.setdata(startbodys, 'youth_start');
    $.log("获取浏览赚请求: " + startbodyVal);
    $.msg($.name, '获取浏览赚请求成功')
  } else if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/adlickstart\.json/)) {
     seeVal = $request.body;
    if (lookbodys) {
      if (lookbodys.indexOf(seeVal) > -1) {
        $.msg($.name, '阅读请求重复，本次跳过');
        return
      } else if (lookbodys.indexOf(seeVal) == -1) {
        lookbodys += "&" + seeVal
        $.msg($.name, '获取看看赚请求'+ lookbodys.split("&").length+'成功')
      }
    } else {
      lookbodys = $request.body
      $.msg($.name, '获取看看赚请求成功')
    }
    $.setdata(lookbodys, 'youth_look');
    $.log("获取浏览赚请求: " + seeVal)
  } 
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
