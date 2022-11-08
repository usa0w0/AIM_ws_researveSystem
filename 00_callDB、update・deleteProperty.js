/*
# ワークショップ管理
dic workshopDB = {uuid: {name: , date: , start_time: , end_time: , subscription: , capacity: , question: [MODULE, ... ]}, ... }
dic MODULE = {type: , title: , subscription: (type:見出しのみ), required: (type:見出し以外), option: (ラジオボタン or チェックボックス のみ)}
*/

function callDB(){
  const workshopDB = JSON.parse(PropertiesService.getScriptProperties().getProperty("講座情報"));
  return workshopDB
}

function updateProperty(WORKSHOP, unique_id){
  var workshopDB = callDB();
  workshopDB[unique_id] = WORKSHOP;
  const jsonData = JSON.stringify(workshopDB);
  PropertiesService.getScriptProperties().setProperty("講座情報", jsonData);
  return 0;
}

function deleteProperty(unique_id){
  var workshopDB = callDB();
  delete workshopDB[unique_id]
  const jsonData = JSON.stringify(workshopDB);
  PropertiesService.getScriptProperties().setProperty("講座情報", jsonData);
  return 0;
}