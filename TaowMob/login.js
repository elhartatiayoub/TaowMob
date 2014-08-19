//include('C:/Users/mouhcine/Documents/Wakanda/TaowMobile (1)/TaowMobile/TaowMobile/MD5.js');
//include('MD5.js');
//include(solution.getFolder().path + 'scripts/MD5.js');
//include('C:\Users\mouhcine\Documents\Wakanda\TaowMobile (1)\TaowMobile\TaowMobile\MD5.js');//include('C:/Users/mouhcine/Documents/Wakanda/TaowMobile (1)/TaowMobile/TaowMobile/MD5.js');

function checkLogin(request, response) {
    var p = require('utils').parseCookies(request.headers.COOKIE);
    var data = String(p.WASID);
     //var data = "aaaaaa";
    var result={};
    result.email=null;
    result.name=null;
    result.USRid=null;
    
   console.log("mouhcineS");
    var isSessionSaved = ds.Methodes.SAW("a", "WWSessionID=" + data, "a", "a", "a", "a");
    if (isSessionSaved) {
   
        //var session = ds.Session.find("WWSessionID like " + data);
        var session = ds.Session.find("WWSessionID like "+'5182014-6839279902280');
       result.USRid=session.ID_User;
        if (session) {
            var myUser = ds.User.find("ID like " + session.ID_User);
            if (myUser) {
                var userDomain = myUser.Motor_email_domain;
                var userlogin = myUser.Motor_email_account;
                emailUser = userlogin + '@' + userDomain;
               loginByPassword(emailUser, (emailUser + '_Keyhashlog_'));
               var session = currentSession();
                var isIn = session.belongsTo("4Dclients");
                result.email=emailUser;
                result.name=myUser.First_Name+' '+myUser.Last_Name;
//              return JSON.stringify(result);
            }
            
        }
        
    }
    return JSON.stringify(result);
} 


