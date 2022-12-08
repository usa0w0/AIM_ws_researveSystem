// ログインユーザーのメールアドレス
const mailAdress = Session.getActiveUser().getUserLoginId();
let loginManagerName = "";

// システム設定スプレッドシート
const managerData = JSON.parse(PropertiesService.getScriptProperties().getProperty("管理ステータス"));

// DBスプレッドシート
const DBSpreadSheet = SpreadsheetApp.openById("1sj3AwNJmg0M_FL_6YcdJmF-ZtuqdcGavRqZPkIIOvIk");
const TemplateSheet = DBSpreadSheet.getSheetByName("template");

// サーバーサイド時刻
const ServerTime = new Date();