model.Contrat.type = new Attribute("calculated", "string");
model.Contrat.type.onGet = function() {
    console.log(this.ID_Contrat_type);
    if(this.ID_Contrat_type == 137481783) return "4D Mobile";
    else return "4D";
}

//=========================================================================
model.Incident.methods.getUserIncident = function(userID) { //
    var tok = currentSession().promoteWith('Admin');
    var userIncident = ds.Incident.query('ID_User = :1 ', userID);
    currentSession().unPromote(tok);
    return userIncident;
}
model.Incident.methods.getUserIncident.scope = "public";

//=========================================================================
model.Contact.methods.getByUser = function(UserId) {
    var myVar = ds.Contact.query('ID_User = :1 ', UserId);
    return myVar;
}
model.Contact.methods.getByUser.scope = "public";


//=========================================================================
model.Contrat.methods.getUserContrat = function(userID, typeCont) { //
    var tok = currentSession().promoteWith('Admin');
    var userContrat = ds.Contrat.createEntityCollection();
    var idSociete = ds.Contact.getByUser(userID);
    console.log("idSociete " + idSociete);
    if(typeCont == "4D") for(i = 0; i < idSociete.length; i++) {
        userContrat.add(ds.Contrat.query('ID_Societe = :1 AND ID_Contrat_type != :2', idSociete[i].ID_Societe, 137481783));
    }
    else {
        for(i = 0; i < idSociete.length; i++) {
            userContrat.add(ds.Contrat.query('ID_Societe = :1 AND ID_Contrat_type == :2', idSociete[i].ID_Societe, 137481783));
        }
    }
    currentSession().unPromote(tok);
    return userContrat;
}
model.Contrat.methods.getUserContrat.scope = "public";


//=========================================================================
model.Configuration.methods.getByContrat = function(contratID) { //		
    var tok = currentSession().promoteWith('Admin');
    var conf = ds.Configuration.createEntityCollection();
    conf = ds.Configuration.query('ID_contrat = :1 ', contratID);
    currentSession().unPromote(tok);
    return conf;

}
model.Configuration.methods.getByContrat.scope = "public";

//=========================================================================
model.Configuration.methods.getByUser = function(userID, typeCont) {
    var cont = ds.Contrat.createEntityCollection();
    cont = ds.Contrat.getUserContrat(userID, typeCont);
    var confs = ds.Configuration.createEntityCollection();
    cont.forEach(function(contra) {
        confs.add(ds.Configuration.getByContrat(contra.ID));
    });
    return confs;

}
model.Configuration.methods.getByUser.scope = "public";

//=========================================================================
model.Incident.methods.getByConf = function(confID) { //		
    var tok = currentSession().promoteWith('Admin');
    var inc = ds.Incident.createEntityCollection();
    inc = ds.Incident.query('ID_Configuration = :1 ', confID);
    currentSession().unPromote(tok);
    return inc;

}
model.Incident.methods.getByConf.scope = "public";

//=========================================================================
//model.Incident_Pas.calDesc=new Attribute("calculated","string");
//model.Incident_Pas.calDesc.onGet=function(){
//	var desc=this.Description.toString();
//	console.log("rrrrrr"+ ds.Methodes.Text2Html_Parse_BBCode(desc,"FR"));
//return ds.Methodes.Text2Html_Parse_BBCode(desc,"FR");
//}
//model.Incident_Pas.calStmp=new Attribute("calculated","string");
//model.Incident_Pas.calStmp.onGet=function(){
//	var date=this.stmp.toString();
//	console.log("sssssss"+ds.Methodes.transformDate(date));
//return ds.Methodes.transformDate(date);
//}
//model.Incident_Pas.calUsr=new Attribute("calculated","string");
//model.Incident_Pas.calUsr.onGet=function(){
//	var utilisateur= ds.User.find('ID like '+this.ID_User); 
//	if(utilisateur){
//	console.log("mmmmmmmm"+utilisateur.Last_Name+' '+utilisateur.First_Name);
//	return utilisateur.Last_Name+' '+utilisateur.First_Name;
//}
//else return ;
//}


//=================================================================================
model.Incident.status = new Attribute("calculated", "string");
model.Incident.status.onGet = function() {
    console.log(this.current_Status);
    return ds.Methodes.L10n_Get_Text("Incident_status_" + this.current_Status);
}